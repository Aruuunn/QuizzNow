import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger, UseGuards } from '@nestjs/common';
import { Socket, Server } from 'socket.io';

import { WsGuard } from '../auth/ws.gaurd';
import {
  ATTEMPT_QUESTION,
  ERROR,
  FETCH_ATTEMPT_ID,
  FETCH_QUESTION,
  FETCH_QUIZ_DETAILS,
  RECEIVED_QUIZ_DETAILS,
  START,
  RECEIVED_QUESTION,
  FINISH,
} from '../../common/ws.event.types';
import UserEntity from '../user/user.entity';
import { QuizService } from './quiz.service';
import { classToPlain } from 'class-transformer';
import { QuizAttemptEntity } from './entities/quiz_attempts.entity';

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

  @SubscribeMessage(FINISH)
  async finishQuiz(
    server: Server,
    data: { payload: { attemptId: string }; user: UserEntity },
  ) {
    try 
  {  const {payload :{ attemptId} ,user } = data;
      await this.quizService.finishQuizAttempt(attemptId, user);
    }
    catch (e) {
      console.log(e);
      server.emit(ERROR);
    }
  }

  @SubscribeMessage(FETCH_QUIZ_DETAILS)
  async fetchQuizDetails(
    server: Server,
    data: { payload: { quizzId: string }; user: UserEntity },
  ) {
    const {
      user,
      payload: { quizzId },
    } = data;
    try {
      const quiz = await this.quizService.getQuiz(quizzId);
      this.logger.log(`Sending Details of Quiz with Id - ${quizzId}`);
      console.log(quiz, user);
      server.emit(RECEIVED_QUIZ_DETAILS, {
        payload: {
          ...classToPlain(quiz),
          canAttemptQuiz: this.quizService.canAttemptQuiz(quiz, data.user),
          totalQuestions: quiz.questions.length,
          hasAttempted: user.attempts.reduce((t, c) => {
            if (c.quiz.id === quizzId) {
              return c.attemptFinished ||
                quiz.endDatetime.getTime() < Date.now()
                ? true
                : false;
            } else {
              return t;
            }
          }, false),
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
      server.emit(FETCH_ATTEMPT_ID, { payload: { attemptId } });
    } catch (_) {
      console.log(_);
      server.emit(ERROR);
    }
  }

  @SubscribeMessage(FETCH_QUESTION)
  async fetchQuestion(
    server: Server,
    data: {
      payload: { attemptId: string; questionNumber: number };
      user: UserEntity;
    },
  ) {
    try {
      const {
        payload: { attemptId, questionNumber },
        user,
      } = data;

      const {
        question,
        selectedOption,
      } = await this.quizService.fetchQuestionForQuizAttempt(
        attemptId,
        questionNumber,
        user,
      );

      server.emit(RECEIVED_QUESTION, {
        payload: { question: classToPlain(question), selectedOption },
      });
    } catch (e) {
      console.log(e);
      server.emit(ERROR);
    }
  }

  @SubscribeMessage(ATTEMPT_QUESTION)
  async attemptQuestion(
    server: Server,
    data: {
      payload: {
        selectedOption: number;
        questionId: string;
        attemptId: string;
      };
      user: UserEntity;
    },
  ) {
    try {
      const {
        payload: { selectedOption, questionId, attemptId },
        user,
      } = data;
      await this.quizService.attemptQuestion(
        user,
        questionId,
        selectedOption,
        attemptId,
      );
    } catch (e) {
      this.logger.error(e);
      server.emit(ERROR);
    }
  }
}
