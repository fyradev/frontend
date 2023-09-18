import { Box } from "@mui/material";
import SidebarItem from "../components/SidebarItem";
import {
  AppsOutlined,
  HomeOutlined,
  SettingsOutlined,
} from "@mui/icons-material";

// Icons
import DockerIcon from "../icons/Docker";

function MainSideBar() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "0px",
        height: "100%",
      }}
    >
      <SidebarItem Icon={HomeOutlined} text="Dashboard" to="/" />
      <SidebarItem Icon={AppsOutlined} text="Apps" to="/apps" />
      <SidebarItem
        Icon={DockerIcon as any}
        text="Docker"
        collapsible={true}
        children={[
          { title: "Containers", to: "/docker/containers" },
          { title: "Images", to: "/docker/images" },
          { title: "Volumes", to: "/docker/volumes" },
          { title: "Networks", to: "/docker/networks" },
        ]}
      />
      <SidebarItem
        Icon={SettingsOutlined}
        text="Settings"
        collapsible={true}
        children={[
          { title: "General", to: "/settings/general" },
          { title: "Users", to: "/settings/users" },
        ]}
      />
    </Box>
  );
}

export default MainSideBar;
