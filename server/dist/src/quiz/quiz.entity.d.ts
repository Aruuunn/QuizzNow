import { BaseEntity } from "typeorm";
export declare class QuizEntity extends BaseEntity {
    id: string;
    startDatetime: Date;
    endDatetime: Date;
}
