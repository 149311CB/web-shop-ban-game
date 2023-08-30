import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  CircularProgress,
  Divider,
  Modal,
  Skeleton,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState, createContext, useContext } from "react";
import { useHistory } from "react-router-dom";
import { GlobalContext } from "../App";
import Paypal from "./paypal/Paypal";
import Stripe from "./stripe/Stripe";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { AlphaContainer } from "../components/AlphaContainer";
import { getProductPrice } from "../utils/getProductPrice";
import { AlphaTypo } from "../components/AlphaTypo";

export const CheckoutContext = createContext<any>(null);
const Checkout = () => {
  const [expanded, setExpanded] = useState<string | false>(false);
  const handleChange =
    (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const [cancelled, setCancelled] = useState(false);
  const [cart, setCart] = useState<any>(null);
  const history = useHistory();
  const { loginToken, fetchCount } = useContext(GlobalContext);

  const createOrder = async (order: any) => {
    const { data } = await axios.post(
      "https://web-shop-ban-game-server.onrender.com/api/orders/create",
      order,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${loginToken}`,
        },
      }
    );
    if (order.state === "cancelled") {
      setCancelled(true);
    } else {
      history.push("/checkout/success", { createdOrder: data });
      fetchCount(loginToken);
    }
  };

  const handleProcessing = (state: boolean) => {
    setProcessing(state);
  };

  const handleError = (err: string) => {
    handleProcessing(false);
    setError(err);
  };

  const handleSuccess = (order: any, cancelled = false) => {
    createOrder({ ...order, total: getProductPrice(cart) }).then(() => {
      if (!cancelled) {
        handleError("");
      }
    });
  };

  const handleCancelled = (order: any) => {
    handleSuccess(order, true);
  };

  let value;
  if (cart) {
    value = {
      cartId: cart._id,
      processing,
      error,
      cancelled,
      handleProcessing,
      handleError,
      handleSuccess,
      handleCancelled,
    };
  }

  useEffect(() => {
    if (!loginToken) return;
    const fetchData = async () => {
      setProcessing(true);
      try {
        const { data } = await axios.post(
          "https://web-shop-ban-game-server.onrender.com/api/carts/auth/active",
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${loginToken}`,
            },
          }
        );
        setCart(data);
      } catch (error) {
        history.push("/cart");
      }
      setProcessing(false);
    };
    fetchData();
  }, [history, loginToken, error]);

  return (
    <CheckoutContext.Provider value={value}>
      <Box
        className={"checkout"}
        sx={{
          // border: "1px solid blue",
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
            <Stack
              divider={<Divider orientation="horizontal" flexItem />}
              spacing={1}
            >
              {cart ? (
                cart.products.map((item: any) => (
                  <Box
                    className={"category-item"}
                    sx={{
                      width: "100%",
                      height: "auto",
                      borderRadius: "0.3rem",
                      color: "text.primary",
                      display: "flex",
                      gap: "0.6rem",
                    }}
                    key={item._id}
                  >
                    <Box className={"img-container"} sx={{ width: "100%" }}>
                      <img
                        src={
                          item.product.images.find((img: any) => {
                            return img.type === "portrait";
                          })?.url
                        }
                        style={{
                          width: "100%",
                          borderRadius: "0.3rem",
                        }}
                        alt={item.product.name + "portrait"}
                        className={"game-thumnail"}
                      />
                    </Box>
                    <Box sx={{ width: "100%" }}>
                      <Typography
                        className={"game-title"}
                        sx={{ color: "text.primary" }}
                      >
                        {item.product.name}
                      </Typography>
                      <AlphaTypo className={"text-small game-developer"}>
                        {item.product.developer}
                      </AlphaTypo>
                      <Box
                        className={"game-price"}
                        sx={{ paddingTop: "0.6rem", color: "text.primary" }}
                      >
                        ${item.product.sale_price}
                      </Box>
                    </Box>
                  </Box>
                ))
              ) : (
                <Box sx={{ display: "flex", gap: "0.3rem" }}>
                  <Skeleton
                    variant={"rectangular"}
                    width={"70%"}
                    height={"200px"}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      width: "30%",
                    }}
                  >
                    <Skeleton
                      variant={"text"}
                      sx={{ padding: "0.1rem", mb: "0.1rem" }}
                    />
                    <Skeleton
                      variant={"text"}
                      sx={{ padding: "0.1rem", mb: "0.1rem" }}
                    />
                    <Skeleton
                      variant={"text"}
                      sx={{ padding: "0.1rem", mb: "0.1rem" }}
                    />
                  </Box>
                </Box>
              )}
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
            <Box
              sx={{ display: "flex", gap: "0.3rem", paddingBottom: "0.9rem" }}
            >
              <Typography sx={{ fontSize: "1rem !important" }}>
                Total:{" "}
              </Typography>
              <Typography sx={{ fontSize: "1rem !important" }}>
                ${getProductPrice(cart)}
              </Typography>
            </Box>
            <Accordion
              expanded={expanded === "panel1"}
              onChange={handleChange("panel1")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Stripe</Typography>
              </AccordionSummary>
              <AccordionDetails>{cart && <Stripe />}</AccordionDetails>
            </Accordion>

            <Accordion
              expanded={expanded === "panel2"}
              onChange={handleChange("panel2")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Paypal</Typography>
              </AccordionSummary>
              <AccordionDetails>{cart && <Paypal />}</AccordionDetails>
            </Accordion>
          </AlphaContainer>
        </Box>
        <Modal open={processing} onClose={() => {}}>
          <Box
            sx={{
              margin: "0 auto",
              display: "flex",
              // alignItem: "center",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <CircularProgress />
          </Box>
        </Modal>
      </Box>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={3000}
        open={error !== ""}
        onClose={() => {
          setError("");
        }}
      >
        <Alert
          onClose={() => setError("")}
          severity={"error"}
          sx={{
            width: "100%",
            backgroundColor: "error.main",
            color: "background.default",
          }}
        >
          {error}
        </Alert>
      </Snackbar>
    </CheckoutContext.Provider>
  );
};

export default Checkout;
