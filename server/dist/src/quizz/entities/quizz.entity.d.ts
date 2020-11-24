import QuestionEntity from 'src/question/question.entity';
import UserEntity from 'src/user/user.entity';
import { BaseEntity } from 'typeorm';
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
