import { IPaginationOptions } from 'nestjs-typeorm-paginate';
import NewQuestionDto from '../question/dto/new.question';
import QAEntity from '../question/question.entity';
import { QuestionService } from '../question/question.service';
import UserEntity from '../user/user.entity';
import { Repository } from 'typeorm';
import { NewQuizDto } from './dto/new.quiz';
import { QuestionAttemptEntity } from './entities/question_attempt.entity';
import { QuizzEntity } from './entities/quizz.entity';
import QuizzAttemptEntity from './entities/quizz_attempts.entity';
export declare class QuizzService {
    private questionService;
    private quizRepo;
    private quizAttemptRepo;
    private questionAttemptRepo;
    constructor(questionService: QuestionService, quizRepo: Repository<QuizzEntity>, quizAttemptRepo: Repository<QuizzAttemptEntity>, questionAttemptRepo: Repository<QuestionAttemptEntity>);
    private logger;
    canAttemptQuiz(quiz: QuizzEntity, user: UserEntity, checkForPreviousAttempts?: boolean): boolean;
    fetchQuizzDetails(user: UserEntity, quizzId: string): Promise<{
        canAttemptQuizz: boolean;
        totalNumberOfQuestions: number;
        isQuizzAttemptFinished: boolean;
        quizzId: string;
        quizzTitle: string;
        startDatetime: Date;
        endDatetime: Date;
        questions: QAEntity[];
        createdBy: UserEntity;
        quizzAttemptsByUsers: QuizzAttemptEntity[];
        createdAt: Date;
        updatedAt: Date;
    }>;
    fetchQuizzResults(user: UserEntity, quizzId: string): Promise<{
        score: number;
        maxScore: number;
        questions: {
            optionChoosed: string;
            question: QAEntity;
        }[];
    }>;
    fetchQuestionForQuizAttempt(attemptId: string, questionNumber: number, user: UserEntity): Promise<{
        question: QAEntity;
        selectedOption: string | QuestionAttemptEntity;
    }>;
    attemptQuiz(user: UserEntity, quizId: string): Promise<string>;
    attemptQuestion(user: UserEntity, questionId: string, choosedOption: string, attemptId: string): Promise<void>;
    getQuiz: (id: string, relations?: string[]) => Promise<QuizzEntity>;
    createNewQuiz: (user: UserEntity, quizData: NewQuizDto) => Promise<QuizzEntity>;
    addNewQuestion: (user: UserEntity, question: NewQuestionDto, quizzId: string) => Promise<QuizzEntity>;
    addOldQuestion: (user: UserEntity, questionId: string, quizzId: string) => Promise<QuizzEntity>;
    removeQuestion: (user: UserEntity, questionId: string, quizzId: string) => Promise<QuizzEntity>;
    removeAllQuestions: (user: UserEntity, quizzId: string) => Promise<QuizzEntity>;
    updateQuiz: (user: UserEntity, quizzId: string, startDatetime?: string, endDatetime?: string, quizzTitle?: string) => Promise<QuizzEntity>;
    getQuizzes(user: UserEntity, options: IPaginationOptions): Promise<import("nestjs-typeorm-paginate").Pagination<QuizzEntity>>;
    deleteQuiz: (quizzId: string, userId: string) => Promise<void>;
    finishQuizAttempt: (attemptId: string, user: UserEntity) => Promise<void>;
}
