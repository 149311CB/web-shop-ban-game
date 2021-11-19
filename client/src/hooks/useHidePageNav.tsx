import { useContext, useEffect } from "react";
import { DarkModeContext } from "../App";

export const useTogglePageNav = (hide = true) => {
  const value = useContext(DarkModeContext);
  useEffect(() => {
    const { setHidePageNav } = value;
    if (setHidePageNav) {
      setHidePageNav(hide);
    }
  });
};
