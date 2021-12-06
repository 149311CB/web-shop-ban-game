import {
  Alert,
  Box,
  Divider,
  Modal,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import LabelWrapper from "../../../components/LabelWrapper";
import { PrimaryButton } from "../../../components/PrimaryButton";
import EditIcon from "@mui/icons-material/Edit";
import { ISnackbarMess } from "../../../product/Review";
import ChangeEmail from "./ChangeEmail";
import ModalWithSnackbar from "../../../components/ModalWithSnackbar";
import ChangePassword from "./ChangePassword";

const AccountInfo: React.FC<{ accountInfo: any }> = ({ accountInfo }) => {
  const [action, setAction] = useState<"email" | "password" | null>(null);
  const [open, setOpen] = useState(false);
  const [snackBarMess, setSnackBarMess] = useState<ISnackbarMess>({
    isShown: false,
    type: "success",
    message: null,
  });

  const handleClose = (e: any) => {
    e.stopPropagation();
    setOpen(false);
  };

  return (
    <div>
      <Typography
        variant={"h2"}
        sx={{ fontFamily: "brutal-medium !important" }}
      >
        Account Info
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Box sx={{ display: "flex", gap: "3.9rem", "&>div": { width: "100%" } }}>
        <LabelWrapper name={"Email"}>
          <TextField
            id="outlined-required"
            type="email"
            defaultValue={accountInfo.email}
            sx={{ minWidth: "206px", width: "100%" }}
            size={"small"}
            disabled={true}
          />

          <PrimaryButton
            sx={{ p: 0 }}
            onClick={() => {
              setOpen(true);
              setAction("email");
            }}
          >
            <EditIcon fontSize={"small"} />
          </PrimaryButton>
        </LabelWrapper>
        <LabelWrapper name={"Password"}>
          <TextField
            id="outlined-required"
            type="password"
            defaultValue={"***********"}
            sx={{ minWidth: "206px", width: "100%" }}
            size={"small"}
            disabled={true}
          />
          <PrimaryButton
            sx={{ p: "0.6rem" }}
            onClick={() => {
              setOpen(true);
              setAction("password");
            }}
          >
            <EditIcon fontSize={"small"} />
          </PrimaryButton>
        </LabelWrapper>
      </Box>
      <ModalWithSnackbar
        open={open}
        handleClose={(e: any) => {
          handleClose(e);
          setSnackBarMess({ ...snackBarMess, isShown: false });
        }}
        snackBarMess={snackBarMess}
        setSnackBarMess={setSnackBarMess}
      >
        {action === "email" ? (
          <ChangeEmail
            email={accountInfo.email}
            setSnackBarMess={setSnackBarMess}
            setOpen={setOpen}
          />
        ) : (
          <ChangePassword setSnackBarMess={setSnackBarMess} setOpen={setOpen} />
        )}
      </ModalWithSnackbar>
    </div>
  );
};

export default AccountInfo;
