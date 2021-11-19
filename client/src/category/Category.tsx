import { alpha, Box, Container, styled, Typography } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Link } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";

export const AlphaTypo = styled("p")(({ theme }) => ({
  color: alpha(theme.palette.text.secondary, 0.6),
}));

const Category = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get("http://localhost:5000/api/games");
      setData(data);
    };
    fetchData();
  }, []);

  return (
    <Box className={"category"} 
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
          (item: any, index: number) =>
            index < 5 && (
              <Box
                className={"category-item"}
                sx={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "0.3rem",
                  color: "text.primary",
                }}
                key={item._id}
              >
                <Link
                  to={{
                    pathname: `/product/${item.name
                      .replace(/\s+/g, "-")
                      .toLowerCase()}`,
                    state: { _id: item._id },
                  }}
                >
                  <Box className={"img-container"}>
                    <img
                      src={
                        item.images.find((img: any) => {
                          return img.type === "portrait";
                        })?.url
                      }
                      style={{
                        width: "100%",
                        borderRadius: "0.3rem",
                      }}
                      alt={item.name + "portrait"}
                      className={"game-thumnail"}
                    />
                  </Box>
                  <Typography
                    className={"game-title"}
                    sx={{ paddingTop: "0.9rem", color: "text.primary" }}
                  >
                    {item.name}
                  </Typography>
                  <AlphaTypo className={"text-small game-developer"}>
                    {item.developer}
                  </AlphaTypo>
                  <Box
                    className={"game-price"}
                    sx={{ paddingTop: "0.9rem", color: "text.primary" }}
                  >
                    ${item.price}
                  </Box>
                </Link>
              </Box>
            )
        )}
      </Box>
    </Box>
  );
};

export default Category;
