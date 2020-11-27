import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import { connect, ConnectedProps } from "react-redux";
import {
  Grid,
  Paper,
  Typography,
  Button,
  CircularProgress,
} from "@material-ui/core";
import queryString from "query-string";

import axios from "../../common/axios";
import { AuthActionTypes, UserActionTypes } from "../../reduxStore/types";
import { NavBar } from "../../components";
import { UserState } from "../../reduxStore";

const mapDispatchToProps = {
  saveAccessToken: (token: string) => ({
    type: AuthActionTypes.SAVE_ACCESS_TOKEN,
    payload: token,
  }),
  setUser: (user: UserState) => ({
    type: UserActionTypes.SET_USER,
    payload: user,
  }),
};

const connector = connect(null, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof connector>;
type Props = ReduxProps & RouteComponentProps;

interface State {
  loading: boolean;
}

class Auth extends Component<Props, State> {
  state = {
    loading: false,
  };

  handleSucces = (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    if (!(response as GoogleLoginResponse).tokenObj) {
      return;
    }
    const id_token = (response as GoogleLoginResponse).tokenObj.id_token;
    this.setState({ loading: true });
    axios
      .post("/auth/google", {
        id_token,
      })
      .then((res) => {
        this.props.setUser(res.data.user);
        this.props.saveAccessToken(res.data.accessToken);
        this.setState({ loading: false }, () => {
          const query = queryString.parse(this.props.location.search);
          if (query.next) {
            this.props.history.replace(query.next as string);
          } else {
            this.props.history.replace("/");
          }
        });
      });
  };

  render() {
    return (
      <div>
        <NavBar />
        <Grid
          justify="center"
          container
          style={{ position: "fixed", top: "40vh", zIndex: 1, width: "100%" }}
        >
          <Grid component={Paper} style={{ padding: "20px", width: "300px" }}>
            <Typography
              variant="h6"
              color="secondary"
              align="center"
              style={{ fontFamily: "'Fredoka One', cursive" }}
            >
              Continue with
            </Typography>

            <GoogleLogin
              onSuccess={this.handleSucces}
              clientId="325287323767-rg3is60mid0devd732iq975p5pqa1h8f.apps.googleusercontent.com"
              render={(renderProps) => (
                <Button
                  color="primary"
                  style={{ marginTop: "30px", width: "100%" }}
                  variant="contained"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled || this.state.loading}
                >
                  {this.state.loading ? (
                    <CircularProgress size={25} />
                  ) : (
                    "Google"
                  )}
                </Button>
              )}
              buttonText="Login"
              cookiePolicy={"single_host_origin"}
            />
          </Grid>
        </Grid>
        <img
          src="/images/wave.svg"
          style={{
            width: "100%",
            height: "auto",
            position: "fixed",
            bottom: 0,
            left: 0,
          }}
          alt=""
        />
      </div>
    );
  }
}

export default withRouter(connector(Auth));
