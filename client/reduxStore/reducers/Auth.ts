import { HYDRATE } from 'next-redux-wrapper';
import { AnyAction } from 'redux';
import {AuthActionTypes} from '../types';


export interface AuthState {
    accessToken:string|null;
}


const initialState ={
    accessToken:null
};

export const AuthReducer = (state:AuthState = initialState,action:AnyAction) :AuthState=> {
switch(action.type){
    case HYDRATE:
        return {...state,...action.payload};
    case AuthActionTypes.SAVE_ACCESS_TOKEN:
        localStorage.setItem('accessToken',action.payload);
        return {...state,accessToken:action.payload};
    default:
        return state;
}

}