import { BaseEntity } from 'typeorm';
import { QuizzEntity } from './quizz.entity';
import { QuestionAttemptEntity } from './question_attempt.entity';
import UserEntity from '../../user/user.entity';
export declare class QuizzAttemptEntity extends BaseEntity {
    quizzAttemptId: string;
    quiz: QuizzEntity;
    user: UserEntity;
    questionAttempts: QuestionAttemptEntity[];
    totalScore: number;
    attemptFinished: boolean;
}
export default QuizzAttemptEntity;
