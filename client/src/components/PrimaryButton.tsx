import { Button, darken, styled } from "@mui/material";

export const PrimaryButton = styled(Button)(({ theme }) => ({
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.info.main,
  fontFamily: "brutal-medium",
  fontSize: "0.75rem",
  // width: "100%",
  padding: "0.9rem 0",
  // borderTopLeftRadius: "0",
  // borderBottomLeftRadius: "0",
  "&:hover": {
    backgroundColor: darken(theme.palette.info.main, 0.1),
  },
}));
