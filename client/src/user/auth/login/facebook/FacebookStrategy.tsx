import { Button } from "@mui/material";
import axios from "axios";
import React from "react";

const FacebookStrategy = () => {
  const loginWithFacebook = async () => {
    window.open("https://localhost:5000/api/users/login/facebook", "_self");
    // const { data } = await axios.get(
    //   "/api/users/login/facebook"
    // );
    // console.log(data);
  };

  return <Button onClick={loginWithFacebook}>Login with facebook</Button>;
};

export default FacebookStrategy;
