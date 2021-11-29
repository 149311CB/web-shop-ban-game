import { Box, Button, Divider } from "@mui/material";
import React, { createContext, useEffect, useMemo, useState } from "react";
import { useCookies } from "react-cookie";
import EmailStrategy from "./email/EmailStrategy";
import FacebookStrategy from "./facebook/FacebookStrategy";

export const LoginContext = createContext<any>(null);
const LoginModal: React.FC<{ setRegister: Function }> = ({ setRegister }) => {
  const [token, setToken] = useState(null);
  const [loginMethods, setLoginMethods] = useState<any[]>([
    <EmailStrategy preview={true} key={"email"}/>,
  ]);
  const [choosenLoginMethod, setChoosenLoginMethod] = useState(<FacebookStrategy />);
  /*eslint-disable*/
  const [cookies, setCookie] = useCookies(["login_token"]);

  const value = useMemo(() => {
    return {
      setToken,
    };
  }, [setToken]);

  useEffect(() => {
    if (!token) return;
    setCookie("login_token", token, {
      path: "/",
      domain: "localhost",
      // sameSite: "none",
    });
  }, [token, setCookie]);

  return (
    <LoginContext.Provider value={value}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
        {choosenLoginMethod}
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
        {loginMethods.map((method: any) => {
          return method.type.name !== choosenLoginMethod.type.name
            ? method
            : null;
        })}
      </Box>
    </LoginContext.Provider>
  );
};

export default LoginModal;
