import { darken, PaletteMode } from "@mui/material";

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
            },
            secondary: {
              main: "hsl(54, 76%, 59%)",
            },
            background: {
              default: "hsl(0, 0%, 11%)",
              paper: "hsl(0, 0%, 20%)",
            },
            text: {
              // primary: "hsl(0, 0%, 100%)",
              primary: "hsl(0, 0%, 96%)",
            },
            common: {
              black: "hsl(0, 0%, 16%)",
            },
            info: {
              main: "hsl(209,100%,45%)",
            },
            action: {
              selected: "hsl(209,100%,45%)",
              active: "hsl(209,100%,45%)",
              focus: "hsl(209,100%,45%)",
              hover: darken("hsl(209,100%,45%)", 0.1),
            },
            error: {
              main: "hsl(5,89%,65%)",
            },
          }),
    },
  };
};
