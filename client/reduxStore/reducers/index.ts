import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { AuthReducer, AuthState } from "./Auth";
export * from "./Auth";

const persistConfig = {
  key: "root",
  storage,
};

export type RootState = {
  auth:  AuthState;
};

export const rootReducer = combineReducers({
  auth:persistReducer(persistConfig,AuthReducer),
});

export default rootReducer;
