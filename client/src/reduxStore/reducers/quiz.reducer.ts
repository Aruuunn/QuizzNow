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

export type QuestionDetails = {
  question: {
    questionId: string;
    questionTitle: string;
    multipleChoices: string[];
  };
  selectedOption?: string;
};
export interface QuizzState {
  socket: SocketIOClient.Socket | null;
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
        [key: number]: QuestionDetails;
      };
      quizzAttemptId?: string;
    };
  };
}

export type QuizzAction = {
  type: QuizzActionTypes;
  payload:
    | QuizzDetailsType
    | SocketIOClient.Socket
    | ({ questionNumber: number; quizzId: string } & QuestionDetails)
    | { quizzId: string; attemptId: string }
    | { quizzId: string; questionNumber: number; selectedOption: string };
};

const saveQuizzDetails = (
  state: QuizzState,
  payload: QuizzDetailsType
): QuizzState => {
  const { quizzId, ...rest } = payload;

  return {
    ...state,
    quizzes: {
      ...state.quizzes,
      [quizzId]: {
        cacheQuestion: {},
        ...rest,
      },
    },
  };
};

export const quizInitialState: QuizzState = { socket: null, quizzes: {} };

export const quizzStateReducer = (
  quizzState: QuizzState = quizInitialState,
  quizzAction: QuizzAction
): QuizzState => {
  switch (quizzAction.type) {
    case QuizzActionTypes.SAVE_ATTEMPT_ID: {
      const { quizzId, attemptId } = quizzAction.payload as {
        quizzId: string;
        attemptId: string;
      };

      return {
        ...quizzState,
        quizzes: {
          ...quizzState.quizzes,
          [quizzId]: {
            ...quizzState.quizzes[quizzId],
            quizzAttemptId: attemptId,
            isQuizzStarted: true,
          },
        },
      };
    }
    case QuizzActionTypes.SAVE_QUIZ_DETAILS:
      return saveQuizzDetails(
        quizzState,
        quizzAction.payload as QuizzDetailsType
      );
    case QuizzActionTypes.SET_SOCKET:
      return {
        ...quizzState,
        socket: quizzAction.payload as SocketIOClient.Socket,
      };
    case QuizzActionTypes.CACHE_QUESTION:
      const payload = quizzAction.payload as {
        questionNumber: number;
        quizzId: string;
      } & QuestionDetails;

      const quizzId = payload.quizzId;
      const quizz = quizzState.quizzes[payload.quizzId];

      if (payload.questionNumber === undefined || !quizz) {
        console.error("[Quiz Reducer] questionNumber/QuizzId not provided");
        return quizzState;
      }

      return {
        ...quizzState,
        quizzes: {
          ...quizzState.quizzes,
          [quizzId]: {
            ...quizzState.quizzes[quizzId],
            cacheQuestion: {
              ...quizzState.quizzes[quizzId].cacheQuestion,
              [payload.questionNumber]: {
                ...(quizzAction.payload as QuestionDetails),
              },
            },
          },
        },
      };
    case QuizzActionTypes.SELECT_QUESTION_OPTION: {
      const {
        quizzId,
        questionNumber,
        selectedOption,
      } = quizzAction.payload as {
        quizzId: string;
        questionNumber: number;
        selectedOption: string;
      };

      return {
        ...quizzState,
        quizzes: {
          ...quizzState.quizzes,
          [quizzId]: {
            ...quizzState.quizzes[quizzId],
            cacheQuestion: {
              ...quizzState.quizzes[quizzId].cacheQuestion,
              [questionNumber]: {
                ...quizzState.quizzes[quizzId].cacheQuestion[questionNumber],
                selectedOption,
              },
            },
          },
        },
      };
    }
    case QuizzActionTypes.FINISH_ATTEMPT: {
      const { quizzId } = quizzAction.payload as { quizzId: string };
      if (!quizzId) {
        console.error("quizzId is not provided!!");
        return quizzState;
      }
      return {
        ...quizzState,
        quizzes: {
          ...quizzState.quizzes,
          [quizzId]: {
            ...quizzState.quizzes[quizzId],
            isQuizzAttemptFinished: true,
            isQuizzStarted: false,
          },
        },
      };
    }

    default:
      return quizzState;
  }
};

export default quizzStateReducer;
