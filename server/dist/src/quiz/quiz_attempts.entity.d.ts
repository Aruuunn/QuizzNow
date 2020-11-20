import UserEntity from "src/user/user.entity";
import { BaseEntity } from "typeorm";
import { QuizEntity } from "./quiz.entity";
import { QuestionAttemptEntity } from './question_attempt.entity';
export declare class QuizAttemptEntity extends BaseEntity {
    id: string;
    quiz: QuizEntity;
    user: UserEntity;
    questionAttempts: QuestionAttemptEntity[];
    totalScore: number;
    attemptFinished: boolean;
}
