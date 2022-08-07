import { useContext, useEffect, useState } from "react";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { CheckoutContext } from "../Checkout";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { GlobalContext } from "../../App";

const Paypal = () => {
  const {
    cartId,
    processing,
    cancelled,
    handleProcessing,
    handleError,
    handleSuccess,
  } = useContext(CheckoutContext);

  const [clientId, setClientId] = useState("");
  const [amount, setAmount] = useState("");
  const history = useHistory();
  const { loginToken } = useContext(GlobalContext);

  const generateOrder: any = () => {
    const order = {
      cartId: cartId,
      status: undefined,
      paymentMethod: "paypal",
      details: undefined,
      paidAt: undefined,
      cancelledAt: undefined,
    };
    return order;
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        `https://web-shop-ban-game.herokuapp.com/api/payments/paypal`,
        {
          headers: {
            "Content-Type": "application/json",
            //@ts-ignore
            Authorization: `Bearer ${loginToken}`,
          },
        }
      );
      if (data?.status === 404) {
        history.push("/");
      }
      if (data.clientId) {
        setClientId(data.clientId);
        setAmount(data.amount);
      }
    };
    fetchData();
  }, [cartId, cancelled, history, loginToken]);

  return (
    <div className={"paypal"}>
      {clientId && (
        <PayPalScriptProvider options={{ "client-id": clientId }}>
          <PayPalButtons
            style={{ layout: "horizontal" }}
            createOrder={(_, actions) => {
              handleProcessing(true);
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: amount,
                    },
                  },
                ],
                application_context: {
                  shipping_preference: "NO_SHIPPING",
                },
              });
            }}
            onApprove={async (_, actions) => {
              const payload = await actions?.order?.capture();
              const order = generateOrder();
              order.details = {
                email: payload?.payer.email_address,
                name: payload?.payer.name,
              };
              order.paidAt = new Date(payload?.create_time || "");
              order.status = "succeeded";
              handleSuccess(order);
            }}
            onError={async (error) => {
              handleError(`payment failed: ${error.toString()}`);
            }}
            onCancel={async () => {
              handleError(`Something went wrong! Please try again.`);
            }}
            disabled={!!(processing && !clientId)}
          />
        </PayPalScriptProvider>
      )}
    </div>
  );
};

export default Paypal;
