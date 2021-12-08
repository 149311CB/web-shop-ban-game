import { alpha, Box, Divider, Typography } from "@mui/material";
import React from "react";
import { PrimaryButton } from "../components/PrimaryButton";
import WishlistButton from "./WishlistButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useHistory } from "react-router-dom";

const GameCard: React.FC<{ game: any }> = ({ game }) => {
  const history = useHistory();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        bgcolor: "common.black",
        borderRadius: "0.3rem",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: "0.9rem",
          bgcolor: "common.black",
          borderRadius: "0.3rem",
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", md: "40%" },
          }}
        >
          <img
            src={
              game.images.find((image: any) => {
                return image.type === "template" || image.type === "landscape";
              })?.url
            }
            style={{
              width: "100%",
              height: "100%",
              borderTopLeftRadius: "0.3rem",
            }}
            alt={game.name + "template"}
          />
        </Box>
        <Box
          sx={{
            width: {
              xs: "100%",
              md: "60%",
            },
            color: "text.primary",
            p: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: "0.9rem",
              alignItems: "center",
              marginBottom: "0.9rem",
            }}
          >
            <Typography
              sx={{
                fontSize: "0.625rem !important",
                textTransform: "uppercase",
                padding: "0.3rem",
                borderRadius: 1,
                bgcolor: "background.paper",
                maxWidth: "max-content",
              }}
            >
              {game.type}
            </Typography>
            <Typography>{game.name}</Typography>
          </Box>
          <Typography
            sx={{
              color: (theme) => alpha(theme.palette.text.secondary, 0.6),
            }}
          >
            {game.title}
          </Typography>
        </Box>
      </Box>
      <Divider />
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "flex-end",
          gap: "0.9rem",
          p: 2,
        }}
      >
        <Typography
          sx={{
            fontSize: "0.938rem !important",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          ${game.sale_price}
        </Typography>
        <PrimaryButton
          sx={{ p: "0.6rem 3.0rem" }}
          onClick={() =>
            history.push({
              pathname: `/product/${game.name
                .replace(/\s+/g, "-")
                .toLowerCase()}`,
              state: { _id: game._id },
            })
          }
        >
          Buy Now
        </PrimaryButton>
        <WishlistButton sx={{ p: "0.6rem" }}>
          <AddCircleOutlineIcon sx={{ paddingRight: "0.3rem" }} />
          Add to wishlist
        </WishlistButton>
      </Box>
    </Box>
  );
};

export default GameCard;
