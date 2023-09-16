import { ArrowRight, ExpandLess } from "@mui/icons-material";
import { Box, SvgIconTypeMap, Typography } from "@mui/material";
import { useState } from "react";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { Link, useNavigate } from "react-router-dom";

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

  if (collapsible)
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          color: "#555",
          height: "auto",
          px: "20px"
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            height: "40px",
            cursor: "pointer",
            gap: "10px",
            userSelect: "none",
            "&:hover": {
              color: "#fff",
              gap: "15px",
            },
            transition: "gap 0.3s ease-in-out",
          }}
          onClick={() => {
            setOpen(!open);
          }}
        >
          <Icon />
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
                transform: open ? "rotate(180deg)" : "rotate(90deg)",
                transition: "transform 0.3s ease-in-out",
              }}
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            ml: "10px",
            pl: open ? "0px" : "-10px",
            transition: "padding-left 0.3s ease-in-out",
            overflow: "hidden",
          }}
        >
          {open &&
            children?.map((child) => (
              <Link
                to={child.to}
                style={{
                  textDecoration: "none",
                  gap: "10px",
                }}
              >
                <Box
                  sx={{
                    color: "#555",
                    "&:hover": {
                      color: "#fff",
                    },
                    display: "flex",
                    alignItems: "center",
                    fontSize: "16px",
                    gap: "10px",
                  }}
                >
                  <ArrowRight />
                  {child.title}
                </Box>
              </Link>
            ))}
        </Box>
      </Box>
    );
  else {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          height: "40px",
          cursor: "pointer",
          px: "20px",
          gap: "10px",
          userSelect: "none",

          color: "#555",

          "&:hover": {
            color: "#fff",
            gap: "15px",
          },

          transition: "gap 0.3s ease-in-out",
        }}
        onClick={() => {
          if (to) navigate(to);
        }}
      >
        <Icon />
        <Typography fontSize="18px">{text}</Typography>
      </Box>
    );
  }
}

export default SidebarItem;
