import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import GameType from "../components/GameType";
import { useAnimationFrame } from "../hooks/useAnimationFrame";

const Product = () => {
  const {
    location: { state },
  }: any = useHistory();

  const [data, setData] = useState<any>(null);
  const [allowCarousel, setAllowCarousel] = useState([
    "landscape",
    "template",
    "logo",
  ]);
  const [transitionDelay, setTransitionDelay] = useState(5000);
  const [currentItem, setCurrentItem] = useState(1);
  const gameCarouselRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    let _id: string;
    if (state && state._id) {
      _id = state._id;
    }

    const fetchData = async () => {
      const { data } = await axios.get(
        `https://web-shop-ban-game.herokuapp.com/api/games/${_id}`
      );
      setData(data);
    };
    fetchData();
  }, [state]);

  useAnimationFrame(transitionDelay, () => {
    if (gameCarouselRef.current) {
      const reset = gameCarouselRef.current.querySelectorAll("li").length;
      if (currentItem !== reset) {
        gameCarouselRef.current.style.transition = "1.5s ease-in-out";
        gameCarouselRef.current.style.transform = `translateX(-${
          100 * currentItem
        }%)`;
        return setCurrentItem((c) => c + 1);
      } else {
        gameCarouselRef.current.style.transition = "1s ease-in-out";
        gameCarouselRef.current.style.transform = `translateX(${0}%)`;
        return setCurrentItem(1);
      }
    }
  });

  return (
    <>
      {data ? (
        <Box
          className={"product-page"}
          sx={{ padding: "1.5rem 0", color: "text.primary", paddingBottom:"3.9rem"}}
        >
          <Typography variant={"h1"} sx={{ paddingBottom: "1.5rem" }}>
            {data.name}
          </Typography>
          <Box
            className={"game-content"}
            sx={{ display: "flex", gap: "2.8rem" }}
          >
            <Box
              className={"game-info"}
              sx={{ width: "70%", overflow: "hidden", position: "relative" }}
            >
              <Box sx={{ position: "absolute", zIndex: "1" }}>
                <Button>Left</Button>
                <Button>Right</Button>
              </Box>
              <ul
                className={"game-carousel"}
                ref={gameCarouselRef}
                style={{
                  display: "flex",
                  listStyle: "none",
                }}
              >
                {data.images.map((img: any) => {
                  return allowCarousel.includes(img.type) ? (
                    <li
                      className={"game-media"}
                      style={{
                        flexBasis: "100%",
                        flexShrink: 0,
                        padding: "0 0.3rem",
                        // border: "1px solid yellow",
                      }}
                    >
                      <img
                        src={img.url}
                        alt={data.name + "landscape"}
                        style={{
                          width: "100%",
                          borderRadius: "0.6rem",
                          // border: "1px solid blue",
                        }}
                      />
                    </li>
                  ) : null;
                })}
              </ul>
            </Box>
            <Box
              className={"game-controls"}
              sx={{
                width: "30%",
                // border: "1px solid green",
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
                  // border: "1px solid red"
                }}
              >
                <GameType type={"Base Game"} />
                <Typography>${data.price}</Typography>
                <Box
                  className={"product-group-control"}
                  sx={{ display: "flex" }}
                >
                  <FormControl sx={{ width: "25%" }}>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={1}
                      // onChange={handleChange}
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
                      "&:hover": {
                        backgroundColor: "info.main",
                      },
                    }}
                  >
                    BUY NOW
                  </Button>
                </Box>
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
