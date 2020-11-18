import React, { ReactElement } from 'react'

import { Grid, Typography, } from '@material-ui/core'
import { NavBar } from '../../components'


function NotFound(): ReactElement {
  return (
    <div>
      <NavBar />
      <Grid container style={{ position: 'fixed', width: '100%', height: '100vh', top: 0,left:0 }} alignItems="center" justify="center">
        <Typography variant="h1" style={{fontFamily:"'Fredoka One', cursive",color:"#072540"}}>Page Not Found</Typography>
      </Grid>
    </div>
  )
}

export default NotFound;
