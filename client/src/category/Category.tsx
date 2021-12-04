import { Box, Typography } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Link } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import GameCard from "../product/GameCard";

const Category = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get("/api/products/games");
      setData(data);
    };
    fetchData();
  }, []);

  return (
    <Box
      className={"category"}
      // sx={{ border: "1px solid yellow" }}
    >
      <Link to={"#"} className={"category-nav"}>
        <Typography
          variant={"h2"}
          sx={{
            paddingBottom: "0.6rem",
            color: "text.primary",
            display: "flex",
            alignItems: "center",
          }}
        >
          Category title
          <ChevronRightIcon />
        </Typography>
      </Link>
      <Box
        className={"item-list"}
        sx={{
          display: "flex",
          alignItems: "stretch",
          gap: "0.9rem",
        }}
      >
        {data.map(
          (item: any, index: number) => index < 5 && <GameCard game={item} />
        )}
      </Box>
    </Box>
  );
};

export default Category;
