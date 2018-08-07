import { createMuiTheme } from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#4CD137",
      main: "#4CD137",
      dark: "#4CD137",
      contrastText: "white"
    },
    secondary: {
      light: "#4CD137",
      main: "#4CD137",
      dark: "#4CD137",
      contrastText: "white"
    },
    error: {
      light: "#e84118",
      main: "#e84118",
      dark: "#e84118",
      contrastText: "white"
    }
  }
});

export default theme;
