import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import { GlobalContext } from "../App";
import { useHistory } from "react-router-dom";
import AuthModal from "../user/auth/AuthModal";
import { useState } from "react";
import AccountMenu from "./AccountMenu";
import ShoppingCartBadge from "./ShoppingCartBadge";

interface styledProps {
  mode?: any;
}

const Search = styled(
  (props: styledProps & React.HTMLAttributes<HTMLDivElement>) => (
    <div {...props} />
  )
)(({ theme, mode }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor:
    mode === "light"
      ? alpha(theme.palette.common.black, 0.15)
      : alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor:
      mode === "light"
        ? alpha(theme.palette.common.black, 0.25)
        : alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
  fontSize: "13px",
}));

export default function SearchNav() {
  const [open, setOpen] = useState(false);
  const value = React.useContext(GlobalContext);
  const { mode, loginToken } = value;
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
            <Search mode={mode}>
              <SearchIconWrapper>
                <SearchIcon fontSize={"small"} />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
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
                <span style={{ fontFamily: "brutal-regular", fontSize:"0.875rem" }}>Login</span>
              </IconButton>
            )}
          </Toolbar>
        </AppBar>
      </Box>
      <AuthModal open={open} handleClose={handleClose} />
    </div>
  );
}
