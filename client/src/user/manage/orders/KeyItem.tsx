import { IconButton, styled, Tooltip, Typography } from "@mui/material";
import React, { useState } from "react";
import { StackItem } from "../../../components/StackItem";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const CopyableTypo = styled(Typography)((_) => ({
  "&:hover": {
    cursor: "copy",
  },
}));

const KeyItem: React.FC<{ value: string }> = ({ value }) => {
  const [visible, setVisible] = useState(false);
  const [coppied, setCoppied] = useState(false);

  const copyToClipBoard = (e: any) => {
    navigator.clipboard.writeText(e.target.textContent);
    setCoppied(true);
  };

  return (
    <StackItem
      sx={{
        justifyContent: "flex-start",
        alignItems: "center",
        gap: "0.6rem",
      }}
    >
      <IconButton
        size={"small"}
        onClick={() => {
          setVisible(!visible);
        }}
      >
        {!visible ? (
          <VisibilityIcon fontSize={"small"} />
        ) : (
          <VisibilityOffIcon fontSize={"small"} />
        )}
      </IconButton>
      <Tooltip title={!coppied ? "click to copy" : "coppied"}>
        <CopyableTypo
          onClick={(e: any) => {
            visible && copyToClipBoard(e);
          }}
          onMouseLeave={() => {
            setCoppied(false);
          }}
        >
          {visible ? value : value.replace(/[a-zA-Z0-9_.]/g, "*")}
        </CopyableTypo>
      </Tooltip>
    </StackItem>
  );
};

export default KeyItem;
