import { DesktopDatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { Box, Divider, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import LabelWrapper from "../../../components/LabelWrapper";
import { PrimaryButton } from "../../../components/PrimaryButton";

const PersonalDetails: React.FC<{ personalDetails: any }> = ({
  personalDetails,
}) => {
  const [birthday, setBirthday] = useState(personalDetails.birth_day);
  return (
    <div>
      <Typography variant={"h2"} sx={{ fontFamily: "brutal-regular" }}>
        Personal Details
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Box sx={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
        <Box
          sx={{ display: "flex", gap: "3.9rem", "&>div": { width: "100%" } }}
        >
          <LabelWrapper name={"Fist Name"}>
            <TextField
              id="outlined-required"
              defaultValue={personalDetails.first_name}
              size={"small"}
              sx={{ width: "100%" }}
            />
          </LabelWrapper>
          <LabelWrapper name={"Last Name"}>
            <TextField
              id="outlined-required"
              defaultValue={personalDetails.last_name}
              size={"small"}
              sx={{ width: "100%" }}
            />
          </LabelWrapper>
        </Box>
        <Box
          sx={{ display: "flex", gap: "3.9rem", "&>div": { width: "100%" } }}
        >
          <LabelWrapper name={"Phone number"}>
            <TextField
              id="outlined-required"
              defaultValue={personalDetails.phone_number}
              sx={{ minWidth: "206px", width: "100%" }}
              size={"small"}
            />
          </LabelWrapper>
          <LabelWrapper name={"Birthday"}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                inputFormat="MM/dd/yyyy"
                value={birthday}
                onChange={(value) => {
                  setBirthday(value);
                }}
                renderInput={(params: any) => (
                  <TextField
                    {...params}
                    size={"small"}
                    sx={{ width: "100%" }}
                  />
                )}
              />
            </LocalizationProvider>
          </LabelWrapper>
        </Box>
        <PrimaryButton>Save changes</PrimaryButton>
      </Box>
    </div>
  );
};

export default PersonalDetails;
