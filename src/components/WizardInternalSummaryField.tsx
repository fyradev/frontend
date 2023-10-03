import { Typography } from "@mui/material";
import convertBytes from "../common/convertBytes";

function WizardInternalSummaryField({ field }: { field: Types.WizardField }) {
  switch (field.type) {
    case "string":
      return <Typography>{field.value}</Typography>;
    case "number":
      switch (field.dataType) {
        case "bytes":
          return <Typography>{convertBytes(field.value)}</Typography>;
        case "percentage":
          return <Typography>{field.value}%</Typography>;
        default:
          return <Typography>{field.value}</Typography>;
      }
    case "switch":
      return <Typography>{field.value ? "Yes" : "No"}</Typography>;
    case "slider":
      switch (field.dataType) {
        case "bytes":
          return <Typography>{convertBytes(2 ** field.value)}</Typography>;
        case "percentage":
          return <Typography>{field.value}%</Typography>;
        default:
          return <Typography>{field.value}</Typography>;
      }
    case "select":
        return <Typography>{field.value}</Typography>;
  }
}

export default WizardInternalSummaryField;
