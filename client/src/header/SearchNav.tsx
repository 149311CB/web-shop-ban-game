import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import PersonIcon from "@mui/icons-material/Person";
import { GlobalContext } from "../App";
import { useHistory } from "react-router-dom";
import AuthModal from "../user/auth/AuthModal";
import { useState } from "react";
import AccountMenu from "./AccountMenu";
import ShoppingCartBadge from "./ShoppingCartBadge";
import SearchMenu from "./SearchMenu";




export default function SearchNav() {
  const [open, setOpen] = useState(false);
  const value = React.useContext(GlobalContext);
  const { loginToken } = value;
  const history = useHistory();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={"header"}>
      <Box sx={{ flexGrow: 1, bgcolor: "common.black" }}>
        <AppBar
          position="static"
          sx={{ bgcolor: "common.black", boxShadow: "none" }}
        >
          <Toolbar sx={{ bgcolor: "common.black" }}>
            <Box sx={{ flexGrow: 1 }}>
              <Box
                sx={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  bgcolor: "background.paper",
                  cursor: "pointer",
                }}
                onClick={() => history.push("/")}
              />
            </Box>
            <SearchMenu />
            
            <ShoppingCartBadge />
            {loginToken ? (
              <AccountMenu />
            ) : (
              <IconButton
                size="small"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={() => {
                  return !loginToken ? setOpen(true) : null;
                }}
              >
                <PersonIcon fontSize={"small"} />
                <span
                  style={{ fontFamily: "brutal-regular", fontSize: "0.875rem" }}
                >
                  Login
                </span>
              </IconButton>
            )}
          </Toolbar>
        </AppBar>
      </Box>
      <AuthModal open={open} handleClose={handleClose} />
    </div>
  );
}
