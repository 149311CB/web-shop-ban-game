import { Box, TextField } from "@mui/material";
import axios from "axios";
import { FormEvent } from "react";
import { useHistory } from "react-router-dom";
import { PrimaryButton } from "../../../components/PrimaryButton";
import { useInputValidation } from "../../../hooks/useFormValidation";

const Success = () => {
  const history = useHistory();
  const token = new URLSearchParams(history.location.search).get("token");
  const [password, setPassword, validation] = useInputValidation(null, {
    securePass: true,
  });
  const [confirmPass, setConfirmPass, confirmPassValidation] =
    useInputValidation(null, { match: password });
  const fetchData = async (e: FormEvent) => {
    e.preventDefault();
    const {
      location: { pathname },
    } = history;
    let route = "https://web-shop-ban-game-server.onrender.com/api/users/create-pass";
    if (pathname.includes("/reset")) {
      route = "https://web-shop-ban-game-server.onrender.com/api/users/reset-pass";
    }
    await axios
      .post(
        route,
        { password, confirm_pass: confirmPass },
        {
          params: {
            token: token,
          },
        }
      )
      .then(({ status }) => {
        if (status === 201) {
          window.location.href = "/";
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Box
        component={"form"}
        onSubmit={fetchData}
        sx={{
          color: "text.primary",
          pt: "2.4rem",
          width: "50%",
          display: "flex",
          flexDirection: "column",
          gap: "0.9rem",
        }}
      >
        <TextField
          error={validation.false}
          helperText={validation.message}
          id="password"
          label="Password"
          variant="outlined"
          type="password"
          sx={{ width: "100%" }}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <TextField
          error={confirmPassValidation.false}
          helperText={confirmPassValidation.message}
          id="password"
          label="Confirm Password"
          variant="outlined"
          type="password"
          sx={{ width: "100%" }}
          onChange={(e) => {
            setConfirmPass(e.target.value);
          }}
        />
        <PrimaryButton type={"submit"} sx={{ width: "100%" }}>
          Submit
        </PrimaryButton>
      </Box>
    </Box>
  );
};

export default Success;
