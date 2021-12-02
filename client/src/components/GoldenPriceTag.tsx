import {styled, Typography, TypographyProps} from "@mui/material";
import React from "react";

interface IGoldenPriceTagProps {
    mode?: any;
}

export const GoldenPriceTag = styled(
    (props: IGoldenPriceTagProps & TypographyProps) => <Typography {...props} />
)(({mode, theme}) => ({
    display: "inline-flex",
    textAlign: "center",
    alignItems: "center",
    padding: "0.3rem 0.6rem",
    borderRadius: "0.3rem",
    backgroundColor: mode === "dark" ? "hsl(54,76%,59%)" : "hsl(57, 76%, 65%)",
    color: "hsl(0,0%,11%)",
    fontFamily: "brutal-medium !important",
}));