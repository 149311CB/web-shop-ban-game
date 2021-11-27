import { useContext, useEffect, useState } from "react";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { CheckoutContext } from "../Checkout";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";

const Paypal = () => {
  const {
    cartId,
    processing,
    success,
    cancelled,
    handleProcessing,
    handleError,
    handleSuccess,
    handleCancelled,
  } = useContext(CheckoutContext);

  const [clientId, setClientId] = useState("");
  const [amount, setAmount] = useState("");
  const history = useHistory();
  const [cookies] = useCookies();

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
      const { data } = await axios.get(`/api/payments/paypal`, {
        headers: {
          "Content-Type": "application/json",
          //@ts-ignore
          Authorization: `Bearer ${cookies.login_token}`,
        },
      });
      if (data?.status === 404) {
        history.push("/");
      }
      if (data.clientId) {
        setClientId(data.clientId);
        setAmount(data.amount);
      }
    };
    fetchData();
  }, [cartId, success, cancelled, history, cookies.login_token]);

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
              const payload = await actions.order.capture();
              const order = generateOrder();
              order.details = {
                email: payload.payer.email_address,
                name: payload.payer.name,
              };
              order.paidAt = new Date(payload.create_time);
              order.status = "succeeded";
              handleSuccess(order);
            }}
            onError={async (error) => {
              handleError(`payment failed: ${error.toString()}`);
            }}
            onCancel={async () => {
              const order = generateOrder();
              order.status = "cancelled";
              order.cancelledAt = new Date(Date.now());
              handleCancelled(order);
            }}
            disabled={processing && !clientId ? true : false}
          />
        </PayPalScriptProvider>
      )}
    </div>
  );
};

export default Paypal;
