import NewQuestionDto from './dto/new.qa';
import UpdateQuestionDto from './dto/update.qa';
import { QaService } from './qa.service';
export declare class QaController {
    private qaService;
    constructor(qaService: QaService);
    newQa(qaData: NewQuestionDto, req: any): Promise<import("./qa.entity").default>;
    updateQa(qaData: UpdateQuestionDto, id: string, req: any): Promise<import("./qa.entity").default>;
    deleteQa(id: string, req: any, res: any): Promise<any>;
}
