import {
  IsNotEmpty,
  Min,
  MinLength,
  IsNumber,
  MaxLength,
} from 'class-validator';

export class UpdateQuestionDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  correctAnswer?: number;

  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(100)
  question?: string;

  options?: string[];
}

export default UpdateQuestionDto;
