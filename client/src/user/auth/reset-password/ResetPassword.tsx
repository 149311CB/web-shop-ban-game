import { Box, Button } from "@mui/material";
import axios from "axios";
import { FormEvent } from "react";
import Email from "../../../components/form/Email";
import { PrimaryButton } from "../../../components/PrimaryButton";
import { useInputValidation } from "../../../hooks/useFormValidation";

const ResetPassword: React.FC<{
  setResetPass: Function;
  setSnackBarMess: Function;
}> = ({ setResetPass, setSnackBarMess }) => {
  const [email, setEmail, emailValidation] = useInputValidation(null, {
    isEmail: true,
  });

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    const { data } = await axios.post("https://web-shop-ban-game.herokuapp.com/api/users/reset-pass-request", {
      email,
    });
    if (data.message === "success") {
      setSnackBarMess({
        isShown: true,
        type: "success",
        message: "We had send you an instruction email",
      });
    } else {
      setSnackBarMess({
        isShown: true,
        type: "error",
        message: "Sorry! Something has went wrong",
      });
    }
  };

  return (
    <Box>
      <form onSubmit={submitHandler}>
        <Email setEmail={setEmail} emailValidation={emailValidation} />
        <Button
          sx={{
            fontFamily: "brutal-regular",
            textTransform: "none",
            width: "100%",
            justifyContent: "right",
            padding: 0,
            "&:hover": { bgcolor: "transparent" },
            marginBottom: "0.9rem",
          }}
          onClick={() => {
            setResetPass(false);
          }}
        >
          Return to login
        </Button>
        <PrimaryButton
          type={"submit"}
          sx={{
            width: "100%",
          }}
        >
          Submit
        </PrimaryButton>
      </form>
    </Box>
  );
};

export default ResetPassword;
