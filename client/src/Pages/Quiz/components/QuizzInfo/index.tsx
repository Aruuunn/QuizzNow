import React, { ReactElement, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { connect, ConnectedProps } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import moment from "moment";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Container, Button, Typography } from "@material-ui/core";

import { fetchQuizzDetails } from "../../ws";
import {
  QuizzActionTypes,
  RootState,
  QuizzDetailsType,
} from "../../../../reduxStore";
import { LoadingIndicator, NavBar } from "../../../../components";
import { startQuizz } from "../../ws";

const CustomTableCell = (props: any) => {
  return <TableCell {...props} style={{ borderBottom: "none" }} />;
};

const mapStateToProps = (state: RootState) => ({
  quizz: state.quizz,
});
const mapDispatchToProps = {
  saveQuizzDetails: (payload: QuizzDetailsType) => ({
    type: QuizzActionTypes.SAVE_QUIZ_DETAILS,
    payload,
  }),
  setSocket: (socket: SocketIOClient.Socket) => ({
    type: QuizzActionTypes.SET_SOCKET,
    payload: socket,
  }),
  setAttemptId: (id: string) => ({
    type: QuizzActionTypes.SAVE_ATTEMPT_ID,
    payload: id,
  }),
};
const connector = connect(mapStateToProps, mapDispatchToProps);
type reduxProps = ConnectedProps<typeof connector>;

type Props = reduxProps;

function QuizInfo(props: Props): ReactElement {
  const { quizzId } = useParams() as { quizzId: string };
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const {
    quizz: { socket },
    saveQuizzDetails,
    setSocket,
    setAttemptId,
  } = props;

  useEffect(() => {
    if (socket) {
      const modifiedSocket = fetchQuizzDetails(
        socket as SocketIOClient.Socket,
        quizzId,
        (data) => {
          saveQuizzDetails(data.payload);
          setLoading(false);
        }
      );
      setSocket(modifiedSocket);
    }
  }, [socket]);

  const quizz = props.quizz.quizzes[quizzId];

  return (
    <div>
      {loading || !quizz ? (
        <LoadingIndicator />
      ) : (
        <div>
          <Helmet>
            <title>{quizz.quizzTitle} | Quizz Now</title>
          </Helmet>
          <NavBar />
          <Container>
            <Typography
              variant="h1"
              style={{
                marginTop: "30px",
                color: "white",
                marginBottom: "10px",
              }}
            >
              {quizz.quizzTitle}
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
                        (quizz.startDatetime as unknown) as string
                      ).toLocaleString()}{" "}
                      (
                      {moment(
                        (quizz.startDatetime as unknown) as string
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
                        (quizz.endDatetime as unknown) as string
                      ).toLocaleString()}{" "}
                      (
                      {moment(
                        (quizz.endDatetime as unknown) as string
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
                      <strong>Total Questions</strong>
                    </CustomTableCell>
                    <CustomTableCell align="right">
                      {quizz.totalNumberOfQuestions}
                    </CustomTableCell>
                  </TableRow>

                  <TableRow hover={true}>
                    <CustomTableCell
                      className="bold"
                      component="th"
                      scope="row"
                    >
                      <strong>Created By</strong>
                    </CustomTableCell>
                    <CustomTableCell align="right">
                      {quizz.createdBy.userName || "Unknown"}
                    </CustomTableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            {quizz.canAttemptQuizz ? (
              <Button
                variant="contained"
                style={{ marginTop: "20px" }}
                color="primary"
                size="large"
                onClick={() => {
                  if (quizz.quizzAttemptId) {
                    history.push(`/attempt/${quizzId}/q/0`);
                  } else {
                    setLoading(true);
                    const modifiedSocket = startQuizz(
                      socket as SocketIOClient.Socket,
                      quizzId,
                      ({ payload: { attemptId } }) => {
                        setAttemptId(attemptId);
                        history.push(`/attempt/${quizzId}/q/0`);
                      }
                    );
                    setSocket(modifiedSocket);
                  }
                }}
              >
                {quizz.isQuizzStarted ? "Resume Quizz" : "Start Quizz"}
              </Button>
            ) : null}
          </Container>
        </div>
      )}
    </div>
  );
}

export default connector(QuizInfo);
