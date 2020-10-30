import React from 'react'
import { connect } from 'react-redux'
import {Route, RouteProps, useHistory} from 'react-router-dom'

import { RootState } from '../reduxStore';


const mapStateToProps = (state: RootState) => ({ isLoggedIn: !!state.auth.accessToken });


const PrivateRoute = (props: {isLoggedIn:boolean} & RouteProps) => {
  const history = useHistory();

  const { isLoggedIn, ...rest } = props;

  if (!isLoggedIn) {
      history.push('/auth')    
  }
  return (
    <div>
      <Route {...rest}/>
    </div>
  )
}



export default connect(mapStateToProps)(PrivateRoute);
