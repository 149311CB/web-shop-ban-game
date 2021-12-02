import { Box, Divider, Stack } from "@mui/material";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import { AlphaContainer } from "../../components/AlphaContainer";
import { StackItem } from "../../components/StackItem";

const SideBar: React.FC<{ url: string }> = ({ url }) => {
  const {
    location: { pathname },
  } = useHistory();
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
            display: "flex",
            justifyContent: "center",
            a: {
              padding: "1.2rem",
              zIndex: 2,
            },
          },
        }}
      >
        <StackItem
          active={pathname.includes("profile")}
          hover={true}
          radius={"0.3rem 0.3rem 0 0"}
          className={"custom-stack-item"}
        >
          <Link to={`${url}/profile`}>Account</Link>
        </StackItem>
        <StackItem
          active={pathname.includes("orders")}
          hover={true}
          radius={"0"}
          className={"custom-stack-item"}
        >
          <Link to={`${url}/orders`}>Orders</Link>
        </StackItem>
        <StackItem
          active={pathname.includes("social")}
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
