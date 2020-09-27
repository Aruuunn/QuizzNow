import React from "react";
import { AppBar, Toolbar, useTheme, Typography } from "@material-ui/core";

interface Props {}

const NavBar = (props: Props) => {
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
            style={{ color: theme.palette.secondary.main }}
          >
            QIF
          </Typography>
        </Toolbar>
      </AppBar>
     
    </div>
  );
};

export default NavBar;
