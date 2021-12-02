import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { AlphaContainer } from "../components/AlphaContainer";

const Success = () => {
  const [createdOrder, setCreatedOrder] = useState<any>(null);
  const history = useHistory();
  const {
    location: { state },
  }: any = useHistory();

  useEffect(() => {
    if (state && state.createdOrder) {
      setCreatedOrder(state.createdOrder);
    } else {
      history.push("/");
    }
  }, [setCreatedOrder, state, history]);

  return (
    <Box sx={{ paddingTop: "1.2rem" }}>
      <AlphaContainer
        sx={{
          color: "text.primary",
          fontFamily: "brutal-regular",
          backgroundColor: "background.paper",
        }}
      >
        <Box></Box>
        <Box>
          <Typography
            variant={"h2"}
            sx={{ fontFamily: "brutal-medium !important" }}
          >
            Thank you for your order!
          </Typography>
          {createdOrder && (
            <Link
              to={{
                pathname: `/user/orders/${createdOrder._id}`,
              }}
            >
              <Typography
                sx={{
                  display: "inline-flex",
                  transition: "background 150ms ease-in-out",
                  backgroundColor: "primary.main",
                  borderRadius: 1,
                  color: "text.primary",
                  // fontFamily: "brutal-medium !important",
                  p: "0.3rem 0.6rem",
                  textAlign: "center",
                  "&:hover": {
                    backgroundColor: "action.hover",
                  },
                }}
              >
                View Order
              </Typography>
            </Link>
          )}
        </Box>
      </AlphaContainer>
    </Box>
  );
};

export default Success;
