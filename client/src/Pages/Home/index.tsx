import React, { Component } from "react";
import { connect, ConnectedProps } from "react-redux";
import {
  Card,
  Typography,
  CardContent,
  Container,
  IconButton,
  SvgIcon,
  Grid,
  Tooltip,
} from "@material-ui/core";
import moment from "moment";
import { RouteComponentProps, withRouter } from "react-router-dom";
import CopyToClipboard from "react-copy-to-clipboard";

import axios from "../../common/axios";
import { NavBar } from "../../components";
import { RootState, Quiz } from "../../reduxStore/reducers";
import { AuthActionTypes } from "../../reduxStore/types";

export { default as AuthView } from "../Auth";

const mapStateToProps = (state: RootState) => state;
const mapDispatchToProps = {
  logout: () => ({ type: AuthActionTypes.LOG_OUT }),
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type reduxProps = ConnectedProps<typeof connector>;

type Props = reduxProps & RouteComponentProps;

interface State {
  limit: number;
  page: number;
  loading: boolean;
  quizzes: Quiz[];
}

const QuizListItem = (props: {
  key: any;
  title: string;
  startDatetime: string;
  endDatetime: string;
  id: string;
}) => {
  const [isCopied, setCopied] = React.useState(false);

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
      <CardContent>
        <Grid container justify="space-between">
          <Typography variant="h5">{props.title}</Typography>
          <CopyToClipboard
            onCopy={() => {
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
            text={`${window.location.href}attempt/${props.id}`}
          >
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
          </CopyToClipboard>
        </Grid>

        <div style={{ color: "grey", marginTop: "10px" }}>
          <Typography variant="body1">
            Start : {new Date(props.startDatetime).toLocaleString()} (
            {moment(props.startDatetime).fromNow()})
          </Typography>
          <Typography variant="body1">
            End : {new Date(props.endDatetime).toLocaleString()} (
            {moment(props.endDatetime).fromNow()})
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

class Home extends Component<Props, State> {
  state = {
    limit: 10,
    page: 1,
    quizzes: [],
    loading: false,
  };

  componentDidMount() {
    axios
      .get(`/quiz?limit=10&page=1`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        this.setState({ quizzes: res.data.items });
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          this.props.history.push("/auth");
        }
      });
  }

  render() {
    return (
      <div>
        <NavBar>
          <IconButton
            color="secondary"
            style={{ marginRight: "20px" }}
            onClick={() => {
              this.props.history.push("/new");
            }}
          >
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
          </IconButton>
        </NavBar>

        {this.state.loading ? "Loading..." : null}
        <Container style={{ marginTop: "30px" }}>
          <Typography
            variant="h4"
            component="h1"
            style={{
              color: "#E578C1",
              marginBottom: "30px",
              marginLeft: "10px",
              fontFamily: "'Fredoka One', cursive",
            }}
          >
            Created Quizzes
          </Typography>
          {(this.state.quizzes as Quiz[]).map((o, i) => {
            return <QuizListItem key={i} {...o} />;
          })}
          {this.state.quizzes.length === 0 && (
            <div
              style={{ color: "black", marginTop: "10vh", marginLeft: "10px" }}
            >
              {" "}
              <Typography variant="h3">Nothing Here....Yet</Typography>
              <Typography variant="h4">
                The Quizzes you created will show up here
              </Typography>
            </div>
          )}
        </Container>
        <svg
          style={{ position: "fixed", bottom: 0, left: 0, zIndex: -1 }}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#072540"
            fill-opacity="1"
            d="M0,224L48,208C96,192,192,160,288,160C384,160,480,192,576,218.7C672,245,768,267,864,272C960,277,1056,267,1152,240C1248,213,1344,171,1392,149.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    );
  }
}

export default withRouter(connector(Home));
