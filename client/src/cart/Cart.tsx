import { useContext, useEffect, useState } from "react";
import { Box, Divider, Stack, Typography } from "@mui/material";
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
  const [updating, setUpdating] = useState(false);
  const { mode } = useContext(GlobalContext);
  const history = useHistory();
  const { loginToken } = useContext(GlobalContext);

  useEffect(() => {
    if (updating) return;
    const fetchData = async () => {
      const route = loginToken ? "/api/carts/auth/active" : "/api/carts/active";
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
    };
    fetchData();
  }, [updating, loginToken]);

  // useEffect(()=>{
  //   window.addEventListener("wheel", (e)=>{
  //     console.log(e)
  //     // document.querySelector(".cart-main")?.scroll()
  //   })
  // },[])

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
          <PrimaryButton
            sx={{ borderRadius: "0.6rem" }}
            disabled={updating}
            onClick={() => {
              return loginToken ? history.push(`/checkout`) : setOpen(true);
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
    </Box>
  );
};

export default Cart;
