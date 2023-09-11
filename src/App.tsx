import { Routes, Route, useLocation } from 'react-router-dom';
import { Box } from '@mui/material';

// pages
import LoginPage from './pages/login';

function App() {
  const location = useLocation()


  if(location.pathname === "/login") return <LoginPage />

  return (
    <Box className="App">
      <Routes>
        <Route path="/" element={<h1>Test</h1>} />
        <Route path="/about" element={<h1>Test2</h1>} />
      </Routes>
    </Box>
  );
}

export default App;