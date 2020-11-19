import {IsNotEmpty,Min,MinLength,IsNumber, ArrayMinSize} from 'class-validator';

export class NewQuestionDto {

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    correctAnswer:number;

    @IsNotEmpty()
    @MinLength(5)
    question:string;

    @IsNotEmpty()
    @ArrayMinSize(2)
    options:string[]
}

export default NewQuestionDto;