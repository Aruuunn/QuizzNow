import React, { useState } from "react";
import MomentUtils from "@date-io/moment";
import {
  Grid,
  TextField,
  Switch,
  FormControlLabel,
  Container,
  Paper,
  Typography,
  Button,
  SvgIcon,
} from "@material-ui/core";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

import { NavBar } from "../../components";

interface State {
  title: string;
  activeNow: boolean;
  startDatetime?: Date;
  endDatetime?: Date;
}

const NewQuiz = () => {
  const initialNewQuestionState = {
    question: "",
    answers: [],
    correctAnswer: null,
    addOptionMode: false,
  };
  const [open, setOpen] = useState(true);

  const [newQuestionState, setNewQuestionState] = useState<{
    question: string;
    answers: string[];
    correctAnswer: number | null;
    addOptionMode: boolean;
  }>(initialNewQuestionState);

  const [state, setState] = useState<State>({
    title: "",
    activeNow: false,
  });

  const resetNewQuestionState = () =>
    setNewQuestionState(initialNewQuestionState);

  return (
    <div>
      <NavBar />
      <Container>
        {" "}
        <Grid
          container
          alignItems="flex-start"
          justify="space-around"
          direction="column"
          style={{ marginTop: "30px", marginBottom: "30px" }}
        >
          {" "}
          <TextField
            placeholder="Title"
            required
            inputProps={{
              style: { color: "white", padding: "20px", fontSize: "26px" },
            }}
            color="secondary"
            style={{ marginBottom: "20px" }}
            variant="filled"
          />
          <FormControlLabel
            labelPlacement="start"
            label="Active now"
            style={{ color: "#7a8a9c", display: "block", marginBottom: "20px" }}
            control={
              <Switch
                value={state.activeNow}
                onChange={(e) =>
                  setState((s) => ({ ...s, activeNow: e.target.checked }))
                }
              />
            }
          />
          <Grid container alignItems="center">
            <MuiPickersUtilsProvider utils={MomentUtils}>
              {!state.activeNow ? (
                <FormControlLabel
                  label="Start Date time "
                  style={{
                    color: "#7a8a9c",
                    marginRight: "20px",
                  }}
                  labelPlacement="start"
                  control={
                    <DateTimePicker
                      value={state.startDatetime}
                      onChange={(e) =>
                        setState((s) => ({ ...s, startDatetime: e?.toDate() }))
                      }
                      color="secondary"
                      inputProps={{
                        style: { color: "white", marginLeft: "10px" },
                      }}
                    />
                  }
                />
              ) : null}
              <FormControlLabel
                label="End Date time "
                labelPlacement="start"
                style={{ color: "#7a8a9c", marginTop: "10px" }}
                control={
                  <DateTimePicker
                    color="secondary"
                    inputProps={{
                      style: { color: "white", marginLeft: "10px" },
                    }}
                    value={state.endDatetime}
                    onChange={(e) =>
                      setState((s) => ({ ...s, endDatetime: e?.toDate() }))
                    }
                  />
                }
              />
            </MuiPickersUtilsProvider>{" "}
          </Grid>
        </Grid>
        {!open ? (
          <Button
            onClick={() => {
              resetNewQuestionState();
              setOpen(true);
            }}
            color="primary"
            endIcon={
              <SvgIcon>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 0 24 24"
                  width="24"
                >
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                </svg>
              </SvgIcon>
            }
          >
            New Question
          </Button>
        ) : null}
        {open ? (
          <Paper style={{ padding: "10px", marginBottom: "10px" }}>
            <TextField
              value={newQuestionState.question}
              multiline
              variant="filled"
              placeholder="Question Title"
              required
              fullWidth
              onChange={(e) =>
                setNewQuestionState((s) => ({ ...s, question: e.target.value }))
              }
              inputProps={{
                style: { color: "white", padding: "10px", fontSize: "23px" },
              }}
            />
            {newQuestionState.addOptionMode ? (
              <Paper
                variant="outlined"
                style={{
                  color: "white",
                  marginTop: "20px",
                  backgroundColor: "#0069FF",
                  padding: "10px",
                }}
              >
                <Typography>Option1</Typography>
              </Paper>
            ) : null}
            <Grid container justify="space-between">
              <div>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => setNewQuestionState(s => ({...s,addOptionMode:true}))}
                  style={{ marginTop: "10px" }}
                >
                  Add Option
                </Button>
              </div>
              <div>
                <Button
                  onClick={() => {
                    setOpen(false);
                  }}
                  color="secondary"
                  style={{ marginTop: "10px" }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  style={{ marginTop: "10px", marginLeft: "10px" }}
                >
                  Add
                </Button>
              </div>
            </Grid>
          </Paper>
        ) : null}
        <Paper style={{ padding: "10px" }}>
          <Typography variant="h5" style={{ color: "white" }}>
            Example Q
          </Typography>
          <Paper
            variant="outlined"
            style={{
              color: "white",
              marginTop: "20px",
              backgroundColor: "#0069FF",
              padding: "10px",
            }}
          >
            <Typography>Option1</Typography>
          </Paper>
          <Paper
            variant="outlined"
            style={{
              color: "white",
              marginTop: "10px",
              padding: "10px",
              backgroundColor: "#163855",
            }}
          >
            <Typography>Option2</Typography>
          </Paper>
        </Paper>
      </Container>
    </div>
  );
};

export default NewQuiz;
