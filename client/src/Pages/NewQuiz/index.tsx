import React, { useState , useEffect } from "react";
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
  IconButton,
} from "@material-ui/core";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import MuiAlert from "@material-ui/lab/Alert";
import { useHistory,useParams  } from "react-router-dom";

import { NavBar } from "../../components";
import axios from "../../common/axios";
import { ACCESS_TOKEN } from "../../common/constants";

interface Question {
  questionId?: string;
  questionTitle: string;
  multipleChoices: string[];
  correctAnswer: string | null;
}
interface State {
  quizzTitle: string;
  activeNow: boolean;
  startDatetime: Date;
  endDatetime: Date;
  questions: Question[];
}

const NewQuiz = (props: { editQuizz: boolean }) => {
  const initialNewQuestionState = {
    questionTitle: "",
    multipleChoices: [],
    correctAnswer: null,
    addOptionMode: false,
    input: "",
  };

  const history = useHistory();
  const { quizzId } = useParams() as {quizzId:string};
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorDialogState, setErrorDialogState] = useState({
    open: false,
    title: "",
  });
  const [newQuestionState, setNewQuestionState] = useState<
    Question & { addOptionMode: boolean; input: string }
    >(initialNewQuestionState);

  const [state, setState] = useState<State>({
    quizzTitle: "",
    activeNow: false,
    questions: [],
    startDatetime: new Date(Date.now() + 600000),
    endDatetime: new Date(Date.now() + 2400000),
  });

  useEffect(() => {

    if (props.editQuizz) {
      populateData();
    }
   
  }, [props.editQuizz])

  const Alert = (title: string) => {
    setErrorDialogState((s) => ({ ...s, open: true, title }));
    setTimeout(() => {
      setErrorDialogState((s) => ({ ...s, open: false, title: "" }));
    }, 5000);
  };

  const isOptionValid = () =>
    newQuestionState.input.trim() !== "" &&
    newQuestionState.multipleChoices.reduce((t, c) => {
      if (c.trim() === newQuestionState.input.trim()) {
        return false;
      } else return t;
    }, true);

  const resetNewQuestionState = () =>
    setNewQuestionState(initialNewQuestionState);

  const isNewQuestionValid = () =>
    newQuestionState.correctAnswer !== null &&
    newQuestionState.multipleChoices.length >= 2 &&
    newQuestionState.questionTitle.trim() !== "";

  const addNewQuestion = () => {
    if (
      newQuestionState.correctAnswer === null ||
      newQuestionState.multipleChoices.reduce((t: boolean, c) => {
        if (c === newQuestionState.correctAnswer) {
          return false;
        } else {
          return t;
        }
      }, true)
    ) {
      Alert(
        "Provide a Correct Answer for the Question. Click a Option to make it the correct answer!"
      );
    } else if (newQuestionState.multipleChoices.length < 2) {
      Alert("Provide atleast Two Options for the Question");
    } else if (newQuestionState.questionTitle.trim() === "") {
      Alert("Provide a Valid Question!");
    } else if (isNewQuestionValid()) {
      setState((s) => ({
        ...s,
        questions: [
          ...s.questions,
          {
            questionTitle: newQuestionState.questionTitle,
            multipleChoices: newQuestionState.multipleChoices,
            correctAnswer: newQuestionState.correctAnswer,
          },
        ],
      }));
      resetNewQuestionState();
    }
  };



  const populateData = async () => {
    if (!props.editQuizz)
      return;
    
    setLoading(true);
    try { 
      const res =  await axios.get(`/quizz/${quizzId}/data`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
        }
      })
      setState(s => ({ ...s, ...res.data,startDatetime:new Date(res.data.startDatetime), endDatetime:new Date(res.data.endDatetime) }));
    } catch (e) {
      console.error(e);
    }
    finally {
      setLoading(false);
    }
  }

  const handleFinish = async () => {
    if (state.quizzTitle.trim() === "") {
      Alert("Quiz Title Should not be Empty");
    } else if (state.questions.length === 0) {
      Alert("Create Atleast one question");
    } else if (
      state.endDatetime.getTime() -
        (state.activeNow ? Date.now() : state.startDatetime.getTime()) <
      0
    ) {
      Alert("End Datetime has to be after Start Datetime");
    } else if (
      !state.activeNow &&
      state.startDatetime.getTime() - Date.now() < 0
    ) {
      Alert("Start Datetime has to be after current Date time");
    } else {
      setLoading(true);
      try {
        const data = {
          quizzTitle: state.quizzTitle,
          startDatetime: state.activeNow ? new Date() : state.startDatetime,
          endDatetime: state.endDatetime,
          questions: state.questions,
        };
        if (!props.editQuizz) {
          await axios.post("/quizz/new", data, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
            },
          });
        } else {
          await axios.patch(`/quizz/${quizzId}`, data, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
            },
          })
        }
       
        setTimeout(() => {
          history.push("/");
        }, 0);
      } catch (e) {
        Alert("Something went Wrong. Try again");
        console.log("ERR", e);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div>
      {errorDialogState.open ? (
        <Grid
          container
          style={{ position: "fixed", width: "100%", top: "10px", left: 0 }}
          justify="center"
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            onClose={() => {
              setErrorDialogState((s) => ({ ...s, open: false }));
            }}
            severity="error"
          >
            {errorDialogState.title}
          </MuiAlert>
        </Grid>
      ) : null}

      <NavBar>
        <Button
          variant="contained"
          color="primary"
          disabled={loading}
          onClick={() => handleFinish()}
          style={{ marginRight: "10px" }}
        >
          Finish
        </Button>
      </NavBar>

      <Container>
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
            disabled={loading}
            inputProps={{
              style: { color: "white", padding: "20px", fontSize: "26px" },
            }}
            value={state.quizzTitle}
            onChange={(e) => {
              e.persist();
              setState((s) => ({ ...s, quizzTitle: e.target.value }));
            }}
            color="secondary"
            style={{ marginBottom: "20px" }}
            variant="filled"
          />
          <FormControlLabel
            labelPlacement="start"
            label="Active now"
            disabled={loading}
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
                  disabled={loading}
                  style={{
                    color: "#7a8a9c",
                    marginRight: "20px",
                  }}
                  labelPlacement="start"
                  control={
                    <DateTimePicker
                      value={state.startDatetime}
                      onChange={(e) => {
                        if (e) {
                          setState((s) => ({
                            ...s,
                            startDatetime: e.toDate(),
                          }));
                        }
                      }}
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
                disabled={loading}
                labelPlacement="start"
                style={{ color: "#7a8a9c", marginTop: "10px" }}
                control={
                  <DateTimePicker
                    color="secondary"
                    inputProps={{
                      style: { color: "white", marginLeft: "10px" },
                    }}
                    value={state.endDatetime}
                    onChange={(e) => {
                      if (e) {
                        setState((s) => ({ ...s, endDatetime: e.toDate() }));
                      }
                    }}
                  />
                }
              />
            </MuiPickersUtilsProvider>{" "}
          </Grid>
        </Grid>
        {!open ? (
          <Button
            disabled={loading}
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
          <Paper style={{ padding: "10px", marginBottom: "30px" }}>
            <TextField
              value={newQuestionState.questionTitle}
              multiline
              variant="filled"
              placeholder="Question Title"
              required
              fullWidth
              onChange={(e) =>
                setNewQuestionState((s) => ({
                  ...s,
                  questionTitle: e.target.value,
                }))
              }
              inputProps={{
                style: { color: "white", padding: "10px", fontSize: "23px" },
              }}
            />

            {newQuestionState.multipleChoices.map((o, i) => (
              <Paper
                key={i}
                onClick={() => {
                  if (!loading) {
                    setNewQuestionState((s) => ({ ...s, correctAnswer: o }));
                  }
                }}
                variant="outlined"
                style={{
                  color: "white",
                  marginTop: "10px",
                  backgroundColor:
                    o === newQuestionState.correctAnswer
                      ? "#0069FF"
                      : "#163855",
                  padding: "10px",
                }}
              >
                <Grid container justify="space-between">
                  <Typography>{o}</Typography>
                  <div>
                    <IconButton
                      disabled={loading}
                      size="small"
                      onClick={() => {
                        setNewQuestionState((s) => ({
                          ...s,
                          correctAnswer: null,
                          multipleChoices: s.multipleChoices.filter(
                            (e) => e !== o
                          ),
                        }));
                      }}
                    >
                      <SvgIcon fontSize="small">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="24"
                          viewBox="0 0 24 24"
                          width="24"
                        >
                          <path d="M0 0h24v24H0V0z" fill="none" />
                          <path
                            d="M6 21h12V7H6v14zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
                            fill="#9C4668"
                          />
                        </svg>
                      </SvgIcon>
                    </IconButton>
                  </div>
                </Grid>
              </Paper>
            ))}
            {newQuestionState.addOptionMode ? (
              <Paper
                variant="outlined"
                style={{
                  color: "white",
                  marginTop: "20px",
                  padding: "10px",
                }}
              >
                <TextField
                  disabled={loading}
                  fullWidth
                  multiline
                  value={newQuestionState.input}
                  onChange={(e) =>
                    setNewQuestionState((s) => ({
                      ...s,
                      input: e.target.value,
                    }))
                  }
                  variant="filled"
                  color="secondary"
                  inputProps={{
                    style: {
                      color: "white",
                      padding: "5px",
                      fontSize: "20px",
                      marginLeft: "10px",
                    },
                  }}
                  placeholder="New Option"
                />
              </Paper>
            ) : null}
            <Grid container justify="space-between">
              <div>
                {newQuestionState.addOptionMode ? (
                  <Button
                    disabled={loading}
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                      if (isOptionValid()) {
                        setNewQuestionState((s) => ({
                          ...s,
                          addOptionMode: false,
                          multipleChoices: [
                            ...s.multipleChoices,
                            s.input.trim(),
                          ],
                          input: "",
                        }));
                      }
                    }}
                    style={{ marginTop: "10px" }}
                  >
                    Add Option
                  </Button>
                ) : (
                  <Button
                    disabled={loading}
                    color="secondary"
                    onClick={() =>
                      setNewQuestionState((s) => ({
                        ...s,
                        addOptionMode: true,
                      }))
                    }
                    style={{ marginTop: "10px" }}
                  >
                    New Option
                  </Button>
                )}
              </div>
              <div>
                <Button
                  disabled={loading}
                  onClick={() => {
                    if (newQuestionState.addOptionMode) {
                      setNewQuestionState((s) => ({
                        ...s,
                        addOptionMode: false,
                      }));
                    } else setOpen(false);
                  }}
                  color="secondary"
                  style={{ marginTop: "10px" }}
                >
                  Cancel
                </Button>
                <Button
                  disabled={loading}
                  variant={
                    newQuestionState.addOptionMode ? "outlined" : "contained"
                  }
                  color="secondary"
                  onClick={() => {
                    addNewQuestion();
                  }}
                  style={{ marginTop: "10px", marginLeft: "10px" }}
                >
                  Add
                </Button>
              </div>
            </Grid>
          </Paper>
        ) : null}

        {state.questions.map((o, i) => (
          <Paper key={i} style={{ padding: "15px", marginTop: "10px" }}>
            <Grid container justify="space-between">
              {" "}
              <Typography variant="h5" style={{ color: "white" }}>
                {o.questionTitle}
              </Typography>
              <div>
                {" "}
                <IconButton
                  size="small"
                  onClick={() => {
                    setState((s) => ({
                      ...s,
                      questions: s.questions.filter((e) => e !== o),
                    }));
                    setOpen(true);
                    setNewQuestionState((s) => ({ ...s, ...o }));
                  }}
                >
                  <SvgIcon fontSize="small">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24"
                      viewBox="0 0 24 24"
                      width="24"
                    >
                      <path d="M0 0h24v24H0z" fill="none" />
                      <path
                        d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
                        fill="#0069FF"
                      />
                    </svg>
                  </SvgIcon>
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => {
                    setState((s) => ({
                      ...s,
                      questions: s.questions.filter((e) => e !== o),
                    }));
                  }}
                >
                  <SvgIcon fontSize="small">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24"
                      viewBox="0 0 24 24"
                      width="24"
                    >
                      <path d="M0 0h24v24H0V0z" fill="none" />
                      <path
                        d="M6 21h12V7H6v14zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
                        fill="#9C4668"
                      />
                    </svg>
                  </SvgIcon>
                </IconButton>
              </div>
            </Grid>

            {o.multipleChoices.map((e, i) => (
              <Paper
                key={i}
                variant="outlined"
                style={{
                  color: "white",
                  marginTop: "20px",
                  backgroundColor:
                    e === o.correctAnswer ? "#0069FF" : "#163855",
                  padding: "10px",
                }}
              >
                <Typography>{e}</Typography>
              </Paper>
            ))}
          </Paper>
        ))}
      </Container>
    </div>
  );
};

export default NewQuiz;
