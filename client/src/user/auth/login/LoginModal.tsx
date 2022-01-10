import { Box, Button, Divider } from "@mui/material";
import React from "react";
import EmailStrategy from "./email/EmailStrategy";
import FacebookStrategy from "./facebook/FacebookStrategy";
import GoogleStrategy from "./google/GoogleStrategy";

const LoginModal: React.FC<{
  setRegister: Function;
  setResetPass: Function;
}> = ({ setRegister, setResetPass }) => {
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
        }}
      >
        Or
      </Divider>
      <Button
        sx={{
          fontFamily: "brutal-regular",
          textTransform: "none",
          width: "100%",
          justifyContent: "right",
          padding: 0,
          "&:hover": { bgcolor: "transparent" },
          marginBottom: "0.9rem",
        }}
        onClick={() => {
          setResetPass(true);
        }}
      >
        Reset password
      </Button>
      <FacebookStrategy />
      <GoogleStrategy />
    </Box>
  );
};

export default LoginModal;
