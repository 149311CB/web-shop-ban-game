import { Badge, Box, IconButton, styled } from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import { CartPopover } from "./CartPopover";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useHistory } from "react-router-dom";
import { GlobalContext } from "../App";
import axios from "axios";
import { useClickOutside } from "../hooks/useClickOutside";

export const CartBadge = styled(Badge)(({ theme }) => ({
  ".MuiBadge-badge": {
    right: 0,
    top: 0,
    border: `2px solid ${theme.palette.common.black} !important`,
    padding: "0 4px",
  },
}));

const getCart = async (route: string, loginToken: string): Promise<any> => {
  return await axios
    .get(route, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${loginToken}`,
      },
    })
    .then(({ data }) => {
      return data;
      // setCount(data.count);
    })
    .catch((error) => {
      return null;
    });
};

const ShoppingCartBadge = () => {
  const guestCart = useRef(false);
  const [count, setCount] = useState(0);
  const [addedProduct, setAddedProduct] = useState(null);
  const [visible, setVisible, cartPopRef] = useClickOutside(false);
  const history = useHistory();

  const value = useContext(GlobalContext);
  const { loginToken } = value;

  const fetchCount = React.useCallback(
    async (loginToken, openDialog = false, product = null) => {
      if (product) {
        setAddedProduct(product);
      }
      let localCount: number | null = null;
      console.log(guestCart.current)
      if (loginToken && !guestCart.current) {
        const userCount = await getCart(
          "https://web-shop-ban-game-server.onrender.com/api/carts/auth/count",
          loginToken
        );

        localCount = userCount.count;
      } else {
        const data = await getCart(
          "https://web-shop-ban-game-server.onrender.com/api/carts/count",
          ""
        ).catch((error) => error);
        if (data && data.count) {
          guestCart.current = true;
          localCount = data.count;
        }
      }
      setCount(localCount!);
      if (openDialog) {
        setVisible(true);
      }
    },
    [setVisible]
  );

  // TODO: Need a better way to do this because it not update live
  value.fetchCount = fetchCount;

  useEffect(() => {
    (async () => {
      if (loginToken && guestCart.current) {
        await axios.get(
          "https://web-shop-ban-game-server.onrender.com/api/carts/auth/update",
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${loginToken}` },
          }
        );
        guestCart.current = false;
      }
    })().then(() => {
      fetchCount(loginToken);
    });
  }, [fetchCount, loginToken]);
  useEffect(() => {
    const {
      location: { pathname },
    } = history;

    if (!pathname.includes("product")) {
      setVisible(false);
    }
  });

  return (
    <Box sx={{ ml: 2, position: "relative" }}>
      <IconButton
        size="small"
        edge="start"
        color="inherit"
        aria-label="open drawer"
        onClick={() => {
          history.push("/cart");
        }}
      >
        {count > 0 ? (
          <CartBadge badgeContent={count} color={"primary"}>
            <ShoppingCartIcon fontSize={"small"} />
          </CartBadge>
        ) : (
          <ShoppingCartIcon fontSize={"small"} />
        )}
      </IconButton>
      {visible && (
        <CartPopover cartPopRef={cartPopRef} product={addedProduct} />
      )}
    </Box>
  );
};

export default ShoppingCartBadge;
