import UserEntity from "src/user/user.entity";
import { BaseEntity } from "typeorm";
declare class QAEntity extends BaseEntity {
    id: string;
    question: string;
    correctAnswer: number;
    answers: string[];
    author: UserEntity;
}
export default QAEntity;
