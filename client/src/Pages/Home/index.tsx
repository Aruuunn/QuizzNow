import React, { Component } from "react";
import { connect, ConnectedProps } from "react-redux";
import {
  Card,
  Typography,
  CardContent,
  Container,
  IconButton,
  SvgIcon,
} from "@material-ui/core";
import { RouteComponentProps, withRouter } from "react-router-dom";

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
            Your Quizzes
          </Typography>
          {(this.state.quizzes as Quiz[]).map((o, i) => (
            <Card
              key={i}
              style={{
                padding: "10px",
                color: "white",
                margin: "10px",
                maxWidth: "500px",
              }}
            >
              <CardContent>
                <Typography variant="h5">{o.title}</Typography>
                <div style={{ color: "grey", marginTop: "10px" }}>
                  <Typography variant="body1">
                    Start: {o.startDatetime}
                  </Typography>
                  <Typography variant="body1">End: {o.endDatetime}</Typography>
                </div>
              </CardContent>
            </Card>
          ))}
          {this.state.quizzes.length === 0 && (
            <div
              style={{ color: "black", marginTop: "10vh", marginLeft: "10px" }}
            >
              {" "}
              <Typography
                variant="h3"
              >
                Nothing Here....Yet
              </Typography>
              <Typography
                variant="h4"
              >
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
