import React from "react";
import { AppBar, Toolbar, useTheme, Typography } from "@material-ui/core";

const NavBar = () => {
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
          <Typography
            variant="h5"
            style={{ color: theme.palette.secondary.main ,fontFamily:"'Fredoka One', cursive"}}
          >
            Quiz Now
          </Typography>
        </Toolbar>
      </AppBar>
     
    </div>
  );
};

export default NavBar;
