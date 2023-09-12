import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';

// pages
import LoginPage from './pages/Login';
import { useEffect } from 'react';
import axios from 'axios';

function App() {
  const navigate = useNavigate();
  const location = useLocation()

  useEffect(() => {
    if (localStorage.getItem("token")) {
      axios
        .get(
          process.env.NODE_ENV === "production"
            ? ""
            : "http://localhost" + "/api/auth/verify",
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  useEffect(() => {
    if(!localStorage.getItem("token") && location.pathname !== "/login") {
      navigate("/login")
    }
  }, [location])

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