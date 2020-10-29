import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import {Router,withRouter } from 'next/router';

import { NavBar } from '../components';
import {RootState } from '../reduxStore/reducers';
import { Button } from '@material-ui/core';
import { AuthActionTypes } from '../reduxStore/types';



const mapStateToProps = (state: RootState) => state;
const mapDispatchToProps = {
    logout:() => ({type:AuthActionTypes.LOG_OUT})
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type reduxProps = ConnectedProps<typeof connector>;


type Props = reduxProps  & {
    router:Router
  };

interface State {
    
}

class Home extends Component<Props, State> {
    state = {}


    render() {
     
        return (
            <div>
                <NavBar>
                    {this.props.auth.accessToken !== null ?
                <Button variant="outlined" color="secondary" onClick={() => this.props.logout()}>Logout</Button>:<Button variant="outlined" color="secondary" onClick={() => {this.props.router.replace('/auth')}}>Login</Button>}
                </NavBar>
                
            </div>
        )
    }
}

export default withRouter(connector(Home));
