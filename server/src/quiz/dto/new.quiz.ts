import {IsNotEmpty,IsDateString,MinLength} from 'class-validator';

import NewQuestionDto from "src/qa/dto/new.qa";

export class NewQuizDto {

    @IsNotEmpty()
    title:string
    
    @IsNotEmpty()
    @IsDateString()
    startDatetime:Date;

    @IsNotEmpty()
    @IsDateString()
    endDatetime:Date;

    @IsNotEmpty()
    questions: NewQuestionDto[];
}