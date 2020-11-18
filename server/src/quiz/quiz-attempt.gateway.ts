import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { ClassSerializerInterceptor, Logger, UseGuards, UseInterceptors } from '@nestjs/common';
import { Socket, Server } from 'socket.io';

import { WsGuard } from '../auth/ws.gaurd';
import {
  ERROR,
  FETCH_QUIZ_DETAILS,
  RECEIVED_QUIZ_DETAILS,
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
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  @SubscribeMessage(FETCH_QUIZ_DETAILS)
  async fetchQuizDetails(
    server: Server,
    data: { payload: string; user: UserEntity },
  ) {
    try {
      const quiz = await this.quizService.getQuiz(data.payload);
      if (Date.now() < new Date(quiz.startDatetime).getTime() || Date.now() > new Date(quiz.endDatetime).getTime()) {
        delete quiz.questions;
      }
      server.emit(RECEIVED_QUIZ_DETAILS, classToPlain(quiz));
    } catch (e) {
      server.emit(RECEIVED_QUIZ_DETAILS, null);
    }
  }
}
