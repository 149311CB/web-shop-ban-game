import { Box, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import GameType from "../components/GameType";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import GameCarousel from "./GameCarousel";
import AddToCartControll from "./AddToCartControll";
import BasicInfo from "./BasicInfo";
import WishlistButton from "./WishlistButton";

const Product = () => {
  const {
    location: { state },
  }: any = useHistory();

  const [data, setData] = useState<any>(null);

  useEffect(() => {
    let _id: string;
    if (state && state._id) {
      _id = state._id;
    }

    const fetchData = async () => {
      const { data } = await axios.get(
        `/api/products/games/${_id}`
      );
      setData(data);
    };
    fetchData();
  }, [state]);


  return (
    <>
      {data ? (
        <Box
          className={"product-page"}
          sx={{
            padding: "1.5rem 0",
            color: "text.primary",
            paddingBottom: "3.9rem",
          }}
        >
          <Typography variant={"h1"} sx={{ paddingBottom: "1.5rem" }}>
            {data.name}
          </Typography>
          <Box
            className={"game-content"}
            sx={{ display: "flex", gap: "2.8rem" }}
          >
            <Box sx={{ width: "70%" }}>
              <GameCarousel data={data} />
            </Box>
            <Box
              className={"game-controls"}
              sx={{
                width: "30%",
                fontFamily: "brutal-regular",
              }}
            >
              <Box sx={{ padding: "1.2rem" }}>
                <img
                  src={
                    data.images.find((img: any) => {
                      return img.type === "logo";
                    })?.url
                  }
                  alt={data.name + "logo"}
                  style={{ width: "100%" }}
                />
              </Box>
              <Box
                sx={{
                  marginTop: "1.2rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.6rem",
                  alignItems: "flex-start",
                }}
              >
                <GameType type={"Base Game"} />
                <Typography>${data.price}</Typography>
                <AddToCartControll data={data} />
                <WishlistButton className={"wishlist-btn"}>
                  <AddCircleOutlineIcon sx={{ paddingRight: "0.3rem" }} />
                  Add to wishlist
                </WishlistButton>
                <BasicInfo data={data} />
              </Box>
            </Box>
          </Box>
        </Box>
      ) : (
        <div>Nothing here</div>
      )}
    </>
  );
};

export default Product;
