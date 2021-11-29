import { Box } from "@mui/material";
import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import Profile from "./profile/Profile";
import SideBar from "./SideBar";

const UserManager = () => {
  const { path } = useRouteMatch();
  return (
    <Box className={"user-manager"} sx={{ display: "flex", gap: "2.8rem" }}>
      <Box className={"side-nav"} sx={{ width: "25%" }}>
        <SideBar url={path} />
      </Box>
      <Box className={"main-area"} sx={{ width: "75%" }}>
        <Switch>
          <Route path={["/user", `${path}/profile`]} exact>
            <Profile />
          </Route>
        </Switch>
      </Box>
    </Box>
  );
};

export default React.memo(UserManager);
