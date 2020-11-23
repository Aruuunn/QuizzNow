import React, { ReactElement } from 'react'
import { CircularProgress, Grid } from '@material-ui/core'

function LoadingIndicator(): ReactElement {
  return (
    <div>
      <Grid container style={{position:"fixed",width:"100%",height:"100vh"}} justify="center" alignItems="center">
        <CircularProgress color="secondary" />
      </Grid>
      
    </div>
  )
}

export default LoadingIndicator
