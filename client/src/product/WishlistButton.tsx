import { alpha, Button, styled } from "@mui/material";
import { getTransparentOverlay } from "../utils/transparentOverlay";

const WishlistButton = styled(Button)(({ theme }) => ({
  width: "100%",
  color: theme.palette.text.primary,
  fontFamily: "brutal-regular",
  fontSize: "0.75rem",
  border: "1px solid",
  borderColor: alpha(theme.palette.text.secondary, 0.6),
  position: "relative",
  "&::after": {
    ...getTransparentOverlay({ alpha: 0, background: "hsl(100, 100%, 100%)" }),
  },
  "&:hover": {
    backgroundColor: "transparent",
    "&::after": {
      opacity: "0.16",
    },
  },
}));

export default WishlistButton;
