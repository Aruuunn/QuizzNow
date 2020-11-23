import React, { Component } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";

import { NavBar, LoadingIndicator } from "../../components";
import { QuizInfo } from "./components";
import * as ws from "./ws";
import QuestionAttempt from "./components/QuestionAttempt";
import { Socket } from "socket.io-client";

type Props = RouteComponentProps;
interface State {
  loading: boolean;
  title: string;
  startDatetime: string;
  endDatetime: string;
  createdBy: { name: string; photoURL: string };
  canAttemptQuiz: boolean;
  totalQuestions: number;
  isFinished: boolean;
  questionNumber: number;
  isStarted: boolean;
  hasAttempted: boolean;
  questions: {
    [key: number]: {
      selectedOption: number | null;
      question: string;
      options: string[];
      id: string;
    };
  };
  attemptId: string;
}

class Quiz extends Component<Props, State> {
  socket: SocketIOClient.Socket = ws.setUp();

  state: State = {
    startDatetime: "",
    endDatetime: "",
    loading: true,
    title: "",
    createdBy: { name: "Unknown", photoURL: "" },
    canAttemptQuiz: false,
    totalQuestions: 0,
    isFinished: false,
    questionNumber: 0,
    isStarted: false,
    hasAttempted: false,
    questions: {},
    attemptId: "",
  };

  componentDidMount() {
    this.socket = ws.onUnAuthorized(this.socket, () => {
      this.props.history.push(`/auth?next=${window.location.href}`);
    });

    this.socket = ws.fetchQuizzDetails(
      this.socket,
      (this.props.match.params as { id: string }).id,
      (data: { payload: any }) => {
        if (!data.payload) {
          this.props.history.push("/not-found");
        } else {
          this.setState((s) => ({ ...s, ...data.payload, loading: false }));
        }
      }
    );
  }

  onQuizzStart = () => {
    this.setState({ loading: true });
    this.socket = ws.startQuizz(
      this.socket,
      (this.props.match.params as { id: string }).id,
      (data) => {
        this.setState({
          attemptId: data.payload.attemptId,
          loading: false,
          isStarted: true,
        });
      }
    );
  };

  onNextQuestion = () => {
    if (this.state.questionNumber >= this.state.totalQuestions) {
      return;
    }
    this.setState((s) => ({ questionNumber: s.questionNumber + 1 }));
  };
  onPreviousQuestion = () => {
    if (this.state.questionNumber === 0) {
      return;
    }
    this.setState((s) => ({ questionNumber: s.questionNumber - 1 }));
  };

  componentDidUpdate() {
    if (
      this.state.isStarted &&
      !this.state.questions[this.state.questionNumber]
    ) {
      this.socket = ws.fetchQuestion(
        this.socket,
        this.state.attemptId,
        this.state.questionNumber,
        (data) => {
          console.log(data);
          this.setState((s) => ({
            questions: {
              ...s.questions,
              [this.state.questionNumber]: {
                ...data.payload.question,
                selectedOption: data.payload.selectedOption ?? null,
              },
            },
          }));
        }
      );
    }
  }

  attemptQuestion = (selectedOption: number, questionId: string) => {
    this.socket = ws.attemptQuestion(
      this.socket,
      selectedOption,
      questionId,
      this.state.attemptId
    );
    this.setSelectedOption(selectedOption, this.state.questionNumber);
  };

  setSelectedOption = (selectedOption: number, questionNumber: number) => {
    this.setState((s) => ({
      ...s,
      questions: {
        ...s.questions,
        [questionNumber]: { ...s.questions[questionNumber], selectedOption },
      },
    }));
  };

  getQuestion = () => this.state.questions[this.state.questionNumber];

  render() {
    console.log(this.state);
    return (
      <div>
        <NavBar />
        {this.state.loading ? (
          <LoadingIndicator />
        ) : !this.state.isStarted && !this.state.hasAttempted ? (
          <QuizInfo
            title={this.state.title}
            createdBy={this.state.createdBy.name}
            canAttemptQuizz={this.state.canAttemptQuiz}
            startDatetime={this.state.startDatetime}
            endDatetime={this.state.endDatetime}
            totalQuestions={this.state.totalQuestions}
            onQuizzStart={this.onQuizzStart}
          />
        ) : this.getQuestion() &&
          this.getQuestion().question &&
          this.state.isStarted ? (
          <QuestionAttempt
            question={this.getQuestion().question}
            options={this.getQuestion().options}
            selectedOption={this.getQuestion().selectedOption}
            questionNumber={this.state.questionNumber}
            onNextQuestion={this.onNextQuestion}
            onPreviousQuestion={this.onPreviousQuestion}
            attemptQuestion={(selectedOption: number) =>
              this.attemptQuestion(selectedOption, this.getQuestion().id)
            }
          />
        ) : null}
      </div>
    );
  }
}

export default withRouter(Quiz);
