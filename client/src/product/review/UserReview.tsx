import { Box, Rating, Typography } from "@mui/material";
import React from "react";
import { AlphaTypo } from "../../components/AlphaTypo";

const UserReview: React.FC<{ review: any }> = ({ review }) => {
  if(!review.user){
    return null
  }
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        p: "0.6rem",
        borderRadius: "0.3rem",
        display: "flex",
        gap: "1.2rem",
      }}
      key={review.user._id}
    >
      <Box sx={{ width: "10%" }}>
        {review.user && (
          <img
            src={review.user.avatar}
            alt={review.user.first_name + review.user.last_name + "avatar"}
            style={{ borderRadius: "100%", width: "100%" }}
          />
        )}
      </Box>
      <Box sx={{width:"60%"}}>
        {review.user && (
          <Typography>
            {review.user.last_name + " " + review.user.first_name}
          </Typography>
        )}
        <Rating
          value={review.rating}
          size={"small"}
          sx={{ color: "#308fe8" }}
          readOnly
        />
        <AlphaTypo>{review.comment}</AlphaTypo>
      </Box>
    </Box>
  );
};

export default UserReview;
