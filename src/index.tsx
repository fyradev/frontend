import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#4A00E0',
    },
    secondary: {
      main: '#093f9b',
    },
    background: {
      default: '#101010',
      paper: '#101010',
    },
    text: {
      primary: '#fff',
      secondary: '#fff',
    },
    action: {
      active: '#fff',
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