import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import UserEntity from 'src/user/user.entity';
import NewQuestionDto from './dto/new.qa';
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
      newQuestion.answers = questionData.answers;
      newQuestion.correctAnswer = questionData.correctAnswer;
      newQuestion.author = user;
      newQuestion.question = questionData.question;
      await newQuestion.save();
      console.log(newQuestion);
      return newQuestion;
    } catch (err) {
      console.log('Problem in creating Question');
      console.log(err);
    }
  };

  findbyID = async (questionID: string) => {
    return this.qaRepo.findOne({id:questionID});
  };
}
