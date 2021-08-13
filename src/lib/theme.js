import { createTheme, responsiveFontSizes } from "@material-ui/core";

export const theme = responsiveFontSizes(
  createTheme({
    typography: {
      heading: {
        fontFamily: "'Montserrat', sans-serif"
      }
    }
  })
);
