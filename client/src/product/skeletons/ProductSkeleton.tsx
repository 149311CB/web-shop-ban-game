import { Box, Skeleton } from "@mui/material";
import GameCarouselSkeleton from "./GameCarouselSkeleton";

const ProductSkeleton = () => {
  return (
    <>
      <Box>
        <Box
          className={"product-page"}
          sx={{
            padding: "1.5rem 0",
            color: "text.primary",
            paddingBottom: "3.9rem",
          }}
        >
          <Skeleton
            variant={"text"}
            sx={{ padding: "0.6rem", width: "250px", mb: "1.5rem" }}
          />
          <Box
            className={"game-content"}
            sx={{
              display: { xs: "flex", md: "grid" },
              gap: "2.8rem",
              flexDirection: "column",
              alignItems: "flex-start",
              gridTemplateColumns: "repeat(3, 1fr)",
              gridTemplateRows: "auto",
            }}
          >
            <Box
              sx={{
                gridRow: "1/2",
                gridColumn: "1/3",
              }}
            >
              <Box
                sx={{
                  // width: { xs: "100%", md: "70%" },
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.5rem",
                }}
              >
                <GameCarouselSkeleton />
              </Box>
            </Box>
            <Box
              sx={{
                gridRow: "1/3",
                gridColumn: "3/4",
                width: "100%",
              }}
            >
              <Box
                className={"game-controls"}
                sx={{
                  // width: { xs: "100%", md: "30%" },
                  fontFamily: "brutal-regular",
                }}
              >
                <Box
                  sx={{
                    display: { xs: "none", md: "block" },
                    padding: "0 1.2rem",
                  }}
                >
                  <Skeleton variant={"rectangular"} height={200} />
                </Box>
                <Box
                  sx={{
                    marginTop: "1.2rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.6rem",
                    alignItems: "flex-start",
                    padding: "0 1.2rem",
                  }}
                >
                  <Skeleton
                    variant="text"
                    sx={{ p: "0.6rem 0", width: "50px" }}
                  />
                  <Skeleton
                    variant="rectangular"
                    sx={{ height: "50px", width: "100%" }}
                  />
                  <Skeleton
                    variant="rectangular"
                    sx={{ height: "30px", width: "100%", pb: 3 }}
                  />
                  <Box sx={{width:"100%"}}>
                    <Skeleton variant="text" sx={{ width: "100%" }} />
                    <Skeleton variant="text" sx={{ width: "100%" }} />
                    <Skeleton variant="text" sx={{ width: "100%" }} />
                    <Skeleton variant="text" sx={{ width: "100%" }} />
                    <Skeleton variant="text" sx={{ width: "100%" }} />
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ProductSkeleton;
