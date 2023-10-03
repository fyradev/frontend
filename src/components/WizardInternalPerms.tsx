import {
  Autocomplete,
  Box,
  Checkbox,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import {
  CheckBox,
  CheckBoxOutlineBlank,
  Delete,
  PersonAdd,
  Search,
} from "@mui/icons-material";
import { useEffect, useState } from "react";

function WizardInternalPerms({
  loaded,
  dataHook: [data, setData],
  stepIndex,
  stepsHook: [steps, setSteps],
}: {
  loaded: boolean;
  dataHook: [
    {
      me: Types.User;
      allUsers: Types.User[];
    },
    React.Dispatch<
      React.SetStateAction<{
        me: Types.User;
        allUsers: Types.User[];
      }>
    >
  ];
  stepIndex: number;
  stepsHook: [
    Types.WizardStep[],
    React.Dispatch<React.SetStateAction<Types.WizardStep[]>>
  ];
}): JSX.Element {
  const [selectedUsers, setSelectedUsers] = useState([
    ...(steps[stepIndex].internalValue || [
      { ...data.me, permissions: ["admin"] },
    ]),
  ] as Types.UserWithPermissions[]);

  useEffect(() => {
    steps[stepIndex].internalValue = [...selectedUsers];
    setSteps([...steps]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedUsers]);

  if (!loaded) return <></>;
  if (!data.me || !data.allUsers) return <></>;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",

        mt: "20px",
        pl: "20px",
      }}
    >
      <Autocomplete
        disablePortal
        options={data.allUsers.filter(
          (u) =>
            u.id !== data.me.id &&
            !selectedUsers.map((u) => u.id).includes(u.id)
        )}
        getOptionLabel={(option) => option.username}
        sx={{
          width: "100%",
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={
              <Box sx={{ display: "flex", flexDirection: "row", gap: "5px" }}>
                <Search /> <Typography>Add</Typography>
              </Box>
            }
          />
        )}
        value={null}
        onChange={(e, v) => {
          if (!v) return;
          if (!v.id || !v.username) return;
          if (
            selectedUsers.map((u) => u.id).includes(v.id) ||
            selectedUsers.map((u) => u.username).includes(v.username)
          )
            return;
          setSelectedUsers([
            ...selectedUsers,
            { ...v, permissions: ["admin"] },
          ]);

          e.preventDefault();
        }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",

          width: "100%",
          mt: "20px",
        }}
      >
        {selectedUsers.map((u, i) => {
          const isMe: boolean = u.id === data.me.id;
          return (
            <Box
              key={i}
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",

                width: "100%",

                backgroundColor: "#ffffff11",
                borderRadius: "10px",
                padding: "10px",

                ...(isMe && {
                  cursor: "not-allowed",
                }),
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "15px",
                  alignItems: "center",
                }}
              >
                <PersonAdd />
                <Typography
                  sx={{
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                  }}
                >
                  {u.username}{" "}
                  {isMe && (
                    <strong
                      style={{
                        fontWeight: "lighter",
                        opacity: 0.5,
                      }}
                    >
                      (You)
                    </strong>
                  )}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "10px",
                  alignItems: "center",
                }}
              >
                <Autocomplete
                  multiple
                  disabled={isMe}
                  options={[
                    "admin",
                    "edit",
                    "view",
                    "delete",
                    "deploy",
                    "files",
                    "console",
                  ]}
                  disableCloseOnSelect
                  size="small"
                  getOptionLabel={(option) => option}
                  renderOption={(props, option, { selected }) => (
                    <li {...props}>
                      <Checkbox
                        icon={<CheckBoxOutlineBlank fontSize="small" />}
                        checkedIcon={<CheckBox fontSize="small" />}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {option}
                    </li>
                  )}
                  style={{ width: "500px" }}
                  renderInput={(params) => <TextField {...params} />}
                  value={u.permissions}
                  onChange={(e, v) => {
                    if (isMe) return;
                    u.permissions = v as Types.AppPermissions[];
                    setSelectedUsers([...selectedUsers]);
                  }}
                />

                <IconButton
                  disabled={isMe}
                  onClick={() => {
                    if (isMe) return;
                    setSelectedUsers(selectedUsers.filter((_, ii) => ii !== i));
                  }}
                >
                  <Delete fontSize="small" />
                </IconButton>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

export default WizardInternalPerms;
