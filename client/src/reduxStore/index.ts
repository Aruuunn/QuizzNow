import { applyMiddleware, createStore } from "redux";
import Thunk from "redux-thunk";
import { persistStore } from "redux-persist";
import { composeWithDevTools } from "redux-devtools-extension";

import { rootReducer } from "./reducers/index";
export * from "./types";
export * from "./reducers";

const middlewares = [Thunk];

export const init = () => {
  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middlewares))
  );

  const persistor = persistStore(store);

  return { store, persistor };
};

export default init;
