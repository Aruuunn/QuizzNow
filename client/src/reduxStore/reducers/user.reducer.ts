import { UserActionTypes } from "../types";

export interface Quiz {
  id: string;
  startDatetime: string;
  title: string;
  endDatetime: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserState {
  id: string | null;
  name: string | null;
  email: string | null;
  photoURL: string | null;
  quizzes: Quiz[];
  attendedQuizzes: Quiz[];
  createdQuestions: Quiz[];
}

export interface Action {
  type: UserActionTypes,
  payload?:UserState
}

const initialState: UserState = {
  id: null,
  name: null,
  email: null,
  photoURL: null,
  quizzes: [],
  attendedQuizzes: [],
  createdQuestions:[]
}

export const UserReducer =  (state: UserState=initialState, action:Action): UserState => {
  switch (action.type) {
    case UserActionTypes.SET_USER:
      return {...state,...action.payload}
    default:
      return state;
  }
}

export default UserReducer;