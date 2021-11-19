import React from "react";
import { Box, Typography } from "@mui/material";
import { useTogglePageNav } from "../hooks/useHidePageNav";

const Cart = () => {
  useTogglePageNav()
  return (
    <Box>
      <Typography>This is cart screen</Typography>
    </Box>
  );
};

export default Cart;
