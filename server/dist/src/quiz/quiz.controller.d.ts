import NewQuestionDto from 'src/qa/dto/new.qa';
import { NewQuizDto } from './dto/new.quiz';
import { QuizService } from './quiz.service';
export declare class QuizController {
    private quizService;
    constructor(quizService: QuizService);
    newQuiz(data: NewQuizDto, req: any, res: any): Promise<any>;
    newQuestion(questionData: NewQuestionDto, quizId: string, req: any, res: any): Promise<any>;
}
