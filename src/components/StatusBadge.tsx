import { Chip } from "@mui/material";

function StatusBadge({ status }: { status: Types.AppStatus }) {
  switch (status) {
    case "up":
      return <Chip label="Running" color="success" variant="outlined" />;
    case "down":
      return <Chip label="Stopped" color="error" variant="outlined" />;
    case "starting":
      return <Chip label="Starting" color="warning" variant="outlined" />;
    case "exiting":
      return <Chip label="Stopping" color="warning" variant="outlined" />;
    default:
      return <Chip label="Unknown" color="info" variant="outlined" />;
  }
}

export default StatusBadge;
