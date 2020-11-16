import {IsNotEmpty,Min,MinLength,IsNumber} from 'class-validator';

export class NewQuestionDto {

    @IsNumber()
    @Min(0)
    correctAnswer:number;

    @MinLength(5)
    question:string;

    
    answers:string[]
}

export default NewQuestionDto;