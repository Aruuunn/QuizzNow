export declare class QuizAttemptEntity {
    id: string;
    qid: string;
    answeredQuestions: {
        id: string;
        option: number;
    }[];
    totalScore: number;
}
