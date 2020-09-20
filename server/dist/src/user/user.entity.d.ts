import { QuizEntity } from "src/quiz/quiz.entity";
import { BaseEntity } from "typeorm";
declare class UserEntity extends BaseEntity {
    id: string;
    name: string;
    email: string;
    photoURL: string;
    quizzes: QuizEntity[];
    attendedQuizzes: QuizEntity[];
}
export default UserEntity;
