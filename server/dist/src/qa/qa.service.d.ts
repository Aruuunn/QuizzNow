import UserEntity from 'src/user/user.entity';
import NewQuestionDto from './dto/new.qa';
import QAEntity from './qa.entity';
import QARepository from './qa.repository';
export declare class QaService {
    private qaRepo;
    constructor(qaRepo: QARepository);
    createQuestion: (user: UserEntity, questionData: NewQuestionDto) => Promise<QAEntity>;
    findbyID: (questionID: string) => Promise<QAEntity>;
}
