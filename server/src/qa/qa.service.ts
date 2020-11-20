import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import UserEntity from 'src/user/user.entity';
import NewQuestionDto from './dto/new.qa';
import UpdateQuestionDto from './dto/update.qa';
import QAEntity from './qa.entity';
import QARepository from './qa.repository';

@Injectable()
export class QaService {
  constructor(
    @InjectRepository(QARepository)
    private qaRepo: QARepository,
  ) {}

  createQuestion = async (user: UserEntity, questionData: NewQuestionDto) => {
    try {
      const newQuestion = new QAEntity();
      newQuestion.options = questionData.options;
      newQuestion.correctAnswer = questionData.correctAnswer;
      newQuestion.author = user;
      newQuestion.question = questionData.question;
      await newQuestion.save();
      return newQuestion;
    } catch (err) {
      console.log('Problem in creating Question');
      console.log(err);
    }
  };

  updateQuestion = async (
    user: UserEntity,
    questionData: UpdateQuestionDto,
    questionID: string,
  ) => {
    const question = await this.qaRepo.findOne({ id: questionID },{cache:true});

    if (!question) {
      throw new BadRequestException();
    }

    if (user.id !== question.author.id) {
      throw new UnauthorizedException();
    }

    if (questionData.options) question.options = questionData.options;

    if (questionData.correctAnswer)
      question.correctAnswer = questionData.correctAnswer;

    if (questionData.question) question.question = questionData.question;

    await question.save();
    
    return question;
  };

  deleteQuestion = async (user: UserEntity, questionID: string) => {
    await this.qaRepo.delete({ id: questionID, author: { id: user.id } });
  };

  findbyID = async (questionID: string) => {
    return this.qaRepo.findOne({ id: questionID },{cache:true});
  };
}
