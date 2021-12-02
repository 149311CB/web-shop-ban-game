import { styled, Typography } from "@mui/material";

const PrimaryTypo = styled(Typography)(({ theme }) => ({
  transition: "background 150ms ease-in-out",
  backgroundColor: theme.palette.primary.main,
  borderRadius: 1,
  color: theme.palette.text.primary,
  // fontFamily: "brutal-medium !important",
  textAlign: "center",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

export default PrimaryTypo;
