import React, { ReactElement } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import { AuthView, HomeView, NewQuizView ,QuizInfoView ,NotFoundView,QuestionAttemptView ,QuizzResultsView} from "./Pages/index";
import { PrivateRoute } from "./Route";

function Routes(): ReactElement {

  return (
    <div>
      <Switch>
        <Route path="/auth" component={AuthView} />
        <PrivateRoute path="/new" component={NewQuizView} />
        <PrivateRoute path="/attempt/:quizzId/q/:qno" exact component={QuestionAttemptView} />
        <PrivateRoute path="/quizz/:quizzId/results" exact component={QuizzResultsView} />
        <PrivateRoute path="/quizz/:quizzId" exact component={QuizInfoView}/>
        <PrivateRoute path="/" exact component={HomeView} />
        <Route path="/not-found" exact component={NotFoundView} />
        <Redirect to="/not-found"/>
      </Switch>
    </div>
  );
}

export default Routes;
