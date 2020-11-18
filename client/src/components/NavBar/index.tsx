import React, { ReactElement } from "react";
import {
  AppBar,
  Toolbar,
  useTheme,
  Typography,
  Grid,
  Button,
} from "@material-ui/core";
import { connect, ConnectedProps } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";

import { RootState, AuthActionTypes } from "../../reduxStore";

const mapStateToProps = (state: RootState) => state;
const mapDispatchToProps = {
  logout: () => ({ type: AuthActionTypes.LOG_OUT }),
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type reduxProps = ConnectedProps<typeof connector>;

type Props = reduxProps &
  RouteComponentProps & {
    children?: ReactElement | ReactElement[];
  };

const NavBar = (props: Props) => {
  const theme = useTheme();
  return (
    <div>
      <AppBar
        elevation={0}
        position="static"
        style={{
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Toolbar>
          <Grid container justify="space-between">
            <Typography
              variant="h5"
              style={{
                color: theme.palette.secondary.main,
                fontFamily: "'Fredoka One', cursive",
              }}
            >
              Quiz Now
            </Typography>
            <div>
              {props.children}
              {props.auth.accessToken !== null ? (
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => props.logout()}
                >
                  Logout
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => {
                    props.history.replace("/auth");
                  }}
                >
                  Login
                </Button>
              )}
            </div>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withRouter(connector(NavBar));
