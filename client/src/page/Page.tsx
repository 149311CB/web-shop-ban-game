import { Box, Container } from "@mui/material";
import React, { useEffect, useState } from "react";

const Page: React.FC<{ headerRef: React.Ref<HTMLDivElement> }> = ({
  headerRef,
  children,
}) => {
  const [paddingTop, setPaddingTop] = useState(0);

  useEffect(() => {
    if (headerRef) {
      //@ts-ignore
      const { current } = headerRef;
      if (current) {
        setPaddingTop(current.offsetHeight);
      }
    }
  }, [headerRef]);

  return (
    <Box
      sx={{
        width: { xs: "100%" },
        bgcolor: "background.default",
        //@ts-ignore
        paddingTop: paddingTop + "px",
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
