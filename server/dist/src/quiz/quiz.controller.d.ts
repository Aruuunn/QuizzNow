import { IPaginationOptions } from 'nestjs-typeorm-paginate';
import NewQuestionDto from 'src/qa/dto/new.qa';
import { NewQuizDto } from './dto/new.quiz';
import { QuizService } from './quiz.service';
export declare class QuizController {
    private quizService;
    constructor(quizService: QuizService);
    newQuiz(data: NewQuizDto, req: any, res: any): Promise<any>;
    getQuiz(id: any): Promise<void>;
    newQuestion(questionData: NewQuestionDto, quizId: string, req: any, res: any): Promise<any>;
    removeQuestion(questionID: string, quizId: string, req: any, res: any): Promise<any>;
    removeAllQuestions(quizId: string, req: any, res: any): Promise<any>;
    updateQuizTime(startDatetime: string, endDatetime: string, quizId: any, req: any, res: any): Promise<any>;
    get(options: IPaginationOptions, req: any): Promise<import("nestjs-typeorm-paginate").Pagination<import("./quiz.entity").QuizEntity>>;
}
