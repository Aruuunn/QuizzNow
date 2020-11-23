import QAEntity from 'src/qa/qa.entity';
import { QuizEntity } from 'src/quiz/entities/quiz.entity';
import { QuizAttemptEntity } from 'src/quiz/entities/quiz_attempts.entity';
import { BaseEntity } from 'typeorm';
declare class UserEntity extends BaseEntity {
    id: string;
    name: string;
    email: string;
    photoURL: string;
    quizzes: QuizEntity[];
    attempts: QuizAttemptEntity[];
    createdQuestions: QAEntity[];
}
export default UserEntity;
