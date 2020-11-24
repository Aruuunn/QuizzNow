import io from "socket.io-client";
import { ACCESS_TOKEN } from "../../common/constants";
import {
  CONNECT,
  DISCONNECT,
  FETCH_QUIZ_DETAILS,
  RECEIVED_QUIZ_DETAILS,
  UNAUTHORIZED,
  FETCH_QUESTION,
  RECEIVED_QUESTION,
  START,
  FETCH_ATTEMPT_ID,
  ATTEMPT_QUESTION,
  FINISH,
} from "../../common/ws.event.types";
import { wsApiURL } from "../../config/domain";

export const clone = (obj: Object) => Object.create(obj);

export const setUp = () => {
  const socket = io(wsApiURL, {
    query: {
      token: localStorage.getItem(ACCESS_TOKEN),
    },
  });
  socket.on(CONNECT, () => {
    console.log("Connected");
  });
  socket.on(DISCONNECT, () => {
    console.log("Disconnected");
  });

  return socket;
};

export const onUnAuthorized = (
  socket: SocketIOClient.Socket,
  callback: () => void
) => {
  const socketClone = clone(socket);
  socketClone.on(UNAUTHORIZED, callback);
  return socketClone;
};

export const fetchQuizzDetails = (
  socket: SocketIOClient.Socket,
  quizzId: string,
  callback: (data: {
    payload: {
      id: string;
      title: string,
      createdBy: {
        name: string,
        photoURL?:string
      },
      startDatetime: string;
      endDatetime: string;
    }
  }) => void
) => {
  const socketClone = clone(socket);
  socketClone.emit(FETCH_QUIZ_DETAILS, {
    payload: { quizzId },
  });

  socketClone.on(RECEIVED_QUIZ_DETAILS, callback);
  return socketClone;
};

export const fetchQuestion = (
  socket: SocketIOClient.Socket,
  attemptId: string,
  questionNumber: number,
  callback: (data: {
    payload: {
      question: { id: string; question: string; options: string[] };
      selectedOption?: number;
    };
  }) => void
) => {
  const socketClone = clone(socket);
  socketClone.emit(FETCH_QUESTION, { payload: { attemptId, questionNumber } });
  socketClone.on(RECEIVED_QUESTION, callback);
  return socketClone;
};

export const startQuizz = (
  socket: SocketIOClient.Socket,
  quizId: string,
  callback: (data: { payload: { attemptId: string } }) => void
) => {
  const socketClone = clone(socket);
  socketClone.emit(START, { payload: { quizId } });
  socketClone.on(FETCH_ATTEMPT_ID, callback);
  return socketClone;
};

export const attemptQuestion = (
  socket: SocketIOClient.Socket,
  selectedOption: number,
  questionId: string,
  attemptId: string
) => {
  const socketClone = clone(socket);
  socketClone.emit(ATTEMPT_QUESTION, {
    payload: {
      selectedOption,
      questionId,
      attemptId,
    },
  });

  return socketClone;
};

export const finishQuizAttempt = (
  socket: SocketIOClient.Socket,
  attemptId: string,
  callback: () => void = () => {}
) => {
  const socketClone = clone(socket);
  socketClone.emit(FINISH, { payload: { attemptId } });
  callback();
  return socketClone;
};
