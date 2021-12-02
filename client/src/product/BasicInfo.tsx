import React from "react";
import {Divider, Stack, Typography,} from "@mui/material";
import {AlphaTypo} from "../components/AlphaTypo";
import {StackItem} from "../components/StackItem";

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
