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
import NewQuestionDto from './dto/new.qa';
import UpdateQuestionDto from './dto/update.qa';
import { QaService } from './qa.service';

@Controller('qa')
export class QaController {
  constructor(private qaService: QaService) {}

  @Post('new')
  @UseGuards(JwtGaurd)
  @UsePipes(ValidationPipe)
  async newQa(@Body() qaData: NewQuestionDto, @Req() req) {
    return await this.qaService.createQuestion(req.user, qaData);
  }

  @Patch(':id')
  @UseGuards(JwtGaurd)
  @UsePipes(ValidationPipe)
  async updateQa(
    @Body() qaData: UpdateQuestionDto,
    @Param('id') id: string,
    @Req() req,
  ) {
    return await this.qaService.updateQuestion(req.user, qaData, id);
  }

  @Delete(':id')
  @UseGuards(JwtGaurd)
  @UsePipes(ValidationPipe)
  async deleteQa(@Param('id') id: string, @Req() req, @Res() res) {
    await this.qaService.deleteQuestion(req.user, id);
    return res.status(HttpStatus.OK).send();
  }
}
