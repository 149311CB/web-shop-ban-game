import { Box, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const CartPopover: React.FC<{
  cartPopRef: React.Ref<any>;
  product: any;
}> = ({ cartPopRef, product }) => {
  return (
    <Paper
      ref={cartPopRef}
      sx={{
        position: "absolute",
        bottom: 0,
        right: 0,
        transform: `translateY(calc(100% + 10px))`,
        p: 1,
        zIndex: 2,
        backgroundColor: "common.black",
        minWidth: "max-content",
        fontFamily: "brutal-regular",
        // display: "flex",
      }}
    >
      <Box sx={{ display: "flex", gap: "0.9rem" }}>
        <Box className={"image-container"} sx={{width:"50px"}}>
          {product && (
            <img
              src={
                product.images.find((img: any) => {
                  return img.type === "portrait";
                })?.url
              }
              alt={"small"}
              style={{ width: "100%" }}
            />
          )}
        </Box>

        <Box>
          <Typography sx={{fontSize:"0.938rem !important"}}>A new item had been added to your cart</Typography>
          <Typography>Quantity: {product.quantity}</Typography>
        </Box>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
        <Link to={"/cart"} style={{ width: "100%" }}>
          <Typography
            sx={{
              transition: "background 150ms ease-in-out",
              backgroundColor: "primary.main",
              borderRadius: 1,
              color: "text.primary",
              // fontFamily: "brutal-medium !important",
              p: "0.3rem 0",
              textAlign: "center",
              "&:hover": {
                backgroundColor: "action.hover",
              },
            }}
          >
            View Cart And Checkout
          </Typography>
        </Link>
      </Box>
    </Paper>
  );
};
