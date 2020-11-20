import React, { Component } from "react";
import { Typography } from "@material-ui/core";
import { RouteComponentProps, withRouter } from "react-router-dom";

import { NavBar } from "../../components";
import { QuizInfo } from "./components";
import * as ws from "./ws";

type Props = RouteComponentProps;
interface State {
  socket: null | SocketIOClient.Socket;
  loading: boolean;
  title: string;
  startDatetime: string;
  endDatetime: string;
  createdBy: { name: string; photoURL: string };
  canAttemptQuiz: boolean;
  totalQuestions: number;
}

class Quiz extends Component<Props, State> {
  state = {
    socket: null,
    startDatetime: "",
    endDatetime: "",
    loading: true,
    title: "",
    createdBy: { name: "Unknown", photoURL: "" },
    canAttemptQuiz: false,
    totalQuestions: 0,
  };

  componentDidMount() {
    let socket = ws.setUp();
    socket = ws.onUnAuthorized(socket, () => {
      this.props.history.push(`/auth?next=${window.location.href}`);
    });

    socket = ws.fetchQuizzDetails(
      socket,
      (this.props.match.params as { id: string }).id,
      (data: { payload: any }) => {
        if (!data.payload) {
          this.props.history.push("/not-found");
        } else {
          this.setState((s) => ({ ...s, ...data.payload, loading: false }));
        }
      }
    );

    this.setState({ socket });
  }

  render() {
    return (
      <div>
        <NavBar />
        {this.state.loading ? (
          <Typography
            style={{ color: "white", width: "100%", textAlign: "center" }}
          >
            Loading...
          </Typography>
        ) : (
          <QuizInfo
            title={this.state.title}
            createdBy={this.state.createdBy.name}
            canAttemptQuizz={this.state.canAttemptQuiz}
            startDatetime={this.state.startDatetime}
            endDatetime={this.state.endDatetime}
            totalQuestions={this.state.totalQuestions}
          />
        )}
      </div>
    );
  }
}

export default withRouter(Quiz);
