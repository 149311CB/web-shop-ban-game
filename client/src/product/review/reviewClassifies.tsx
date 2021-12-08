import { Box, Typography } from "@mui/material";
import React from "react";
import { LinearProgressWithLabel } from "../../components/LinearProgressbarWithLabel";

const ReviewClassifies: React.FC<{
  reviewsLength: number;
  ratingSummary: any;
}> = ({ reviewsLength, ratingSummary }) => {
  return (
    <Box sx={{ width: "100%" }}>
      {ratingSummary &&
        Object.keys(ratingSummary)
          .reverse()
          .map((key: any) => (
            <Box sx={{ display: "flex" }} key={key}>
              <Typography sx={{ minWidth: "7ch" }}>
                {key} {key === "1" ? "star" : "stars"}
              </Typography>
              <LinearProgressWithLabel
                key={key}
                value={
                  isNaN(ratingSummary[key] / reviewsLength)
                    ? 0
                    : (ratingSummary[key] / reviewsLength) * 100
                }
                sx={{ width: { lg: "150px" } }}
              />
            </Box>
          ))}
    </Box>
  );
};

export default ReviewClassifies;
