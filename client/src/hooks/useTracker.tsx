import { useEffect } from "react";
import ReactGA from "react-ga";
import { useHistory } from "react-router-dom";

export const useReactGA = ({ pageView }: { pageView: boolean }) => {
  const {
    location: { pathname },
  } = useHistory();

  useEffect(() => {
    if (!pageView) {
      return;
    }
    console.log({pathname});
    ReactGA.pageview(pathname);
  }, [pageView, pathname]);
};
