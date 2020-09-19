import { BaseEntity } from "typeorm";
declare class QAEntity extends BaseEntity {
    id: string;
    question: string;
    correctAnswer: number;
    answers: string[];
}
export default QAEntity;
