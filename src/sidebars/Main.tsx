import { Box } from "@mui/material";
import SidebarItem from "../components/SidebarItem";
import { Code, HomeOutlined } from "@mui/icons-material";

function MainSideBar() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        height: "100%",
      }}
    >
      <SidebarItem Icon={HomeOutlined} text="Dashboard" to="/" />
      <SidebarItem
        Icon={Code}
        text="Test"
        collapsible={true}
        children={[
          { title: "Test 1", to: "/test1" },
          { title: "Test 2", to: "/test2" },
        ]}
      />
      <SidebarItem Icon={HomeOutlined} text="Dashboard" to="/" />
      <SidebarItem
        Icon={Code}
        text="Test"
        collapsible={true}
        children={[
          { title: "Test 1", to: "/test1" },
          { title: "Test 2", to: "/test2" },
        ]}
      />
      <SidebarItem Icon={HomeOutlined} text="Dashboard" to="/" />
      <SidebarItem Icon={HomeOutlined} text="Dashboard" to="/" />
      <SidebarItem Icon={HomeOutlined} text="Dashboard" to="/" />
      <SidebarItem Icon={HomeOutlined} text="Dashboard" to="/" />
    </Box>
  );
}

export default MainSideBar;
