import React, { ReactElement } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import { AuthView, HomeView, NewQuizView ,QuizView ,NotFoundView} from "./Pages/index";
import { PrivateRoute } from "./Route";

function Routes(): ReactElement {
  return (
    <div>
      <Switch>
        <Route path="/auth" component={AuthView} />
        <PrivateRoute path="/new" component={NewQuizView} />
        <PrivateRoute path="/attempt/:quizzId" component={QuizView}/>
        <PrivateRoute path="/" exact component={HomeView} />
        <Route path="/not-found" exact component={NotFoundView} />
        <Redirect to="/not-found"/>
      </Switch>
    </div>
  );
}

export default Routes;
