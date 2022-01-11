import { Box, Skeleton } from "@mui/material";
import React from "react";

const GameCarouselSkeleton = () => {
  return (
    <Box
      className={"game-carousel"}
      sx={{
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Skeleton variant={"rectangular"} height={350} />
      <ul
        style={{
          display: "flex",
          listStyle: "none",
          padding:"0.6rem 0",
          justifyContent:"center",
          gap:"0.6rem"
        }}
      >
        <li>
          <Skeleton variant={"rectangular"} height={"70px"} sx={{width:"110px"}}/>
        </li>
        <li>
          <Skeleton variant={"rectangular"} height={"70px"} sx={{width:"110px"}}/>
        </li>
        <li>
          <Skeleton variant={"rectangular"} height={"70px"} sx={{width:"110px"}}/>
        </li>
        <li>
          <Skeleton variant={"rectangular"} height={"70px"} sx={{width:"110px"}}/>
        </li>
        <li>
          <Skeleton variant={"rectangular"} height={"70px"} sx={{width:"110px"}}/>
        </li>
      </ul>
    </Box>
  );
};

export default GameCarouselSkeleton;
