import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthenticatedGuard } from 'src/auth/authenticated.gaurd';
import NewQuestionDto from 'src/qa/dto/new.qa';
import { NewQuizDto } from './dto/new.quiz';
import { QuizService } from './quiz.service';

@Controller('quiz')
export class QuizController {
  constructor(private quizService: QuizService) {}

  @Post('new')
  @UseGuards(AuthenticatedGuard)
  @UsePipes(ValidationPipe)
  async newQuiz(@Body() data: NewQuizDto, @Req() req, @Res() res) {
    await this.quizService.createNewQuiz(req.user, data);
    return res.sendStatus(HttpStatus.CREATED);
  }

  @Post(':qid/question/new')
  @UseGuards(AuthenticatedGuard)
  @UsePipes(ValidationPipe)
  async newQuestion(
    @Body() questionData: NewQuestionDto,
    @Param('qid') quizId: string,
    @Req() req,
    @Res() res,
  ) {
    await this.quizService.addNewQuestion(req.user, questionData, quizId);
    return res.sendStatus(HttpStatus.CREATED);
  }
}
