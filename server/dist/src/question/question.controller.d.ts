import NewQuestionDto from './dto/new.question';
import UpdateQuestionDto from './dto/update.question';
import { QuestionService } from './question.service';
export declare class QuestionController {
    private questionService;
    constructor(questionService: QuestionService);
    newQa(qaData: NewQuestionDto, req: any): Promise<import("./question.entity").default>;
    updateQa(qaData: UpdateQuestionDto, id: string, req: any): Promise<import("./question.entity").default>;
    deleteQa(id: string, req: any, res: any): Promise<any>;
}
