import React, { useState, useEffect } from "react";
import { Container, Paper, Typography } from "@material-ui/core";
import { useParams } from "react-router-dom";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";

import axios from "../../common/axios";
import { NavBar, LoadingIndicator } from "../../components";
import { ACCESS_TOKEN } from "../../common/constants";

interface Props {}

const CustomTableCell = (props: any) => {
  return <TableCell  {...props} style={{ borderBottom: "none" }} />;
};

export const QuizzAttemptsView = (props: Props) => {
  const { quizzId } = useParams() as { quizzId: string };
  const [loading, setLoading] = useState(true);
  const [quizzAttempts, setQuizzAttempts] = useState<
    {
      totalScore: number;
      user: {
        userName: string;
      };
    }[]
  >([]);

  useEffect(() => {
    axios
      .get(`/quizz/${quizzId}/attempt-details?limit=10&page=1`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
        },
      })
      .then((res) => {
        setQuizzAttempts(res.data.items);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <NavBar />
      {loading ? (
        <LoadingIndicator />
      ) : (
        <Container>
          <Typography
            variant="h3"
            style={{
              marginTop: "30px",
              color: "white",
              marginBottom: "10px",
            }}
          >
            Quizz Attempts
          </Typography>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <CustomTableCell>User Name</CustomTableCell>
                  <CustomTableCell align="right">Total Score</CustomTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {quizzAttempts.map((o, i) => {
                  return (
                    <TableRow hover={true} key={i}>
                      <CustomTableCell component="th" scope="row">
                        {o.user.userName}
                      </CustomTableCell>
                      <CustomTableCell align="right">
                        {o.totalScore}
                      </CustomTableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      )}
    </>
  );
};

export default QuizzAttemptsView;
