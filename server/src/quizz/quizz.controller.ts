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
  Query,
  ClassSerializerInterceptor,
  NotFoundException,
  BadRequestException,
  UseInterceptors,
} from '@nestjs/common';
import { User } from 'common/user.decorator';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';
import UserEntity from 'src/user/user.entity';
import JwtGaurd from '../auth/jwt.gaurd';
import NewQuestionDto from '../question/dto/new.question';
import { NewQuizDto } from './dto/new.quiz';
import { UpdateQuizDto } from './dto/update.quizz';
import { QuizzService } from './quizz.service';

@Controller('quizz')
export class QuizController {
  constructor(private quizService: QuizzService) {}

  @Post('new')
  @UseGuards(JwtGaurd)
  @UsePipes(ValidationPipe)
  async newQuiz(
    @Body() data: NewQuizDto,
    @User() user: UserEntity,
    @Res() res,
  ) {
    await this.quizService.createNewQuiz(user, data);
    return res.sendStatus(HttpStatus.CREATED);
  }

  @Get(':qid/start')
  @UseGuards(JwtGaurd)
  async startQuizz(
    @Param('qid') quizzId: string,
    @User() user: UserEntity,
  ): Promise<{ attemptId: string }> {
    const attemptId = await this.quizService.attemptQuiz(user, quizzId);
    return { attemptId };
  }

  @Get(':id/details')
  @UsePipes(ClassSerializerInterceptor)
  @UseGuards(JwtGaurd)
  async fetchQuizzDetails(
    @Param('id') quizzId: string,
    @User() user: UserEntity,
  ) {
    return await this.quizService.fetchQuizzDetails(user, quizzId);
  }

  @Get(':id/results')
  @UsePipes(ClassSerializerInterceptor)
  @UseGuards(JwtGaurd)
  async fetchQuizzResults(@Param('id') id: string, @User() user: UserEntity) {
    return await this.quizService.fetchQuizzResults(user, id);
  }

  @Post(':qid/question/new')
  @UseGuards(JwtGaurd)
  @UsePipes(ValidationPipe)
  async newQuestion(
    @Body() questionData: NewQuestionDto,
    @Param('qid') quizId: string,
    @User() user: UserEntity,
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
    @User() user: UserEntity,
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
    @User() user: UserEntity,
    @Res() res,
  ) {
    await this.quizService.removeAllQuestions(user, quizId);
    return res.sendStatus(HttpStatus.OK);
  }

  @Get(':quizzId/data')
  @UseGuards(JwtGaurd)
  async getQuizzData(
    @User() user: UserEntity,
    @Param('quizzId') quizzId: string,
  ) {
    try {
      const quizz = await this.quizService.getQuiz(quizzId, ["createdBy"]);
      if (quizz.createdBy.userId !== user.userId) {
        throw new BadRequestException();
      }
      delete quizz.createdBy;
      return quizz;
    } catch (e) {
      console.log(e)
      throw new NotFoundException();
    }
  }

  @Patch(':qid')
  @UseGuards(JwtGaurd)
  @UsePipes(ValidationPipe)
  async updateQuizTime(
    @Body() quizzData:UpdateQuizDto,
    @Param('qid') quizId,
    @User() user:UserEntity,
    @Res() res,
  ) {
    await this.quizService.updateQuizz(
      user,
      quizzData,
      quizId,
    );
    return res.sendStatus(HttpStatus.OK);
  }

 

  @Get()
  @UseGuards(JwtGaurd)
  async get(@Query() options: IPaginationOptions, @Req() req) {
    return await this.quizService.getQuizzes(req.user, options);
  }

  @Delete(':id')
  @UseGuards(JwtGaurd)
  async deleteQuiz(@Param('id') id: string, @Req() req, @Res() res) {
    await this.quizService.deleteQuiz(id, (req.user as UserEntity).userId);
    return res.sendStatus(HttpStatus.OK);
  }
}
