import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import sessionStorage from "redux-persist/lib/storage/session";

import authReducer, { AuthState } from "./auth.reducer";
import userReducer, { UserState } from "./user.reducer";
import quizReducer, { QuizState } from "./quiz.reducer";
export * from "./auth.reducer";
export * from "./user.reducer";

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
  quiz: QuizState;
};

export const rootReducer = combineReducers({
  auth: persistReducer(persistConfig, authReducer),
  user: persistReducer(persistConfig, userReducer),
  quiz: persistReducer(sessionStorePersistConfig, quizReducer),
});

export default rootReducer;
