import {Box, Button, ButtonProps, List, styled,} from "@mui/material";
import React, {useRef, useState} from "react";
import {useAnimationFrame} from "../hooks/useAnimationFrame";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {AlphaListItem} from "../components/AlphaListItem";

interface ICarouselButtonProps {
  direction: "left" | "right";
}

const CarouselButton = styled((props: ICarouselButtonProps & ButtonProps) => (
  <Button {...props} />
))(({ theme, direction }) => ({
  height: "100%",
  color: theme.palette.text.primary,
  opacity: 0,
  transition: "opacity 125ms ease-in-out",
  background:
    direction === "right"
      ? "linear-gradient(270deg, rgba(11, 11, 11, 0.4) 0%, rgba(11, 11, 11, 0) 100%)"
      : "linear-gradient(-270deg, rgba(11, 11, 11, 0.4) 0%, rgba(11, 11, 11, 0) 100%)",
  "&:hover": {
    backgroundColor: "transparent",
  },
}));

const GameCarousel: React.FC<{ data: any }> = ({ data }) => {
  const gameCarouselRef = useRef<HTMLUListElement>(null);
  const [transitionDelay, setTransitionDelay] = useState(5000);
  const [currentItem, setCurrentItem] = useState(1);
  const [allowCarousel, setAllowCarousel] = useState([
    "landscape",
    "template",
    "logo",
  ]);

  const carouselTransition = () => {
    if (gameCarouselRef.current) {
      const reset = gameCarouselRef.current.querySelectorAll("li").length;
      if (currentItem !== reset) {
        gameCarouselRef.current.style.transition = "1.5s ease-in-out";
        gameCarouselRef.current.style.transform = `translateX(-${
          100 * currentItem
        }%)`;
        return setCurrentItem((c: number) => c + 1);
      } else {
        gameCarouselRef.current.style.transition = "1s ease-in-out";
        gameCarouselRef.current.style.transform = `translateX(${0}%)`;
        return setCurrentItem(1);
      }
    }
  };

  useAnimationFrame(transitionDelay, carouselTransition);

  return (
    <Box>
      <Box
        className={"game-carousel"}
        sx={{
          overflow: "hidden",
          position: "relative",
          // border: "1px solid purple",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            width: "100%",
            zIndex: "1",
            height: "100%",
            display: "flex",
            justifyContent: "space-between",
            "&:hover": {
              button: {
                opacity: "1",
              },
            },
          }}
        >
          <CarouselButton direction={"left"}>
            <ChevronLeftIcon fontSize={"large"} />
          </CarouselButton>
          <CarouselButton direction={"right"}>
            <ChevronRightIcon fontSize={"large"} />
          </CarouselButton>
        </Box>
        <ul
          ref={gameCarouselRef}
          style={{
            display: "flex",
            listStyle: "none",
          }}
        >
          {data.images.map((img: any, index: number) => {
            return allowCarousel.includes(img.type) ? (
              <li
                key={"img" + index}
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
      <List
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: "0.9rem",
        }}
      >
        {data.images.map((img: any, index: number) => {
          return allowCarousel.includes(img.type) ? (
            <AlphaListItem
              key={"small-img" + index}
              className={index === currentItem ? "active" : ""}
              sx={{
                width: "100px",
                padding: "0",
                borderRadius: "0.3rem",
              }}
            >
              <img
                src={img.url}
                alt={data.name + "landscape"}
                style={{ width: "100%", borderRadius: "0.3rem" }}
              />
            </AlphaListItem>
          ) : null;
        })}
      </List>
    </Box>
  );
};

export default GameCarousel;
