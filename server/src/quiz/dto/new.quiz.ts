import {
  IsNotEmpty,
  IsDateString,
  MinLength,
  ArrayMinSize,
  IsString,
} from 'class-validator';

import NewQuestionDto from 'src/qa/dto/new.qa';

export class NewQuizDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsDateString()
  startDatetime: string;

  @IsNotEmpty()
  @IsDateString()
  endDatetime: string;

  @IsNotEmpty()
  @ArrayMinSize(1)
  questions: NewQuestionDto[];
}
