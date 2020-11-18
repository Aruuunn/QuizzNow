import React, { Component } from "react";
import io from "socket.io-client";

import { NavBar } from "../../components";


interface Props {}
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
     socket.emit("msgToServer", "Hey Server");
    socket.on("msgToClient", (e: any) => {
      console.log(e);
    });

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

export default Quiz;
