import {
  BadRequestException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import NewQuestionDto from 'src/qa/dto/new.qa';
import QAEntity from 'src/qa/qa.entity';
import { QaService } from 'src/qa/qa.service';
import UserEntity from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { NewQuizDto } from './dto/new.quiz';
import { QuestionAttemptEntity } from './entities/question_attempt.entity';
import { QuizEntity } from './entities/quiz.entity';
import QuizRepository from './quiz.repository';
import { QuizAttemptEntity } from './entities/quiz_attempts.entity';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class QuizService {
  constructor(
    private qaService: QaService,
    @InjectRepository(QuizRepository)
    private quizRepo: QuizRepository,
    @InjectRepository(QuizAttemptEntity)
    private quizAttemptRepo: Repository<QuizAttemptEntity>,
    @InjectRepository(QuestionAttemptEntity)
    private questionAttemptRepo: Repository<QuestionAttemptEntity>,
  ) {}

  private logger: Logger = new Logger('QuizService');

  canAttemptQuiz(
    quiz: QuizEntity,
    user: UserEntity,
    checkForPreviousAttempts: boolean = true,
  ) {
    const result =
      quiz &&
      quiz.startDatetime.getTime() < Date.now() &&
      quiz.endDatetime.getTime() > Date.now() &&
      (!checkForPreviousAttempts ||
        user.attempts.reduce((t, c) => {
          if (quiz.id === c.quiz.id) {
            return c.attemptFinished ? false : true;
          } else {
            return t;
          }
        }, true));

    this.logger.debug(result, 'canAttemptQuiz');
    return result;
  }

  async fetchQuestionForQuizAttempt(
    attemptId: string,
    questionNumber: number,
    user: UserEntity,
  ) {
    const quizAttempt = await this.quizAttemptRepo.findOne(attemptId, {
      relations: ['user'],
    });

    this.logger.debug(quizAttempt, 'fetchQuestionForQuizAttempt');
    if (
      this.canAttemptQuiz(quizAttempt.quiz, user, false) &&
      !quizAttempt.attemptFinished &&
      quizAttempt.user.id === user.id &&
      questionNumber >= 0 &&
      questionNumber < quizAttempt.quiz.questions.length
    ) {
      const question = quizAttempt.quiz.questions[questionNumber];
      const selectedOption = quizAttempt.questionAttempts.reduce((t, c) => {
        if (question && c.questionId === question.id) {
          return c.optionChoosed;
        } else {
          return t;
        }
      }, undefined);
      this.logger.debug(
        question,
        `Question returned by fetchQuestionForQuizAttempt for Question Number - ${questionNumber}`,
      );
      return { question, selectedOption };
    } else {
      throw new BadRequestException();
    }
  }

  async attemptQuiz(user: UserEntity, quizId: string): Promise<string> {
    const quiz = await this.quizRepo.findOne(quizId, {
      relations: ['attempts'],
    });
    const quizAttempt = user.attempts.reduce((t, c) => {
      if (c.quiz.id === quiz.id) {
        return c;
      } else {
        return t;
      }
    }, undefined);

    if (!this.canAttemptQuiz(quiz, user)) {
      throw new BadRequestException();
    }

    if (quizAttempt) {
      return quizAttempt.id;
    }

    const newQuizAttempt = new QuizAttemptEntity();
    newQuizAttempt.user = user;
    newQuizAttempt.quiz = quiz;
    newQuizAttempt.questionAttempts = [];
    await newQuizAttempt.save();
    return newQuizAttempt.id;
  }

  async attemptQuestion(
    user: UserEntity,
    questionId: string,
    choosedOption: number,
    attemptId: string,
  ) {
    try {
      let isNew = false;
      const quizAttempt = await this.quizAttemptRepo.findOne(attemptId, {
        relations: [],
      });
      const question = await this.qaService.findbyID(questionId);

      if (
        !question ||
        !quizAttempt ||
        !this.canAttemptQuiz(quizAttempt.quiz, user, false)
      ) {
        this.logger.error('Cannot Attempt Question');
        throw new BadRequestException();
      }
      let questionAttempt = await this.questionAttemptRepo.findOne(
        {
          questionId,
          attempt: { id: quizAttempt.id },
        },
        { relations: ['attempt'] },
      );

      this.logger.debug(
        { question, quizAttempt, questionAttempt },
        'attemptQuestion()',
      );

      if (!questionAttempt) {
        isNew = true;
        questionAttempt = new QuestionAttemptEntity();
        this.logger.debug(question,"Question")
        questionAttempt.questionId = question.id;
        questionAttempt.attempt = quizAttempt;
      } else {
        quizAttempt.totalScore -=
          questionAttempt.optionChoosed === question.correctAnswer ? 1 : 0;
      }

      questionAttempt.optionChoosed = choosedOption;

      if (isNew) {
        quizAttempt.questionAttempts.push(questionAttempt);
      }
      quizAttempt.totalScore +=
        questionAttempt.optionChoosed === question.correctAnswer ? 1 : 0;
      questionAttempt.save();
      quizAttempt.save();
    } catch (e) {
      console.log(e);
    }
  }

  getQuiz = async (id: string, relations: string[] = []) => {
    return await this.quizRepo.findOneOrFail(id, { relations });
  };

  createNewQuiz = async (user: UserEntity, quizData: NewQuizDto) => {
    const newQuiz = new QuizEntity();

    newQuiz.startDatetime = new Date(quizData.startDatetime);
    newQuiz.endDatetime = new Date(quizData.endDatetime);
    newQuiz.createdBy = user;
    newQuiz.title = quizData.title;

    const questions: QAEntity[] = [];
    if (quizData.questions.length !== 0)
      for (let i of quizData.questions) {
        questions.push(await this.qaService.createQuestion(user, i));
      }

    newQuiz.questions = questions;
    await newQuiz.save();
    return newQuiz;
  };

  addNewQuestion = async (
    user: UserEntity,
    question: NewQuestionDto,
    quizId: string,
  ) => {
    const newQuestion = await this.qaService.createQuestion(user, question);

    const quiz = await this.quizRepo.findOne(
      { id: quizId },
      { relations: ['createdBy'] },
    );

    if (quiz.createdBy.id !== user.id) {
      throw new UnauthorizedException();
    }

    if (!quiz) {
      throw new BadRequestException('Invalid Quiz ID');
    }

    if (!quiz.questions) {
      quiz.questions = [];
    }

    quiz.questions.push(newQuestion);
    await quiz.save();
    return quiz;
  };

  addOldQuestion = async (
    user: UserEntity,
    questionId: string,
    quizId: string,
  ) => {
    const question = await this.qaService.findbyID(questionId);
    const quiz = await this.quizRepo.findOne(
      { id: quizId },
      { relations: ['createdBy'] },
    );
    if (!question || !quiz) {
      throw new BadRequestException('No Question/Quiz Found with the given ID');
    }
    if (!quiz.questions) {
      quiz.questions = [];
    }

    if (quiz.createdBy.id !== user.id) {
      throw new UnauthorizedException();
    }
    quiz.questions.push(question);

    await quiz.save();
    return quiz;
  };

  removeQuestion = async (
    user: UserEntity,
    questionId: string,
    quizId: string,
  ) => {
    const quiz = await this.quizRepo.findOne(
      { id: quizId },
      { relations: ['createdBy'] },
    );
    if (!quiz) {
      throw new BadRequestException('No Quiz Found with the given ID');
    }
    if (!quiz.questions) {
      quiz.questions = [];
    }

    if (quiz.createdBy.id !== user.id) {
      throw new UnauthorizedException();
    }

    quiz.questions = quiz.questions.filter(q => q.id !== questionId);

    await quiz.save();
    return quiz;
  };

  removeAllQuestions = async (user: UserEntity, quizId: string) => {
    const quiz = await this.quizRepo.findOne(
      { id: quizId },
      { relations: ['createdBy'] },
    );
    if (!quiz) {
      throw new BadRequestException('No Quiz Found with the given ID');
    }

    if (quiz.createdBy.id !== user.id) {
      throw new UnauthorizedException();
    }

    quiz.questions = [];
    await quiz.save();
    return quiz;
  };

  updateQuiz = async (
    user: UserEntity,
    quizId: string,
    startDatetime?: string,
    endDatetime?: string,
    title?: string,
  ) => {
    const quiz = await this.quizRepo.findOne(
      { id: quizId },
      { relations: ['createdBy'] },
    );
    if (!quiz) {
      throw new BadRequestException('No Quiz Found with the given ID');
    }

    if (title) {
      quiz.title = title;
    }

    if (quiz.createdBy.id !== user.id) {
      throw new UnauthorizedException();
    }

    if (!startDatetime && !endDatetime) {
      throw new BadRequestException();
    }

    if (startDatetime) quiz.startDatetime = new Date(startDatetime);

    if (endDatetime) quiz.endDatetime = new Date(endDatetime);

    await quiz.save();
    return quiz;
  };

  async getQuizzes(user: UserEntity, options: IPaginationOptions) {
    const q = this.quizRepo.createQueryBuilder('q');
    q.where('q.createdBy= :userId', { userId: user.id });
    q.orderBy('q.updatedAt', 'DESC');

    return await paginate<QuizEntity>(q, options);
  }

  deleteQuiz = async (id: string, userId: string) => {
    const quiz = await this.quizRepo.findOne(id, { relations: ['createdBy'] });

    console.log(quiz);

    if (!quiz) {
      throw new BadRequestException();
    }

    if (quiz.createdBy.id === userId) {
      await this.quizRepo.delete(id);
    } else {
      throw new UnauthorizedException();
    }
  };

  finishQuizAttempt = async (attemptId: string, user: UserEntity) => {
    const quizAttempt = await this.quizAttemptRepo.findOne(attemptId, {
      relations: ['user'],
    });
    if (user.id !== quizAttempt.user.id) {
      throw new WsException('Forbidden');
    }
    if (!quizAttempt) {
      throw new WsException('No Quiz Attempt Found');
    }
    quizAttempt.attemptFinished = true;
    quizAttempt.save();
  };
}
