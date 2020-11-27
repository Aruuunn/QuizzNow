import NewQuestionDto from 'src/question/dto/new.question';
export declare class NewQuizDto {
    quizzTitle: string;
    startDatetime: string;
    endDatetime: string;
    questions: NewQuestionDto[];
}
