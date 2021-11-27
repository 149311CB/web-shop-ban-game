import { alpha, Box, Button, styled, TextField } from "@mui/material";
import axios from "axios";
import { FormEvent, useContext, useEffect, useState } from "react";
import { getTransparentOverlay } from "../../../../utils/transparentOverlay";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import FirstName from "../../../../components/form/FirstName";
import LastName from "../../../../components/form/LastName";
import Password from "../../../../components/form/Password";
import ConfirmPassword from "../../../../components/form/ConfirmPassword";
import { useInputValidation } from "../../../../hooks/useFormValidation";
import PhoneNumber from "../../../../components/form/PhoneNumber";
import Email from "../../../../components/form/Email";
import { GlobalContext } from "../../../../App";

const EmailRegPreview = styled(Button)(({ theme }) => ({
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

const EmailStrategy = () => {
  const [disabled, setDisabled] = useState(true);
  const [birthday, setBirthday] = useState<Date | null>(
    new Date("2014-08-18T21:11:54")
  );
  const [lastName, setLastName, lastNameValidation] = useInputValidation();
  const [firstName, setFirstName, firstNameValidation] = useInputValidation();
  const [email, setEmail, emailValidation] = useInputValidation(null, {
    isEmpty: true,
    isEmail: true,
  });
  const [password, setPassword, passwordValidation] = useInputValidation(null, {
    isEmpty: true,
    securePass: true,
  });
  const [confirmPass, setConfirmPass, confirmPassValidation] =
    useInputValidation(null, {
      isEmpty: true,
      match: password,
    });
  const [phoneNumber, setPhoneNumber, phoneNumberValidation] =
    useInputValidation(null, { isEmpty: false });

  const values = useContext(GlobalContext);

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (disabled) {
      return;
    }

    const { data } = await axios.post("/api/users/register", {
      email,
      password,
      confirm_pass: confirmPass,
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber,
      birthday,
    });
    if (data && data.token) {
      if (values.setLoginToken) {
        values.setLoginToken(data.token);
      }
    }
  };

  useEffect(() => {
    if (
      emailValidation.false === undefined ||
      passwordValidation.false === undefined ||
      confirmPassValidation.false === undefined ||
      firstNameValidation.false === undefined ||
      lastNameValidation.false === undefined ||
      emailValidation.false ||
      passwordValidation.false ||
      confirmPassValidation.false ||
      firstNameValidation.false ||
      lastNameValidation.false ||
      phoneNumberValidation.false
    ) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [
    emailValidation.false,
    passwordValidation.false,
    confirmPassValidation.false,
    firstNameValidation.false,
    lastNameValidation.false,
    phoneNumberValidation.false,
  ]);

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
        <Box sx={{ display: "flex", gap: "0.6rem" }}>
          <FirstName
            setFirstName={setFirstName}
            firstNameValidation={firstNameValidation}
          />
          <LastName
            setLastName={setLastName}
            lastNameValidation={lastNameValidation}
          />
        </Box>
        <Email setEmail={setEmail} emailValidation={emailValidation} />
        <Password
          setPassword={setPassword}
          passwordValidation={passwordValidation}
        />
        <ConfirmPassword
          setConfirmPass={setConfirmPass}
          confirmPassValidation={confirmPassValidation}
        />
        <PhoneNumber
          setPhoneNumber={setPhoneNumber}
          phoneValidation={phoneNumberValidation}
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            label="Date desktop"
            inputFormat="MM/dd/yyyy"
            value={birthday}
            onChange={(value) => {
              setBirthday(value);
            }}
            renderInput={(params: any) => <TextField {...params} />}
          />
        </LocalizationProvider>
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
          Register
        </Button>
      </form>
    </Box>
  );
};

export default EmailStrategy;
