import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Bind, Logger, UseGuards } from '@nestjs/common';
import { Socket, Server } from 'socket.io';

import { WsGuard } from '../auth/ws.gaurd';
import {
  ERROR,
  FETCH_ATTEMPT_ID,
  FETCH_QUIZ_DETAILS,
  RECEIVED_QUIZ_DETAILS,
  START,
} from '../../common/ws.event.types';
import UserEntity from '../user/user.entity';
import { QuizService } from './quiz.service';
import { classToPlain } from 'class-transformer';

@UseGuards(WsGuard)
@WebSocketGateway(undefined, { transports: ['websocket', 'polling'] })
export class QuizAttemptGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(private quizService: QuizService) {}

  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('AppGateway');

  afterInit() {
    this.logger.log('Init');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(
      `Client disconnected: ${client.id} ${client.conn.remoteAddress}`,
    );
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(
      `Client connected: ${client.id} ${client.conn.remoteAddress}`,
    );
  }

  @SubscribeMessage(FETCH_QUIZ_DETAILS)
  async fetchQuizDetails(
    server: Server,
    data: { payload: string; user: UserEntity },
  ) {
    try {
      const quiz = await this.quizService.getQuiz(data.payload, ['attempts']);

      this.logger.log(`Sending Details of Quiz with Id - ${data.payload}`);

      server.emit(RECEIVED_QUIZ_DETAILS, {
        payload: {
          ...classToPlain(quiz),
          canAttemptQuiz: this.quizService.canAttemptQuiz(quiz, data.user),
          totalQuestions: quiz.questions.length,
        },
      });
    } catch (e) {
      console.log(e);
      server.emit(RECEIVED_QUIZ_DETAILS, { payload: null });
    }
  }

  @SubscribeMessage(START)
  async startQuiz(
    server: Server,
    data: { payload: { quizId: string }; user: UserEntity },
  ) {
    try {
      const attemptId = await this.quizService.attemptQuiz(
        data.user,
        data.payload.quizId,
      );
      server.emit(FETCH_ATTEMPT_ID, { payload: attemptId });
    } catch (_) {
      server.emit(ERROR);
    }
  }
}
