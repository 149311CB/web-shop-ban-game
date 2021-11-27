import { Box, Button } from "@mui/material";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import { CheckoutContext } from "../Checkout";
import axios from "axios";
import { useCookies } from "react-cookie";

const cardStyle = {
  style: {
    base: {
      fontSize: "16px",
      color: "#424770",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#9e2146",
    },
  },
};

const CheckoutForm = () => {
  const [clientSecret, setClientSecret] = useState("");
  const {
    cartId,
    processing,
    error,
    cancelled,
    handleProcessing,
    handleError,
    handleSuccess,
    handleCancelled,
  } = useContext(CheckoutContext);
  const stripe = useStripe();
  const elements = useElements();
  const [cookies] = useCookies(["cookie-name"]);

  const handleSubmit = async () => {
    handleProcessing(true);

    const paymentMethod = await stripe!.createPaymentMethod({
      type: "card",
      //@ts-ignore
      card: elements.getElement(CardElement),
    });

    const payload = await stripe!.confirmCardPayment(clientSecret, {
      payment_method: paymentMethod.paymentMethod!.id,
    });

    if (payload.error) {
      handleError(`payment failed: ${payload.error.message}`);
    } else {
      const order: any = {
        cartId: cartId,
        status: payload.paymentIntent.status,
        paymentMethod: "stripe",
        details: undefined,
        paidAt: null,
        cancelledAt: undefined,
      };

      if (payload.paymentIntent.status === "canceled") {
        order.cancelledAt = new Date(payload.paymentIntent.created);
        handleCancelled(order);
      } else {
        order.details = {
          exprMonth: paymentMethod.paymentMethod?.card?.exp_month,
          exprYear: paymentMethod.paymentMethod?.card?.exp_year,
          type: paymentMethod.paymentMethod?.card?.funding,
          brand: paymentMethod.paymentMethod?.card?.brand,
          last4: paymentMethod.paymentMethod?.card?.last4,
        };
        order.paidAt = new Date(payload.paymentIntent.created);
        handleSuccess(order);
      }
    }
  };

  useEffect(() => {
    // fetch stripe client secret using to process payment
    const fetchData = async () => {
      const { data } = await axios.get(`/api/payments/stripe`, {
        headers: {
          "Content-Type": "application/json",
          // @ts-ignore
          Authorization: `Bearer ${cookies.login_token}`,
        },
      });
      if (data.clientSecret) {
        setClientSecret(data.clientSecret);
      }
    };
    fetchData();
    // @ts-ignore
  }, [error, cancelled, cookies.login_token]);

  return (
    <Box>
      <CardElement id="card-element" options={cardStyle} />
      <Button
        sx={{
          color: "text.primary",
          bgcolor: "info.main",
          fontFamily: "brutal-medium",
          fontSize: "0.75rem",
          width: "100%",
          padding: "0.9rem 0",
          marginTop: "0.9rem",
          borderRadius: "0.6rem",
          "&:hover": {
            backgroundColor: "action.hover",
          },
        }}
        disabled={processing}
        onClick={() => {
          handleSubmit();
        }}
      >
        Pay with Stripe
      </Button>
    </Box>
  );
};

export default CheckoutForm;
