import React from "react";
import App, { AppInitialProps, AppContext } from "next/app";
import { PersistGate } from 'redux-persist/integration/react'
import { ThemeProvider } from "@material-ui/core/styles";

import theme from "../theme";
import init from "../reduxStore";
import "../styles/globals.css";

const { wrapper, persistor } = init();

class MyApp extends App<AppInitialProps> {
  public static getInitialProps = async ({ Component, ctx }: AppContext) => {
    return {
      pageProps: {
        // Call page-level getInitialProps
        ...(Component.getInitialProps
          ? await Component.getInitialProps(ctx)
          : {}),
        // Some custom thing for all pages
        pathname: ctx.pathname,
      },
    };
  };

  public render() {
    const { Component, pageProps } = this.props;

    return (
      <React.Fragment>
        <PersistGate loading={"Loading.."} persistor={persistor}>
          <ThemeProvider theme={theme}>
            <Component {...pageProps} />
          </ThemeProvider>
        </PersistGate>
      </React.Fragment>
    );
  }
}

export default wrapper.withRedux(MyApp);
