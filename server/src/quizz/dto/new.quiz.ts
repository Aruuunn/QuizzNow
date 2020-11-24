import {
  IsNotEmpty,
  IsDateString,
  MinLength,
  ArrayMinSize,
  IsString,
} from 'class-validator';

import NewQuestionDto from 'src/question/dto/new.question';

export class NewQuizDto {
  @IsNotEmpty()
  @IsString()
  quizztitle: string;

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
