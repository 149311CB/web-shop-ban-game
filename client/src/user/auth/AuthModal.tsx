import React, { useState } from "react";
import { Modal, Box } from "@mui/material/";
import LoginModal from "./login/LoginModal";
import RegisterModal from "./register/RegisterModal";

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
  p: 4,
};

const AuthModal: React.FC<{ open: boolean; handleClose: any }> = ({
  open,
  handleClose,
}) => {
  const [register, setRegister] = useState(false);
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="login-modal"
      aria-describedby="login-modal-des"
      sx={{ border: "1px solid red" }}
    >
      <Box sx={{ ...style, ...{ width: register ? "450px" : "400px" } }}>
        {register ? (
          <RegisterModal setRegister={setRegister} />
        ) : (
          <LoginModal setRegister={setRegister} />
        )}
      </Box>
    </Modal>
  );
};

export default AuthModal;
