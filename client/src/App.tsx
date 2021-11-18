import {
  Box,
  Container,
  createTheme,
  PaletteMode,
  ThemeProvider,
  useMediaQuery,
} from "@mui/material";
import React, { createContext, useEffect, useRef } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Carousel from "./carousel/Carousel";
import Category from "./category/Category";
import Header from "./header/Header";

const getDesignTokens = (mode: PaletteMode) => {
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
              main: "hsl(0, 0%, 11%)",
              light: "hsl(0, 0%, 100%)",
              dark: "hsl(0,0%,16%)",
            },
            background: {
              default: "hsl(0, 0%, 11%)",
              paper: "hsl(0, 0%, 11%)",
            },
            text: {
              primary: "hsl(0,0%,100%)",
              secondary: "hsl(0,0%,80%)",
            },
            info: {
              main: "hsl(209,100%,45%)",
            },
          }),
    },
  };
};

export const DarkModeContext = createContext<any>(null);
function App() {
  const [mode, setMode] = React.useState<PaletteMode>("dark");
  // const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const colorMode = React.useMemo(
    () => ({
      // The dark mode switch would invoke this method
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) =>
          prevMode === "light" ? "dark" : "light"
        );
      },
    }),
    []
  );

  const fixedHeaderContainer = useRef<any>(null);
  const headerRef = useRef<any>(null);

  // useEffect(() => {
  //   setMode(prefersDarkMode ? "dark" : "light");
  // }, [prefersDarkMode]);

  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <Router>
      <DarkModeContext.Provider value={{ colorMode, mode }}>
        <ThemeProvider theme={theme}>
          {/* <Starter /> */}
          <Header headerRef={headerRef} />
          <Route
            path={"/"}
            component={() => {
              return (
                <Box
                  sx={{ width: { xs: "100%" }, bgcolor: "background.default" }}
                >
                  <Container
                    sx={{
                      border: "1px solid red",
                      bgcolor: "background.default",
                      maxWidth: {
                        lg: "80%",
                      },
                      paddingBottom:"1.2rem"
                    }}
                  >
                    <Carousel headerRef={headerRef} />
                    <Category />
                  </Container>
                </Box>
              );
            }}
            exact
          />
        </ThemeProvider>
      </DarkModeContext.Provider>
    </Router>
  );
}

export default App;
