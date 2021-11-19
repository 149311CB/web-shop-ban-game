import { Box, Paper, Stack } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

const imgListPlaceholder = [
  "https://cdn2.unrealengine.com/jwe2-desktop-image-with-logo-1248x702-1248x702-73c4b7a65b42.png",
  "https://cdn2.unrealengine.com/fm22-carousel-1248x702-a454ec674601.png",
  "https://cdn2.unrealengine.com/rl-gb-ecto-egs-desktop-1248x702-4e49bd31c320.png",
  "https://cdn2.unrealengine.com/en-egs-connectandsave-crm-newsletter-1920x1080-v02-1920x1080-462b479c74cb.jpg",
  "https://cdn2.unrealengine.com/egs-hextech-mayhem-desktop-1280x702-1248x702-c8326302488f.jpg",
  "https://cdn2.unrealengine.com/egs-battlefield2042ultimateedition-dice-editions-s2-1200x1600-1200x1600-e4393b8a5e50.jpg",
];

const Carousel = () => {
  const stackRef = useRef<any>(null);

  useEffect(() => {
    if (stackRef.current) {
      const stackItems = stackRef.current.querySelectorAll(
        ".carousel-stack-item"
      );
      const stackItemArr = Array.from(stackItems);
      stackItemArr.forEach((item: any) => {
        item.style.height = `${100 / stackItemArr.length}%`;
      });
    }
  }, [stackRef]);


  return (
    <Box
      className={"carousel"}
      sx={{
        display: "flex",
        gap: "0.9rem",
        // minHeight: "80vh",
        padding: "1.5rem 0",
        marginBottom: "0.9rem",
      }}
    >
      <Box borderRadius={"0.6rem"}>
        <img
          src={imgListPlaceholder[0]}
          alt={"hmmm"}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "0.6rem",
          }}
        />
      </Box>
      <Stack
        maxWidth={"15%"}
        ref={stackRef}
        gap={"0.6rem"}
        // border={"1px solid red"}
      >
        {imgListPlaceholder.map((img: string) => (
          <Paper
            className={"carousel-stack-item"}
            sx={{
              padding: "0.6rem",
              borderRadius: "0.6rem",
            }}
          >
            <div
              style={{
                width: "25%",
                height: "100%",
                borderRadius: "0.6rem",
              }}
            >
              <img
                src={img}
                alt={img.split("/")[3]}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "0.6rem",
                }}
              />
            </div>
          </Paper>
        ))}
      </Stack>
    </Box>
  );
};

export default Carousel;
