import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider } from "@material-ui/core/styles";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

import theme from "./theme";
import init from "./reduxStore";
import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes";

const alertOptions = {
  position: positions.TOP_CENTER,
  timeout: 5000,
  offset: "30px",
  transition: transitions.FADE,
};

const { store, persistor } = init();

const MyApp = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Provider store={store}>
          <PersistGate loading={"Loading.."} persistor={persistor}>
            <ThemeProvider theme={theme}>
              <AlertProvider template={AlertTemplate} {...alertOptions}>
                <Routes />
              </AlertProvider>
            </ThemeProvider>
          </PersistGate>
        </Provider>
      </BrowserRouter>
    </React.Fragment>
  );
};

export default MyApp;
