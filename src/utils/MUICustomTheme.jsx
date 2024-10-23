import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#DA2F3E",
    },
    secondary: {
      main: "#FFD245",
    },
  },
  typography: {
    fontFamily: ["Montserrat", "sans-serif"].join(","),
    button: {
      textTransform: "none",
    },
  },
});

export default theme;
