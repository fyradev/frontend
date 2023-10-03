import {
  Avatar,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Divider,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getBaseUrl from "../common/getBaseUrl";
import WizardField from "../components/WizardField";
import WizardInternalStep from "../components/WizardInternalStep";
import { Warning } from "@mui/icons-material";

function AppsWizard() {
  const params = useParams<{ env: string }>();

  const [followViewport, setFollowViewport] = useState<boolean>(false);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [env, setEnv] = useState<Types.AppEnv>();

  const [completed, setCompleted] = useState<boolean>(false);
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
          seperate: false,
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
          seperate: false,
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
    {
      title: "Access",
      error: undefined,
      complete: false,
      internalID: "internal_perms",
      categories: [],
    },
    {
      title: "Template",
      error: undefined,
      complete: false,
      internalID: "internal_template",
      categories: [],
    },
    // {
    //   title: "Summary",
    //   error: undefined,
    //   complete: false,
    //   internalID: "internal_summary",
    //   categories: [],
    // },
  ]);

  useEffect(() => {
    let listener = () => {
      if (window.scrollY > 100) setFollowViewport(true);
      else setFollowViewport(false);
    };

    document.addEventListener("scroll", listener);
    return () => document.removeEventListener("scroll", listener);
  }, []);

  useEffect(() => {
    setLoaded(false);

    axios
      .get(`${getBaseUrl()}/api/apps/envs/get/${params.env}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setEnv(res.data.data);

        const data = res.data.data as Types.AppEnv;
        if (!data.arguments || data.arguments.length === 0)
          return setLoaded(true);

        const customStep: Types.WizardStep = {
          title: "Custom",
          error: undefined,
          complete: false,
          categories: [
            {
              title: "Arguments",
              fields: [],
            },
          ],
        };
        for (const arg of data.arguments) {
          customStep.categories[0].fields.push({
            id: arg.id,
            label: arg.label,
            description: arg.description,
            type: arg.type as Types.WizardFieldTypes,
            dataType: arg.dataType as Types.WizardFieldTypesDataTypes,
            required: arg.required,
            dependsOn: arg.dependsOn,
            dependsOnValues: arg.dependsOnValues,
            value: arg.value,
            min: arg.min,
            max: arg.max,
            error: arg.required && !arg.value ? "Required" : undefined,
            options: arg.options,
          });
        }
        steps.push(customStep);

        setSteps([...steps]);
        setLoaded(true);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.env]);

  useEffect(() => {
    let complete = true;
    for (const step of steps) {
      if (step.internalID) continue;
      if (!complete) break;

      for (const category of step.categories) {
        if (!complete) break;
        for (const field of category.fields) {
          if (field.dependsOn) {

            let dep: Types.WizardField | undefined;

            for (const s of steps) {
              if(dep) break;
              for (const c of s.categories) {
                if(dep) break;
                const f = c.fields.find((f) => f.id === field.dependsOn);
                if (f) dep = f;
              }
            }
            if (!dep) continue;
            if (field.dependsOnValues && !field.dependsOnValues.includes(dep.value)) continue;
          }
          if (field.error) complete = false;
        }
      }
    }

    setCompleted(complete);
  }, [steps]);

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

      <Box
        sx={{
          width: "100%",
          height: "auto",

          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "space-between",

          gap: "20px",
        }}
      >
        {/* ---------------------------------------------------------------- */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "100px",
            width: `calc(100% - 450px)`,
            pb: "500px",
          }}
        >
          {steps.map((step, index) => {
            return (
              <>
                {step.internalID && (
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      justifyContent: "flex-start",
                      gap: "40px",

                      mt: "30px",
                    }}
                  >
                    <Box
                      id={`step-${index}`}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        justifyContent: "flex-start",

                        width: "100%",
                        scrollMarginTop: "50px",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "2.5rem",
                          fontWeight: "bold",
                        }}
                      >
                        {step.title}
                      </Typography>
                      <Divider sx={{ width: "100%" }} />
                    </Box>
                    <WizardInternalStep
                      type={step.internalID as Types.WizardInternalAvailSteps}
                      env={env}
                      stepsIndex={index}
                      stepsHook={[steps, setSteps]}
                    />
                  </Box>
                )}
                {!step.internalID && (
                  <Box
                    sx={{
                      width: "100%",

                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      justifyContent: "flex-start",
                      gap: "40px",

                      mt: "30px",
                    }}
                  >
                    <Box
                      id={`step-${index}`}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        justifyContent: "flex-start",

                        width: "100%",
                        scrollMarginTop: "50px",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "2.5rem",
                          fontWeight: "bold",
                        }}
                      >
                        {step.title}
                      </Typography>
                      <Divider sx={{ width: "100%" }} />
                    </Box>
                    {step.categories?.map((category, cIndex) => {
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

                            pl: "20px",
                          }}
                        >
                          {category.seperate && (
                            <>
                              <Divider
                                sx={{ width: "100%", mb: "15px" }}
                                textAlign="left"
                              >
                                <Typography
                                  sx={{
                                    fontSize: "1.1rem",
                                    fontWeight: "bold",
                                  }}
                                >
                                  {category.title}
                                </Typography>
                              </Divider>
                            </>
                          )}

                          {category.fields.map((field, fIndex) => {
                            return (
                              <WizardField
                                key={fIndex}
                                field={field}
                                fIndex={fIndex}
                                stepsHook={[steps, setSteps]}
                              />
                            );
                          })}
                        </Box>
                      );
                    })}
                  </Box>
                )}
              </>
            );
          })}
        </Box>

        {/* ---------------------------------------------------------------- */}

        <Box
          sx={{
            position: "relative",
            right: "30px",
            width: "15vw",
            height: `calc(${steps.length + 1} * 80px - 52px)`,

            userSelect: "none",
            cursor: "pointer",

            display: "flex",
            flexDirection: "column",
            gap: "15px",

            padding: "20px",
            mt: "30px",
            ml: "30px",

            backgroundColor: "#ffffff11",

            transition: "all 0.2s ease-in-out",
            ...(followViewport && {
              position: "fixed",
              top: "60px",
            }),
          }}
        >
          {steps.map((step, index) => {
            return (
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "20px",

                  backgroundColor: "#ffffff11",
                  padding: "10px",
                  pl: "15px",

                  transition: "all 0.2s ease-in-out",
                  "&:hover": {
                    pl: "25px",
                  },
                }}
                onClick={() => {
                  const element = document.getElementById(`step-${index}`);
                  if (!element) return;

                  element.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                    inline: "start",
                  });
                }}
              >
                <Typography>{step.title}</Typography>

                {step.categories.some((category) => {
                  return category.fields.some((field) => {
                    if(field.dependsOn) {
                      let dep: Types.WizardField | undefined;

                      for (const s of steps) {
                        if(dep) break;
                        for (const c of s.categories) {
                          if(dep) break;
                          const f = c.fields.find((f) => f.id === field.dependsOn);
                          if (f) dep = f;
                        }
                      }
                      if (!dep) return false;
                      if (field.dependsOnValues && !field.dependsOnValues.includes(dep.value)) return false;
                    }
                    return field.error;
                  });
                }) && <Warning color="error" />}
              </Box>
            );
          })}

          <Button
            disabled={!completed}
            variant="contained"
            sx={{
              width: "100%",
              mt: "auto",
            }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default AppsWizard;
