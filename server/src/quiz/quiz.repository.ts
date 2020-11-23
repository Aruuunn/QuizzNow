import { EntityRepository, Repository } from "typeorm";
import { QuizEntity } from "./entities/quiz.entity";


@EntityRepository(QuizEntity)
export class QuizRepository extends Repository<QuizEntity>{
}

export default QuizRepository;