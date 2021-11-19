import React from "react";
import { Box, Button, FormControl, Select, MenuItem } from "@mui/material";
import { useState } from "react";

const AddToCartControll: React.FC<{ data: any }> = ({ data }) => {
  const [qty, setQty] = useState<number>(1);
  const changeQty = (e: any) => {
    const selectedQty = parseInt(e.target.value);
    setQty(selectedQty);
  };
  return (
    <Box
      className={"product-group-control"}
      sx={{
        display: "flex",
        width: "100%",
        border: "1px solid red",
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
              borderWidth: "2px",
            },
          }}
          onChange={(e) => {
            changeQty(e);
          }}
        >
          {data.keys.map((value: any, index: number) => (
            <MenuItem value={index} key={value}>
              {index}
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
      >
        ADD TO CART
      </Button>
    </Box>
  );
};

export default AddToCartControll;
