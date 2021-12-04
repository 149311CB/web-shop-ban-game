import { Container } from "@mui/material";
import { Link } from "react-router-dom";
import { AlphaTypo } from "../components/AlphaTypo";

const PageNav = () => {
  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        // border: "1px solid green",
        maxWidth: {
          lg: "80%",
        },
        padding: "1.2rem 0",
        gap: "1.2rem",
      }}
    >
      <Link to={"/discover"} style={{ cursor: "pointer" }}>
        <AlphaTypo
          sx={{
            transition: "color 150ms ease-in-out",
            "&:hover": {
              color: "text.primary",
            },
          }}
        >
          Discover
        </AlphaTypo>
      </Link>
      <Link to={"/browse"}>
        <AlphaTypo
          sx={{
            transition: "color 150ms ease-in-out",
            "&:hover": { color: "text.primary" },
          }}
        >
          Browse
        </AlphaTypo>
      </Link>
    </Container>
  );
};

export default PageNav;
