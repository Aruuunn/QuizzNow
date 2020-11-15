import React, { ReactElement } from "react";
import { Route, Switch } from "react-router-dom";

import { AuthView, HomeView, NewQuizView } from "./Pages/index";
import { PrivateRoute } from "./Route";

function Routes(): ReactElement {
  return (
    <div>
      <Switch>
        <Route path="/auth" component={AuthView} />
        <PrivateRoute path="/new" component={NewQuizView}/>
        <PrivateRoute path="/" exact component={HomeView} />

      </Switch>
    </div>
  );
}

export default Routes;