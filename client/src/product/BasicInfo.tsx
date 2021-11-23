import React from "react";
import { Box, Divider, Typography, Stack, styled } from "@mui/material";
import { AlphaTypo } from "../category/Category";

export const StackItem = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.secondary,
  display: "flex",
  justifyContent: "space-between",
  fontSize: "0.875rem",
}));

const BasicInfo: React.FC<{ data: any }> = ({ data }) => {
  return (
    <Stack
      sx={{ width: "100%", paddingTop: "0.9rem" }}
      divider={<Divider orientation="horizontal" flexItem />}
      spacing={1}
    >
      <StackItem>
        <AlphaTypo>Developer</AlphaTypo>
        <Typography>{data.developer}</Typography>
      </StackItem>
      <StackItem>
        <AlphaTypo>Publisher</AlphaTypo>
        <Typography>{data.publisher}</Typography>
      </StackItem>
      <StackItem>
        <AlphaTypo>Release Date</AlphaTypo>
        <Typography>
          {new Date(data.release_date).toLocaleDateString()}
        </Typography>
      </StackItem>
      <StackItem>
        <AlphaTypo>Platform</AlphaTypo>
        <Typography>{data.platform}</Typography>
      </StackItem>
    </Stack>
  );
};

export default BasicInfo;
