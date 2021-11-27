import { TextField } from "@mui/material";
import React from "react";
import { InputValidationType } from "../../hooks/useFormValidation";

const Email: React.FC<{
  setEmail: Function;
  emailValidation: InputValidationType;
}> = ({ setEmail, emailValidation }) => {
  return (
    <TextField
      error={emailValidation.false}
      helperText={emailValidation?.message}
      id="email"
      label="Email"
      variant="outlined"
      type="email"
      sx={{ width: "100%" }}
      onChange={(e) => {
        setEmail(e.target.value);
      }}
    />
  );
};

export default Email;
