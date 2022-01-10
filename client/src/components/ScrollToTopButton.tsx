import { Fab, lighten } from "@mui/material";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";

const ScrollToTopButton = () => {
  const scrolltoTop = () => {
    window.scrollTo(0, 0);
  };
  return (
    <Fab
      sx={{
        position: "fixed",
        bottom: "10px",
        right: "15px",
        bgcolor: "background.paper",
        color: "primary.main",
        "&:hover": {
          bgcolor: (theme) => lighten(theme.palette.background.paper, 0.1),
        },
      }}
      size="small"
      onClick={scrolltoTop}
    >
      <ArrowCircleUpIcon />
    </Fab>
  );
};

export default ScrollToTopButton;
