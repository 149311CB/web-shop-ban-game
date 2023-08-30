import { alpha, Box, TextField } from "@mui/material";
import axios from "axios";
import React, { FormEvent, useContext } from "react";
import { GlobalContext } from "../../../App";
import LabelWrapper from "../../../components/LabelWrapper";
import { PrimaryButton } from "../../../components/PrimaryButton";
import { useInputValidation } from "../../../hooks/useFormValidation";

const ChangePassword: React.FC<{
  setSnackBarMess: Function;
  setOpen: Function;
}> = ({ setSnackBarMess, setOpen }) => {
  const [password, setPassword, passValidation] = useInputValidation();
  const [newPassword, setNewPassword, newPassValidation] = useInputValidation(
    null,
    { securePass: true }
  );
  const [confirmPass, setConfirmPass, confirmPassValidation] =
    useInputValidation(null, { match: newPassword });
  const { loginToken } = useContext(GlobalContext);
  const submitChange = async (e: FormEvent) => {
    e.preventDefault();
    await axios
      .post(
        "https://web-shop-ban-game-server.onrender.com/api/users/profile/update/password",
        {
          currentPassword: password,
          newPassword,
          confirmNewPass: confirmPass,
        },
        { headers: { Authorization: `Bearer ${loginToken}` } }
      )
      .then(({ status }) => {
        if (status === 200) {
          setPassword(null);
          setNewPassword(null);
          setConfirmPass(null);
          setOpen(false);
          setSnackBarMess({
            type: "success",
            isShown: true,
            message: `Your password has been changed`,
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
        }
      });
  };
  return (
    <Box
      component={"form"}
      sx={{ ml: "1rem" }}
      onSubmit={(e: FormEvent) => submitChange(e)}
    >
      <LabelWrapper name={"Password"} sx={{ pb: 3 }}>
        <TextField
          error={passValidation.false}
          helperText={passValidation.message}
          id="outlined-required"
          type="password"
          placeholder={"Current Password"}
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
      <LabelWrapper name={"New Password"} sx={{ pb: 3 }}>
        <TextField
          error={newPassValidation.false}
          helperText={newPassValidation.message}
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
            setNewPassword(e.target.value);
          }}
        />
      </LabelWrapper>

      <LabelWrapper name={"Confirm New Password"} sx={{ pb: 3 }}>
        <TextField
          error={confirmPassValidation.false}
          helperText={confirmPassValidation.message}
          id="outlined-required"
          type="password"
          placeholder={"Confirm New Password"}
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
            setConfirmPass(e.target.value);
          }}
        />
      </LabelWrapper>
      <Box>
        <PrimaryButton
          type={"submit"}
          sx={{ width: "100%", ml: 0 }}
          disabled={
            passValidation.false ||
            passValidation.false === undefined ||
            newPassValidation.false ||
            newPassValidation.false === undefined ||
            confirmPassValidation.false ||
            confirmPassValidation.false === undefined
          }
        >
          Confirm
        </PrimaryButton>
      </Box>
    </Box>
  );
};

export default ChangePassword;
