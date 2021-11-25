import { Box } from "@mui/material";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK!);

const Stripe = () => {
  return (
    <Box>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </Box>
  );
};

export default Stripe;
