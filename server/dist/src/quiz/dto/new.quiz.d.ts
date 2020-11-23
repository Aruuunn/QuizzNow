import NewQuestionDto from 'src/qa/dto/new.qa';
export declare class NewQuizDto {
    title: string;
    startDatetime: string;
    endDatetime: string;
    questions: NewQuestionDto[];
}
