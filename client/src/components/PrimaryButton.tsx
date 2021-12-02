import React from "react";
import {Button} from "@mui/material";

export const PrimaryButton: React.FC<{ onClick: () => void }> = ({onClick, children}) => {
    return (
        <Button
            className={"checkout-btn"}
            sx={{
                color: "text.primary",
                bgcolor: "info.main",
                fontFamily: "brutal-medium",
                fontSize: "0.75rem",
                width: "100%",
                padding: "0.9rem 0",
                borderTopLeftRadius: "0",
                borderBottomLeftRadius: "0",
                "&:hover": {
                    backgroundColor: "info.main",
                },
            }}
            onClick={onClick}
        >
            {children}
        </Button>)
}