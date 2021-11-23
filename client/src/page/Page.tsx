import { Box, Container } from "@mui/material";
import React from "react";

const Page: React.FC<React.ReactNode> = ({ children }) => {

  return (
    <Box
      sx={{
        width: { xs: "100%" },
        bgcolor: "background.default",
      }}
    >
      <Container
        sx={{
          // border: "1px solid red",
          bgcolor: "background.default",
          maxWidth: {
            lg: "80%",
          },
          paddingBottom: "1.2rem",
        }}
      >
        {children}
      </Container>
    </Box>
  );
};

export default Page;
