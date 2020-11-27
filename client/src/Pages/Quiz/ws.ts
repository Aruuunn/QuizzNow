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
  NOT_FOUND,
} from "../../common/ws.event.types";
import { wsApiURL } from "../../config/domain";
import { QuizzDetailsType } from "../../reduxStore";

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

  socket.on(UNAUTHORIZED, callback);
  return socket;
};

export const onNotFound = (
  socket: SocketIOClient.Socket,
  callback: () => void
) => {

  socket.on(NOT_FOUND, callback);
  return socket;
};


export const fetchQuizzDetails = (
  socket: SocketIOClient.Socket,
  quizzId: string,
  callback: (data: {
    payload:QuizzDetailsType
  }) => void
):SocketIOClient.Socket => {

  socket.emit(FETCH_QUIZ_DETAILS, {
    payload: { quizzId },
  });

  socket.on(RECEIVED_QUIZ_DETAILS, callback);
  return socket;
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

  socket.emit(FETCH_QUESTION, { payload: { attemptId, questionNumber } });
  socket.on(RECEIVED_QUESTION, callback);
  return socket;
};

export const startQuizz = (
  socket: SocketIOClient.Socket,
  quizId: string,
  callback: (data: { payload: { attemptId: string } }) => void
) => {
  socket.emit(START, { payload: { quizId } });
  socket.on(FETCH_ATTEMPT_ID, callback);
  return socket;
};

export const attemptQuestion = (
  socket: SocketIOClient.Socket,
  selectedOption: number,
  questionId: string,
  attemptId: string
) => {
  socket.emit(ATTEMPT_QUESTION, {
    payload: {
      selectedOption,
      questionId,
      attemptId,
    },
  });

  return socket;
};

export const finishQuizAttempt = (
  socket: SocketIOClient.Socket,
  attemptId: string,
  callback: () => void = () => {}
) => {
  socket.emit(FINISH, { payload: { attemptId } });
  callback();
  return socket;
};
