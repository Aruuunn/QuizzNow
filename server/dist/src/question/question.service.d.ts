import UserEntity from 'src/user/user.entity';
import { Repository } from 'typeorm';
import NewQuestionDto from './dto/new.question';
import UpdateQuestionDto from './dto/update.question';
import QuestionEntity from './question.entity';
export declare class QuestionService {
    private questionEntityRepository;
    constructor(questionEntityRepository: Repository<QuestionEntity>);
    private logger;
    private uniqueElements;
    createNewQuestion: (user: UserEntity, questionData: NewQuestionDto) => Promise<QuestionEntity>;
    updateQuestion: (user: UserEntity, questionData: UpdateQuestionDto, questionId: string) => Promise<QuestionEntity>;
    deleteQuestion: (user: UserEntity, questionId: string) => Promise<void>;
    findbyID(questionID: string): Promise<QuestionEntity>;
}
export default QuestionService;
