import { ExpandLess } from "@mui/icons-material";
import {
  Box,
  Drawer,
  SvgIconTypeMap,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { Link, useLocation, useNavigate } from "react-router-dom";

function SidebarItem({
  Icon,
  text,
  to,
  collapsible = false,
  children,
}: {
  Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
  text: string;
  to?: string;
  collapsible?: boolean;
  children?: Types.CollapsibleSidebarProps[];
}) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const theme = useTheme();

  if (collapsible)
    return (
      <>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            height: "50px",
            cursor: "pointer",
            px: "10px",
            gap: "20px",
            userSelect: "none",

            borderBottom: "1px solid rgba(255, 255, 255, 0.12)",

            transition: "all 0.1s ease-in-out",

            "&:hover": {
              backgroundColor: "#555",
              gap: "25px",
            },

            ...(children?.find((v) => v.to === location.pathname) && {
              borderLeft: `3px solid ${theme.palette.primary.main}`,
              paddingLeft: "7px",
              "&:hover": {
                backgroundColor: "#555",
                gap: "20px",
              },
            }),
          }}
          onClick={() => {
            setOpen(!open);
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fill: "#fff",

              ...(children?.find((v) => v.to === location.pathname) && {
                color: theme.palette.primary.main,
                fill: theme.palette.primary.main,
              }),
            }}
          >
            <Icon />
          </Box>
          <Typography fontSize="18px">{text}</Typography>
          <Box
            sx={{
              marginLeft: "auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ExpandLess
              sx={{
                transform: "rotate(90deg)",
              }}
            />
          </Box>
        </Box>
        <Drawer
          variant="temporary"
          open={open}
          PaperProps={{
            sx: {
              top: "50px",
              display: "flex",
              flexDirection: "column",
              width: "225px",
              transition: "padding-left 0.3s ease-in-out",
              overflow: "hidden",
              zIndex: 999,
            },
          }}
          onClose={() => {
            setOpen(false);
          }}
        >
          <Typography
            sx={{
              color: "#fff",
              fontSize: "18px",
              px: "20px",
              py: "10px",
              textAlign: "center",
              fontWeight: "bold",
              borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
            }}
          >
            {text}
          </Typography>
          {open &&
            children?.map((child) => (
              <Link
                to={child.to}
                style={{
                  textDecoration: "none",
                  userSelect: "none",
                }}
                onClick={() => {
                  setOpen(false);
                }}
              >
                <Box
                  sx={{
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    fontSize: "16px",
                    height: "50px",
                    px: "20px",
                    cursor: "pointer",
                    borderBottom: "1px solid rgba(255, 255, 255, 0.12)",

                    transition: "border 0.1s ease-in-out",

                    "&:hover": {
                      backgroundColor: "#555",
                    },

                    ...(child.to === location.pathname && {
                      borderLeft: `3px solid #fff`,
                      paddingLeft: "17px",
                    }),
                  }}
                >
                  {child.title}
                </Box>
              </Link>
            ))}
        </Drawer>
      </>
    );
  else {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          height: "50px",
          cursor: "pointer",
          px: "10px",
          gap: "20px",
          userSelect: "none",
          borderBottom: "1px solid rgba(255, 255, 255, 0.12)",

          transition: "all 0.1s ease-in-out",

          "&:hover": {
            backgroundColor: "#555",
            gap: "25px",
          },

          ...(location.pathname === to && {
            borderLeft: `3px solid ${theme.palette.primary.main}`,
            paddingLeft: "7px",
            "&:hover": {
              backgroundColor: "#555",
              gap: "20px",
            },
  
          }),
        }}
        onClick={() => {
          if (to) navigate(to);
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fill: "#fff",

            ...(location.pathname === to && {
              color: theme.palette.primary.main,
              fill: theme.palette.primary.main,
            }),
          }}
        >
          <Icon />
        </Box>
        <Typography fontSize="18px">{text}</Typography>
      </Box>
    );
  }
}

export default SidebarItem;
