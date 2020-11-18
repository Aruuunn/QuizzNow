import React, { Component } from "react";
import io from "socket.io-client";
import { RouteComponentProps ,withRouter} from 'react-router-dom';

import { NavBar } from "../../components";


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
        token: localStorage.getItem("accessToken")
      }
    });
    socket.on("connect", () => {
      console.log("Connected");
    });
    socket.on("disconnect", () => {
      console.log("Disconnected");
    });
    socket.on("400", () => {
      this.props.history.push(`/auth?next=${window.location.href}`);
    })
    
    socket.emit("fetchDetails", (this.props.match.params as { id: string }).id);

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
