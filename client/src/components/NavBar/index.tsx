import React, { ReactElement } from "react";
import {
  AppBar,
  Toolbar,
  useTheme,
  Typography,
  Grid,
  Button,
  IconButton,
  SvgIcon,
} from "@material-ui/core";
import { connect, ConnectedProps } from "react-redux";
import { RouteComponentProps, withRouter, Link } from "react-router-dom";

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
              component={Link}
              to="/"
              variant="h5"
              style={{
                color: theme.palette.secondary.main,
                fontFamily: "'Fredoka One', cursive",
                textDecoration: "none",
              }}
            >
              Quiz Now
            </Typography>
            <div>
              {props.children}
              <IconButton
                color="secondary"
                style={{ marginRight: "20px" }}
                component={Link}
                to="/"
              >
                <SvgIcon>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                  </svg>
                </SvgIcon>
              </IconButton>
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
