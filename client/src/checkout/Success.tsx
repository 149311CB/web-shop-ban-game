import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
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
          mt: 5,
          width: "50%",
          margin: "0 auto",
          color: "text.primary",
          fontFamily: "brutal-regular",
          backgroundColor: "background.paper",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "1.2rem 0",
          }}
        >
          <Typography
            variant={"h2"}
            sx={{ fontFamily: "brutal-medium !important" }}
          >
            Thank you for your order!
          </Typography>
          <Typography>We have sent invoice to your email</Typography>
          <img
            src={
              "https://firebasestorage.googleapis.com/v0/b/images-b3099.appspot.com/o/transparent-you-rock.gif?alt=media&token=627bf196-31ba-4055-9660-1fa59dd0e952"
            }
            alt=""
            style={{ width: "250px", height: "150px", objectFit: "cover" }}
          />
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
