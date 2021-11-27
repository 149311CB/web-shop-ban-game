import { Box, Button } from "@mui/material";
import React, { createContext, useMemo, useState } from "react";
import Email from "./email/EmailStrategy";

export const RegisterContext = createContext<any>(null);
const RegisterModal: React.FC<{ setRegister: Function }> = ({
  setRegister,
}) => {
  const [token, setToken] = useState(null);
  const [choosenRegMethod, setChoosenRegMethod] = useState(<Email />);

  const value = useMemo(() => {
    return {
      setToken,
    };
  }, [setToken]);
  return (
    <RegisterContext.Provider value={value}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
        {choosenRegMethod}
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
      </Box>
    </RegisterContext.Provider>
  );
};

export default RegisterModal;
