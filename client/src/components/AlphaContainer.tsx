import {alpha, Box, styled} from "@mui/material";

export const AlphaContainer = styled(Box)(({theme}) => ({
    padding: "0.9rem",
    border: "1px",
    borderStyle: "solid",
    borderColor: alpha(theme.palette.text.primary, 0.3),
    borderRadius: "0.6rem",
}));