import { Box, Divider, Paper, Stack, styled, Typography } from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { GlobalContext } from "../../../App";
import { ReactComponent as VisaLogo } from "../../../assets/visa-black.svg";
// import { ReactComponent as PaypalLogo } from "../../../assets/paypal.svg";
import { getProductPrice } from "../../../utils/getProductPrice";
import { AlphaTypo } from "../../../components/AlphaTypo";
import KeyItem from "./KeyItem";
import { alpha } from "@mui/material/styles";

export const AlphaStacicAccordion = styled(Paper)(({ theme }) => ({
  border: "1px",
  borderStyle: "solid",
  borderColor: alpha(theme.palette.text.primary, 0.3),
}));

const OrderDetails: React.FC<any> = () => {
  const { params }: any = useRouteMatch();
  const [products, setProducts] = useState<any>(null);
  const [order, setOrder] = useState<any>(null);
  const { loginToken } = useContext(GlobalContext);

  useEffect(() => {
    if (!params || !params.id || !loginToken) {
      return;
    }
    const fetchData = async () => {
      const { data } = await axios.get(`/api/orders/${params.id}`, {
        headers: {
          Authorization: `Bearer ${loginToken}`,
        },
      });
      const {
        cart: { products },
        user,
        ...rest
      } = data;

      setProducts(products);
      setOrder(rest);
    };
    fetchData();
  }, [params, loginToken]);

  return (
    <Box>
      <Box className={"payment-details"}>
        {order && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
            <AlphaStacicAccordion sx={{ borderRadius: "0.6rem" }}>
              <Box sx={{ p: 1 }} className={"alpha-static-accordion-header"}>
                Payment details
              </Box>
              <Divider />
              <Box sx={{ p: 1 }}>
                <Box>
                  <Typography>
                    Total payment: ${getProductPrice({ products: products })}
                  </Typography>
                  <Typography>Method: {order.payment_method.method}</Typography>
                  {order.payment_method.method === "stripe" ? (
                    <Typography>
                      Card: **** **** **** {order.payment_method.details.last4}
                    </Typography>
                  ) : (
                    <Typography>
                      Payer: {order.payment_method.details.email}
                    </Typography>
                  )}
                  {order.payment_method.details.brand === "visa" && (
                    <Typography
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1ch",
                      }}
                    >
                      Brand:
                      <VisaLogo
                        style={{
                          width: "25px",
                          height: "25px",
                          backgroundColor: "transparent",
                        }}
                      />
                    </Typography>
                  )}
                </Box>
              </Box>
            </AlphaStacicAccordion>
            <AlphaStacicAccordion sx={{ borderRadius: "0.6rem" }}>
              <Box sx={{ p: 1 }} className={"alpha-static-accordion-header"}>
                Products
              </Box>
              <Divider />
              <Stack
                sx={{ p: 1 }}
                divider={<Divider orientation="horizontal" flexItem />}
                spacing={2}
              >
                {products.map((item: any) => (
                  <Box
                    key={item.product._id}
                    sx={{ display: "flex", gap: "1.2rem" }}
                  >
                    <Box
                      sx={{
                        width: "20%",
                        flexDirection: "column",
                        gap: "0.6rem",
                      }}
                    >
                      <img
                        src={
                          item.product.images.find((img: any) => {
                            return img.type === "portrait";
                          })?.url
                        }
                        style={{
                          width: "100%",
                          borderRadius: "0.3rem",
                        }}
                        alt={item.product.name + "portrait"}
                        className={"game-thumnail"}
                      />
                      {console.log(item)}
                      <Link
                        to={{
                          pathname: `/product/${item.product.name
                            .replace(/\s+/g, "-")
                            .toLowerCase()}`,
                          state: { _id: item.product._id, section: "review" },
                        }}
                      >
                        <Typography
                          sx={{
                            transition: "background 150ms ease-in-out",
                            backgroundColor: "primary.main",
                            borderRadius: 1,
                            color: "text.primary",
                            // fontFamily: "brutal-medium !important",
                            p: "0.3rem 0",
                            textAlign: "center",
                            "&:hover": {
                              backgroundColor: "action.hover",
                            },
                          }}
                        >
                          Write review
                        </Typography>
                      </Link>
                    </Box>
                    <Box
                      sx={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.3rem",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "1rem !important",
                          fontFamily: "brutal-medium !important",
                        }}
                      >
                        {item.product.name}
                      </Typography>
                      <AlphaTypo>{item.product.developer}</AlphaTypo>
                      <Typography>Quantity: {item.quantity}</Typography>
                      <Typography>
                        Total price: ${item.product.sale_price * item.quantity}
                      </Typography>
                      <Stack
                        divider={<Divider orientation="horizontal" flexItem />}
                        spacing={1}
                        sx={{
                          p: 1,
                          border: "1px",
                          borderStyle: "solid",
                          borderRadius: "0.3rem",
                          borderColor: (theme) =>
                            alpha(theme.palette.text.primary, 0.3),
                        }}
                      >
                        {item.keys.map((key: any) => (
                          <KeyItem value={key} />
                        ))}
                      </Stack>
                    </Box>
                  </Box>
                ))}
              </Stack>
            </AlphaStacicAccordion>
          </Box>
        )}
      </Box>
      <Box className={"product-details"}></Box>
    </Box>
  );
};

export default OrderDetails;
