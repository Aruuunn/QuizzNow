import io from "socket.io-client";
import { ACCESS_TOKEN } from "../../common/constants";
import {
  CONNECT,
  DISCONNECT,
  FETCH_QUIZ_DETAILS,
  RECEIVED_QUIZ_DETAILS,
  UNAUTHORIZED,
} from "../../common/ws.event.types";
import { wsApiURL } from "../../config/domain";

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

export const fetchQuizzDetails = (
  socket: SocketIOClient.Socket,
  quizzId: string,
  callback: (args:any) => void
) => {
  socket.emit(FETCH_QUIZ_DETAILS, {
    payload: quizzId,
  });

  socket.on(RECEIVED_QUIZ_DETAILS, callback);

  return socket;
};

export const removeEventListener = (
  socket:SocketIOClient.Socket,
  event:string
) => {
  socket.removeEventListener(event);
  return socket;
};

