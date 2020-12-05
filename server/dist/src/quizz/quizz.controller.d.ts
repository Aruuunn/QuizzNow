import { IPaginationOptions } from 'nestjs-typeorm-paginate';
import UserEntity from 'src/user/user.entity';
import NewQuestionDto from '../question/dto/new.question';
import { NewQuizDto } from './dto/new.quiz';
import { QuizzService } from './quizz.service';
export declare class QuizController {
    private quizService;
    constructor(quizService: QuizzService);
    newQuiz(data: NewQuizDto, user: UserEntity, res: any): Promise<any>;
    fetchQuizzResults(id: string, user: UserEntity): Promise<{
        option: string;
        question: import("../question/question.entity").default;
    }[]>;
    newQuestion(questionData: NewQuestionDto, quizId: string, user: UserEntity, res: any): Promise<any>;
    removeQuestion(questionID: string, quizId: string, user: UserEntity, res: any): Promise<any>;
    removeAllQuestions(quizId: string, user: UserEntity, res: any): Promise<any>;
    updateQuizTime(startDatetime: string, endDatetime: string, quizId: any, req: any, res: any): Promise<any>;
    get(options: IPaginationOptions, req: any): Promise<import("nestjs-typeorm-paginate").Pagination<import("./entities/quizz.entity").QuizzEntity>>;
    deleteQuiz(id: string, req: any, res: any): Promise<any>;
}
