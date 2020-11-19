import React, { Component } from "react";
import io from "socket.io-client";
import { Helmet } from "react-helmet";
import moment from "moment";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Container, Button } from "@material-ui/core";
import { RouteComponentProps, withRouter } from "react-router-dom";

import { NavBar } from "../../components";
import {
  CONNECT,
  DISCONNECT,
  FETCH_QUIZ_DETAILS,
  RECEIVED_QUIZ_DETAILS,
  UNAUTHORIZED,
} from "../../common/ws.event.types";
import { Typography } from "@material-ui/core";

type Props = RouteComponentProps;
interface State {
  socket: null | SocketIOClient.Socket;
  loading: boolean;
  title: string;
  questions?: { question: string; options: string[] }[];
  startDatetime: string;
  endDatetime: string;
  author: { name: string; photoURL: string };
}

const CustomTableCell = (props: any) => {
  return <TableCell {...props} style={{ borderBottom: "none" }} />;
};
class Quiz extends Component<Props, State> {
  state = {
    socket: null,
    startDatetime: "",
    endDatetime: "",
    loading: true,
    title: "",
    author: { name: "Unknown", photoURL: "" },
  };

  componentDidMount() {
    const socket = io("http://localhost:5000", {
      query: {
        token: localStorage.getItem("accessToken"),
      },
    });
    socket.on(CONNECT, () => {
      console.log("Connected");
    });
    socket.on(DISCONNECT, () => {
      console.log("Disconnected");
    });
    socket.on(UNAUTHORIZED, () => {
      this.props.history.push(`/auth?next=${window.location.href}`);
    });

    socket.emit(FETCH_QUIZ_DETAILS, {
      payload: (this.props.match.params as { id: string }).id,
    });

    socket.on(RECEIVED_QUIZ_DETAILS, (data: any) => {
      if (!data) {
        this.props.history.push("/not-found");
      } else {
        this.setState((s) => ({ ...s, ...data, loading: false }));
      }
      console.log(data);
    });
    this.setState({ socket });
  }

  canStartQuiz = (startDatetime: string, endDatetime: string): boolean => {
    if (
      Date.now() < new Date(startDatetime).getTime() ||
      Date.now() > new Date(endDatetime).getTime()
    ) {
      return false;
    }

    return true;
  };

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
          <div>
            <Helmet>
              <title>{this.state.title} | Quizz Now</title>
            </Helmet>

            <Container>
              <Typography
                variant="h1"
                style={{
                  marginTop: "30px",
                  color: "white",
                  marginBottom: "10px",
                }}
              >
                {this.state.title}
              </Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableBody>
                    <TableRow hover={true}>
                      <CustomTableCell component="th" scope="row">
                        <strong>Start</strong>
                      </CustomTableCell>
                      <CustomTableCell align="right">
                        {new Date(
                          (this.state.startDatetime as unknown) as string
                        ).toLocaleString()}{" "}
                        (
                        {moment(
                          (this.state.startDatetime as unknown) as string
                        ).fromNow()}
                        )
                      </CustomTableCell>
                    </TableRow>
                    <TableRow hover={true}>
                      <CustomTableCell
                        className="bold"
                        component="th"
                        scope="row"
                      >
                        <strong>End</strong>
                      </CustomTableCell>
                      <CustomTableCell align="right">
                        {new Date(
                          (this.state.endDatetime as unknown) as string
                        ).toLocaleString()}{" "}
                        (
                        {moment(
                          (this.state.endDatetime as unknown) as string
                        ).fromNow()}
                        )
                      </CustomTableCell>
                    </TableRow>
                    {(this.state as any).questions ? (
                      <TableRow hover={true}>
                        <CustomTableCell
                          className="bold"
                          component="th"
                          scope="row"
                        >
                          <strong>Total Questions</strong>
                        </CustomTableCell>
                        <CustomTableCell align="right">
                          {(this.state as any).questions?.length}
                        </CustomTableCell>
                      </TableRow>
                    ) : null}
                    <TableRow hover={true}>
                      <CustomTableCell
                        className="bold"
                        component="th"
                        scope="row"
                      >
                        <strong>Created By</strong>
                      </CustomTableCell>
                      <CustomTableCell align="right">
                        {this.state.author.name}
                      </CustomTableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              {this.canStartQuiz(
                this.state.startDatetime,
                this.state.endDatetime
              ) && (this.state as any).questions ? (
                <Button
                  variant="contained"
                  style={{ marginTop: "20px" }}
                  color="primary"
                  size="large"
                >
                  Start Quiz
                </Button>
              ) : null}
            </Container>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Quiz);
