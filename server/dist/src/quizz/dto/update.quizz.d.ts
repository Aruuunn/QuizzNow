import UpdateQuestionDto from 'src/question/dto/update.question';
export declare class UpdateQuizDto {
    quizzTitle?: string;
    startDatetime?: string;
    endDatetime?: string;
    questions?: UpdateQuestionDto[];
}
