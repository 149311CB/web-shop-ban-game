import { alpha, Button, styled } from "@mui/material";
import { getTransparentOverlay } from "../../utils/transparentOverlay";

export const AlphaButton = styled(Button)(({ theme }) => ({
  width: "100%",
  color: theme.palette.text.primary,
  fontFamily: "brutal-regular",
  fontSize: "0.75rem",
  position: "relative",
  border: "1px",
  borderStyle: "solid",
  borderColor: alpha(theme.palette.text.primary, 0.23),
  "&::after": {
    ...getTransparentOverlay({ alpha: 0, background: "hsl(100, 100%, 100%)" }),
  },
  backgroundColor: "hsl(0, 0%, 17%)",
  "&:hover": {
    backgroundColor: "transparent",
    "&::after": {
      opacity: "0.05",
    },
  },
}));

