import UserEntity from 'src/user/user.entity';
import { BaseEntity } from 'typeorm';
declare class QuestionEntity extends BaseEntity {
    questionId: string;
    questionTitle: string;
    correctAnswer: string;
    multipleChoices: string[];
    createdBy: UserEntity;
}
export default QuestionEntity;
