import { Box, Button, Divider } from "@mui/material";
import React from "react";
import EmailStrategy from "./email/EmailStrategy";
import FacebookStrategy from "./facebook/FacebookStrategy";
import GoogleStrategy from "./google/GoogleStrategy";

const LoginModal: React.FC<{
  setRegister: Function;
}> = ({ setRegister }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
      <EmailStrategy />
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
          setRegister(true);
        }}
      >
        Don't have an account? Create one now!
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
      <FacebookStrategy />
      <GoogleStrategy />
    </Box>
  );
};

export default LoginModal;
