import { TextField } from "@mui/material";
import React from "react";
import { InputValidationType } from "../../hooks/useFormValidation";

const ConfirmPassword: React.FC<{
  setConfirmPass: Function;
  confirmPassValidation: InputValidationType;
}> = ({ setConfirmPass, confirmPassValidation }) => {
  return (
    <TextField
      error={confirmPassValidation.false}
      helperText={confirmPassValidation?.message}
      id="confirm-password"
      label="Confirm Password"
      variant="outlined"
      type="password"
      sx={{ width: "100%" }}
      onChange={(e) => {
        setConfirmPass(e.target.value);
      }}
    />
  );
};

export default React.memo(ConfirmPassword);
