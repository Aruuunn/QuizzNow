import { UserActionTypes } from "../types";

export interface UserState {
  userId: string | null;
  userName: string | null;
  userEmail: string | null;
  userPhotoURL: string | null;
}

export interface Action {
  type: UserActionTypes,
  payload?:UserState
}

const initialState: UserState = {
  userId: null,
  userName: null,
  userEmail: null,
  userPhotoURL: null,
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