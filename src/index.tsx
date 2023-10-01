import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import "./index";

// fonts
import '@fontsource/prompt';

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#093f9b",
    },
    secondary: {
      main: "#4A00E0",
    },
    background: {
      default: "#101010",
      paper: "#101010",
    },
    text: {
      primary: "#fff",
      secondary: "#fff",
    },
    action: {
      active: "#fff",
    },
    success: {
      main: "#388e3c",
      contrastText: "#fff",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "0",
          textTransform: "none",
        },
      },
    },
  }
});

root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ThemeProvider>
);
