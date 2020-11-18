import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import NewQuestionDto from 'src/qa/dto/new.qa';
import QAEntity from 'src/qa/qa.entity';
import { QaService } from 'src/qa/qa.service';
import UserEntity from 'src/user/user.entity';
import { NewQuizDto } from './dto/new.quiz';
import { QuizEntity } from './quiz.entity';
import QuizRepository from './quiz.repository';

@Injectable()
export class QuizService {
  constructor(
    private qaService:QaService,
    @InjectRepository(QuizRepository)
  private  quizRepo:QuizRepository
  ) { }
  
  getQuiz = async (id:string) => {
    return await this.quizRepo.findOneOrFail(id);
  }

  createNewQuiz = async (user: UserEntity, quizData: NewQuizDto) => {
    const newQuiz = new QuizEntity();

    newQuiz.startDatetime = new Date(quizData.startDatetime);
    newQuiz.endDatetime = new Date(quizData.endDatetime);
    newQuiz.author = user;
    newQuiz.title = quizData.title;
    
    const questions :QAEntity[]= [];
    if(quizData.questions.length!==0)
    for(let i of quizData.questions){
        questions.push(await this.qaService.createQuestion(user,i));
    }

    newQuiz.questions = questions;

    console.log("saving ...");
    await newQuiz.save();
    return newQuiz;
  };


  addNewQuestion = async(user:UserEntity,question:NewQuestionDto,quizId:string) => {

      const newQuestion = await this.qaService.createQuestion(user,question);

      const quiz = await this.quizRepo.findOne({id:quizId});

      if(quiz.author.id!==user.id){
        throw new UnauthorizedException();
      }

      if(!quiz){
        throw new BadRequestException('Invalid Quiz ID');
      }

      if(!quiz.questions){
        quiz.questions = [];
      }

      quiz.questions.push(newQuestion);
      await quiz.save();
      return quiz;
  }

  addOldQuestion = async (user:UserEntity,questionId:string,quizId:string) => {
    const question =await this.qaService.findbyID(questionId);    
    const quiz =await this.quizRepo.findOne({id:quizId});
    if(!question || !quiz){
      throw new BadRequestException('No Question/Quiz Found with the given ID');
    }
    if(!quiz.questions){
      quiz.questions = [];
    }

    if(quiz.author.id!==user.id){
      throw new UnauthorizedException();
    }

    quiz.questions.push(question);

    await quiz.save();
    return quiz;
  }

  removeQuestion = async (user:UserEntity,questionId:string,quizId:string) => {

    const quiz =await this.quizRepo.findOne({id:quizId});
    if( !quiz){
      throw new BadRequestException('No Quiz Found with the given ID');
    }
    if(!quiz.questions){
      quiz.questions = [];
    }

    if(quiz.author.id!==user.id){
      throw new UnauthorizedException();
    }

    quiz.questions = quiz.questions.filter(q => q.id!==questionId);

    await quiz.save();
    return quiz;
  }

  removeAllQuestions = async (user:UserEntity,quizId:string) => {

    const quiz =await this.quizRepo.findOne({id:quizId});
    if( !quiz){
      throw new BadRequestException('No Quiz Found with the given ID');
    }
  

    if(quiz.author.id!==user.id){
      throw new UnauthorizedException();
    }

    quiz.questions = [];
    await quiz.save();
    return quiz;
  }


  updateQuiz = async (user:UserEntity,quizId:string,startDatetime?:string,endDatetime?:string,title?:string) => {
    const quiz =await this.quizRepo.findOne({id:quizId});
    if( !quiz){
      throw new BadRequestException('No Quiz Found with the given ID');
    }

    if (title) {
      quiz.title = title;
    }

  
    if(quiz.author.id!==user.id){
      throw new UnauthorizedException();
    }

    if(!startDatetime && !endDatetime){
      throw new BadRequestException();
    }
    
    if(startDatetime)
    quiz.startDatetime = new Date(startDatetime);

    if(endDatetime)
    quiz.endDatetime = new Date(endDatetime);
  
    await quiz.save();
    return quiz;
  }

  async getQuizzes(user: UserEntity,options:IPaginationOptions) {
    const q = this.quizRepo.createQueryBuilder('q');
    q.where('q.author= :userId', { userId: user.id });
    q.orderBy('q.updatedAt', 'DESC');

    return await paginate<QuizEntity>(q, options);
  }
}


