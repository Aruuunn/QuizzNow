import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider } from "@material-ui/core/styles";

import theme from "./theme";
import init from "./reduxStore";
import { BrowserRouter } from "react-router-dom";
import Routes from './Routes';


const { store, persistor } = init();

const MyApp = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Provider store={store}>
          <PersistGate loading={"Loading.."} persistor={persistor}>
            <ThemeProvider theme={theme}>
              <Routes/>
            </ThemeProvider>
          </PersistGate>
        </Provider>
      </BrowserRouter>
    </React.Fragment>
  );
};

export default MyApp;
