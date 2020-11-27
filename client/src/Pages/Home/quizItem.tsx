import React from "react";
import {
  Card,
  Typography,
  CardContent,
  IconButton,
  SvgIcon,
  Grid,
  Tooltip,
} from "@material-ui/core";
import moment from "moment";

import CopyToClipboard from "react-copy-to-clipboard";
import { ConfirmDialog } from "../../components";
import axios from "../../common/axios";

export const QuizListItem = (props: {
  key: any;
  quizzTitle: string;
  startDatetime: string;
  endDatetime: string;
  quizzId: string;
  fetchData: () => Promise<void>;
}) => {
  const {
    key,
    quizzTitle,
    quizzId,
    endDatetime,
    fetchData,
    startDatetime,
  } = props;
  const [isCopied, setCopied] = React.useState(false);
  const [deleteIt, setDelete] = React.useState(false);

  const onDelete = async (): Promise<void> => {
    await axios.delete(`/quizz/${props.quizzId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });

    await props.fetchData();
  };

  return (
    <Card
      key={props.key}
      style={{
        padding: "10px",
        color: "white",
        margin: "10px",
        maxWidth: "500px",
      }}
    >
      <ConfirmDialog
        open={deleteIt}
        onClose={() => setDelete(false)}
        title={`Delete ${quizzTitle} ?`}
        description="There is no going back after you have deleted the Quiz"
        successButtonText="Delete"
        onSuccess={onDelete}
        cancelButtonText="Cancel"
      />
      <CardContent>
        <Grid container justify="space-between" alignItems="center">
          <Typography variant="h5">{quizzTitle}</Typography>
          <div>
            {" "}
            <IconButton
              size="small"
              onClick={() => {
                setDelete(true);
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
            <CopyToClipboard
              onCopy={() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              text={`${window.location.href}attempt/${quizzId}`}
            >
              <IconButton>
                <Tooltip
                  open={isCopied}
                  title="Copied to Clipboard!"
                  placement="top"
                >
                  <SvgIcon color="primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24"
                      viewBox="0 0 24 24"
                      width="24"
                    >
                      <path d="M0 0h24v24H0z" fill="none" />
                      <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z" />
                    </svg>
                  </SvgIcon>
                </Tooltip>
              </IconButton>
            </CopyToClipboard>
          </div>
        </Grid>

        <div style={{ color: "grey", marginTop: "10px" }}>
          <Typography variant="body1">
            Start : {new Date(startDatetime).toLocaleString()} (
            {moment(startDatetime).fromNow()})
          </Typography>
          <Typography variant="body1">
            End : {new Date(endDatetime).toLocaleString()} (
            {moment(endDatetime).fromNow()})
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuizListItem;
