import { AnyAction } from 'redux';
import {AuthActionTypes} from '../types';


export interface AuthState {
    accessToken: string | null;
    isLoggedIn:boolean
}


const authInitialState ={
    accessToken: null,
    isLoggedIn:false
};

export const authReducer = (state:AuthState = authInitialState,action:AnyAction) :AuthState=> {
switch(action.type){
    case AuthActionTypes.SAVE_ACCESS_TOKEN:
        localStorage.setItem('accessToken',action.payload);
        return { ...state, accessToken: action.payload ,isLoggedIn:true};
    case AuthActionTypes.LOG_OUT:
        localStorage.clear();
        return { ...state, accessToken: null ,isLoggedIn:false};
    default:
        return state;
}

}

export default authReducer;