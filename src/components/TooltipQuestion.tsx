import { QuestionMark } from "@mui/icons-material"
import { Box, SxProps, Theme, Tooltip } from "@mui/material"

function TooltipQuestion({
    title,
    sx
} : {
    title: string,
    sx?: SxProps<Theme>
}) {
  return (
    <Tooltip title={title}>
        <Box sx={{
            ...sx,
            display: "flex",
            width: "30px",
            height: "30px",
            borderRadius: "50%",
            
            alignItems: "center",
            justifyContent: "center",

            backgroundColor: "#ffffff22",
        }}><QuestionMark sx={{
            fontSize: "22px",
        }} /></Box>
    </Tooltip>
  )
}

export default TooltipQuestion