import { Route, Switch } from "react-router-dom";
import { useRouteMatch } from "react-router-dom";
import Checkout from "./Checkout";
import Success from "./Success";

const CheckoutSwitcher = () => {
  const { path } = useRouteMatch();
  return (
    <>
      <Switch>
        <Route path={"/checkout"} exact>
          <Checkout />
        </Route>
        <Route path={`${path}/Success`} exact>
          <Success />
        </Route>
      </Switch>
    </>
  );
};

export default CheckoutSwitcher;
