import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsDateString,
  ArrayMinSize,
  IsString,
} from 'class-validator';

import UpdateQuestionDto from 'src/question/dto/update.question';

export class UpdateQuizDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  quizzTitle?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  startDatetime?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  endDatetime?: string;

  @ApiProperty()
  @IsNotEmpty()
  @ArrayMinSize(1)
  questions?: UpdateQuestionDto[];
}
