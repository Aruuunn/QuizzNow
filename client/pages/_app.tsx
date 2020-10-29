import React  from "react";
import { PersistGate } from 'redux-persist/integration/react'
import { ThemeProvider } from "@material-ui/core/styles";

import theme from "../theme";
import init from "../reduxStore";
import "../styles/globals.css";

const { wrapper, persistor } = init();


const  MyApp  = (props) =>  {
    const {Component,pageProps} = props;
   
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

MyApp.getInitialProps = async (props)  => {

  const {Component ,ctx} = props;

  const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

  return {pageProps};

}

export default wrapper.withRedux(MyApp);
