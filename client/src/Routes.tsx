import React, { ReactElement } from 'react'
import { Route, Switch } from 'react-router-dom'

import  Home , {AuthView } from './pages';
import { PrivateRoute } from './Route/index';

function Routes(): ReactElement {
  return (
    <div>
      <Switch>
        <Route path="/auth" component={AuthView} />
        <PrivateRoute path="/" exact component={Home} />
      </Switch>      
    </div>
  )
}

export default Routes;