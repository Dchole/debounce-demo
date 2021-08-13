import "@fontsource/roboto/400.css";
import "@fontsource/montserrat/600.css";
import "@fontsource/montserrat/700.css";

import { ThemeProvider } from "@material-ui/core";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { theme } from "./lib/theme";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
