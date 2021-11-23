import {
  Box,
  Button,
  Typography,
  OutlinedInput,
  TypographyProps,
  styled,
  Stack,
  Divider,
} from "@mui/material";
import { AlphaTypo } from "../category/Category";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import React, { useState } from "react";
import axios from "axios";

interface IGoldenPriceTagProps {
  mode?: any;
}

export const GoldenPriceTag = styled(
  (props: IGoldenPriceTagProps & TypographyProps) => <Typography {...props} />
)(({ mode, theme }) => ({
  display: "inline-flex",
  textAlign: "center",
  alignItems: "center",
  padding: "0.3rem 0.6rem",
  borderRadius: "0.3rem",
  backgroundColor: mode === "dark" ? "hsl(54,76%,59%)" : "hsl(57, 76%, 65%)",
  color: "hsl(0,0%,11%)",
  fontFamily: "brutal-medium !important",
}));

const CartItem: React.FC<{
  item: any;
  mode: any;
  updating: boolean;
  setUpdating: Function;
  setData: Function;
}> = ({ item, mode, updating, setUpdating, setData }) => {
  const [qty, setQty] = useState(item.quantity ? item.quantity : 0);

  const changeQty = async (actionType: "plus" | "minus") => {
    setUpdating(true);
    let quantity = item.quantity;
    if (actionType === "plus" && qty < item.product.keys.length) {
      setQty((current: number) => current + 1);
      quantity = qty + 1;
    }

    if (actionType === "minus" && qty > 0) {
      setQty((current: number) => current - 1);
      quantity = qty - 1;
    }

    await axios.post("/api/carts/auth/qty/update", {
      user: { _id: "610844bf701a78827a321fa6" },
      product: { ...item, quantity: quantity },
    });
    setUpdating(false);
  };

  const removeFromCart = async () => {
    setUpdating(true);
    await axios.post("/api/carts/auth/remove", {
      user: { _id: "610844bf701a78827a321fa6" },
      product: { _id: item.product._id },
    });
    setUpdating(false);
  };

  return (
    <>
      <Box sx={{ width: "25%" }}>
        <img
          src={
            item.product.images.find((img: any) => {
              return img.type === "portrait";
            }).url
          }
          alt={item.product.name + "portrait"}
          style={{ width: "100%", borderRadius: "0.6rem" }}
        />
      </Box>
      <Box
        sx={{
          width: "70%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: "1rem !important",
              paddingBottom: "0.6rem",
              fontFamily: "brutal-medium  !important",
            }}
          >
            {item.product.name}
          </Typography>
          <AlphaTypo sx={{ paddingBottom: "0.6rem" }}>
            {item.product.developer}
          </AlphaTypo>
          <GoldenPriceTag mode={mode}>${item.product.price}</GoldenPriceTag>
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
              disabled={qty >= item.product.keys.length || updating}
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
    </>
  );
};

export default CartItem;
