import { alpha, Box, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  RouteComponentProps,
  useHistory,
  withRouter,
} from "react-router-dom";
import GameType from "../components/GameType";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import GameCarousel from "./GameCarousel";
import AddToCartControl from "./AddToCartControl";
import BasicInfo from "./BasicInfo";
import WishlistButton from "./WishlistButton";
import Description from "./Description";
import GameCard from "./GameCard";
import Review from "./Review";

const Product: React.FC<RouteComponentProps> = ({ match }) => {
  const {
    location: { state },
  }: any = useHistory();

  const [data, setData] = useState<any>(null);
  const [includes, setIncludes] = useState<any>(null);
  const [includedIn, setIncludedIn] = useState<any>();

  useEffect(() => {
    let _id: string;
    if (state && state._id) {
      _id = state._id;
    }

    const fetchData = async () => {
      const { data } = await axios.get(`/api/products/games/${_id}`);
      const { includes, included_in, ...rest } = data;
      setIncludes(includes);
      setIncludedIn(included_in);
      setData(rest);
    };
    fetchData();
  }, [state, match]);

  return (
    <>
      {data ? (
        <Box>
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
              sx={{
                display: "flex",
                gap: "2.8rem",
                flexDirection: { xs: "column", md: "row" },
              }}
            >
              <Box
                sx={{
                  width: { xs: "100%", md: "70%" },
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.5rem",
                }}
              >
                <GameCarousel data={data} />
              </Box>
              <Box
                className={"game-controls"}
                sx={{
                  width: { xs: "100%", md: "30%" },
                  fontFamily: "brutal-regular",
                }}
              >
                <Box
                  sx={{
                    display: { xs: "none", md: "block" },
                    padding: "1.2rem",
                  }}
                >
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
                  <Typography>${data.sale_price}</Typography>
                  <AddToCartControl data={data} />
                  <WishlistButton
                    className={"wishlist-btn"}
                    sx={{ width: "100%" }}
                  >
                    <AddCircleOutlineIcon sx={{ paddingRight: "0.3rem" }} />
                    Add to wishlist
                  </WishlistButton>
                  <BasicInfo data={data} />
                </Box>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              color: "text.primary",
              width: { xs: "100%", md: "calc(70% - 1.4rem)" },
            }}
          >
            <Typography sx={{ fontSize: "1.125rem !important" }}>
              {data.title}
            </Typography>
            <Box
              sx={{
                "& h1": {
                  fontSize: "0.938rem !important",
                  paddingBottom: 1,
                },
                "& h2, h3, h4": {
                  fontSize: "0.938rem !important",
                },
                "& p, ul": {
                  fontSize: "0.875rem",
                  color: (theme) => alpha(theme.palette.text.secondary, 0.6),
                  paddingBottom: 3,
                },
                "& ul": {
                  ml: "15px",
                },
              }}
            >
              <Description description={data.description} />
            </Box>
            {includedIn && includedIn.length > 0 && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.2rem",
                  marginBottom: "3rem",
                }}
              >
                <>
                  <Typography
                    variant={"h1"}
                    sx={{ fontFamily: "brutal-regular" }}
                  >
                    Editions
                  </Typography>
                  {includedIn.map((game: any) => (
                    <GameCard game={game} key={game._id} />
                  ))}
                </>
              </Box>
            )}
            {includes && includes.length > 0 && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.2rem",
                }}
              >
                <>
                  <Typography
                    variant={"h1"}
                    sx={{ fontFamily: "brutal-regular" }}
                  >
                    Add-Ons
                  </Typography>
                  {includes.map((game: any) => (
                    <GameCard game={game} key={game._id} />
                  ))}
                </>
              </Box>
            )}
            <Review gameId={data._id} />
          </Box>
        </Box>
      ) : (
        <div>Nothing here</div>
      )}
    </>
  );
};

export default withRouter(Product);
