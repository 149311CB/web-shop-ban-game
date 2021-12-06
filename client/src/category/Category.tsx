import { Box, Typography, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ChevronRightRounded } from "@mui/icons-material";
import GameCard from "../components/GameCard";

const getCollections = async () => {
  const { data } = await axios.get("/api/collections/name", {
    params: { names: ["top sale"] },
  });
  return data;
};

const Category = () => {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    getCollections().then((data) => {
      console.log(data);
      setCollections(data);
    });
  }, []);

  return (
    <Box>
      {collections &&
        collections.map((collection: any) => (
          <Box key={collection._id}>
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
              {collection.list_game.map((game: any) => (
                <Grid item md={2} sm={3} xs={6} key={game._id}>
                  <GameCard game={game} key={game._id} />
                </Grid>
              ))}
            </Grid>
          </Box>
        ))}
    </Box>
  );
};

export default Category;
