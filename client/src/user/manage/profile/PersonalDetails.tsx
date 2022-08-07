import { DesktopDatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { alpha, Box, Divider, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { FormEvent, useEffect, useState } from "react";
import LabelWrapper from "../../../components/LabelWrapper";
import ModalWithSnackbar from "../../../components/ModalWithSnackbar";
import { PrimaryButton } from "../../../components/PrimaryButton";
import { useInputValidation } from "../../../hooks/useFormValidation";
import { ISnackbarMess } from "../../../product/Review";

const PersonalDetails: React.FC<{ personalDetails: any }> = ({
  personalDetails,
}) => {
  const [open, setOpen] = useState(false);
  const [snackBarMess, setSnackBarMess] = useState<ISnackbarMess>({
    isShown: false,
    type: "success",
    message: null,
  });
  const [disabled, setDisabled] = useState(true);
  const [firstName, setFirstName, firstNameValidation] = useInputValidation();
  const [lastName, setLastName, lastNameValidation] = useInputValidation();
  const [birthday, setBirthday] = useState(personalDetails.birth_day);
  const [password, setPassword, passValidation] = useInputValidation();
  const [phoneNumber] = useInputValidation("");

  const handleClose = (e: any) => {
    e.stopPropagation();
    setOpen(false);
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await axios
      .post("https://web-shop-ban-game.herokuapp.com/api/users/profile/personal-details/update", {
        firstName,
        lastName,
        birthday,
        phoneNumber,
        password,
      })
      .then(({ status }) => {
        if (status === 200) {
          setSnackBarMess({
            ...snackBarMess,
            isShown: true,
            message: "update profile successfully",
          });
        }
      })
      .catch((_) => {
        setSnackBarMess({
          type: "error",
          isShown: true,
          message: "update failed",
        });
      });
  };

  useEffect(() => {
    if (
      // firstNameValidation.false === undefined ||
      firstNameValidation.false ||
      // lastNameValidation.false === undefined ||
      lastNameValidation.false
    ) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [firstNameValidation, lastNameValidation]);
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
              error={firstNameValidation.false}
              helperText={firstNameValidation.message}
              id="outlined-required"
              defaultValue={personalDetails.first_name}
              size={"small"}
              sx={{ width: "100%" }}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </LabelWrapper>
          <LabelWrapper name={"Last Name"}>
            <TextField
              error={lastNameValidation.false}
              helperText={lastNameValidation.message}
              id="outlined-required"
              defaultValue={personalDetails.last_name}
              size={"small"}
              sx={{ width: "100%" }}
              onChange={(e) => setLastName(e.target.value)}
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
                onChange={(value: any) => {
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
        <PrimaryButton
          disabled={disabled}
          onClick={() => {
            setOpen(true);
          }}
        >
          Save changes
        </PrimaryButton>
        <ModalWithSnackbar
          open={open}
          handleClose={(e: any) => {
            handleClose(e);
            setSnackBarMess({ ...snackBarMess, isShown: false });
          }}
          snackBarMess={snackBarMess}
          setSnackBarMess={setSnackBarMess}
        >
          <Box component={"form"} onSubmit={onSubmit}>
            <Typography sx={{ ml: "8px", textAlign: "center", pb: 2 }}>
              Enter password save change
            </Typography>
            <LabelWrapper name={"Password"} sx={{ pb: 2 }}>
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
                    borderColor: (theme) =>
                      alpha(theme.palette.text.primary, 0.4),
                  },
                }}
                size={"small"}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </LabelWrapper>
            <PrimaryButton sx={{ width: "100%" }} type={"submit"}>
              Submit
            </PrimaryButton>
          </Box>
        </ModalWithSnackbar>
      </Box>
    </div>
  );
};

export default PersonalDetails;
