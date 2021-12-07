import { alpha, Box, styled } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import PageNav from "./PageNav";
import SearchNav from "./SearchNav";

const PageNavWrapper = styled("div")(({ theme }) => ({
  width: "100%",
  backgroundColor: alpha(theme.palette.background.default, 0.9),
  backdropFilter: "blur(25px)",
}));

const excludedPageNav = [
  "/cart",
  "/checkout",
  "/report",
  "/user",
  "/verification",
  "/auth"
];

const Header: React.FC<{ match: any }> = ({ match }) => {
  const {
    location: { pathname },
  } = useHistory();
  const [headerHeight, setHeaderHeight] = useState(0);
  const [hidePageNav, setHidePageNav] = useState(false);
  const headerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (headerRef) {
      // @ts-ignore
      const { current } = headerRef;
      if (current) {
        setHeaderHeight(current.offsetHeight);
      }
    }
  }, [headerRef, hidePageNav]);

  useEffect(() => {
    if (
      excludedPageNav.some((value: any) => {
        return pathname.includes(value);
      })
    ) {
      setHidePageNav(true);
      return;
    }
    setHidePageNav(false);
  }, [pathname, match]);

  return (
    <Box
      sx={{
        backgroundColor: "background.default",
        // border: "1px solid red",
        height: headerHeight + "px",
      }}
    >
      <Box
        id={"header"}
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
    </Box>
  );
};

export default Header;
