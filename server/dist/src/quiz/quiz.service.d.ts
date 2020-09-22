import NewQuestionDto from 'src/qa/dto/new.qa';
import { QaService } from 'src/qa/qa.service';
import UserEntity from 'src/user/user.entity';
import { NewQuizDto } from './dto/new.quiz';
import QuizRepository from './quiz.repository';
export declare class QuizService {
    private qaService;
    private quizRepo;
    constructor(qaService: QaService, quizRepo: QuizRepository);
    createNewQuiz: (user: UserEntity, quizData: NewQuizDto) => Promise<void>;
    addNewQuestion: (user: UserEntity, question: NewQuestionDto, quizId: string) => Promise<void>;
    addOldQuestion: (user: UserEntity, questionId: string, quizId: string) => Promise<void>;
    removeQuestion: (user: UserEntity, questionId: string, quizId: string) => Promise<void>;
}
