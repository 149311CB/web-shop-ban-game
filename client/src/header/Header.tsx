import { alpha, Box, styled } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { DarkModeContext } from "../App";
import PageNav from "./PageNav";
import SearchNav from "./SearchNav";

const PageNavWrapper = styled("div")(({ theme }) => ({
  width: "100%",
  backgroundColor: alpha(theme.palette.background.default, 0.9),
  backdropFilter: "blur(25px)",
}));

const excludedPageNav = ["/cart"];
const Header: React.FC<{ headerRef: React.Ref<unknown> }> = ({ headerRef }) => {
  const [hidePageNav, setHidePageNav] = useState(false);
  const value = useContext(DarkModeContext);
  useEffect(() => {
    value.setHidePageNav = setHidePageNav;
  }, [setHidePageNav]);
  return (
    <Box
      className={"header"}
      sx={{
        position: "fixed",
        width: {
          xs: "100%",
        },
        // border: "1px solid blue",
        zIndex: "1000",
      }}
      ref={headerRef}
    >
      <SearchNav />
      {!hidePageNav ? (
        <PageNavWrapper>
          <PageNav />
        </PageNavWrapper>
      ) : null}
    </Box>
  );
};

export default Header;
