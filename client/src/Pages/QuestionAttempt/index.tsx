import React, { ReactElement, useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { Container, Paper, Typography, Button } from "@material-ui/core";

import { fetchQuestion, attemptQuestion, finishQuizAttempt,setUp,onNotFound,onUnAuthorized } from "./ws";
import {
  QuizzActionTypes,
  RootState,
  QuizzDetailsType,
  QuestionDetails,
} from "../../reduxStore";
import { LoadingIndicator, NavBar } from "../../components";

const mapStateToProps = (state: RootState) => ({
  quizz: state.quizz,
});

const mapDispatchToProps = {
  saveQuizzDetails: (payload: QuizzDetailsType) => ({
    type: QuizzActionTypes.SAVE_QUIZ_DETAILS,
    payload,
  }),
  cacheQuestion: (
    data: { questionNumber: number; quizzId: string } & QuestionDetails
  ) => ({ type: QuizzActionTypes.CACHE_QUESTION, payload: data }),

  setSelectedOption: (data: {
    quizzId: string;
    questionNumber: number;
    selectedOption: string;
  }) => ({ type: QuizzActionTypes.SELECT_QUESTION_OPTION, payload: data }),
  finishAttempt: (quizzId: string) => ({
    payload: { quizzId },
    type: QuizzActionTypes.FINISH_ATTEMPT,
  }),
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type reduxProps = ConnectedProps<typeof connector>;
type Props = reduxProps;

function QuestionAttempt(props: Props): ReactElement {
  const { quizzId, qno } = useParams() as { quizzId: string; qno: string };

  const history = useHistory();
  const [socket, setSocket] = useState<null | SocketIOClient.Socket>(null);
  const [loading, setLoading] = useState(false);

  let questionNumber: number = 0;

  try {
    questionNumber = parseInt(qno);
  } catch (_) {
    history.push("/not-found");
  }

  const quizz = props.quizz.quizzes[quizzId];

  useEffect(() => {

    if (!socket) {
      const socket = setUp();
      onNotFound(socket, () => {
        socket.close();
        history.push('/not-found');
      });
      onUnAuthorized(socket, () => {
        socket.close();
        history.push('/auth');
      })
      setSocket(socket);
    }

    if (
      !quizz?.cacheQuestion[questionNumber] &&
      quizz?.quizzAttemptId &&
      !loading && socket
    ) {
      setLoading(true);
      fetchQuestion(
        socket as SocketIOClient.Socket,
        quizz?.quizzAttemptId as string,
        questionNumber,
        (data) => {
          props.cacheQuestion({ ...data.payload, questionNumber, quizzId });
          setLoading(false);
        }
      );
    }
  }, [quizzId, questionNumber,socket]);

  if (!quizz?.isQuizzStarted) {
    history.push(`/quizz/${quizzId}`);
  }

  const question = quizz?.cacheQuestion[questionNumber]?.question;

  const selectOption = (selectedOption: string) => {
    if (socket && question && quizz?.quizzAttemptId) {
      attemptQuestion(
        socket as SocketIOClient.Socket,
        selectedOption,
        question.questionId,
        quizz?.quizzAttemptId
      );

      props.setSelectedOption({ quizzId, questionNumber, selectedOption });
    } else {
      console.error("Unable to Select Option");
    }
  };

  const onFinish = () => {
    if (quizz?.quizzAttemptId) {
      finishQuizAttempt(
        socket as SocketIOClient.Socket,
        quizz?.quizzAttemptId as string,
        () => {
          socket?.close();
          setSocket(null);
          props.finishAttempt(quizzId);
          history.push(`/quizz/${quizzId}`);
        }
      );
    } else {
      console.error("unable to finish the Quizz");
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
            variant={questionNumber === 0 ? "contained" : "text"}
            color="secondary"
            disabled={questionNumber === 0}
            onClick={() => {
              if (questionNumber !== 0) {
                history.push(`/attempt/${quizzId}/q/${questionNumber - 1}`);
              }
            }}
          >
            Previous
          </Button>
          {quizz.totalNumberOfQuestions - 1 === questionNumber ? (
            <Button
              size="large"
              variant="outlined"
              onClick={() => onFinish()}
              color="secondary"
            >
              Finish
            </Button>
          ) : (
            <Button
              size="large"
              variant="contained"
              color="secondary"
              onClick={() => {
                history.push(`/attempt/${quizzId}/q/${questionNumber + 1}`);
              }}
            >
              Next
            </Button>
          )}
        </div>
      </Container>
    </div>
  );
}

export default connector(QuestionAttempt);
