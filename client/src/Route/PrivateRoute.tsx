import React from 'react'
import { connect } from 'react-redux'
import {Route, RouteProps, useHistory} from 'react-router-dom'
import { ACCESS_TOKEN } from '../common/constants';

import { RootState } from '../reduxStore';


const mapStateToProps = (state: RootState) => ({ isLoggedIn: state.auth.isLoggedIn });


const PrivateRoute = (props: {isLoggedIn:boolean} & RouteProps) => {
  const history = useHistory();

  const { isLoggedIn, ...rest } = props;

  if (!isLoggedIn || !localStorage.getItem(ACCESS_TOKEN)) {
      history.push('/auth')    
  }
  return (
    <div>
      <Route {...rest}/>
    </div>
  )
}



export default connect(mapStateToProps)(PrivateRoute);
