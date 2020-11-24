import NewQuestionDto from 'src/question/dto/new.question';
export declare class NewQuizDto {
    quizztitle: string;
    startDatetime: string;
    endDatetime: string;
    questions: NewQuestionDto[];
}
