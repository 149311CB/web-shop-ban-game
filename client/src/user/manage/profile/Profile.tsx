import { Box, TextField } from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { GlobalContext } from "../../../App";
import { AlphaContainer } from "../../../components/AlphaContainer";

const Profile = () => {
  const [userDetails, setUserDetails] = useState<any>(null);
  console.log(userDetails);
  const { loginToken } = useContext(GlobalContext);
  const emailRef = useRef<any>();

  useEffect(() => {
    if (!loginToken) {
      return;
    }
    const fetchData = async () => {
      const { data } = await axios.post(
        "/api/users/details",
        null,
        {
          headers: {
            Authorization: `Bearer ${loginToken}`,
          },
        }
      );
      setUserDetails(data);
    };
    fetchData();
  }, [loginToken]);

  useEffect(() => {
    if (!userDetails) return;
    if (emailRef && emailRef.current) {
      console.log(emailRef.current.value.length);
      emailRef.current.style.width = emailRef.current.value.length + "ch";
    }
  });

  return (
    <AlphaContainer
      className={"profile"}
      sx={{ backgroundColor: "background.paper" }}
    >
      {userDetails && (
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1 },
          }}
          autoComplete="off"
        >
          <Box sx={{ display: "flex" }}>
            <TextField
              id="outlined-required"
              label="First Name"
              defaultValue={userDetails.first_name}
            />
            <TextField
              id="outlined-required"
              label="Last Name"
              defaultValue={userDetails.last_name}
            />
          </Box>
          <TextField
            id="outlined-required"
            type="email"
            label="Email"
            defaultValue={userDetails.email}
            inputRef={emailRef}
          />
        </Box>
      )}
    </AlphaContainer>
  );
};

export default Profile;
