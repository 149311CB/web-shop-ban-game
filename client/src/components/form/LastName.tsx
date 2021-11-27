import { TextField } from "@mui/material";
import React from "react";
import { InputValidationType } from "../../hooks/useFormValidation";

const LastName: React.FC<{
  setLastName: Function;
  lastNameValidation: InputValidationType;
}> = ({ setLastName, lastNameValidation }) => {
  return (
    <TextField
      error={lastNameValidation.false}
      helperText={lastNameValidation?.message}
      id="last-name"
      label="Last Name"
      variant="outlined"
      type="text"
      sx={{ width: "100%" }}
      onChange={(e) => {
        setLastName(e.target.value);
      }}
    />
  );
};

export default LastName;
