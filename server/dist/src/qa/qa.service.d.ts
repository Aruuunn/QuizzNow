import UserEntity from 'src/user/user.entity';
import { Connection } from 'typeorm';
import NewQuestionDto from './dto/new.qa';
import UpdateQuestionDto from './dto/update.qa';
import QAEntity from './qa.entity';
export declare class QaService {
    constructor(connection: Connection);
    private qaRepo;
    private logger;
    createQuestion: (user: UserEntity, questionData: NewQuestionDto) => Promise<QAEntity>;
    updateQuestion: (user: UserEntity, questionData: UpdateQuestionDto, questionID: string) => Promise<QAEntity>;
    deleteQuestion: (user: UserEntity, questionID: string) => Promise<void>;
    findbyID(questionID: string): Promise<QAEntity>;
}
