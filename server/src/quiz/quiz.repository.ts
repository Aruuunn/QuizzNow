import { EntityRepository, Repository } from "typeorm";
import { QuizEntity } from "./quiz.entity";


@EntityRepository(QuizEntity)
export class QuizRepository extends Repository<QuizEntity>{
}

export default QuizRepository;