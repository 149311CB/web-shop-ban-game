import { Box, Typography } from "@mui/material";
import EmailSentImg from "../../../assets/Email_Send.png";
import { useContext, useEffect, useState } from "react";
import { AlphaContainer } from "../../../components/AlphaContainer";
import { GlobalContext } from "../../../App";
import { SxProps } from "@mui/system";
import axios from "axios";
import { useAnimationFrame } from "../../../hooks/useAnimationFrame";
import { Link, useHistory } from "react-router-dom";
import { AlphaTypo } from "../../../components/AlphaTypo";
import PrimaryTypo from "../../../components/PrimaryTypo";

const columnFlex: SxProps = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};
const AuthComplete = () => {
  const [email, setEmail] = useState<any>("");
  const [countDown, setCountDown] = useState(10);
  const history = useHistory();
  const { loginToken } = useContext(GlobalContext);

  useEffect(() => {
    if(!loginToken) return
    const fetchData = async () => {
      const { data } = await axios.post(
        "/api/users/details",
        {},
        {
          params: { email: true },
          headers: { Authorization: `Bearer ${loginToken}` },
        }
      );
      setEmail(data.email);
    };
    fetchData();
  }, [loginToken]);

  useAnimationFrame(1000, () => {
    if(countDown === 0){
      return history.push("/")
    }
    setCountDown(countDown - 1);
  });

  return (
    <Box sx={{ ...columnFlex, pt: "2.4rem" }}>
      <AlphaContainer
        sx={{
          ...columnFlex,
          width: "50%",
          p: "2.4rem",
          // border: "1px solid red",
          color: "text.primary",
          bgcolor: "background.paper",
        }}
      >
        <Typography variant={"h2"}>
          Congratulation! Your account has been created!
        </Typography>
        <Box sx={columnFlex}>
          <Box sx={{ width: "30%", mt: 2, mb: 1 }}>
            <img
              src={EmailSentImg}
              alt={"email-sent-img"}
              style={{ width: "100%" }}
            />
          </Box>
          <Typography>
            An email has been sent to<strong> {email}</strong>
          </Typography>
          <Typography>
            Following the instruction in the email to activate your account
          </Typography>
          <AlphaTypo sx={{ pt: 2 }}>
            You will be redirect to homepage after {countDown}
          </AlphaTypo>
          <AlphaTypo>Or</AlphaTypo>
          <Link to={"/"}>
            <PrimaryTypo sx={{ p: 1, borderRadius: 1 }}>
              Navigate now
            </PrimaryTypo>
          </Link>
        </Box>
      </AlphaContainer>
    </Box>
  );
};

export default AuthComplete;
