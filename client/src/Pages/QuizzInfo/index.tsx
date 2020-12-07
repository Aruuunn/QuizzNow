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

import {
  QuizzActionTypes,
  RootState,
  QuizzDetailsType,
} from "../../reduxStore";
import axios from "../../common/axios";
import { LoadingIndicator, NavBar } from "../../components";
import { ACCESS_TOKEN } from "../../common/constants";


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
  setAttemptId: (id: string, quizzId: string) => ({
    type: QuizzActionTypes.SAVE_ATTEMPT_ID,
    payload: {
      attemptId: id,
      quizzId,
    },
  }),
};
const connector = connect(mapStateToProps, mapDispatchToProps);
type reduxProps = ConnectedProps<typeof connector>;

type Props = reduxProps;

function QuizInfo(props: Props): ReactElement {
  const { quizzId } = useParams() as { quizzId: string };
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const history = useHistory();
  const { saveQuizzDetails } = props;

  const onStart = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/quizz/${quizzId}/start`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
        },
      });
      const { attemptId } = res.data;
      props.setAttemptId(attemptId, quizzId);
      history.push(`/attempt/${quizzId}/q/0`);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const isResultsAvailable = (): boolean => {
    return (
      quizz?.isQuizzAttemptFinished &&
      Boolean(quizz?.endDatetime) &&
      new Date(quizz?.endDatetime).getTime() < Date.now()
    );
  };

  const quizz = props.quizz.quizzes[quizzId];

  useEffect(() => {
    if (!quizz) {
      axios
        .get(`/quizz/${quizzId}/details`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
          },
        })
        .then((res) => {
          const data = res.data;
          saveQuizzDetails(data);
          setLoading(false);
        })
        .catch((e) => {
          console.error(e);
          setLoading(false);
          setError("Something went wrong. Try again later");
        });
    }
  }, [quizzId]);

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
            {error ? (
              <Typography>{error}</Typography>
            ) : (
              <div>
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
                      onStart();
                    }}
                  >
                    {quizz.isQuizzStarted ? "Resume Quizz" : "Start Quizz"}
                  </Button>
                ) : null}
                {isResultsAvailable()?<Button
                    variant="contained"
                    style={{ marginTop: "20px" }}
                    color="primary"
                    size="large"
                    onClick={() => {
                      history.push(`/quizz/${quizzId}/results`)
                    }}
                  >
                    View Results
                  </Button> :null}
              </div>
            )}
          </Container>
        </div>
      )}
    </div>
  );
}

export default connector(QuizInfo);
