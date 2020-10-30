import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#0069FF",
    },
    secondary: {
      main: "#E578C1",
      dark: "#9C4668",
    },
    background: {
      default: "#183D5D",
      paper: "#072540",
    },
  },
});

export default responsiveFontSizes(theme);
