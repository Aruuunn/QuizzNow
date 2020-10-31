import React, { Component } from "react";
import { connect, ConnectedProps } from "react-redux";
import {
  Button,
  Card,
  Typography,
  CardContent,
  Container,
} from "@material-ui/core";
import { RouteComponentProps, withRouter } from "react-router-dom";

import axios from "../../common/axios";
import { NavBar } from "../../components";
import { RootState, Quiz } from "../../reduxStore/reducers";
import { AuthActionTypes } from "../../reduxStore/types";

export { default as AuthView } from "../Auth";

const mapStateToProps = (state: RootState) => state;
const mapDispatchToProps = {
  logout: () => ({ type: AuthActionTypes.LOG_OUT }),
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type reduxProps = ConnectedProps<typeof connector>;

type Props = reduxProps & RouteComponentProps;

interface State {
  limit: number;
  page: number;
  loading: boolean;
  quizzes: Quiz[];
}

class Home extends Component<Props, State> {
  state = {
    limit: 10,
    page: 1,
    quizzes: [],
    loading: false,
  };

  componentDidMount() {
    axios
      .get(`/quiz?limit=10&page=1`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        this.setState({ quizzes: res.data.items });
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          this.props.history.push("/auth");
        }
      });
  }

  render() {
    return (
      <div>
        <NavBar>
          {this.props.auth.accessToken !== null ? (
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => this.props.logout()}
            >
              Logout
            </Button>
          ) : (
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => {
                this.props.history.replace("/auth");
              }}
            >
              Login
            </Button>
          )}
        </NavBar>
        {this.state.loading ? "Loading..." : null}
        <Container style={{marginTop:'30px'}}>
          {(this.state.quizzes as Quiz[]).map((o, i) => (
            <Card key={i} style={{padding:'10px',color:'white',margin:'10px',maxWidth:'500px'}}>
              <CardContent>
                <Typography variant="h5">{o.title}</Typography>
              </CardContent>
            </Card>
          ))}
        </Container>
      </div>
    );
  }
}

export default withRouter(connector(Home));
