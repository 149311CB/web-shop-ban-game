import { Box, Button, OutlinedInput, Stack, Typography } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { GlobalContext } from "../App";
import { GoldenPriceTag } from "../components/GoldenPriceTag";
import { AlphaTypo } from "../components/AlphaTypo";

const CartItem: React.FC<{
  item: any;
  mode: any;
  updating: boolean;
  setUpdating: Function;
  setFetching:Function
  // setData: Function;
}> = ({ item, mode, updating, setUpdating, setFetching }) => {
  const [qty, setQty] = useState(item.quantity ? item.quantity : 0);
  const [keys, setKeys] = useState<any[]>([]);
  const { loginToken, fetchCount } = useContext(GlobalContext);
  const {
    location: { pathname },
  } = useHistory();

  const changeQty = async (actionType: "plus" | "minus") => {
    setUpdating(true);
    let quantity = item.quantity;
    if (actionType === "plus" && qty < keys.length) {
      setQty((current: number) => current + 1);
      quantity = qty + 1;
    }

    if (actionType === "minus" && qty > 0) {
      setQty((current: number) => current - 1);
      quantity = qty - 1;
    }
    const route = loginToken
      ? "https://web-shop-ban-game.herokuapp.com/api/carts/auth/qty/update"
      : "https://web-shop-ban-game.herokuapp.com/api/carts/qty/update";
    await axios.post(
      route,
      {
        product: { ...item, quantity: quantity },
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          // @ts-ignore
          Authorization: `Bearer ${loginToken}`,
        },
      }
    );
    setUpdating(false);
  };

  const removeFromCart = async () => {
    const route = loginToken
      ? "https://web-shop-ban-game.herokuapp.com/api/carts/auth/remove"
      : "https://web-shop-ban-game.herokuapp.com/api/carts/remove";
    setUpdating(true);
    await axios.post(
      route,
      {
        product: { _id: item.product._id },
      },
      {
        withCredentials:true,
        headers: {
          "Content-Type": "application/json",
          // @ts-ignore
          Authorization: `Bearer ${loginToken}`,
        },
      }
    );
    setUpdating(false);
    setFetching(true);
    fetchCount(loginToken);
  };

  useEffect(() => {
    if (!item) return;
    const activeKeys = item.product.keys.filter((key: any) => {
      return key.status === false;
    });
    setKeys(activeKeys);
  }, [item]);

  return (
    <>
      <Box className={"img-container"} sx={{ width: "25%" }}>
        <img
          src={
            item.product.images.find((img: any) => {
              return img.type === "portrait";
            })?.url
          }
          alt={item.product.name + "portrait"}
          style={{ width: "100%", borderRadius: "0.6rem" }}
        />
      </Box>
      {pathname === "/cart/checkout" ? null : (
        <Box
          className={"item-controls"}
          sx={{
            width: "70%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Link
              to={{
                pathname: `/product/${item.product.name
                  .replace(/\s+/g, "-")
                  .toLowerCase()}`,
                state: { _id: item.product._id },
              }}
            >
              <Typography
                sx={{
                  fontSize: "1rem !important",
                  paddingBottom: "0.6rem",
                  fontFamily: "brutal-medium  !important",
                  color: "text.primary",
                }}
              >
                {item.product.name}
              </Typography>
            </Link>
            <AlphaTypo sx={{ paddingBottom: "0.6rem" }}>
              {item.product.developer}
            </AlphaTypo>
            <GoldenPriceTag mode={mode}>
              ${item.product.sale_price}
            </GoldenPriceTag>
          </Box>
          <Stack
            direction={"row"}
            spacing={1}
            sx={{ marginBottom: "8px", alignItems: "center" }}
          >
            <Box
              sx={{
                display: "inline-flex", // border: "1px solid red"
              }}
            >
              <Button
                sx={{
                  padding: "0 0.3rem",
                  color: "text.primary",
                  bgcolor: "info.main",
                  fontFamily: "brutal-medium",
                  fontSize: "0.75rem",
                  borderTopRightRadius: "0",
                  borderBottomRightRadius: "0",
                  "&:hover": {
                    backgroundColor: "info.main",
                  },
                  minWidth: "0px",
                }}
                onClick={() => {
                  changeQty("minus");
                }}
                disabled={qty <= 1 || updating}
              >
                <RemoveIcon />
              </Button>
              <OutlinedInput
                size={"small"}
                sx={{
                  width: "3rem",
                  textAlign: "center",
                  padding: "0",
                  borderRadius: "0",
                  ".MuiOutlinedInput-notchedOutline": {
                    borderColor: "primary.main",
                    borderWidth: "1px",
                  },
                  ".MuiOutlinedInput-input": {
                    textAlign: "center",
                  },
                }}
                inputProps={{ min: "0" }}
                value={qty}
              />
              <Button
                sx={{
                  color: "text.primary",
                  bgcolor: "info.main",
                  fontFamily: "brutal-medium",
                  fontSize: "0.75rem",
                  borderTopLeftRadius: "0",
                  borderBottomLeftRadius: "0",
                  "&:hover": {
                    backgroundColor: "info.main",
                  },
                  minWidth: "0px",
                }}
                onClick={() => {
                  changeQty("plus");
                }}
                disabled={qty >= keys.length || updating}
              >
                <AddIcon />
              </Button>
            </Box>
            <Box>
              <Button
                sx={{
                  fontFamily: "brutal-regular",
                  color: "error.main",
                  textTransform: "none",
                }}
                onClick={() => {
                  removeFromCart();
                }}
              >
                Remove
              </Button>
            </Box>
          </Stack>
        </Box>
      )}
    </>
  );
};

export default CartItem;
