import { Container, Link, Typography } from "@mui/material";

const PageNav = () => {
  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        border: "1px solid green",
        maxWidth: {
          lg: "80%",
        },
        padding: "1.2rem 0",
        gap:"1.2rem",
      }}
    >
      <Link sx={{color:"text.primary"}}>
        <Typography>Discover</Typography>
      </Link>
      <Link sx={{color:"text.primary"}}>
        <Typography>Browse</Typography>
      </Link>
    </Container>
  );
};

export default PageNav;
