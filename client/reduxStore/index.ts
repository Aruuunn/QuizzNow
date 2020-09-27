import { applyMiddleware, createStore } from "redux";
import Thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { Context, MakeStore, createWrapper } from "next-redux-wrapper";

import { rootReducer, RootState } from "./reducers/index";
import { persistStore } from "redux-persist";

const middlewares = [Thunk];


export const  init = () => {

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middlewares)));

const makeStore: MakeStore<RootState> = (ctx: Context) => store;

const persistor = persistStore(store);

const wrapper = createWrapper<RootState>(makeStore, { debug: true });

return {wrapper,persistor};

}


export default init;
