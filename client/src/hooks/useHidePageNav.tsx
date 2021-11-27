import { useContext, useEffect } from "react";
import { GlobalContext } from "../App";

export const useTogglePageNav = (hide = true) => {
  const value = useContext(GlobalContext);
  useEffect(() => {
    const { setHidePageNav } = value;
    if (setHidePageNav) {
      setHidePageNav(hide);
    }
  });
};
