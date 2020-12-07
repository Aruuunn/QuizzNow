import React, { ReactElement, useState, useEffect } from "react";
import { Typography } from "@material-ui/core";
import { Helmet } from "react-helmet";
import { ConnectedProps, connect } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { useAlert } from "react-alert";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Container } from "@material-ui/core";

import axios from "../../common/axios";
import { NavBar, LoadingIndicator } from "../../components";
import { ACCESS_TOKEN } from "../../common/constants";
import { RootState } from "../../reduxStore";

const CustomTableCell = (props: any) => {
  return <TableCell {...props} style={{ borderBottom: "none" }} />;
};

const mapStateToProps = (state: RootState) => state.quizz;

const mapDispatchToProps = {};
const connector = connect(mapStateToProps, mapDispatchToProps);
type reduxProps = ConnectedProps<typeof connector>;

type Props = reduxProps;

type Result = null | {
  score: number;
  maxScore: number;
  questions: {
    optionChoosed: string;
    question: {
      questionTitle: string;
      correctAnswer: string;
      multipleChoices: string[];
    };
  }[];
};

function QuizzResults(props: Props): ReactElement {
  const { quizzId } = useParams() as { quizzId: string };
  const quizz = props.quizzes[quizzId];

  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState<Result>(null);
  const alert = useAlert();
  const history = useHistory();

  const isResultsAvailable = (): boolean => {
    return (
      quizz?.isQuizzAttemptFinished &&
      Boolean(quizz?.endDatetime) &&
      new Date(quizz?.endDatetime).getTime() < Date.now()
    );
  };

  const fetchResults = async () => {
    if (results) return;
    try {
      const res = await axios.get(`/quizz/${quizzId}/results`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
        },
      });

      setResults(res.data);
    } catch (e) {
      console.error(e);
      alert.error("Something went wrong. Try again Later");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!results && quizz) {
      fetchResults();
    }
  }, [quizz]);

  if (!quizz || !isResultsAvailable()) {
    history.push(`/quizz/${quizzId}`);
  }

  return (
    <div>
      <Helmet>
        <title>
          {quizz?.quizzTitle ? `Results | ${quizz?.quizzTitle} |` : ""} Quizz
          Now
        </title>
      </Helmet>
      <NavBar />

      {loading ? (
        <LoadingIndicator />
      ) : (
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
                    <strong>Score</strong>
                  </CustomTableCell>
                  <CustomTableCell align="right">
                    {results?.score}
                  </CustomTableCell>
                </TableRow>
                <TableRow hover={true}>
                  <CustomTableCell component="th" scope="row">
                    <strong>Max Score</strong>
                  </CustomTableCell>
                  <CustomTableCell align="right">
                    {results?.maxScore}
                  </CustomTableCell>
                </TableRow>
              </TableBody>
            </Table>
            </TableContainer>
            {results?.questions.map((o, i) => {
              return <Paper
                key={i}
              style={{
                padding: "10px",
                marginTop: "30px",
              }}
            >
              <Typography
                variant="h5"
                style={{ color: "white", marginBottom: "10px" }}
              >
                {i + 1}) {o.question.questionTitle}
              </Typography>
              {o.question.multipleChoices.map((e, i) => (
                <Paper
                  key={i}
                  variant="outlined"
                  style={{
                    color: "white",
                    marginTop: "10px",
                    backgroundColor:
                      e === o.optionChoosed ?
                       ( o.question.correctAnswer === e
                        ? "#00c853": "red")
                        : "#163855",
                    padding: "10px",
                    border: o.question.correctAnswer === e ? "solid #00c853" : "none",
                    borderWidth:1,
                  }}
              
                >
                  <Typography>{e}</Typography>
                </Paper>
              ))}
            </Paper>
            })}
        </Container>
      )}
    </div>
  );
}

export default connector(QuizzResults);
