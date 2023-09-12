import axios from "axios";
import { sha256 } from "js-sha256";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Collapse,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const valid = username && password;


  useEffect(() => {
    if (localStorage.getItem("token")) {
      setLoading(true);
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
          setLoading(false);
          console.log(err);
        });
    }
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Box
        sx={{
          width: "1000px",
          height: "500px",
          backgroundColor: "#202020",
          borderRadius: "10px",
          boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",

          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "40%",
            height: "100%",
            background:
              "linear-gradient(45deg, #8E2DE266 30%, #4A00E055 90%), url(/assets/starBG.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "10px 0px 0px 10px",

            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src="/logo.png" alt="logo" style={{ width: "50%" }} />
          <Typography
            sx={{
              color: "#fff",
              fontSize: "2rem",
              fontWeight: "bold",
            }}
          >
            Welcome to Fyra
          </Typography>
        </Box>
        <Divider orientation="vertical" variant="middle" flexItem />
        <Box
          sx={{
            width: "60%",
            height: "100%",

            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              color: "#fff",
              fontSize: "2rem",
              fontWeight: "bold",
            }}
          >
            Login
          </Typography>
          <Collapse in={error !== ""}>
            <Alert severity="error" sx={{ width: "100%", marginTop: "1rem" }}>
              {error}
            </Alert>
          </Collapse>
          <Box
            sx={{
              width: "100%",

              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TextField
              sx={{ width: "70%", marginTop: "1rem" }}
              label="Username"
              variant="filled"
              datatype="text"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              sx={{ width: "70%", marginTop: "1rem" }}
              label="Password"
              variant="filled"
              datatype="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter")
                  document.getElementById("loginButton")?.click();
              }}
            />
          </Box>
          <Button
            id="loginButton"
            sx={{ width: "50%", marginTop: "1rem" }}
            disabled={!valid || loading}
            variant="contained"
            onClick={() => {
              setLoading(true);
              setError("");
              const pwHash = sha256(password).toString();
              axios
                .post(
                  process.env.NODE_ENV === "production"
                    ? ""
                    : "http://localhost" + "/api/auth/login",
                  {
                    username: username,
                    password: pwHash,
                  }
                )
                .then((res) => {
                  localStorage.setItem("token", res.data.token);
                  navigate("/");
                })
                .catch((err) => {
                  console.log(err);
                  setError(err.response.data.message);
                  setLoading(false);
                });
            }}
          >
            {loading ? <CircularProgress sx={{
              color: "#fff"
            }} size={32} /> : "Login"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Login;
