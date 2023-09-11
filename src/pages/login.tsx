import { Box, Button, Divider, TextField, Typography } from "@mui/material";

function login() {
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
            />
            <TextField
              sx={{ width: "70%", marginTop: "1rem" }}
              label="Password"
              variant="filled"
              datatype="password"
              type="password"
            />
          </Box>
          <Button sx={{ width: "50%", marginTop: "1rem" }} variant="contained">
            Login
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default login;
