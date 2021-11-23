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
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { DarkModeContext } from "../App";
import { useHistory } from "react-router-dom";

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
      ? alpha(theme.palette.primary.dark, 0.15)
      : alpha(theme.palette.primary.light, 0.15),
  "&:hover": {
    backgroundColor:
      mode === "light"
        ? alpha(theme.palette.primary.dark, 0.25)
        : alpha(theme.palette.primary.light, 0.25),
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
  const { mode } = React.useContext(DarkModeContext);
  const history = useHistory();
  return (
    <div className={"header"}>
      <Box sx={{ flexGrow: 1, bgcolor: "primary.dark" }}>
        <AppBar
          position="static"
          sx={{ bgcolor: "primary.dark", boxShadow: "none" }}
        >
          <Toolbar sx={{ bgcolor: "primary.dark" }}>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              MUI
            </Typography>
            <Search mode={mode}>
              <SearchIconWrapper>
                <SearchIcon fontSize={"small"} />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
            <IconButton
              size="small"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ ml: 2 }}
              onClick={() => {
                history.push("/cart");
              }}
            >
              <ShoppingCartIcon fontSize={"small"} />
            </IconButton>
            <IconButton
              size="small"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              // sx={{ ml: 2 }}
            >
              <PersonIcon fontSize={"small"} />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}
