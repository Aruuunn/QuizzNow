import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";


import { AuthReducer, AuthState } from "./Auth";
import UserReducer , { UserState } from "./user.reducer";
export * from "./Auth";
export * from "./user.reducer";


const persistConfig = {
  key: "root",
  storage,
};

export type RootState = {
  auth: AuthState;
  user: UserState;
};

export const rootReducer = combineReducers({
  auth: persistReducer(persistConfig, AuthReducer),
  user: persistReducer(persistConfig, UserReducer),

});

export default rootReducer;
