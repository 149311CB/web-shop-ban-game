import { Box, Button, Divider } from "@mui/material";
import React from "react";
import FacebookStrategy from "../login/facebook/FacebookStrategy";
import GoogleStrategy from "../login/google/GoogleStrategy";
import Email from "./email/EmailStrategy";

const RegisterModal: React.FC<{ setRegister: Function }> = ({
  setRegister,
}) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
      <Email />
      <Button
        sx={{
          fontFamily: "brutal-regular",
          textTransform: "none",
          width: "100%",
          justifyContent: "right",
          padding: 0,
          "&:hover": { bgcolor: "transparent" },
        }}
        onClick={() => {
          setRegister(false);
        }}
      >
        Already have an account? Login now!
      </Button>
      <Divider
        orientation={"horizontal"}
        sx={{
          fontFamily: "brutal-regular",
          fontSize: "0.813rem",
          padding: "0.9rem 0",
        }}
      >
        Or
      </Divider>
      <FacebookStrategy register={true}/>
      <GoogleStrategy register={true}/>
    </Box>
  );
};

export default RegisterModal;
