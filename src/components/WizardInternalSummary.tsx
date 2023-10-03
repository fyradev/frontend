import { Box, Divider, Typography } from "@mui/material";
import WizardInternalSummaryField from "./WizardInternalSummaryField";
import { useEffect } from "react";

function WizardSummary({ steps }: { steps: Types.WizardStep[] }) {
  useEffect(() => {
    for(const step of steps.filter(step => !step.complete)) {
      if(step.internalID === "internal_summary") return;
      // check whether all non required fields are filled
      for(const category of step.categories) {
        for(const field of category.fields) {
          if(field.required) continue;
          if(!field.value) return;
        }
      }
    }
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        height: "auto",

        overflowY: "auto",

        display: "flex",
        flexDirection: "column",
        gap: "10px",

        mt: "20px",
      }}
    >
      {steps.map((step, stepIndex) => {
        if(step.internalID === "internal_summary") return (<></>);
        if (step.internalID) {
          switch (step.internalID) {
            case "internal_template":
              return <>Template</>;
            case "internal_perms":
              return <>Permissions</>;
          }
        }

        return (
          <Box sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            width: "100%",
          }}>
            <Box sx={{
              display: "flex",  
              flexDirection: "column",
              mb: "10px",
            }}>
              <Typography sx={{
                fontSize: "1.5rem",
                fontWeight: "bold",
              }}>{step.title}</Typography>

              <Divider sx={{
                width: "100%",
              }} />
            </Box>
            {step.categories.map((category, categoryIndex) => {
              return category.fields.map((field, fieldIndex) => {
                return (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      gap: "20px",
                      width: "100%",

                      backgroundColor: "#ffffff11",
                      padding: "10px",
                      borderRadius: "10px",
                    }}
                  >
                    <Typography sx={{
                      fontWeight: "bold",
                    }}>{field.label}:</Typography>
                    <Box sx={{
                      display: "flex",
                      alignItems: "center", 
                      justifyContent: "flex-start",
                      gap: "10px",
                      width: "auto",
                      backgroundColor: "#000",
                      px: "10px",
                      borderRadius: "10px",
                    }}><WizardInternalSummaryField field={field} /></Box>
                  </Box>
                );
              });
            })}
          </Box>
        );
      })}
    </Box>
  );
}

export default WizardSummary;
