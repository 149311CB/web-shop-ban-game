import { useContext, useEffect, useState } from "react";
import {
  alpha,
  Box,
  Button,
  Divider,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import axios from "axios";
import { StackItem } from "../product/BasicInfo";
import { GlobalContext } from "../App";
import CartItem, { GoldenPriceTag } from "./CartItem";
import { useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";

export const AlphaContainer = styled(Box)(({ theme }) => ({
  padding: "0.9rem",
  border: "1px",
  borderStyle: "solid",
  borderColor: alpha(theme.palette.text.primary, 0.3),
  borderRadius: "0.6rem",
}));

export const getProductPrice = (data: any) => {
  let total = 0;
  if (!data) return;
  data.products.forEach((product: any) => {
    if (product) {
      if (product.product) {
        total = total + product.product.sale_price * product.quantity;
      }
    }
  });
  return total;
};

const Cart = () => {
  const [data, setData] = useState<any>(null);
  const [updating, setUpdating] = useState(false);
  const { mode } = useContext(GlobalContext);
  const history = useHistory();
  const [cookies] = useCookies(["cookie-name"]);

  useEffect(() => {
    if (updating) return;
    const fetchData = async () => {
      const { data: cart } = await axios.post(
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
      setData(cart);
    };
    fetchData();
    window.scrollTo(0, 0);
  }, [updating, cookies]);

  return (
    <Box
      className={"cart"}
      sx={{
        color: "text.primary",
        fontFamily: "brutal-regular",
        // border: "1px solid yellow",
        width: "100%",
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
      <Box
        className={"cart-main"}
        sx={{
          display: "flex",
          gap: "2.8rem",
        }}
      >
        <AlphaContainer
          className={"product-details"}
          sx={{
            width: "70%",
            backgroundColor: "background.paper",
          }}
        >
          <Stack
            divider={<Divider orientation="horizontal" flexItem />}
            spacing={2}
            sx={{ backgroundColor: "background.paper" }}
          >
            {data
              ? data.products.map((item: any) => (
                  <StackItem
                    sx={{
                      display: "flex",
                      gap: "0.9rem",
                      backgroundColor: "background.paper",
                    }}
                    key={item._id}
                  >
                    <CartItem
                      item={item}
                      mode={mode}
                      updating={updating}
                      setUpdating={setUpdating}
                      setData={setData}
                    />
                  </StackItem>
                ))
              : null}
          </Stack>
        </AlphaContainer>
        <Box
          className={"cart-controls"}
          sx={{
            width: "30%",
            display: "flex",
            flexDirection: "column",
            gap: "0.9rem",
          }}
        >
          <AlphaContainer sx={{ backgroundColor: "background.paper" }}>
            <Typography>Coupons:</Typography>
            <Box
              className={"coupon-tag"}
              sx={{
                backgroundColor: "hsl(54,76%,59%)",
                color: "hsl(0,0%,11%)",
                borderRadius: "0.3rem",
                padding: "0.3rem 0.6rem",
                position: "relative",
                display: "inline-flex",
                alignItems: "center",
              }}
            >
              <Box
                className={"coupon-tag-ball"}
                sx={{
                  borderRadius: "50%",
                  backgroundColor: "background.paper",
                  position: "absolute",
                  left: "-8px",
                  padding: "0.4rem",
                }}
              />
              <Typography>$10 Discount</Typography>
              <Box
                className={"coupon-tag-ball"}
                sx={{
                  borderRadius: "50%",
                  backgroundColor: "background.paper",
                  position: "absolute",
                  right: "-8px",
                  padding: "0.4rem",
                }}
              />
            </Box>
            <Divider
              orientation="horizontal"
              flexItem
              sx={{ margin: "0.6rem 0" }}
            />
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography>Total</Typography>
              <GoldenPriceTag sx={{ fontFamily: "brutal-regular !important" }}>
                ${getProductPrice(data)}
              </GoldenPriceTag>
            </Box>
          </AlphaContainer>
          <Button
            sx={{
              color: "text.primary",
              bgcolor: "info.main",
              fontFamily: "brutal-medium",
              fontSize: "0.75rem",
              width: "100%",
              padding: "0.9rem 0",
              borderRadius: "0.6rem",
              "&:hover": {
                backgroundColor: "info.main",
              },
            }}
            disabled={updating}
            onClick={() => {
              history.push(`/checkout`);
            }}
          >
            Proceed to checkout
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Cart;
