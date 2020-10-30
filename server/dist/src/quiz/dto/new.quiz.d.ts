import NewQuestionDto from "src/qa/dto/new.qa";
export declare class NewQuizDto {
    title: string;
    startDatetime: Date;
    endDatetime: Date;
    questions: NewQuestionDto[];
}
