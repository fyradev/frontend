import {
  Avatar,
  Backdrop,
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  Slider,
  Step,
  StepButton,
  StepLabel,
  Stepper,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getBaseUrl from "../common/getBaseUrl";
import convertBytes from "../common/convertBytes";
import TooltipQuestion from "../components/TooltipQuestion";

function AppsWizard() {
  const params = useParams<{ env: string }>();
  const [loaded, setLoaded] = useState<boolean>(false);
  const [env, setEnv] = useState<Types.AppEnv>();

  const [step, setStep] = useState<number>(0);
  const [steps, setSteps] = useState<Types.WizardStep[]>([
    {
      title: "General",
      error: undefined,
      complete: false,
      categories: [
        {
          title: "General",
          fields: [
            {
              id: "name",
              label: "Name",
              type: "string",
              value: "",
              required: true,
              min: 3,
              max: 20,
              error: "Must be at least 3 characters",
            },
            {
              id: "comment",
              label: "Comment",
              type: "string",
              value: "",
              required: false,
              min: 0,
              max: 100,
              error: undefined,
            },
          ],
        },
      ],
    },
    {
      title: "Resources",
      error: undefined,
      complete: false,
      categories: [
        {
          title: "CPU",
          seperate: true,
          fields: [
            {
              id: "cpu",
              label: "CPU",
              type: "slider",
              dataType: "percentage",
              value: 100,
              required: true,
              min: 5,
              max: 100,
              error: undefined,
            },
            {
              id: "cpu-enforce",
              label: "Enforce CPU limit",
              description:
                "Whether to kill the process if it exceeds the CPU limit",
              type: "switch",
              value: false,
              required: false,
              error: undefined,
            },
          ],
        },
        {
          title: "Memory",
          seperate: true,
          fields: [
            {
              id: "memory",
              label: "Memory",
              type: "slider",
              dataType: "bytes",
              value: 30,
              required: true,
              min: 20,
              max: 34,
              error: undefined,
            },
            {
              id: "memory-enforce",
              label: "Enforce memory limit",
              description:
                "Whether to kill the process if it exceeds the memory limit",
              type: "switch",
              value: false,
              required: false,
              error: undefined,
            },
          ],
        },
      ],
    },
    { title: "Summary", error: undefined, complete: false, categories: [] },
  ]);

  useEffect(() => {
    setStep(0);
    setLoaded(false);

    axios
      .get(`${getBaseUrl()}/api/apps/envs/get/${params.env}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setEnv(res.data.data);
        setLoaded(true);
      });
  }, [params.env]);

  const checkStep = (step: number) => {
    if (!env) return;

    const activeStep = steps[step];
    activeStep.complete = activeStep.categories.every((category) => {
      return category.fields.every((field) => {
        if (field.required && (field.value === "" || !field.value))
          return false;
        if (field.error) return false;
        return true;
      });
    });

    if (activeStep.complete) activeStep.error = undefined;

    steps[step] = activeStep;
    setSteps([...steps]);
  }

  if (!loaded)
    return (
      <Backdrop open={true}>
        <CircularProgress size="3rem" />
      </Backdrop>
    );

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",

        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          width: "100%",
          marginBottom: "30px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: "15px",

          backgroundColor: "#ffffff11",
          padding: "10px",
          px: "20px",
          mt: "15px",
          borderRadius: "10px",
        }}
      >
        <Avatar
          sx={{
            width: "50px",
            height: "50px",
          }}
          src={`${getBaseUrl()}/api/apps/envs/icon/${env?.id}`}
        >
          {env?.name}
        </Avatar>
        <Typography
          sx={{
            fontSize: "2rem",
            fontWeight: "bold",
          }}
        >
          {env?.name}
        </Typography>
      </Box>

      {/* ---------------------------------------------------------------- */}

      <Box
        sx={{
          width: "100%",
          height: "100%",
          marginBottom: "30px",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          gap: "15px",

          padding: "10px",
          px: "20px",
        }}
      >
        <Stepper
          activeStep={step}
          nonLinear
          sx={{
            width: "100%",
            px: "30px",
          }}
        >
          {steps.map((step, index) => {
            const labelProps: {
              optional?: React.ReactNode;
              error?: boolean;
            } = {};
            if (step.error) {
              labelProps.optional = (
                <Typography variant="caption" color="error">
                  {step.error}
                </Typography>
              );
              labelProps.error = true;
            }
            if (
              step.categories.some((category) =>
                category.fields.some((field) => field.error)
              )
            )
              labelProps.error = true;

            return (
              <Step key={index} completed={step.complete}>
                <StepButton
                  optional={labelProps.optional}
                  onClick={() => setStep(index)}
                >
                  <StepLabel {...labelProps}>{step.title}</StepLabel>
                </StepButton>
              </Step>
            );
          })}
        </Stepper>

        {/* ---------------------------------------------------------------- */}

        <Box
          sx={{
            width: "100%",
            height: "100%",

            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            gap: "40px",

            px: "0px",
            mt: "30px",
          }}
        >
          {/* eslint-disable-next-line array-callback-return */}
          {steps[step].categories?.map((category, cIndex) => {
            return (
              <Box
                key={cIndex}
                sx={{
                  width: "800px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  gap: "20px",
                }}
              >
                {category.seperate && (
                  <>
                    <Typography
                      sx={{
                        fontSize: "1.5rem",
                        fontWeight: "bold",
                      }}
                    >
                      {category.title}
                    </Typography>

                    <Divider sx={{ width: "100%", mb: "15px" }} />
                  </>
                )}

                {/* eslint-disable-next-line array-callback-return */}
                {category.fields.map((field, fIndex) => {
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

                    default:
                      return (
                        <TextField
                          key={fIndex}
                          type={field.type}
                          sx={{ width: "800px" }}
                          label={`${field.label}`}
                          variant="outlined"
                          value={field.value}
                          onChange={(e) => {
                            let error = false;
                            if (field.type === "string") {
                              if (
                                field.max &&
                                e.target.value.length > field.max
                              )
                                return (error = true);
                              if (
                                field.type === "string" &&
                                field.min &&
                                e.target.value.length < field.min
                              ) {
                                field.error = `Must be at least ${field.min} characters`;
                                error = true;
                              }
                            } else if (field.type === "number") {
                              if (
                                e.target.value.length > 0 &&
                                isNaN(Number(e.target.value))
                              )
                                return (error = true);
                              if (
                                field.max &&
                                Number(e.target.value) > field.max
                              )
                                return (error = true);
                              if (
                                field.type === "number" &&
                                field.min &&
                                Number(e.target.value) < field.min
                              )
                                return (error = true);
                            }

                            if (!error) field.error = undefined;
                            field.value = e.target.value;

                            setSteps([...steps]);
                          }}
                          error={field.error !== undefined}
                          helperText={field.error}
                        />
                      );
                  }
                })}
              </Box>
            );
          })}
        </Box>

        {/* ---------------------------------------------------------------- */}

        <Box
          sx={{
            width: "100%",

            mt: "auto",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Button
            variant="contained"
            disabled={step === 0}
            onClick={() => {
              checkStep(step);
              setStep((step) => step - 1)
            }}
          >
            Back
          </Button>
          <Button
            variant="contained"
            disabled={
              step === steps.length - 1 && !steps.every((e) => e.complete)
            }
            onClick={() => {
              if (step < steps.length - 1) {
                checkStep(step);
                setStep((step) => step + 1);
              }
              else {
              }
            }}
          >
            {step < steps.length - 1 ? "Next" : "Finish"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default AppsWizard;
