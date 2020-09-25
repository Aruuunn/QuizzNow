import NewQuestionDto from 'src/qa/dto/new.qa';
import { QaService } from 'src/qa/qa.service';
import UserEntity from 'src/user/user.entity';
import { NewQuizDto } from './dto/new.quiz';
import { QuizEntity } from './quiz.entity';
import QuizRepository from './quiz.repository';
export declare class QuizService {
    private qaService;
    private quizRepo;
    constructor(qaService: QaService, quizRepo: QuizRepository);
    createNewQuiz: (user: UserEntity, quizData: NewQuizDto) => Promise<QuizEntity>;
    addNewQuestion: (user: UserEntity, question: NewQuestionDto, quizId: string) => Promise<QuizEntity>;
    addOldQuestion: (user: UserEntity, questionId: string, quizId: string) => Promise<QuizEntity>;
    removeQuestion: (user: UserEntity, questionId: string, quizId: string) => Promise<QuizEntity>;
    removeAllQuestions: (user: UserEntity, quizId: string) => Promise<QuizEntity>;
    updateQuiz: (user: UserEntity, quizId: string, startDatetime?: string, endDatetime?: string) => Promise<QuizEntity>;
}
