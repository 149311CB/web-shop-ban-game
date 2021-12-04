import {
  createTheme,
  PaletteMode,
  ThemeProvider,
  useMediaQuery,
} from "@mui/material";
import React, { createContext, useCallback, useEffect, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./header/Header";
import Page from "./page/Page";
import { getTheme } from "./utils/getTheme.ts/useTheme";
import Homepage from "./homepage/Homepage";
import Product from "./product/Product";
import Cart from "./cart/Cart";
import Report from "./report/Report";
import axios from "axios";
import UserManager from "./user/manage/UserManager";
import CheckoutSwitcher from "./checkout/CheckoutSwitcher";
import Browse from "./browse/Browse";

export const GlobalContext = createContext<any>(null);
function App() {
  const [mode, setMode] = useState<PaletteMode>("dark");

  const [loginToken, setLoginToken] = useState<string | null>(null);

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

  const theme = React.useMemo(() => createTheme(getTheme(mode)), [mode]);

  const verifyUser = useCallback(async () => {
    const { data } = await axios.post("/api/users/token/refresh", null, {
      withCredentials: true,
    });
    if (data && data.token) {
      setLoginToken(data.token);
    } else {
      setLoginToken(null);
    }
    setTimeout(verifyUser, 5 * 60 * 1000);
  }, [setLoginToken]);

  // useEffect(() => {
  //   setMode(prefersDarkMode ? "dark" : "light");
  // }, [prefersDarkMode]);

  useEffect(() => {
    verifyUser();
  }, [verifyUser]);

  return (
    <Router>
      <GlobalContext.Provider
        value={{
          colorMode,
          mode,
          loginToken,
          setLoginToken,
        }}
      >
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
              <CheckoutSwitcher />
            </Route>
            <Route path={"/report"}>
              <Report />
            </Route>
            <Route path={"/user"}>
              <UserManager />
            </Route>
            <Route path={"/browse"}>
              <Browse />
            </Route>
          </Page>
        </ThemeProvider>
      </GlobalContext.Provider>
    </Router>
  );
}

export default App;
