import { alpha, Box, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { FormEvent, useContext } from "react";
import { GlobalContext } from "../../../App";
import LabelWrapper from "../../../components/LabelWrapper";
import { PrimaryButton } from "../../../components/PrimaryButton";
import { useInputValidation } from "../../../hooks/useFormValidation";

const ChangeEmail: React.FC<{
  email: string;
  setSnackBarMess: Function;
  setOpen: Function;
}> = ({ email, setSnackBarMess, setOpen }) => {
  const [newEmail, setNewEmail, validation] = useInputValidation(null, {
    isEmail: true,
  });

  const [password, setPassword, passValidation] = useInputValidation();
  const { loginToken } = useContext(GlobalContext);
  const submitChange = async (e: FormEvent) => {
    e.preventDefault();
    await axios
      .post(
        "https://web-shop-ban-game-server.onrender.com/api/users/profile/update/email",
        { email: newEmail, password: password },
        {
          headers: {
            Authorization: `Bearer ${loginToken}`,
          },
        }
      )
      .then(({ status }) => {
        if (status === 200) {
          setNewEmail(null);
          setPassword(null);
          setOpen(false);
          setSnackBarMess({
            type: "success",
            isShown: true,
            message: `Your email has been changed to ${newEmail}`,
          });
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          setSnackBarMess({
            type: "error",
            isShown: true,
            message: `Wrong password`,
          });
        } else if (err.response.status === 400) {
          setSnackBarMess({
            type: "error",
            isShown: true,
            message: `There is an account with this email already`,
          });
        }
      });
  };

  return (
    <Box
      component={"form"}
      sx={{ ml: "1rem" }}
      onSubmit={(e: FormEvent) => submitChange(e)}
    >
      <Typography sx={{ pb: 3 }}>
        <strong>Current Email:</strong> {email}
      </Typography>
      <LabelWrapper name={"New email"} sx={{ pb: 3 }}>
        <TextField
          error={validation.false}
          helperText={validation.message}
          id="outlined-required"
          type="email"
          placeholder={"Enter your new email"}
          sx={{
            pt: 1,
            minWidth: "206px",
            width: "100%",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: (theme) => alpha(theme.palette.text.primary, 0.4),
            },
          }}
          size={"small"}
          onChange={(e) => {
            setNewEmail(e.target.value);
          }}
        />
      </LabelWrapper>
      <Box>
        <LabelWrapper name={"Password"} sx={{ pb: 3 }}>
          <TextField
            error={passValidation.false}
            helperText={passValidation.message}
            id="outlined-required"
            type="password"
            placeholder={"Confirm Password"}
            sx={{
              pt: 1,
              minWidth: "206px",
              width: "100%",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: (theme) => alpha(theme.palette.text.primary, 0.4),
              },
            }}
            size={"small"}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </LabelWrapper>
      </Box>
      <Box>
        <PrimaryButton
          type={"submit"}
          sx={{ width: "100%", ml: 0 }}
          disabled={
            passValidation.false ||
            validation.false ||
            validation.false === undefined
          }
        >
          Confirm
        </PrimaryButton>
      </Box>
    </Box>
  );
};

export default ChangeEmail;
