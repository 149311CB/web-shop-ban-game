import React from "react";
import { Box, Divider, Typography, Stack, styled } from "@mui/material";
import { AlphaTypo } from "../category/Category";

const Item = styled(Box)(({ theme }) => ({
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
      <Item>
        <AlphaTypo>Developer</AlphaTypo>
        <Typography>{data.developer}</Typography>
      </Item>
      <Item>
        <AlphaTypo>Publisher</AlphaTypo>
        <Typography>{data.publisher}</Typography>
      </Item>
      <Item>
        <AlphaTypo>Release Date</AlphaTypo>
        <Typography>
          {new Date(data.release_date).toLocaleDateString()}
        </Typography>
      </Item>
      <Item>
        <AlphaTypo>Platform</AlphaTypo>
        <Typography>{data.platform}</Typography>
      </Item>
    </Stack>
  );
};

export default BasicInfo;
