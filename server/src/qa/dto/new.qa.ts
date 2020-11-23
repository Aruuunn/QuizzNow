import {
  IsNotEmpty,
  Min,
  MinLength,
  IsNumber,
  ArrayMinSize,
  MaxLength,
  IsString,
} from 'class-validator';

export class NewQuestionDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  correctAnswer: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(100)
  question: string;

  @IsNotEmpty()
  @ArrayMinSize(2)
  options: string[];
}

export default NewQuestionDto;
