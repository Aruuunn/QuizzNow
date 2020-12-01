import React, { ReactElement, useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { Container, Paper, Typography, Button } from "@material-ui/core";

import { fetchQuestion, attemptQuestion } from "../../ws";
import {
  QuizzActionTypes,
  RootState,
  QuizzDetailsType,
  QuestionDetails,
} from "../../../../reduxStore";
import { LoadingIndicator, NavBar } from "../../../../components";

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
  cacheQuestion: (
    data: { questionNumber: number; quizzId: string } & QuestionDetails
  ) => ({ type: QuizzActionTypes.CACHE_QUESTION, payload: data }),

  setSelectedOption: (data: {
    quizzId: string;
    questionNumber: number;
    selectedOption: string;
  }) => ({ type: QuizzActionTypes.SELECT_QUESTION_OPTION, payload: data }),
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type reduxProps = ConnectedProps<typeof connector>;
type Props = reduxProps;

function QuestionAttempt(props: Props): ReactElement {
  const { quizzId, qno } = useParams() as { quizzId: string; qno: string };
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  let questionNumber: number = 0;

  try {
    questionNumber = parseInt(qno);
  } catch (_) {
    history.push("/not-found");
  }

  const quizz = props.quizz.quizzes[quizzId];

  useEffect(() => {
    if (
      !quizz?.cacheQuestion[questionNumber] &&
      quizz?.quizzAttemptId &&
      !loading
    ) {
      setLoading(true);
      fetchQuestion(
        props.quizz.socket as SocketIOClient.Socket,
        quizz?.quizzAttemptId as string,
        questionNumber,
        (data) => {
          props.cacheQuestion({ ...data.payload, questionNumber, quizzId });
          setLoading(false);
        }
      );
    }
  }, []);

  if (!quizz) {
    history.push(`/attempt/${quizzId}`);
  }

  if (!quizz?.isQuizzStarted || !quizz?.quizzAttemptId) {
    history.push(`/attempt/${quizzId}`);
  }

  const question = quizz?.cacheQuestion[questionNumber]?.question;

  const selectOption = (selectedOption: string) => {
    const socket = props.quizz?.socket;
    if (socket && question && quizz?.quizzAttemptId) {
      attemptQuestion(
        socket as SocketIOClient.Socket,
        selectedOption,
        question.questionId,
        quizz?.quizzAttemptId
      );
      props.setSocket(socket);
      props.setSelectedOption({ quizzId, questionNumber, selectedOption });
    } else {
      console.error("Unable to Select Option");
    }
  };

  if (quizz?.cacheQuestion[questionNumber] && loading) {
    setLoading(false);
  }

  if (loading || !question) {
    return (
      <div>
        <NavBar />
        <LoadingIndicator />
      </div>
    );
  }

  return (
    <div>
      <NavBar />
      <Container>
        <Paper
          style={{
            padding: "10px",
            marginTop: "30px",
          }}
        >
          <Typography
            variant="h5"
            style={{ color: "white", marginBottom: "10px" }}
          >
            {questionNumber + 1}) {question.questionTitle}
          </Typography>
          {question.multipleChoices.map((e, i) => (
            <Paper
              key={i}
              variant="outlined"
              style={{
                color: "white",
                marginTop: "10px",
                backgroundColor:
                  e === quizz.cacheQuestion[questionNumber].selectedOption
                    ? "#0069FF"
                    : "#163855",
                padding: "10px",
              }}
              onClick={() => {
                selectOption(e);
              }}
            >
              <Typography>{e}</Typography>
            </Paper>
          ))}
        </Paper>
        <div style={{ marginTop: "15px" }}>
          <Button
            size="large"
            style={{ marginRight: "20px" }}
            variant="text"
            color="secondary"
          >
            Previous
          </Button>
          {Object.keys(quizz.cacheQuestion).length - 1 === questionNumber ? (
            <Button size="large" variant="outlined" color="secondary">
              Finish
            </Button>
          ) : (
            <Button size="large" variant="contained" color="secondary">
              Next
            </Button>
          )}
        </div>
      </Container>
    </div>
  );
}

export default connector(QuestionAttempt);
