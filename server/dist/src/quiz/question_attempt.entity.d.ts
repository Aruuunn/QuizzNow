import QAEntity from "src/qa/qa.entity";
import { BaseEntity } from "typeorm";
import { QuizAttemptEntity } from "./quiz_attempts.entity";
export declare class QuestionAttemptEntity extends BaseEntity {
    id: string;
    question: QAEntity;
    attempt: QuizAttemptEntity;
    optionChoosed: number;
}
