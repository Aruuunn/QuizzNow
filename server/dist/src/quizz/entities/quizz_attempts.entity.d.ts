import UserEntity from 'src/user/user.entity';
import { BaseEntity } from 'typeorm';
import { QuizzEntity } from './quizz.entity';
import { QuestionAttemptEntity } from './question_attempt.entity';
export declare class QuizzAttemptEntity extends BaseEntity {
    quizzAttemptId: string;
    quiz: QuizzEntity;
    user: UserEntity;
    questionAttempts: QuestionAttemptEntity[];
    totalScore: number;
    attemptFinished: boolean;
}
export default QuizzAttemptEntity;
