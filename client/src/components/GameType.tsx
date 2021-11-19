import { Box } from "@mui/material";
import React from "react";

const GameType: React.FC<{ type: string }> = ({ type }) => {
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        display: "inline-flex",
        padding: "0.3rem 0.6rem",
        borderRadius: "0.3rem",
        fontSize: "0.875rem",
      }}
    >
      {type}
    </Box>
  );
};

export default GameType;
