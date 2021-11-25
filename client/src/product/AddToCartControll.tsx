import React from "react";
import { Box, Button, FormControl, Select, MenuItem } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

const AddToCartControll: React.FC<{ data: any }> = ({ data }) => {
  const [qty, setQty] = useState<number>(1);
  const [cookies] = useCookies(["cookie-name"]);

  const changeQty = (e: any) => {
    const selectedQty = parseInt(e.target.value);
    setQty(selectedQty);
  };

  const addToCart = async () => {
    console.log(data._id);
    const { data: cart } = await axios.post(
      "/api/carts/auth/add",
      {
        product: { _id: data._id, quantity: qty },
      },
      {
        headers: {
          "Content-Type": "application/json",
          // @ts-ignore
          Authorization: `Bearer ${cookies.login_token}`,
        },
      }
    );
    console.log(cart);
  };

  return (
    <Box
      className={"product-group-control"}
      sx={{
        display: "flex",
        width: "100%",
      }}
    >
      <FormControl
        sx={{
          width: "25%",
        }}
      >
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={qty}
          sx={{
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
            ".MuiOutlinedInput-notchedOutline": {
              borderColor: "primary.main",
              borderWidth: "1px",
            },
          }}
          onChange={(e) => {
            changeQty(e);
          }}
        >
          {data.keys.map((value: any, index: number) => (
            <MenuItem value={index + 1} key={value.value}>
              {index + 1}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        className={"checkout-btn"}
        sx={{
          color: "text.primary",
          bgcolor: "info.main",
          fontFamily: "brutal-medium",
          fontSize: "0.75rem",
          width: "100%",
          padding: "0.9rem 0",
          borderTopLeftRadius: "0",
          borderBottomLeftRadius: "0",
          "&:hover": {
            backgroundColor: "info.main",
          },
        }}
        onClick={() => {
          addToCart();
        }}
      >
        ADD TO CART
      </Button>
    </Box>
  );
};

export default AddToCartControll;
