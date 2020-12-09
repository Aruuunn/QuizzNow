import { IPaginationOptions } from 'nestjs-typeorm-paginate';
import UserEntity from 'src/user/user.entity';
import NewQuestionDto from '../question/dto/new.question';
import { NewQuizDto } from './dto/new.quiz';
import { UpdateQuizDto } from './dto/update.quizz';
import { QuizzService } from './quizz.service';
export declare class QuizController {
    private quizService;
    constructor(quizService: QuizzService);
    newQuiz(data: NewQuizDto, user: UserEntity, res: any): Promise<any>;
    startQuizz(quizzId: string, user: UserEntity): Promise<{
        attemptId: string;
    }>;
    fetchQuizzDetails(quizzId: string, user: UserEntity): Promise<{
        canAttemptQuizz: boolean;
        totalNumberOfQuestions: number;
        isQuizzAttemptFinished: boolean;
        quizzId: string;
        quizzTitle: string;
        startDatetime: Date;
        endDatetime: Date;
        questions: import("../question/question.entity").default[];
        createdBy: UserEntity;
        quizzAttemptsByUsers: import("./entities/quizz_attempts.entity").QuizzAttemptEntity[];
        createdAt: Date;
        updatedAt: Date;
    }>;
    fetchQuizzResults(id: string, user: UserEntity): Promise<{
        score: number;
        maxScore: number;
        questions: {
            optionChoosed: string;
            question: import("../question/question.entity").default;
        }[];
    }>;
    newQuestion(questionData: NewQuestionDto, quizId: string, user: UserEntity, res: any): Promise<any>;
    removeQuestion(questionID: string, quizId: string, user: UserEntity, res: any): Promise<any>;
    removeAllQuestions(quizId: string, user: UserEntity, res: any): Promise<any>;
    getQuizzData(user: UserEntity, quizzId: string): Promise<import("./entities/quizz.entity").QuizzEntity>;
    updateQuizTime(quizzData: UpdateQuizDto, quizId: any, user: UserEntity, res: any): Promise<any>;
    getAttemptData(options: IPaginationOptions, user: UserEntity, quizzId: string): Promise<import("nestjs-typeorm-paginate").Pagination<import("./entities/quizz_attempts.entity").QuizzAttemptEntity>>;
    get(options: IPaginationOptions, req: any): Promise<import("nestjs-typeorm-paginate").Pagination<import("./entities/quizz.entity").QuizzEntity>>;
    deleteQuiz(id: string, req: any, res: any): Promise<any>;
}
