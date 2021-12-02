import { Box, Container } from "@mui/material";
import React from "react";

const Page: React.FC<React.ReactNode> = ({ children }) => {
  return (
    <Box
      sx={{
        width: { xs: "100%" },
        minHeight: { xs: "90vh" },
        bgcolor: "background.default",
        border: "1px solid blue",
      }}
    >
      <Container
        sx={{
          // border: "1px solid red",
          bgcolor: "background.default",
          maxWidth: {
            lg: "80%",
          },
          border: "1px solid red",
          paddingBottom: "1.8rem",
        }}
      >
        {children}
      </Container>
    </Box>
  );
};

export default Page;
