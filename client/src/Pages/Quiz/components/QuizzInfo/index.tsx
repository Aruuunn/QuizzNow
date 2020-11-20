import React, { ReactElement } from "react";
import { Helmet } from "react-helmet";
import moment from "moment";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Container, Button, Typography } from "@material-ui/core";

const CustomTableCell = (props: any) => {
  return <TableCell {...props} style={{ borderBottom: "none" }} />;
};

interface Props {
  title: string;
  startDatetime: string;
  endDatetime: string;
  totalQuestions: number;
  canAttemptQuizz: boolean;
  createdBy: string;
}

function QuizInfo(props: Props): ReactElement {
  const {
    title,
    startDatetime,
    endDatetime,
    canAttemptQuizz,
    createdBy,
    totalQuestions,
  } = props;
  return (
    <div>
      <Helmet>
        <title>{title} | Quizz Now</title>
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
          {title}
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
                    (startDatetime as unknown) as string
                  ).toLocaleString()}{" "}
                  ({moment((startDatetime as unknown) as string).fromNow()})
                </CustomTableCell>
              </TableRow>
              <TableRow hover={true}>
                <CustomTableCell className="bold" component="th" scope="row">
                  <strong>End</strong>
                </CustomTableCell>
                <CustomTableCell align="right">
                  {new Date(
                    (endDatetime as unknown) as string
                  ).toLocaleString()}{" "}
                  ({moment((endDatetime as unknown) as string).fromNow()})
                </CustomTableCell>
              </TableRow>

              <TableRow hover={true}>
                <CustomTableCell className="bold" component="th" scope="row">
                  <strong>Total Questions</strong>
                </CustomTableCell>
                <CustomTableCell align="right">
                  {totalQuestions}
                </CustomTableCell>
              </TableRow>

              <TableRow hover={true}>
                <CustomTableCell className="bold" component="th" scope="row">
                  <strong>Created By</strong>
                </CustomTableCell>
                <CustomTableCell align="right">
                  {createdBy || "Unknown"}
                </CustomTableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        {canAttemptQuizz ? (
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
  );
}

export default QuizInfo;
