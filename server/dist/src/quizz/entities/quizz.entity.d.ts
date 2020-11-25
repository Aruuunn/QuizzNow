import { BaseEntity } from 'typeorm';
import QuestionEntity from '../../question/question.entity';
import UserEntity from '../../user/user.entity';
import QuizAttemptEntity from './quizz_attempts.entity';
export declare class QuizzEntity extends BaseEntity {
    quizzId: string;
    quizzTitle: string;
    startDatetime: Date;
    endDatetime: Date;
    questions: QuestionEntity[];
    createdBy: UserEntity;
    quizzAttemptsByUsers: QuizAttemptEntity[];
    createdAt: Date;
    updatedAt: Date;
}
export default QuizzEntity;
