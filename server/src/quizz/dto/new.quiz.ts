import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsDateString,
  MinLength,
  ArrayMinSize,
  IsString,
} from 'class-validator';

import NewQuestionDto from 'src/question/dto/new.question';

export class NewQuizDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  quizzTitle: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  startDatetime: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  endDatetime: string;

  @ApiProperty()
  @IsNotEmpty()
  @ArrayMinSize(1)
  questions: NewQuestionDto[];
}
