import React from "react";
import { Route, Switch, Redirect,useHistory } from "react-router-dom";
import { connect, ConnectedProps } from "react-redux";

import { QuizzActionTypes, RootState } from "../../reduxStore";
import { setUp as wsSetUp,onUnAuthorized, onNotFound } from "./ws";
import { QuizInfo } from './components';


const mapStateToProps = (state: RootState) => ({
  quizz: state.quizz,
});
const mapDispatchToProps = {
  setSocket: (socket: SocketIOClient.Socket) => ({
    type: QuizzActionTypes.SET_SOCKET,
    payload: socket,
  }),
};
const connector = connect(mapStateToProps, mapDispatchToProps);
type reduxProps = ConnectedProps<typeof connector>;
type Props = reduxProps;



export const Quizz = (props: Props) => {
  const {
    setSocket,
    quizz: { socket },
  } = props;

  const history = useHistory();
  
  if (socket === null) {
    let newSocket = wsSetUp();
    newSocket = onUnAuthorized(newSocket, () => {
      history.push('/auth');
    })
    newSocket = onNotFound(newSocket, () => {
      history.push('/not-found');
    })
    setSocket(newSocket);
  }

  return (
    <div>
      <Switch>
        <Redirect
          exact
          from="/attempt/:quizzId"
          to="/attempt/:quizzId/details"
        />
        <Route
          path={`/attempt/:quizzId/details`}
          exact
          component={QuizInfo}
        />
        <Route
          path={`/attempt/:quizzId/finish`}
          exact
          component={() => <h1>F</h1>}
        />
        <Route
          path={`/attempt/:quizzId/q/:qno`}
          exact
          component={() => <h1>Q</h1>}
        />
        <Redirect to="/not-found" />
      </Switch>
    </div>
  );
};

export default connector(Quizz);
