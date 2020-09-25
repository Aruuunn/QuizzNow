import {IsNotEmpty,Min,MinLength,IsNumber} from 'class-validator';

export class UpdateQuestionDto {

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    correctAnswer?:number;

    @IsNotEmpty()
    @MinLength(5)
    question?:string;

    
    answers?:string[]
}

export default UpdateQuestionDto;