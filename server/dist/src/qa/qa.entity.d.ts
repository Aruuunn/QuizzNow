import { QuizEntity } from "src/quiz/quiz.entity";
import { BaseEntity } from "typeorm";
declare class QAEntity extends BaseEntity {
    id: string;
    question: string;
    correctAnswer: number;
    answers: string[];
    quiz: QuizEntity;
}
export default QAEntity;
