import { Box, Typography } from "@mui/material";
import React from "react";
import { useClickOutside } from "../hooks/useClickOutside";

const Dropdown = () => {
  const [visible, setVisible, ref] = useClickOutside(false);

  const handleClick = () => {
    setVisible((current: boolean) => !current);
  };

  return (
    <Box
      className={"user-toolbox-dropdown"}
      onClick={() => {
        handleClick();
      }}
    >
      <Typography>This is a fucking dropdown</Typography>
    </Box>
  );
};

export default Dropdown;
