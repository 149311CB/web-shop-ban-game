import { TextField } from "@mui/material";
import React from "react";
import { InputValidationType } from "../../hooks/useFormValidation";

const FirstName: React.FC<{
  setFirstName: Function;
  firstNameValidation: InputValidationType;
}> = ({ setFirstName, firstNameValidation }) => {
  return (
    <TextField
      error={firstNameValidation.false}
      helperText={firstNameValidation?.message}
      id="first-name"
      label="First Name"
      variant="outlined"
      type="text"
      sx={{ width: "100%" }}
      onChange={(e) => {
        setFirstName(e.target.value);
      }}
    />
  );
};

export default React.memo(FirstName);
