import {
  IsNotEmpty,
  Min,
  MinLength,
  IsNumber,
  ArrayMinSize,
  MaxLength,
  IsString,
  IsArray,
} from 'class-validator';

export class NewQuestionDto {
  
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(100)
  correctAnswer: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(100)
  questionTitle: string;

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(2)
  multipleChoices: string[];
}

export default NewQuestionDto;
