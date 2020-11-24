import { BaseEntity } from 'typeorm';
import QuizzAttemptEntity from './quizz_attempts.entity';
export declare class QuestionAttemptEntity extends BaseEntity {
    questionAttemptId: string;
    questionId: string;
    quizAttempt: QuizzAttemptEntity;
    optionChoosed: string;
}
export default QuestionAttemptEntity;
