import { PaletteMode } from "@mui/material";

export const getTheme = (mode: PaletteMode) => {
  return {
    palette: {
      mode,
      ...(mode === "light"
        ? {
            primary: {
              main: "hsl(0, 0%, 100%)",
              dark: "hsl(0,0%, 50%)",
            },

            background: {
              default: "hsl(0, 0%, 100%)",
            },
          }
        : {
            primary: {
              main: "hsl(209, 100%, 45%)",
              light: "hsl(0, 0%, 100%)",
              dark: "hsl(0,0%,16%)",
            },
            background: {
              default: "hsl(0, 0%, 11%)",
              paper: "hsl(0, 0%, 20%)",
            },
            text: {
              primary: "hsl(0,0%,100%)",
              secondary: "hsl(0,0%,80%)",
            },
            info: {
              main: "hsl(209,100%,45%)",
            },
            action: {
              selected: "hsl(209,100%,45%)",
              active: "hsl(209,100%,45%)",
              focus: "hsl(209,100%,45%)",
            },
          }),
    },
  };
};
