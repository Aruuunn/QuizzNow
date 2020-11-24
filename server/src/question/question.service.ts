import {
  BadRequestException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import UserEntity from 'src/user/user.entity';
import { Repository } from 'typeorm';
import NewQuestionDto from './dto/new.question';
import UpdateQuestionDto from './dto/update.question';
import QuestionEntity from './question.entity';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(QuestionEntity)
    private questionEntityRepository: Repository<QuestionEntity>,
  ) {}

  private logger: Logger = new Logger('QuestionService');

  private uniqueElements = (arr: string[]) => {
    const newArr: string[] = [];
    for (let i of arr) {
      if (newArr.indexOf(i) === -1) {
        newArr.push(i);
      }
    }
    return newArr;
  };

  createNewQuestion = async (
    user: UserEntity,
    questionData: NewQuestionDto,
  ) => {
    try {
      const newQuestion = new QuestionEntity();
      const multipleChoices = this.uniqueElements(questionData.multipleChoices);
      if (multipleChoices.length < 2) {
        throw new BadRequestException();
      }
      newQuestion.multipleChoices = multipleChoices;
      newQuestion.correctAnswer = questionData.correctAnswer;
      newQuestion.createdBy = user;
      newQuestion.questionTitle = questionData.questionTitle;
      await newQuestion.save();
      this.logger.log(
        `userID: ${user.userId} - Created a new Question ${newQuestion.questionId}`,
      );
      return newQuestion;
    } catch (err) {
      this.logger.error(err);
    }
  };

  updateQuestion = async (
    user: UserEntity,
    questionData: UpdateQuestionDto,
    questionId: string,
  ) => {
    const question = await this.questionEntityRepository.findOne(
      { questionId },
      { cache: true, relations: ['createdBy'] },
    );

    if (!question) {
      this.logger.log(`No question found with ID ${questionId}`);
      throw new BadRequestException();
    }

    if (user.userId !== question.createdBy.userId) {
      this.logger.log(
        `User with ID - ${user.userId} tried to modify question not made by him/her of ${question.createdBy.userId}`,
      );
      throw new UnauthorizedException();
    }

    if (questionData.multipleChoices)
      question.multipleChoices = questionData.multipleChoices;

    if (questionData.correctAnswer)
      question.correctAnswer = questionData.correctAnswer;

    if (questionData.questionTitle)
      question.questionTitle = questionData.questionTitle;
    this.logger.log(`Updated Question ${question.questionId}`);
    await question.save();
    return question;
  };

  deleteQuestion = async (user: UserEntity, questionId: string) => {
    this.logger.log(
      `Deleting Question - ${questionId} created By user - ${user.userId}`,
    );
    await this.questionEntityRepository.delete({
      questionId,
      createdBy: { userId: user.userId },
    });
  };

  async findbyID(questionID: string): Promise<QuestionEntity> {
    const question = await this.questionEntityRepository.findOne(questionID);
    this.logger.log(
      `[findByID] ${
        question ? 'Found' : 'Did not find'
      } a question with ID ${questionID} `,
    );
    return question;
  }
}

export default QuestionService;
