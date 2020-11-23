import React, { ReactElement } from "react";
import { Container, Paper, Typography, Button } from "@material-ui/core";

interface Props {
  questionNumber: number;
  options: string[];
  question: string;
  selectedOption: number | null;
  attemptQuestion: (selectedOption: number) => void;
  onNextQuestion: () => void;
  onPreviousQuestion: () => void;
  isLastQuestion: () => boolean;
  onFinish: () => void;
}

function QuestionAttempt(props: Props): ReactElement {
  const {
    question,
    questionNumber,
    attemptQuestion,
    options,
    selectedOption,
    onNextQuestion,
    onPreviousQuestion,
    onFinish,
    isLastQuestion
  } = props;

  return (
    <div>
      <Container>
        <Paper
          style={{
            padding: "10px",
            marginTop: "30px",
          }}
        >
          <Typography variant="h5" style={{ color: "white" ,marginBottom:'10px'}}>
            {questionNumber + 1}) {question}
          </Typography>
          {options.map((e, i) => (
            <Paper
              key={i}
              variant="outlined"
              style={{
                color: "white",
                marginTop: "10px",
                backgroundColor: i === selectedOption ? "#0069FF" : "#163855",
                padding: "10px",
              }}
              onClick={() => {
                attemptQuestion(i);
              }}
            >
              <Typography>{e}</Typography>
            </Paper>
          ))}
        </Paper>
        <div style={{ marginTop: "15px" }}>
        <Button size="large" style={{marginRight:'20px'}} variant="text" color="secondary" onClick={onPreviousQuestion}>
            Previous
          </Button>
          {isLastQuestion() ?
            <Button size="large" variant="outlined" color="secondary" onClick={onFinish}>
            Finish
          </Button>:<Button size="large" variant="contained" color="secondary" onClick={onNextQuestion}>
            Next
          </Button>}
        </div>
      </Container>
    </div>
  );
}

export default QuestionAttempt;
