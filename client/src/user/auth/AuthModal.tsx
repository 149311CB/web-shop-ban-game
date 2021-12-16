import React, { useState } from "react";
import { Modal, Box, Snackbar, Alert } from "@mui/material/";
import LoginModal from "./login/LoginModal";
import RegisterModal from "./register/RegisterModal";
import ResetPassword from "./reset-password/ResetPassword";
import { ISnackbarMess } from "../../product/Review";

const style: any = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  color: "text.primary",
  // border: "2px solid #000",
  boxShadow: 24,
  borderRadius: "0.3rem",
  maxHeight: "90%",
  overflowY: "scroll",
  p: 4,
};

const AuthModal: React.FC<{ open: boolean; handleClose: any }> = ({
  open,
  handleClose,
}) => {
  const [register, setRegister] = useState(false);
  const [resetPass, setResetPass] = useState(false);
  const [snackBarMess, setSnackBarMess] = useState<ISnackbarMess>({
    isShown: false,
    type: "success",
    message: null,
  });

  return (
    <Modal
      open={open}
      onClose={() => {
        setRegister(false);
        handleClose();
      }}
      aria-labelledby="login-modal"
      aria-describedby="login-modal-des"
      sx={{ border: "1px solid red" }}
    >
      <>
        <Box
          className={"auth-container"}
          sx={{ ...style, ...{ width: register ? "450px" : "400px" } }}
        >
          {resetPass && (
            <ResetPassword
              setResetPass={setResetPass}
              setSnackBarMess={setSnackBarMess}
            />
          )}
          {register && !resetPass ? (
            <RegisterModal
              setRegister={setRegister}
              setResetPass={setResetPass}
            />
          ) : (
            !resetPass && (
              <LoginModal
                setRegister={setRegister}
                setResetPass={setResetPass}
              />
            )
          )}
        </Box>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          autoHideDuration={3000}
          open={snackBarMess.isShown}
          onClose={() => {
            setSnackBarMess({ ...snackBarMess, isShown: false });
          }}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Alert
            onClose={() => {
              setSnackBarMess({ ...snackBarMess, isShown: false });
            }}
            severity={snackBarMess.type}
            sx={{
              width: "100%",
              backgroundColor:
                snackBarMess.type === "error" ? "error.main" : "success.main",
              color: "background.default",
            }}
          >
            {snackBarMess.message}
          </Alert>
        </Snackbar>
      </>
    </Modal>
  );
};

export default AuthModal;
