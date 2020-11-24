import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Res,
  HttpStatus,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import JwtGaurd from 'src/auth/jwt.gaurd';
import NewQuestionDto from './dto/new.question';
import UpdateQuestionDto from './dto/update.question';
import { QuestionService } from './question.service';

@Controller('question')
export class QuestionController {
  constructor(private questionService: QuestionService) {}

  @Post('new')
  @UseGuards(JwtGaurd)
  @UsePipes(ValidationPipe)
  async newQa(@Body() qaData: NewQuestionDto, @Req() req) {
    return await this.questionService.createNewQuestion(req.user, qaData);
  }

  @Patch(':id')
  @UseGuards(JwtGaurd)
  @UsePipes(ValidationPipe)
  async updateQa(
    @Body() qaData: UpdateQuestionDto,
    @Param('id') id: string,
    @Req() req,
  ) {
    return await this.questionService.updateQuestion(req.user, qaData, id);
  }

  @Delete(':id')
  @UseGuards(JwtGaurd)
  @UsePipes(ValidationPipe)
  async deleteQa(@Param('id') id: string, @Req() req, @Res() res) {
    await this.questionService.deleteQuestion(req.user, id);
    return res.status(HttpStatus.OK).send();
  }
}
