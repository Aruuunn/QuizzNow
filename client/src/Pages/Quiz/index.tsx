import React, { Component } from "react";
import io from "socket.io-client";
import { RouteComponentProps, withRouter } from "react-router-dom";

import { NavBar } from "../../components";
import {
  CONNECT,
  DISCONNECT,
  ERROR,
  FETCH_QUIZ_DETAILS,
  RECEIVED_QUIZ_DETAILS,
  UNAUTHORIZED,
} from "../../common/ws.event.types";

type Props = RouteComponentProps;
interface State {
  socket: null | SocketIOClient.Socket;
}

class Quiz extends Component<Props, State> {
  state = {
    socket: null,
  };

  componentDidMount() {
    const socket = io("http://localhost:5000", {
      query: {
        token: localStorage.getItem("accessToken"),
      },
    });
    socket.on(CONNECT, () => {
      console.log("Connected");
    });
    socket.on(DISCONNECT, () => {
      console.log("Disconnected");
    });
    socket.on(UNAUTHORIZED, () => {
      this.props.history.push(`/auth?next=${window.location.href}`);
    });

    socket.emit(FETCH_QUIZ_DETAILS, {
      payload: (this.props.match.params as { id: string }).id,
    });

    socket.on(RECEIVED_QUIZ_DETAILS, (data:any) => {
      if (!data) {
        this.props.history.push('/not-found');
      }
      console.log(data);
    })
    this.setState({ socket });
  }

  render() {
    return (
      <div>
        <NavBar />
      </div>
    );
  }
}

export default withRouter(Quiz);
