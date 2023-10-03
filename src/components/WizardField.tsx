import {
  Box,
  Switch,
  Typography,
  Slider,
  Chip,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Tooltip,
} from "@mui/material";
import React from "react";
import convertBytes from "../common/convertBytes";
import TooltipQuestion from "./TooltipQuestion";

function WizardField({
  field,
  fIndex,
  stepsHook: [steps, setSteps],
}: {
  field: Types.WizardField;
  fIndex: number;
  stepsHook: [
    Types.WizardStep[],
    React.Dispatch<React.SetStateAction<Types.WizardStep[]>>
  ];
}): JSX.Element {
  switch (field.type) {
    case "switch":
      return (
        <Box
          key={fIndex}
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            width: "800px",

            backgroundColor: "#ffffff11",
            padding: "10px",
            borderRadius: "10px",

            transition: "all 0.2s ease-in-out",
            ...(checkDependent(field, steps) ? {} : { opacity: 0, height: 0 }),
          }}
        >
          <Switch
            value={field.value}
            checked={field.value}
            size="medium"
            onChange={(_, v) => {
              field.value = v;
              setSteps([...steps]);
            }}
          />
          <Typography
            sx={{
              fontSize: "1rem",
            }}
          >
            {field.label}{" "}
          </Typography>
          {field.description && (
            <TooltipQuestion
              title={field.description}
              sx={{
                ml: "auto",
              }}
            />
          )}
        </Box>
      );
    case "slider":
      if (field.dataType === "percentage")
        return (
          <Box
            key={fIndex}
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: "20px",
              width: "800px",

              backgroundColor: "#ffffff11",
              padding: "10px",
              borderRadius: "10px",

              transition: "all 0.2s ease-in-out",
              ...(checkDependent(field, steps)
                ? {}
                : { opacity: 0, height: 0 }),
            }}
          >
            <Typography
              sx={{
                fontSize: "1.2rem",
                fontWeight: "bold",
              }}
            >
              {field.label}
            </Typography>
            <Slider
              key={fIndex}
              sx={{ width: "100%" }}
              value={field.value}
              min={field.min}
              max={field.max}
              step={1}
              onChange={(_, v) => {
                field.value = v;
                setSteps([...steps]);
              }}
            />
            <Chip
              label={`${field.value}%`}
              sx={{
                width: "90px",
                minWidth: "90px",
              }}
            />
          </Box>
        );
      if (field.dataType === "bytes")
        return (
          <Box
            key={fIndex}
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: "20px",
              width: "800px",

              backgroundColor: "#ffffff11",
              padding: "10px",
              borderRadius: "10px",

              transition: "all 0.2s ease-in-out",
              ...(checkDependent(field, steps)
                ? {}
                : { opacity: 0, height: 0 }),
            }}
          >
            <Typography
              sx={{
                fontSize: "1.2rem",
                fontWeight: "bold",
              }}
            >
              {field.label}
            </Typography>
            <Slider
              key={fIndex}
              sx={{ width: "100%" }}
              value={field.value}
              min={field.min}
              max={field.max}
              step={1}
              scale={(x) => 2 ** x}
              onChange={(_, v) => {
                field.value = v;
                setSteps([...steps]);
              }}
            />
            <Chip
              label={`${convertBytes(2 ** field.value)}`}
              sx={{
                width: "90px",
                minWidth: "90px",
              }}
            />
          </Box>
        );
      break;

    case "select":
      return (
        <Tooltip title={field.description} arrow placement="right">
          <FormControl>
            <InputLabel>{field.label}</InputLabel>
            <Select
              key={fIndex}
              size="medium"
              sx={{
                width: "400px",
                transition: "all 0.2s ease-in-out",
                ...(checkDependent(field, steps)
                  ? {}
                  : { opacity: 0, height: 0 }),
              }}
              variant="outlined"
              label={field.label}
              value={field.value}
              onChange={(e) => {
                if (!e.target.value)
                  return (field.error = "Please select an option");
                field.error = undefined;
                field.value = e.target.value;
                setSteps([...steps]);
              }}
              error={field.error !== undefined}
            >
              {field.options?.map((option, index) => {
                return <MenuItem value={option.id}>{option.label}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </Tooltip>
      );
    default:
      return (
        <Tooltip title={field.description} arrow placement="right">
          <TextField
            key={fIndex}
            type={field.type}
            size="medium"
            sx={{
              width: "400px",
              transition: "all 0.2s ease-in-out",
              ...(checkDependent(field, steps)
                ? {}
                : { opacity: 0, height: 0, display: "none" }),
              ...(field.dependsOn && { marginLeft: "20px" }),
            }}
            label={field.label}
            variant="outlined"
            value={field.value}
            onChange={(e) => {
              let error = false;
              if (field.type === "string") {
                if (field.max && e.target.value.length > field.max)
                  error = true;
                if (
                  field.type === "string" &&
                  field.min &&
                  e.target.value.length < field.min
                ) {
                  field.error = `Must be at least ${field.min} characters`;
                  error = true;
                }
              } else if (field.type === "number") {
                if (e.target.value.length > 0 && isNaN(Number(e.target.value)))
                  error = true;
                if (field.max && Number(e.target.value) > field.max)
                  error = true;
                if (
                  field.type === "number" &&
                  field.min &&
                  Number(e.target.value) < field.min
                )
                  error = true;
              }

              if (field.required && e.target.value.length === 0) error = true;
              if (!error) field.error = undefined;
              else field.error = "Invalid value";
              field.value = e.target.value;

              setSteps([...steps]);
            }}
            error={field.error !== undefined}
            helperText={field.error}
          />
        </Tooltip>
      );
  }

  return <></>;
}

export default WizardField;

function checkDependent(field: Types.WizardField, steps: Types.WizardStep[]) {
  if (!field.dependsOn) return true;

  let dep: Types.WizardField | undefined;
  for (const step of steps) {
    for (const category of step.categories) {
      let f = category.fields.find((f) => f.id === field.dependsOn);
      if (!f) continue;
      dep = f;
      break;
    }
  }
  if (!dep) return false;

  switch (dep.type) {
    case "switch":
      if (field.dependsOnValues && field.dependsOnValues?.includes(dep.value))
        return true;
      break;
    case "string":
      if (field.dependsOnValues && field.dependsOnValues?.includes(dep.value))
        return true;
      break;
    case "number":
      if (field.dependsOnValues && field.dependsOnValues?.includes(dep.value))
        return true;
      break;
    case "select":
      if (field.dependsOnValues && field.dependsOnValues?.includes(dep.value))
        return true;
      break;
    default:
      return true;
  }

  return false;
}
