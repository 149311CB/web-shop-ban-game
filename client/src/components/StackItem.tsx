import { Box, BoxProps, styled } from "@mui/material";
import { getTransparentOverlay } from "../utils/transparentOverlay";

export const StackItem = styled(
  (
    props: {
      hover?: boolean;
      active?: boolean;
      radius?: string;
    } & BoxProps
  ) => <Box {...props} />
)(({ theme, hover, active, radius }) => ({
  color: theme.palette.text.secondary,
  display: "flex",
  justifyContent: "space-between",
  fontSize: "0.875rem",
  position: "relative",
  "&::after": {
    ...(hover &&
      getTransparentOverlay({
        alpha: 0,
        background: "hsl(100, 100%, 100%)",
        radius: radius,
      })),
    ...(active && getTransparentOverlay({
        alpha: 0.16,
        background: "hsl(100, 100%, 100%)",
        radius: radius,
      })),
  },
  "&:hover": {
    "&::after": {
      opacity: hover ? "0.16" : "",
    },
  },
}));

