import { Box, Container } from "@mui/material";
import { SxProps } from "@mui/system";
import React, { useEffect, useState } from "react";
import ScrollToTopButton from "../components/ScrollToTopButton";

const Page: React.FC<{ sx?: SxProps }> = ({ sx, children }) => {
  const [scrollY, setScollY] = useState(0);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScollY(window.scrollY);
    });
  });
  return (
    <Box
      sx={{
        ...sx,
        width: { xs: "100%" },
        minHeight: { xs: "90vh" },
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
          paddingBottom: "1.8rem",
        }}
      >
        {children}
      </Container>
      {scrollY >= 350 && <ScrollToTopButton />}
    </Box>
  );
};

export default Page;
