import { Alert, Box, Modal, Snackbar } from "@mui/material";
import React from "react";
import { ISnackbarMess } from "../product/Review";

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
};

const ModalWithSnackbar: React.FC<{
  open: boolean;
  handleClose: (e: any) => void;
  snackBarMess: ISnackbarMess;
  setSnackBarMess: Function;
}> = ({ open, handleClose, snackBarMess, setSnackBarMess, children }) => {
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="login-modal"
        aria-describedby="login-modal-des"
        sx={{ border: "1px solid red" }}
      >
        <Box
          className={"auth-container"}
          sx={{
            ...style,
            width: "450px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            p: 2,
            overflowX: "hidden",
            "&>div": {
              ml: 1,
            },
          }}
        >
          {children}
        </Box>
      </Modal>
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
  );
};

export default ModalWithSnackbar;
