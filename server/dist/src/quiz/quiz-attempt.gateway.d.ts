import { OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import UserEntity from '../user/user.entity';
import { QuizService } from './quiz.service';
export declare class QuizAttemptGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private quizService;
    constructor(quizService: QuizService);
    server: Server;
    private logger;
    afterInit(): void;
    handleDisconnect(client: Socket): void;
    handleConnection(client: Socket, ...args: any[]): void;
    fetchQuizDetails(server: Server, data: {
        payload: string;
        user: UserEntity;
    }): Promise<void>;
    startQuiz(server: Server, data: {
        payload: {
            quizId: string;
        };
        user: UserEntity;
    }): Promise<void>;
}
