import {alpha, ListItem, styled} from "@mui/material";
import {getTransparentOverlay} from "../utils/transparentOverlay";

export const AlphaListItem = styled(ListItem)(({theme}) => ({
    "&.active": {
        transition: "opacity 250ms ease-in-out",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: alpha(theme.palette.text.secondary, 0.6),
        "&::after": {
            opacity: 0,
        },
    },
    "&::after": {
        ...getTransparentOverlay({
            background: theme.palette.background.default,
        }),
    },
}));