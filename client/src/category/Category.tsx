import { Box, Typography, Grid, Skeleton } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { ChevronRightRounded } from "@mui/icons-material";
import GameCard from "../components/GameCard";

export const getCollections = async (names: string[]) => {
  const { data } = await axios.get(
    "https://web-shop-ban-game-server.onrender.com/api/collections/name",
    {
      params: { names },
    }
  );
  return data;
};

const Category = () => {
  const [collections, setCollections] = useState<any[]>();

  useEffect(() => {
    getCollections([
      "top sale",
      "new release",
      "most popular",
      "recently update",
    ]).then((data) => {
      const index = data.indexOf("top sale");
      const top_sale = data.splice(index, 1);
      data.unshift(...top_sale);
      setCollections(data);
    });
  }, []);

  return (
    <Box>
      {collections ? (
        collections.map((collection: any) => (
          <Box key={collection._id} sx={{ pb: 10 }}>
            <Link
              to={{
                pathname: `/browse/${collection.name
                  .replace(/\s+/g, "-")
                  .toLowerCase()}`,
                state: { _id: collection._id },
              }}
            >
              <Typography
                variant={"h2"}
                sx={{
                  pb: 2,
                  color: "text.primary",
                  display: "inline-flex",
                  alignItems: "center",
                  cursor: "pointer",
                  "& svg": {
                    transition: "all 150ms ease-in-out",
                  },
                  "&:hover": {
                    "& svg": {
                      pl: 1,
                      transform: "scale(1.5)",
                    },
                  },
                }}
              >
                {collection.name[0].toUpperCase() + collection.name.slice(1)}
                <ChevronRightRounded />
              </Typography>
            </Link>
            <Grid
              container
              key={collection._id}
              spacing={2}
              columns={{ md: 10, xs: 12 }}
            >
              {collection.list_game.map((game: any, index: number) => {
                return (
                  index < 5 && (
                    <Grid item md={2} sm={3} xs={6} key={game._id}>
                      <GameCard game={game} key={game._id} />
                    </Grid>
                  )
                );
              })}
            </Grid>
          </Box>
        ))
      ) : (
        <>
          <Skeleton variant="text" sx={{width:190, pb:2, mb:1}}/>
          <Grid
            container
            spacing={2}
            columns={{ md: 10, xs: 12 }}
          >
            <Grid item md={2} sm={3} xs={6}>
              <Skeleton
                variant="rectangular"
                sx={{
                  bgcolor: "background.paper",
                  height: 250,
                }}
              />
            </Grid>
            <Grid item md={2} sm={3} xs={6}>
              <Skeleton
                variant="rectangular"
                sx={{
                  bgcolor: "background.paper",
                  height: 250,
                }}
              />
            </Grid>
            <Grid item md={2} sm={3} xs={6}>
              <Skeleton
                variant="rectangular"
                sx={{
                  bgcolor: "background.paper",
                  height: 250,
                }}
              />
            </Grid>
            <Grid item md={2} sm={3} xs={6}>
              <Skeleton
                variant="rectangular"
                sx={{
                  bgcolor: "background.paper",
                  height: 250,
                }}
              />
            </Grid>
            <Grid item md={2} sm={3} xs={6}>
              <Skeleton
                variant="rectangular"
                sx={{
                  bgcolor: "background.paper",
                  height: 250,
                }}
              />
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  );
};

export default Category;
