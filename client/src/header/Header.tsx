import { alpha, Box, styled } from "@mui/material";
import PageNav from "./PageNav";
import SearchNav from "./SearchNav";

const PageNavWrapper = styled("div")(({ theme }) => ({
  width: "100%",
  backgroundColor: alpha(theme.palette.background.default, 0.9),
  backdropFilter: "blur(25px)",
}));

const Header: React.FC<{ headerRef: React.Ref<unknown> }> = ({ headerRef }) => {
  return (
    <Box
      className={"header"}
      sx={{
        position: "fixed",
        width: {
          xs: "100%",
        },
        border: "1px solid blue",
        zIndex:"1000"
      }}
      ref={headerRef}
    >
      <SearchNav />
      <PageNavWrapper>
        <PageNav />
      </PageNavWrapper>
    </Box>
  );
};

export default Header;
