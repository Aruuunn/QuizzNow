import {  ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  MinLength,
  IsArray,
  MaxLength,
  ArrayMinSize
} from 'class-validator';

export class UpdateQuestionDto {
  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(100)
  correctAnswer?: string;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(100)
  questionTitle?: string;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(2)
  multipleChoices?: string[];
}

export default UpdateQuestionDto;
