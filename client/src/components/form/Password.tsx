import { TextField } from "@mui/material";
import React from "react";
import { InputValidationType } from "../../hooks/useFormValidation";

const Password: React.FC<{
  setPassword: Function;
  passwordValidation: InputValidationType;
}> = ({ setPassword, passwordValidation }) => {
  return (
    <TextField
      error={passwordValidation.false}
      helperText={passwordValidation.message}
      id="password"
      label="Password"
      variant="outlined"
      type="password"
      sx={{ width: "100%" }}
      onChange={(e) => {
        setPassword(e.target.value);
      }}
    />
  );
};

export default Password;
