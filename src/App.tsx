import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { AppBar, Box, IconButton, Tooltip, Typography } from "@mui/material";
import { useEffect } from "react";
import axios from "axios";
import { AssignmentOutlined, ExitToApp } from "@mui/icons-material";

// pages
import LoginPage from "./pages/Login";
import AppsListPage from "./pages/AppsList";
import Shell from "./pages/Shell";
import AppsWizard from "./pages/AppsWizard";
import AppsEnvs from "./pages/AppsEnvs";

// Sidebars
import MainSideBar from "./sidebars/Main";
import ShellIcon from "./icons/Shell";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      axios
        .get(
          `${
            process.env.NODE_ENV === "production" ? "" : "http://localhost"
          }/api/auth/verify`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          if (location.pathname === "/login") navigate("/");
        })
        .catch((err) => {
          console.log(err);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("token") && location.pathname !== "/login") {
      navigate("/login");
    }
  }, [location, navigate]);

  if (location.pathname === "/login") return <LoginPage />;

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          height: "50px",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            height: "100%",

            px: "10px",
          }}
        >
          <img src="/logo.png" alt="logo" width="45" height="45" />
          <Typography
            sx={{ fontSize: "1.2rem", ml: "10px", fontWeight: "bold" }}
          >
            FYRA
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            height: "100%",
            px: "10px",
            marginLeft: "auto",
            gap: "5px",
            fontSize: "1.2rem",
          }}
        >
          <Tooltip title="Shell">
            <IconButton
              sx={{ ml: "auto", fontSize: "16px", color: "#fff" }}
              onClick={() => {
                alert("TODO");
              }}
            >
              <ShellIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Jobs">
            <IconButton
              sx={{ ml: "auto" }}
              onClick={() => {
                alert("TODO");
              }}
            >
              <AssignmentOutlined fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Logout">
            <IconButton
              sx={{ ml: "auto" }}
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/login");
              }}
            >
              <ExitToApp fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </AppBar>
      <Box
        id="Sidebar"
        sx={{
          position: "fixed",
          top: "0",
          left: "0",
          bottom: "0",
          width: "225px",
          height: "100%",
          overflowY: "auto",
          overflowX: "hidden",

          paddingTop: "50px",
          borderRight: "2px solid rgba(255, 255, 255, 0.12)",
        }}
      >
        <Routes>
          <Route path="/" element={<MainSideBar />} />
          <Route path="/apps" element={<MainSideBar />} />
          <Route path="*" element={<MainSideBar />} />
        </Routes>
      </Box>
      <Box
        className="App"
        sx={{
          marginLeft: `225px`,
          marginTop: "50px",
          height: "100%",
          width: `calc(100% - 225px)`,
          px: "10px",
        }}
      >
        <Routes>
          <Route path="/" element={<h1>Test</h1>} />
          <Route path="/apps" element={<AppsListPage />} />
          <Route path="/apps/envs" element={<AppsEnvs />} />
          <Route path="/apps/wizard/:env" element={<AppsWizard />} />
          <Route path="/about" element={<h1>Test2</h1>} />
          <Route path="/shell" element={<Shell />} />
        </Routes>
      </Box>
    </>
  );
}

export default App;
