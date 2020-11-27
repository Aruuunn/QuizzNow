import { QuizzActionTypes } from "../types";

export interface Quizz {
  quizzId: string;
  startDatetime: string;
  quizzTitle: string;
  endDatetime: string;
}

export type QuizzDetailsType = {
  quizzTitle: string;
  startDatetime: string;
  endDatetime: string;
  createdBy: { userName: string };
  canAttemptQuizz: boolean;
  totalNumberOfQuestions: number;
  isQuizzAttemptFinished: boolean;
  isQuizzStarted: boolean;
  isQuizzAttempted: boolean;
  quizzId: string;
};
export interface QuizzState {
  socket: SocketIOClient.Socket | null,
  quizzes: {
     [quizzId: string]: {
    quizzTitle: string;
    startDatetime: string;
    endDatetime: string;
    createdBy: { userName: string };
    canAttemptQuizz: boolean;
    totalNumberOfQuestions: number;
    isQuizzAttemptFinished: boolean;
    isQuizzStarted: boolean;
    isQuizzAttempted: boolean;
    cacheQuestion: {
      [key: number]: {
        selectedOption: number | null;
        questionTitle: string;
        multipleChoices: string[];
        questionId: string;
      };
    };
    quizzAttemptId?: string;
  };
  }
 
}



export type QuizzAction = {
  type: QuizzActionTypes;
  payload: QuizzDetailsType | SocketIOClient.Socket;
};

const saveQuizzDetails = (state: QuizzState, payload: QuizzDetailsType):QuizzState => {
  const { quizzId, ...rest } = payload;

  return {
    ...state,
    quizzes: {
      ...state.quizzes,
      [quizzId]: {
        cacheQuestion: {},
        ...rest,
      },
   }
  };
};

export const quizInitialState: QuizzState = {socket:null,quizzes:{}};

export const quizzStateReducer = (
  quizzState: QuizzState = quizInitialState,
  quizzAction: QuizzAction
): QuizzState => {
  switch (quizzAction.type) {
    case QuizzActionTypes.SAVE_QUIZ_DETAILS:
      return saveQuizzDetails(quizzState, quizzAction.payload as QuizzDetailsType);
    case QuizzActionTypes.SET_SOCKET:
      return {...quizzState,socket:quizzAction.payload as SocketIOClient.Socket}
    default:
      return quizzState;
  }
};

export default quizzStateReducer;
