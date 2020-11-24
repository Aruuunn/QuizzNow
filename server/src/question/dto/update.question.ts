import {
  IsNotEmpty,
  IsString,
  MinLength,
  IsArray,
  MaxLength,
  ArrayMinSize
} from 'class-validator';

export class UpdateQuestionDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(100)
  correctAnswer?: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(100)
  questionTitle?: string;

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(2)
  multipleChoices?: string[];
}

export default UpdateQuestionDto;
