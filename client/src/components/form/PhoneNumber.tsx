import { TextField } from "@mui/material";
import React from "react";
import { InputValidationType } from "../../hooks/useFormValidation";

const PhoneNumber: React.FC<{
  setPhoneNumber: Function;
  phoneValidation: InputValidationType;
}> = ({ setPhoneNumber, phoneValidation }) => {
  return (
    <TextField
      error={phoneValidation.false}
      helperText={phoneValidation.message}
      id="phone-number"
      label="Phone Number"
      variant="outlined"
      type="text"
      sx={{ width: "100%" }}
      onChange={(e)=>{
        setPhoneNumber(e.target.value)
      }}
    />
  );
};

export default PhoneNumber;
