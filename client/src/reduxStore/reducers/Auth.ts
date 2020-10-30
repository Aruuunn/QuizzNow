import { AnyAction } from 'redux';
import {AuthActionTypes} from '../types';


export interface AuthState {
    accessToken: string | null;
}


const initialState ={
    accessToken: null,
};

export const AuthReducer = (state:AuthState = initialState,action:AnyAction) :AuthState=> {
switch(action.type){
    case AuthActionTypes.SAVE_ACCESS_TOKEN:
        localStorage.setItem('accessToken',action.payload);
        return { ...state, accessToken: action.payload };
    case AuthActionTypes.LOG_OUT:
        localStorage.clear();
        return { ...state, accessToken: null };
    default:
        return state;
}

}