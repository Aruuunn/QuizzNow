import QAEntity from "src/qa/qa.entity";
import UserEntity from "src/user/user.entity";
import { BaseEntity } from "typeorm";
export declare class QuizEntity extends BaseEntity {
    id: string;
    startDatetime: Date;
    title: string;
    endDatetime: Date;
    questions: QAEntity[];
    author: UserEntity;
    participants: UserEntity[];
    createdAt: Date;
    updatedAt: Date;
}
