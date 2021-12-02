import { Box } from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";

const Success = () => {
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get("/api/users/login/success", {
        withCredentials: true,
        // headers: {
        //   Accept: "application/json",
        //   "Content-Type": "application/json",
        //   "Access-Control-Allow-Credentials": true,
        // },
      });
      console.log(data);
    };
    fetchData();
  }, []);
  return <Box>Login Success</Box>;
};

export default Success;
