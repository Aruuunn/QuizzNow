import React from "react";
import { AppBar, Toolbar, useTheme, Typography, Grid } from "@material-ui/core";

const NavBar = ({ children }:{children?:any}) => {
  const theme = useTheme();
  return (
    <div>
      <AppBar
        elevation={0}
        style={{
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Toolbar>
          <Grid container justify="space-between">
            <Typography
              variant="h5"
              style={{
                color: theme.palette.secondary.main,
                fontFamily: "'Fredoka One', cursive",
              }}
            >
              Quiz Now
            </Typography>

            {children}
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
