import {
  Body,
  Controller,
  HttpStatus,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Delete,
  Patch,
  Get,
  Query
} from '@nestjs/common';
import { User } from 'common/user.decorator';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';
import UserEntity from 'src/user/user.entity';
import JwtGaurd from '../auth/jwt.gaurd';
import NewQuestionDto from '../question/dto/new.question';
import { NewQuizDto } from './dto/new.quiz';
import { QuizzService } from './quizz.service';

@Controller('quizz')
export class QuizController {
  constructor(private quizService: QuizzService) {}

  @Post('new')
  @UseGuards(JwtGaurd)
  @UsePipes(ValidationPipe)
  async newQuiz(@Body() data: NewQuizDto, @User() user: UserEntity, @Res() res) {
   await this.quizService.createNewQuiz(user, data);
  return res.sendStatus(HttpStatus.CREATED);
  }



  @Get(":id/results")
  @UseGuards(JwtGaurd)
  async fetchQuizzResults(@Param("id") id: string,@User() user : UserEntity) {
    return await this.quizService.fetchQuizzResults(user, id);
  }

  @Post(':qid/question/new')
  @UseGuards(JwtGaurd)
  @UsePipes(ValidationPipe)
  async newQuestion(
    @Body() questionData: NewQuestionDto,
    @Param('qid') quizId: string,
    @User() user:UserEntity,
    @Res() res,
  ) {
    await this.quizService.addNewQuestion(user, questionData, quizId);
    return res.sendStatus(HttpStatus.CREATED);
  }

  @Delete(':qid/question/:questionID')
  @UseGuards(JwtGaurd)
  @UsePipes(ValidationPipe)
  async removeQuestion(
    @Param('questionID') questionID: string,
    @Param('qid') quizId: string,
    @User() user:UserEntity,
    @Res() res,
  ) {
    await this.quizService.removeQuestion(user, questionID, quizId);
    return res.sendStatus(HttpStatus.OK);
  }

  @Delete(':qid/all/questions')
  @UseGuards(JwtGaurd)
  @UsePipes(ValidationPipe)
  async removeAllQuestions(
    @Param('qid') quizId: string,
    @User() user:UserEntity,
    @Res() res,
  ) {
    await this.quizService.removeAllQuestions(user, quizId);
    return res.sendStatus(HttpStatus.OK);
  }

  @Patch(':qid')
  @UseGuards(JwtGaurd)
  @UsePipes(ValidationPipe)
  async updateQuizTime(
    @Body('startDatetime') startDatetime: string,
    @Body('endDatetime') endDatetime: string,
    @Param('qid') quizId,
    @Req() req,
    @Res() res,
  ) {
    await this.quizService.updateQuiz(req.user,quizId,startDatetime,endDatetime );
    return res.sendStatus(HttpStatus.OK);
  }

  @Get()
  @UseGuards(JwtGaurd)
  async get(@Query() options: IPaginationOptions, @Req() req) { 
    return await  this.quizService.getQuizzes(req.user, options);
  }

  @Delete(':id')
  @UseGuards(JwtGaurd)
  async deleteQuiz(@Param('id') id:string,@Req() req,@Res() res) {
    await this.quizService.deleteQuiz(id, (req.user as UserEntity).userId);
    return res.sendStatus(HttpStatus.OK);
  }

}
