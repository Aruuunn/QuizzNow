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
  NOT_FOUND,
} from '../../common/ws.event.types';
import UserEntity from '../user/user.entity';
import { QuizzService } from './quizz.service';
import { classToPlain } from 'class-transformer';
import QuizzEntity from './entities/quizz.entity';

@UseGuards(WsGuard)
@WebSocketGateway(undefined, { transports: ['websocket', 'polling'] })
export class QuizAttemptGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(private quizService: QuizzService) {}

  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('QuizzGateway');

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
    ack:() => void
  ) {
    try {
      const {
        payload: { attemptId },
        user,
      } = data;
      await this.quizService.finishQuizAttempt(attemptId, user);
      ack();
    } catch (e) {
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
      let quiz: QuizzEntity;

      try {
        quiz = await this.quizService.getQuiz(quizzId, ['createdBy']);
      } catch (e) {
        return server.emit(NOT_FOUND);
      }

      server.emit(RECEIVED_QUIZ_DETAILS, {
        payload: {
          ...classToPlain(quiz),
          canAttemptQuizz: this.quizService.canAttemptQuiz(quiz, data.user),
          totalNumberOfQuestions: quiz.questions.length,
          isQuizzAttemptFinished: user.userQuizAttempts.reduce((t, c) => {
            if (c.quizz.quizzId === quizzId) {
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
      server.emit(ERROR);
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
      this.logger.debug(questionNumber,"QuestionNumber")
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
        selectedOption: string;
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
