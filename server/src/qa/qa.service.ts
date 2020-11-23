import {
  BadRequestException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import UserEntity from 'src/user/user.entity';
import { Connection, } from 'typeorm';
import NewQuestionDto from './dto/new.qa';
import UpdateQuestionDto from './dto/update.qa';
import QAEntity from './qa.entity';
import QARepository from './qa.repository';

@Injectable()
export class QaService {
  constructor(connection: Connection) {
    this.qaRepo = connection.getCustomRepository(QARepository);
  }

  private qaRepo: QARepository;
  private logger: Logger = new Logger('QaService');

  createQuestion = async (user: UserEntity, questionData: NewQuestionDto) => {
    try {
      const newQuestion = new QAEntity();
      newQuestion.options = questionData.options;
      newQuestion.correctAnswer = questionData.correctAnswer;
      newQuestion.createdBy = user;
      newQuestion.question = questionData.question;
      await newQuestion.save();
      this.logger.log(
        `userID: ${user.id} - Created a new Question ${newQuestion.id}`,
      );
      return newQuestion;
    } catch (err) {
      this.logger.error(err);
    }
  };

  updateQuestion = async (
    user: UserEntity,
    questionData: UpdateQuestionDto,
    questionID: string,
  ) => {
    const question = await this.qaRepo.findOne(
      { id: questionID },
      { cache: true, relations: ['createdBy'] },
    );

    if (!question) {
      this.logger.log(`No question found with ID ${questionID}`);
      throw new BadRequestException();
    }

    if (user.id !== question.createdBy.id) {
      this.logger.log(
        `User with ID - ${user.id} tried to modify question not made by him/her of ${question.createdBy.id}`,
      );
      throw new UnauthorizedException();
    }

    if (questionData.options) question.options = questionData.options;

    if (questionData.correctAnswer)
      question.correctAnswer = questionData.correctAnswer;

    if (questionData.question) question.question = questionData.question;
    this.logger.log(`Updated Question ${question.id}`);
    await question.save();
    return question;
  };

  deleteQuestion = async (user: UserEntity, questionID: string) => {
    this.logger.log(
      `Deleting Question - ${questionID} created By user - ${user.id}`,
    );
    await this.qaRepo.delete({ id: questionID, createdBy: { id: user.id } });
  };

  async findbyID(questionID: string): Promise<QAEntity> {
    const question = await this.qaRepo.findOne(questionID);
    this.logger.log(
      `[findByID] ${
        question ? 'Found' : 'Did not find'
      } a question with ID ${questionID} `,
    );
    return question;
  }
}
