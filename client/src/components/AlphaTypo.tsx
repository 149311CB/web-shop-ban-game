import {alpha, styled} from "@mui/material";

export const AlphaTypo = styled("p")(({theme}) => ({
    color: alpha(theme.palette.text.secondary, 0.6),
}));