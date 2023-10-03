import { Box } from "@mui/material";
import SidebarItem from "../components/SidebarItem";
import {
  AppsOutlined,
  ComputerOutlined,
  FolderOpenOutlined,
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
      <SidebarItem Icon={FolderOpenOutlined} text="Files" to="/files" />
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
        Icon={ComputerOutlined}
        text="VMs"
        collapsible={true}
        children={[
          { title: "VMs", to: "/vms/list" },
          { title: "Images", to: "/vms/isos" },
          { title: "Templates", to: "/vms/templates" },
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
