import { Grid, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import CenteredLoadingSpinner from "./CenteredLoadingSpinner";
import getBaseUrl from "../common/getBaseUrl";
import axios from "axios";
import WizardInternalPerms from "./WizardInternalPerms";
import WizardSummary from "./WizardInternalSummary";

function WizardInternalStep({
  type,
  env,
  stepsIndex,
  stepsHook: [steps, setSteps],
}: {
  type: Types.WizardInternalAvailSteps;
  env: Types.AppEnv | undefined;
  stepsIndex: number;
  stepsHook: [
    Types.WizardStep[],
    React.Dispatch<React.SetStateAction<Types.WizardStep[]>>
  ];
}): JSX.Element {
  const [data, setData] = useState({} as any);
  const [loaded, setLoaded] = useState(false);

  const theme = useTheme();

  useEffect(() => {
    setData({} as any);
    setLoaded(false);

    switch (type) {
      // TODO: Request data from backend (envs/templates/getAll.ts)
      case "internal_template":
        axios
          .get(`${getBaseUrl()}/api/apps/envs/templates/getAll/${env?.id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((res) => {
            setData(res.data);
            setLoaded(true);
          });
        break;
      case "internal_perms":
        (async () => {
          const meReq = axios.get(`${getBaseUrl()}/api/users/me`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });

          const allUsersReq = axios.get(`${getBaseUrl()}/api/users/get`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });

          const [meRes, allUsersRes] = await axios.all([meReq, allUsersReq]);
          const data: {
            me: Types.User;
            allUsers: Types.UserWithPermissions[];
          } = {
            me: meRes.data.user,
            allUsers: allUsersRes.data.users,
          };

          setData(data);

          setLoaded(true);
        })();
        break;
      default:
        setLoaded(true);
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  useEffect(() => {
    return () => {
      steps[stepsIndex].complete = true;
      setSteps([...steps]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!loaded) return <CenteredLoadingSpinner />;

  switch (type) {
    case "internal_template":
      if (data.data?.length === 0)
        return (
            <Typography
              sx={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                pl: "20px",
              }}
            >
              No templates avaliable.
            </Typography>
        );

      return (
        <Grid
          container
          sx={{
            width: "100%",
            mt: "20px",
            pl: "20px",
          }}
        >
          {data.data?.map((v: any, i: number) => {
            return (
              <Grid
                item
                xs={4}
                key={i}
                sx={{
                  backgroundColor: "#ffffff11",
                  padding: "20px",
                  borderRadius: "10px",
                  cursor: "pointer",

                  userSelect: "none",

                  transition: "all 0.2s ease-in-out",
                  "&:hover": {
                    backgroundColor: "#ffffff22",
                    transform: "scale(1.01)",
                  },

                  ...(steps[stepsIndex].internalValue === v.file && {
                    border: `2px solid ${theme.palette.primary.main}`,

                    "&:hover": {},
                  }),
                }}
                onClick={() => {
                  if (steps[stepsIndex].internalValue === v.file)
                    steps[stepsIndex].internalValue = undefined;
                  else steps[stepsIndex].internalValue = v.file;

                  setSteps([...steps]);
                }}
              >
                <Typography
                  sx={{
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                  }}
                >
                  {v.name}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "0.75rem",
                    fontWeight: "light",
                    fontStyle: "italic",
                    opacity: 0.5,
                    mt: "-5px",
                  }}
                >
                  {v.version}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "1rem",
                  }}
                >
                  {v.description}
                </Typography>
              </Grid>
            );
          })}
        </Grid>
      );
    case "internal_perms":
      return (
        <WizardInternalPerms
          loaded={loaded}
          dataHook={[
            data as {
              me: Types.User;
              allUsers: Types.User[];
            },
            setData as React.Dispatch<
              React.SetStateAction<{
                me: Types.User;
                allUsers: Types.User[];
              }>
            >,
          ]}
          stepIndex={stepsIndex}
          stepsHook={[steps, setSteps]}
        />
      );
    case "internal_summary":
      return <WizardSummary steps={steps} />;
  }
}

export default WizardInternalStep;
