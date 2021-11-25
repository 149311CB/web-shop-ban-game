import {
  createTheme,
  PaletteMode,
  ThemeProvider,
  useMediaQuery,
} from "@mui/material";
import React, { createContext, useEffect, useRef } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./header/Header";
import Page from "./page/Page";
import { getTheme } from "./hooks/useTheme";
import Homepage from "./homepage/Homepage";
import Product from "./product/Product";
import Cart from "./cart/Cart";
import Checkout from "./checkout/Checkout";

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

  // useEffect(() => {
  //   setMode(prefersDarkMode ? "dark" : "light");
  // }, [prefersDarkMode]);

  const theme = React.useMemo(() => createTheme(getTheme(mode)), [mode]);

  return (
    <Router>
      <DarkModeContext.Provider value={{ colorMode, mode }}>
        <ThemeProvider theme={theme}>
          {/* <Starter /> */}
          <Route component={Header} exact={false} />
          <Page>
            <Route path={"/"} exact>
              <Homepage />
            </Route>
            <Route path={"/product/:name"} exact>
              <Product />
            </Route>
            <Route path={"/cart"}>
              <Cart />
            </Route>
            <Route path={"/checkout"}>
              <Checkout />
            </Route>
          </Page>
        </ThemeProvider>
      </DarkModeContext.Provider>
    </Router>
  );
}

export default App;
