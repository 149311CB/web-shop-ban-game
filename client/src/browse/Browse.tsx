import { Box, Grid, Pagination, Stack } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import GameCard from "../components/GameCard";

const getGames = async (currentPage: number) => {
  const limit = 20;
  const { data } = await axios.get("/api/products/games/all", {
    params: { limit, skip: currentPage },
  });
  return data;
};

const Browse = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [games, setGames] = useState<any>(null);
  useEffect(() => {
    getGames(currentPage).then((data: any) => {
      setGames(data.data);
      setTotalPages(data.total_pages);
    });
  }, [currentPage]);
  return (
    <Box sx={{ display: "flex", gap: "2.8rem" }}>
      <Box
        sx={{
          width: "75%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.9rem",
        }}
      >
        <Grid
          container
          columnSpacing={2}
          rowSpacing={5}
          sx={{ border: "1px solid red", padding: "1.5rem 0" }}
        >
          {games &&
            games.map((game: any) => (
              <Grid item xs={12} sm={4} md={3} key={game._id}>
                <GameCard game={game} />
              </Grid>
            ))}
        </Grid>
        <Stack spacing={2}>
          <Pagination
            count={totalPages}
            shape="rounded"
            onChange={(_, page) => {
              setCurrentPage(page - 1);
            }}
          />
        </Stack>
      </Box>
      <Box sx={{ border: "1px solid blue", width: "25%" }}></Box>
    </Box>
  );
};

export default Browse;
