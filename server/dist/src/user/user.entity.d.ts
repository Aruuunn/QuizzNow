import QAEntity from '../question/question.entity';
import { QuizzEntity } from '../quizz/entities/quizz.entity';
import { QuizzAttemptEntity } from '../quizz/entities/quizz_attempts.entity';
import { BaseEntity } from 'typeorm';
declare class UserEntity extends BaseEntity {
    userId: string;
    userName: string;
    userEmail: string;
    userPhotoURL: string;
    userCreatedQuizzes: QuizzEntity[];
    userAttemptedQuizzes: QuizzAttemptEntity[];
    userCreatedQuestions: QAEntity[];
}
export default UserEntity;
