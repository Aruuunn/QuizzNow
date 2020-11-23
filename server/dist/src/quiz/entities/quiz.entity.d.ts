import QAEntity from 'src/qa/qa.entity';
import UserEntity from 'src/user/user.entity';
import { BaseEntity } from 'typeorm';
import { QuizAttemptEntity } from './quiz_attempts.entity';
export declare class QuizEntity extends BaseEntity {
    id: string;
    title: string;
    startDatetime: Date;
    endDatetime: Date;
    questions: QAEntity[];
    createdBy: UserEntity;
    attempts: QuizAttemptEntity[];
    createdAt: Date;
    updatedAt: Date;
}
