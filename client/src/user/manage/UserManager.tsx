import { Box } from "@mui/material";
import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import OrderDetails from "./orders/OrderDetails";
import Orders from "./orders/Orders";
import Profile from "./profile/Profile";
import SideBar from "./SideBar";
import { AlphaContainer } from "../../components/AlphaContainer";

const UserManager = () => {
  const { path } = useRouteMatch();
  return (
    <Box
      className={"user-manager"}
      sx={{ display: "flex", gap: "2.8rem", paddingTop: "3.0rem" }}
    >
      <Box className={"side-nav"} sx={{ width: "25%" }}>
        <SideBar url={path} />
      </Box>
      <AlphaContainer
        className={"main-area"}
        sx={{
          width: "75%",
          backgroundColor: "background.paper",
          color: "text.primary",
          fontFamily: "brutal-regular",
        }}
      >
        <Switch>
          <Route path={["/user", `${path}/profile`]} exact>
            <Profile />
          </Route>
          <Route path={`${path}/orders`} exact>
            <Orders />
          </Route>
          <Route path={`${path}/orders/:id`} exact>
            <OrderDetails />
          </Route>
        </Switch>
      </AlphaContainer>
    </Box>
  );
};

export default React.memo(UserManager);
