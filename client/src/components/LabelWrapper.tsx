import { Box } from "@mui/material";
import React from "react";
import { AlphaTypo } from "./AlphaTypo";
import { SxProps } from "@mui/system";

const LabelWrapper: React.FC<{ name: string; sx?: SxProps }> = ({
  name,
  sx = null,
  children,
}) => {
  return (
    <Box sx={sx}>
      <AlphaTypo>{name}</AlphaTypo>
      <Box
        sx={{
          display: "flex",
          gap: "0.6rem",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default LabelWrapper;
