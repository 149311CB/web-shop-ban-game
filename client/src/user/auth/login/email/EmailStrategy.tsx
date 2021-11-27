import { alpha, Button, styled, Box } from "@mui/material";
import axios from "axios";
import React, { FormEvent, useContext, useEffect, useState } from "react";
import { getTransparentOverlay } from "../../../../utils/transparentOverlay";
import Email from "../../../../components/form/Email";
import Password from "../../../../components/form/Password";
import { useInputValidation } from "../../../../hooks/useFormValidation";
import { GlobalContext } from "../../../../App";

const EmailLoginPreview = styled(Button)(({ theme }) => ({
  width: "100%",
  color: theme.palette.text.primary,
  fontFamily: "brutal-regular",
  fontSize: "0.75rem",
  position: "relative",
  border: "1px",
  borderStyle: "solid",
  borderColor: alpha(theme.palette.text.primary, 0.23),
  "&::after": {
    ...getTransparentOverlay({ alpha: 0, background: "hsl(100, 100%, 100%)" }),
  },
  padding: "0.9rem 0",
  backgroundColor: "hsl(0,0%,17%)",
  "&:hover": {
    backgroundColor: "transparent",
    "&::after": {
      opacity: "0.05",
    },
  },
}));

const EmailStrategy: React.FC<{ preview?: boolean }> = ({
  preview = false,
}) => {
  const [disabled, setDisabled] = useState(true);
  const [email, setEmail, emailValidation] = useInputValidation(null, {
    isEmail: true,
  });
  const [password, setPassword, passwordValidation] = useInputValidation();
  const values = useContext(GlobalContext);

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (disabled) {
      return;
    }
    const { data } = await axios.post("/api/users/login", {
      email,
      password,
    });
    const { token } = data;
    if (token && values.setLoginToken) {
      values.setLoginToken(token);
    }
  };

  useEffect(() => {
    if (
      emailValidation.false !== undefined &&
      passwordValidation.false !== undefined &&
      !emailValidation.false &&
      !passwordValidation.false
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [emailValidation.false, passwordValidation.false]);

  if (preview) {
    return <EmailLoginPreview>Login by email</EmailLoginPreview>;
  }

  return (
    <Box>
      <form
        id={"login-by-email-and-password-form"}
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "1.2rem",
        }}
        onSubmit={(e) => submitHandler(e)}
      >
        <Email setEmail={setEmail} emailValidation={emailValidation} />
        <Password
          setPassword={setPassword}
          passwordValidation={passwordValidation}
        />
        <Button
          type={"submit"}
          sx={{
            color: "text.primary",
            bgcolor: "info.main",
            fontFamily: "brutal-medium",
            fontSize: "0.75rem",
            width: "100%",
            padding: "0.9rem 0",
            marginTop: "0.9rem",
            "&:hover": {
              backgroundColor: "action.hover",
            },
          }}
          disabled={disabled}
        >
          Login
        </Button>
      </form>
    </Box>
  );
};

export default React.memo(EmailStrategy);
