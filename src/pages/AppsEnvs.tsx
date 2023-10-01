import {
  Avatar,
  Backdrop,
  Box,
  Button,
  Chip,
  CircularProgress,
  Grid,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import getBaseUrl from "../common/getBaseUrl";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Delete, Edit, MoreHoriz, MoreVert } from "@mui/icons-material";

function AppsEnvs() {
  const [envs, setEnvs] = useState<Types.AppEnv[]>([]);
  const [loaded, setLoaded] = useState<boolean>(false);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const MenuOpen = Boolean(anchorEl);

  useEffect(() => {
    axios
      .get(`${getBaseUrl()}/api/apps/envs/get`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setEnvs(res.data.envs);
        setLoaded(true);
      });
  }, []);


  if(!loaded) return <Backdrop open={true}><CircularProgress size='3rem' /></Backdrop>

  return (
    <>
      <Menu
        anchorEl={anchorEl}
        open={MenuOpen}
        onClose={() => {
          setAnchorEl(null);
        }}
        onClick={() => {
          setAnchorEl(null);
        }}
        sx={{
          "& .MuiMenu-paper": {
            width: "200px",
          },
        }}
      >
        <MenuItem>
          <ListItemIcon>
            <Edit fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Delete fontSize="small" />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          height: "100%",
          flexDirection: "column",
          padding: "10px",
        }}
      >
        <Box
          sx={{
            width: "100%",
            marginBottom: "30px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              fontSize: "2rem",
              fontWeight: "bold",
            }}
          >
            Environments
          </Typography>

          <Link to="/apps/store">
            <Button variant="contained">Discover</Button>
          </Link>
        </Box>
        <Grid
          container
          rowSpacing={1}
          sx={{
            gap: "10px",
          }}
        >
          {envs.map((env, index) => (
            <Link to={`/apps/wizard/${env.id}`}>
              <Grid
                item
                key={index}
                sx={{
                  width: "500px",
                  height: "225px",
                  background: "#ffffff11",
                  borderRadius: "10px",
                  padding: "10px",

                  display: "flex",
                  flexDirection: "row",

                  transition: "all 0.2s ease-in-out",
                  cursor: "pointer",

                  "&:hover": {
                    background: "#ffffff22",
                    transform: "scale(1.01)",
                  },
                }}
                onClick={() => {
                  console.log("Selected");
                }}
              >
                <Avatar
                  src={`${getBaseUrl()}/api/apps/envs/icon/${env.id}`}
                  sx={{ width: "100px", height: "100px" }}
                />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    marginLeft: "10px",
                    padding: "10px",
                    height: "auto",
                    width: "100%",
                    flexGrow: 0,
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "1.5rem",
                        fontWeight: "bold",
                      }}
                    >
                      {env.name}
                    </Typography>
                    <IconButton
                      sx={{
                        marginLeft: "10px",
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log("clicked");
                        setAnchorEl(e.currentTarget);
                      }}
                      className="moreButton"
                    >
                      <MoreVert fontSize="small" />
                    </IconButton>
                  </Box>
                  <Box>
                    {env.tags.slice(0, 4).map((tag, index) => (
                      <Chip
                        size="small"
                        key={index}
                        label={tag}
                        sx={{
                          marginRight: "5px",
                          marginTop: "0px",
                        }}
                      />
                    ))}
                  </Box>
                  <Typography
                    sx={{
                      fontSize: "0.75rem",
                    }}
                  >
                    {env.description}
                  </Typography>
                </Box>
              </Grid>
            </Link>
          ))}
        </Grid>
      </Box>
    </>
  );
}

export default AppsEnvs;
