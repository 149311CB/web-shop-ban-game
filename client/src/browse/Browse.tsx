import { Box, Grid, Pagination, Stack } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import GameCard from "../components/GameCard";
import FilterSidebar from "./FilterSidebar";

const getGames = async (
  collection: string | undefined,
  currentPage: number,
  keyword: string | null | undefined,
  filters: string[]
) => {
  const limit = 20;
  const body = filters.length > 0 ? { filters } : {};
  const { data } = await axios.post("/api/products/games/all", body, {
    params: { limit, skip: currentPage, keyword, collection },
  });
  return data;
};

const Browse: React.FC<RouteComponentProps> = ({ match }) => {
  const { params }: any = match;
  const [keyword, setKeyword] = useState<string>();
  const [filters, setFilters] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [games, setGames] = useState<any>(null);

  useEffect(() => {
    let collection;
    if (params.name) {
      collection = params.name.replace(/-/g, " ");
    }
    getGames(collection, currentPage, keyword, filters).then((data) => {
      setGames(data.data);
      setTotalPages(data.total_pages);
    });
  }, [currentPage, keyword, filters, params]);

  return (
    <Box className={"browse-page"} sx={{ display: "flex", gap: "2.8rem" }}>
      <Box
        sx={{
          width: "75%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.9rem",
        }}
      >
        <Grid container columnSpacing={2} rowSpacing={5} sx={{ py: 2 }}>
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
      <Box sx={{ width: "25%" }}>
        <FilterSidebar
          setKeyword={setKeyword}
          filters={filters}
          setFilters={setFilters}
        />
      </Box>
    </Box>
  );
};

export default withRouter(Browse);
