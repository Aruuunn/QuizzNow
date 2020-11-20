import { IPaginationOptions } from 'nestjs-typeorm-paginate';
import NewQuestionDto from 'src/qa/dto/new.qa';
import { QaService } from 'src/qa/qa.service';
import UserEntity from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { NewQuizDto } from './dto/new.quiz';
import { QuizEntity } from './quiz.entity';
import QuizRepository from './quiz.repository';
import { QuizAttemptEntity } from './quiz_attempts.entity';
export declare class QuizService {
    private qaService;
    private quizRepo;
    private quizAttemptRepo;
    constructor(qaService: QaService, quizRepo: QuizRepository, quizAttemptRepo: Repository<QuizAttemptEntity>);
    canAttemptQuiz(quiz: QuizEntity, user: UserEntity, checkForPreviousAttempts?: boolean): boolean;
    attemptQuiz(user: UserEntity, quizId: string): Promise<string>;
    attemptQuestion(user: UserEntity, questionId: string, choosedOption: number, attemptId: string): Promise<void>;
    getQuiz: (id: string, relations?: string[]) => Promise<QuizEntity>;
    createNewQuiz: (user: UserEntity, quizData: NewQuizDto) => Promise<QuizEntity>;
    addNewQuestion: (user: UserEntity, question: NewQuestionDto, quizId: string) => Promise<QuizEntity>;
    addOldQuestion: (user: UserEntity, questionId: string, quizId: string) => Promise<QuizEntity>;
    removeQuestion: (user: UserEntity, questionId: string, quizId: string) => Promise<QuizEntity>;
    removeAllQuestions: (user: UserEntity, quizId: string) => Promise<QuizEntity>;
    updateQuiz: (user: UserEntity, quizId: string, startDatetime?: string, endDatetime?: string, title?: string) => Promise<QuizEntity>;
    getQuizzes(user: UserEntity, options: IPaginationOptions): Promise<import("nestjs-typeorm-paginate").Pagination<QuizEntity>>;
    deleteQuiz: (id: string, userId: string) => Promise<void>;
}
