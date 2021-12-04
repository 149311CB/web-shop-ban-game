import { Alert, Box, Modal, Rating, Snackbar, TextField } from "@mui/material";
import React, { useState } from "react";
import { AlphaTypo } from "../../components/AlphaTypo";
import { PrimaryButton } from "../../components/PrimaryButton";
import { ISnackbarMess } from "../Review";

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

const CreateOrUpdateReview: React.FC<{
  option: "create" | "edit";
  open: boolean;
  setOpen: Function;
  rating: number;
  setRating: Function;
  comment: string;
  setComment: Function;
  submitReview: Function;
  snackBarMess: ISnackbarMess;
  setSnackBarMess: Function;
}> = ({
  option,
  open,
  setOpen,
  rating,
  setRating,
  comment,
  setComment,
  submitReview,
  snackBarMess,
  setSnackBarMess,
}) => {
  const maxChar = 250;
  const [charNum, setCharNum] = useState<number>(0);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <PrimaryButton
        sx={{ p: "0.6rem", width: "100%" }}
        onClick={() => {
          setOpen(true);
        }}
      >
        {option === "create" ? "Write" : "Edit"} review
      </PrimaryButton>
      <Modal
        open={open}
        onClose={() => {
          handleClose();
          setSnackBarMess({ ...snackBarMess, isShown: false });
        }}
        aria-labelledby="login-modal"
        aria-describedby="login-modal-des"
        sx={{ border: "1px solid red" }}
      >
        <>
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
              "&>div, button": {
                ml: 1,
              },
            }}
            component={"form"}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                paddingBottom: 2,
              }}
            >
              <Rating
                size={"large"}
                value={rating}
                onChange={(_, value) => {
                  value && setRating(value);
                }}
              />
            </Box>
            <Box sx={{ width: "100%" }}>
              <AlphaTypo sx={{ textAlign: "right", pb: 1 }}>
                Character {charNum}/{maxChar}
              </AlphaTypo>
              <TextField
                id="outlined-multiline-flexible"
                label="Write your comment here"
                multiline
                maxRows={4}
                rows={4}
                value={comment}
                inputProps={{ maxLength: maxChar }}
                sx={{ width: "100%" }}
                onChange={(e) => {
                  charNum <= maxChar && setComment(e.target.value);
                  setCharNum(e.target.value.length);
                }}
              />
            </Box>
            <PrimaryButton
              sx={{ width: "100%", mt: 2 }}
              disabled={rating === 0 || charNum > maxChar}
              onClick={() => {
                submitReview();
              }}
            >
              Submit your review
            </PrimaryButton>
          </Box>
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            autoHideDuration={3000}
            open={snackBarMess.isShown}
            onClose={() => {
              setSnackBarMess({ ...snackBarMess, isShown: false });
            }}
          >
            <Alert
              onClose={handleClose}
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
    </Box>
  );
};

export default CreateOrUpdateReview;
