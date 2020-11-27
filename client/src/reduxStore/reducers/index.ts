import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import sessionStorage from "redux-persist/lib/storage/session";

import authReducer, { AuthState } from "./auth.reducer";
import userReducer, { UserState } from "./user.reducer";
import quizzReducer, { QuizzState } from "./quiz.reducer";
export * from "./auth.reducer";
export * from "./user.reducer";
export * from "./quiz.reducer";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["session"],
};

const sessionStorePersistConfig = {
  key: "session",
  storage: sessionStorage,
};

export type RootState = {
  auth: AuthState;
  user: UserState;
  quizz: QuizzState;
};

export const rootReducer = combineReducers({
  auth: persistReducer(persistConfig, authReducer),
  user: persistReducer(persistConfig, userReducer),
  quizz: quizzReducer,
});

export default rootReducer;
