import React, { useContext, useEffect, useState } from "react";
import {
  Alert,
  Box,
  FormControl,
  MenuItem,
  Select,
  Snackbar,
} from "@mui/material";
import axios from "axios";
import { GlobalContext } from "../App";
import { PrimaryButton } from "../components/PrimaryButton";

const AddToCartControll: React.FC<{ data: any }> = ({ data }) => {
  const [qty, setQty] = useState<number>(1);
  const [keys, setKeys] = useState<any[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [maxQuantity, setMaxQuantity] = useState<number>(0);
  const [inCart, setInCart] = useState<number>(0);
  const { loginToken, fetchCount } = useContext(GlobalContext);

  const changeQty = (e: any) => {
    const selectedQty = parseInt(e.target.value);
    setQty(selectedQty);
  };

  const handleClose = () => {
    setOpen(!open);
  };

  const addToCart = async () => {
    const { data: reponseData } = await axios.post(
      "/api/carts/auth/add",
      {
        product: { _id: data._id, quantity: qty },
      },
      {
        headers: {
          "Content-Type": "application/json",
          // @ts-ignore
          Authorization: `Bearer ${loginToken}`,
        },
      }
    );

    if (reponseData.message === "exceed quantity") {
      setMaxQuantity(reponseData.details.max);
      setInCart(reponseData.details.in_cart);
      setOpen(true);
    } else {
      if (fetchCount) {
        fetchCount(loginToken, true, {
          ...data,
          quantity: reponseData.qty_in_cart,
        });
      }
    }
  };

  useEffect(() => {
    if (!data) return;
    const activeKeys = data.keys.filter((key: any) => {
      return key.status === false;
    });
    setKeys(activeKeys);
  }, [data]);

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
          {keys.map((_, index: number) => (
            <MenuItem value={index + 1} key={`${index}`}>
              {index + 1}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <PrimaryButton
        sx={{
          width: "100%",
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
        }}
        onClick={() => {
          addToCart();
        }}
      >
        Add to cart
      </PrimaryButton>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={5000}
        open={open}
        onClose={handleClose}
        message="I love snacks"
      >
        <Alert
          onClose={handleClose}
          severity="error"
          sx={{
            width: "100%",
            backgroundColor: "error.main",
            color: "background.default",
          }}
        >
          Max quantity for this item is {maxQuantity} and your cart already have{" "}
          {inCart}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddToCartControll;
