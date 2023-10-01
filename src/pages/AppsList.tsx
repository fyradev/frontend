import { MoreVert } from "@mui/icons-material";
import {
  Backdrop,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Divider,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

// states
import { useAppList } from "../states/AppList";
import StatusBadge from "../components/StatusBadge";
import { Link } from "react-router-dom";

function AppsList(): JSX.Element {
  const [appsChecked, setAppsChecked] = useState<boolean[]>([]);

  const { apps, requestApps } = useAppList();
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    requestApps().then(() => {
      setLoaded(true);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setAppsChecked(apps.map(() => false));
  }, [apps, loaded]);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",

        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
      }}
    >
      <Backdrop 
        open={!loaded}
      >
        <CircularProgress size='3rem' />
      </Backdrop>
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
            ml: "10px",
            pt: "20px",
            mb: "10px",
          }}
        >
          Apps List
        </Typography>

        <Link to="/apps/envs"><Button variant="contained">Create</Button></Link>
      </Box>
      <Divider sx={{ width: "100%" }} />

      <Box sx={{ width: "100%", display: "flex", flexDirection: "row" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={appsChecked.length > 0 && appsChecked.every((e) => e === true)}
                  indeterminate={
                    appsChecked.some((e) => e === true) &&
                    appsChecked.some((e) => e === false)
                  }
                  onChange={(e) => {
                    setAppsChecked(apps.map(() => e.target.checked));
                  }}
                />
              </TableCell>
              <TableCell>Name</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Environment</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appsChecked.map((checked, index) => (
              <TableRow key={index}>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={checked}
                    onChange={(e) => {
                      const newAppsChecked = [...appsChecked];
                      newAppsChecked[index] = e.target.checked;
                      setAppsChecked(newAppsChecked);
                    }}
                  />
                </TableCell>
                <TableCell><Link to={`/apps/${apps[index].id}`}>{apps[index].name}</Link></TableCell>
                <TableCell align="right">
                  <StatusBadge status={apps[index].status} />
                </TableCell>
                <TableCell align="right">{apps[index].environment}</TableCell>
                <TableCell align="right" padding="checkbox">
                  <IconButton>
                    <MoreVert />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
}

export default AppsList;
