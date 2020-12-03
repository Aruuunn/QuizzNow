import { OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import UserEntity from '../user/user.entity';
import { QuizzService } from './quizz.service';
export declare class QuizAttemptGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private quizService;
    constructor(quizService: QuizzService);
    server: Server;
    private logger;
    afterInit(): void;
    handleDisconnect(client: Socket): void;
    handleConnection(client: Socket, ...args: any[]): void;
    finishQuiz(server: Server, data: {
        payload: {
            attemptId: string;
        };
        user: UserEntity;
    }, ack: () => void): Promise<void>;
    fetchQuizDetails(server: Server, data: {
        payload: {
            quizzId: string;
        };
        user: UserEntity;
    }): Promise<import("socket.io").Namespace>;
    startQuiz(server: Server, data: {
        payload: {
            quizId: string;
        };
        user: UserEntity;
    }): Promise<void>;
    fetchQuestion(server: Server, data: {
        payload: {
            attemptId: string;
            questionNumber: number;
        };
        user: UserEntity;
    }): Promise<void>;
    attemptQuestion(server: Server, data: {
        payload: {
            selectedOption: string;
            questionId: string;
            attemptId: string;
        };
        user: UserEntity;
    }): Promise<void>;
}
