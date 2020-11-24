export interface QuizState {
  [quizId: string]: {
    title: string;
    startDatetime: string;
    endDatetime: string;
    createdBy: string;
    canAttemptQuiz: boolean;
    totalNumberOfQuestions: number;
    isQuizAttemptFinished: boolean;
    isQuizStarted: boolean;
    isQuiAttempted: boolean;
    cacheQuestion: {
      [key: number]: {
        selectedOption: number | null;
        question: string;
        options: string[];
        id: string;
      };
    };
    attemptId: string;
  };
}

export type QuizAction  = {
  type: any;
  payload: any;
}


export const quizInitialState: QuizState = {};

export const quizStateReducer = (quizState: QuizState = quizInitialState, quizAction:QuizAction):QuizState => {
  switch (quizAction.type) {
    default:
      return quizState;
  }
}

export default quizStateReducer;