import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
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
          sx={{
            bgcolor: "common.black",
            boxShadow: "none",
            backgroundImage: "none",
          }}
        >
          <Toolbar
            sx={{
              bgcolor: "common.black",
              width: {
                xs: "100%",
                lg: "80%",
              },
              margin: "0 auto",
            }}
          >
            <Box sx={{ flexGrow: 1 }}>
              <Box
                sx={{
                  width: "50px",
                  borderRadius: "50%",
                  cursor: "pointer",
                }}
                onClick={() => history.push("/")}
              >
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/images-b3099.appspot.com/o/269863143_480068400349256_2256909955739492979_n.png?alt=media&token=3a12e3c5-a40d-4747-8607-a42eb4917cd2"
                  alt="logo"
                  style={{ width: "100%", marginTop: 5 }}
                />
              </Box>
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
