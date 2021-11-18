import { alpha, Box, Container, styled, Typography } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Link } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";

const DevTitleTypo = styled("p")(({ theme }) => ({
  color: alpha(theme.palette.text.secondary, 0.7),
}));

const Category = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get("http://localhost:5000/games");
      setData(data);
    };
    fetchData();
  }, []);

  return (
    <Box className={"category"} sx={{ border: "1px solid yellow" }}>
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
                <Link to={"/"}>
                  <Box className={"img-container"}>
                    <img
                      src={
                        item.images.find((img: any) => {
                          return img.type === "3-4";
                        })?.url
                      }
                      style={{
                        width: "100%",
                        // objectFit: "cover",
                        borderRadius: "0.3rem",
                      }}
                      alt={""}
                      className={"game-thumnail"}
                    />
                  </Box>
                  <Typography
                    className={"game-title"}
                    sx={{ paddingTop: "0.9rem", color: "text.primary" }}
                  >
                    {item.name}
                  </Typography>
                  <DevTitleTypo className={"text-small game-developer"}>
                    {item.developer}
                  </DevTitleTypo>
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
