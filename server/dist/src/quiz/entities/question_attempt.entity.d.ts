import { BaseEntity } from "typeorm";
import { QuizAttemptEntity } from "./quiz_attempts.entity";
export declare class QuestionAttemptEntity extends BaseEntity {
    id: string;
    questionId: string;
    attempt: QuizAttemptEntity;
    optionChoosed: number;
}
