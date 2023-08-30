import { useContext, useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Divider,
  Modal,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";
import { GlobalContext } from "../App";
import CartItem from "./CartItem";
import { useHistory } from "react-router-dom";
import { AlphaContainer } from "../components/AlphaContainer";
import { getProductPrice } from "../utils/getProductPrice";
import { GoldenPriceTag } from "../components/GoldenPriceTag";
import { StackItem } from "../components/StackItem";
import AuthModal from "../user/auth/AuthModal";
import { PrimaryButton } from "../components/PrimaryButton";

const Cart = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<any>(null);
  const [fetching,setFetching] = useState(false)
  const [updating, setUpdating] = useState(false);
  const { mode } = useContext(GlobalContext);
  const history = useHistory();
  const { loginToken } = useContext(GlobalContext);

  useEffect(() => {
    if (updating) return;
    const fetchData = async () => {
      const route = loginToken
        ? "https://web-shop-ban-game-server.onrender.com/api/carts/auth/active"
        : "https://web-shop-ban-game-server.onrender.com/api/carts/active";
      await axios
        .post(
          route,
          {},
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
              // @ts-ignore
              Authorization: `Bearer ${loginToken}`,
            },
          }
        )
        .then(({ data: cart }) => {
          setData(cart);
        })
        .catch((error: any) => {
          console.log(error.message);
          return;
        });
    setFetching(false);
    };
    fetchData();
  }, [updating, loginToken]);

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
            // overflow: "scroll",
            maxHeight: "80vh",
            overflowY: "scroll",
          }}
        >
          <Stack
            divider={<Divider orientation="horizontal" flexItem />}
            spacing={2}
            sx={{ backgroundColor: "background.paper" }}
          >
            {data ? (
              data.products.map((item: any) => (
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
                    setFetching={setFetching}
                  />
                </StackItem>
              ))
            ) : (
              <StackItem
                sx={{
                  display: "flex",
                  gap: "0.9rem",
                  backgroundColor: "background.paper",
                }}
              >
                <Box className={"img-container"} sx={{ width: "25%" }}>
                  <Skeleton
                    variant={"rectangular"}
                    width={"100%"}
                    height={"200px"}
                  />
                </Box>
                <Box
                  // className={"item-controls"}
                  sx={{
                    width: "70%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <Box>
                    <Skeleton
                      variant={"text"}
                      sx={{ padding: "0.3rem", width: "200px", mb: "0.6rem" }}
                    />
                    <Skeleton
                      variant={"text"}
                      sx={{ padding: "0.1rem", width: "50px", mb: "0.3rem" }}
                    />
                    <Skeleton
                      variant={"text"}
                      sx={{ padding: "0.6rem", width: "50px", mb: "0.6rem" }}
                    />
                  </Box>
                  <Box sx={{ display: "flex", gap: "0.9rem" }}>
                    <Skeleton
                      variant="rectangular"
                      sx={{ padding: "1.2rem", width: "100px" }}
                    />
                    <Skeleton
                      variant="rectangular"
                      sx={{ padding: "1.2rem", width: "100px" }}
                    />
                  </Box>
                </Box>
              </StackItem>
            )}
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
          <PrimaryButton
            sx={{ borderRadius: "0.6rem" }}
            disabled={updating}
            onClick={() => {
              return history.push(`/checkout`);
            }}
          >
            Proceed to checkout
          </PrimaryButton>
          <AuthModal
            open={open}
            handleClose={() => {
              setOpen(false);
            }}
          />
        </Box>
      </Box>
      <Modal open={updating || fetching} onClose={() => {}}>
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
  );
};

export default Cart;
