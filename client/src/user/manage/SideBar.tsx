import { Box, Divider, Stack } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { AlphaContainer } from "../../cart/Cart";
import { StackItem } from "../../product/BasicInfo";

const SideBar: React.FC<{ url: string }> = ({ url }) => {
  return (
    <AlphaContainer
      sx={{
        fontFamily: "brutal-regular",
        backgroundColor: "background.paper",
        padding: "0",
        a: {
          textDecoration: "none",
          color: "text.primary",
          fontSize: "1rem",
        },
      }}
    >
      <Stack
        divider={<Divider orientation="horizontal" flexItem />}
        sx={{
          ".custom-stack-item": {
            cursor: "pointer",
            padding: "1.2rem",
            display: "flex",
            justifyContent: "center",
            "a":{
              zIndex:2
            }
          },
        }}
      >
        <StackItem
          hover={true}
          radius={"0.3rem 0.3rem 0 0"}
          className={"custom-stack-item"}
        >
          <Link to={`${url}/profile`}>Account</Link>
        </StackItem>
        <StackItem hover={true} radius={"0"} className={"custom-stack-item"}>
          <Link to={`${url}/social`}>Social</Link>
        </StackItem>
        <StackItem
          hover={true}
          radius={"0 0 0.3rem 0.3rem"}
          className={"custom-stack-item"}
        >
          <Link to={`${url}/social`}>Social</Link>
        </StackItem>
      </Stack>
    </AlphaContainer>
  );
};

export default SideBar;
