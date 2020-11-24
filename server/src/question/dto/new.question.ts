import { ApiProperty } from '@nestjs/swagger';
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
  
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(100)
  correctAnswer: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(100)
  questionTitle: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(2)
  multipleChoices: string[];
}

export default NewQuestionDto;
