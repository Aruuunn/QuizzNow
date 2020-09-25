import UserEntity from 'src/user/user.entity';
import NewQuestionDto from './dto/new.qa';
import UpdateQuestionDto from './dto/update.qa';
import QAEntity from './qa.entity';
import QARepository from './qa.repository';
export declare class QaService {
    private qaRepo;
    constructor(qaRepo: QARepository);
    createQuestion: (user: UserEntity, questionData: NewQuestionDto) => Promise<QAEntity>;
    updateQuestion: (user: UserEntity, questionData: UpdateQuestionDto, questionID: string) => Promise<QAEntity>;
    deleteQuestion: (user: UserEntity, questionID: string) => Promise<void>;
    findbyID: (questionID: string) => Promise<QAEntity>;
}
