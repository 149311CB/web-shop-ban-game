import { Box, Stack, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState, createContext } from "react";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";
import { AlphaContainer } from "../cart/Cart";
import Stripe from "./stripe/Stripe";

export const CheckoutContext = createContext<any>(null);
const Checkout = () => {
  const [updating, setUpdating] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [cancelled, setCancelled] = useState(false);
  const [cart, setCart] = useState<any>(null);
  const history = useHistory();
  const [cookies] = useCookies(["cookie-name"]);

  const createOrder = (order: any) => {
    const fetchData = async () => {
      await axios.post("/api/orders/create", order, {
        headers: {
          "Content-Type": "application/json",
          // @ts-ignore
          Authorization: `Bearer ${cookies.login_token}`,
        },
      });
      if (order.state === "cancelled") {
        setCancelled(true);
      } else {
        history.push("/success");
      }
    };
    fetchData();
  };

  const handleProcessing = (state: boolean) => {
    setProcessing(state);
  };

  const handleError = (err: string) => {
    handleProcessing(false);
    setError(err);
  };

  const handleSuccess = (order: any) => {
    handleError("");
    createOrder(order);
  };

  const handleCancelled = (order: any) => {
    handleSuccess(order);
  };

  let value;
  if (cart) {
    value = {
      cartId: cart._id,
      processing,
      error,
      success,
      cancelled,
      handleProcessing,
      handleError,
      handleSuccess,
      handleCancelled,
    };
  }

  useEffect(() => {
    if (updating) return;
    const fetchData = async () => {
      try {
        const { data } = await axios.post(
          "/api/carts/auth/active",
          {},
          {
            headers: {
              "Content-Type": "application/json",
              // @ts-ignore
              Authorization: `Bearer ${cookies.login_token}`,
            },
          }
        );
        setCart(data);
      } catch (error) {
        history.push("/cart");
      }
    };
    fetchData();
  }, [updating, cookies, history]);

  return (
    <CheckoutContext.Provider value={value}>
      <Box
        className={"checkout"}
        sx={{
          border: "1px solid blue",
          color: "text.primary",
          display: "flex",
          gap: "2.8rem",
        }}
      >
        <Box
          className={"cart-summary"}
          sx={{
            width: "30%",
          }}
        >
          <Typography
            variant={"h2"}
            sx={{
              padding: "1.2rem 0",
            }}
          >
            Cart Details
          </Typography>
          <AlphaContainer sx={{ backgroundColor: "background.paper" }}>
            <Stack>
              {cart &&
                cart.products.map((item: any) => (
                  <Box className={"img-container"} key={item._id}>
                    <img
                      src={
                        item.product.images.find((image: any) => {
                          return image.type === "portrait";
                        }).url
                      }
                      alt={""}
                      style={{ width: "100%" }}
                    />
                  </Box>
                ))}
            </Stack>
          </AlphaContainer>
        </Box>
        <Box
          sx={{
            width: "70%",
          }}
        >
          <Typography
            variant={"h2"}
            sx={{
              padding: "1.2rem 0",
            }}
          >
            Payment
          </Typography>
          <AlphaContainer sx={{ backgroundColor: "background.paper" }}>
            {cart && <Stripe />}
          </AlphaContainer>
        </Box>
      </Box>
    </CheckoutContext.Provider>
  );
};

export default Checkout;
