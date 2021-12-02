import { DesktopDatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import {
  Box,
  Button,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { pdfGenerator } from "./PdfGenerator";
import {AlphaContainer} from "../components/AlphaContainer";

const Report = () => {
  const [orders, setOrders] = useState<any>(null);
  const [fromDate, setFromDate] = useState<Date | null>(
    new Date("2021-01-01T00:00:00")
  );
  const [toDate, setToDate] = useState<Date | null>(
    new Date("2021-12-30T23:59:00")
  );
  const [row, setRow] = useState<any>([]);
  const months = [
    {
      name: "January",
      period: {
        from: new Date("2021-01-01T00:00:00"),
        to: new Date("2021-01-31T23:59:00"),
      },
    },
    {
      name: "Febuary",
      period: {
        from: new Date("2021-02-01T00:00:01"),
        to: new Date("2021-02-28T23:59:00"),
      },
    },
    {
      name: "March",
      period: {
        from: new Date("2021-03-01T00:00:01"),
        to: new Date("2021-03-31T23:59:00"),
      },
    },
    {
      name: "April",
      period: {
        from: new Date("2021-04-01T00:00:01"),
        to: new Date("2021-04-30T23:59:00"),
      },
    },
    {
      name: "May",
      period: {
        from: new Date("2021-05-01T00:00:01"),
        to: new Date("2021-05-31T23:59:00"),
      },
    },
    {
      name: "June",
      period: {
        from: new Date("2021-06-01T00:00:01"),
        to: new Date("2021-06-30T23:59:00"),
      },
    },
    {
      name: "July",
      period: {
        from: new Date("2021-07-01T00:00:01"),
        to: new Date("2021-07-31T23:59:00"),
      },
    },
    {
      name: "August",
      period: {
        from: new Date("2021-08-01T00:00:01"),
        to: new Date("2021-08-31T23:59:00"),
      },
    },
    {
      name: "September",
      period: {
        from: new Date("2021-09-01T00:00:01"),
        to: new Date("2021-09-30T23:59:00"),
      },
    },
    {
      name: "October",
      period: {
        from: new Date("2021-10-01T00:00:01"),
        to: new Date("2021-10-31T23:59:00"),
      },
    },
    {
      name: "November",
      period: {
        from: new Date("2021-11-01T00:00:01"),
        to: new Date("2021-11-30T23:59:00"),
      },
    },
    {
      name: "December",
      period: {
        from: new Date("2021-12-01T00:00:01"),
        to: new Date("2021-12-30T23:59:00"),
      },
    },
  ];

  const getMonthlyRevenue = (month: Date) => {
    if (!orders) return 0;
    let total = 0;
    orders.forEach((order: any) => {
      if (new Date(order.createdAt).getMonth() === month.getMonth()) {
        const cart = order.cart;
        let cartTotal = 0;
        if (cart) {
          cart.products.forEach((product: any) => {
            if (product && product.product.sale_price) {
              cartTotal =
                cartTotal + product.quantity * product.product.sale_price;
            }
          });
        }
        total = total + cartTotal;
      }
    });
    return total;
  };

  const rowGenerator = () => {
    const internalRow: any[] = [];
    months.forEach((month: any) => {
      internalRow.push([
        `${month.period.from.toLocaleDateString(
          "en-US"
        )} - ${month.period.to.toLocaleDateString("en-US")}`,
        `$${getMonthlyRevenue(month.period.from)}`,
        `$${getMonthlyProfit(month.period.from)}`,
      ]);
    });
    setRow(internalRow);
    pdfGenerator(internalRow);
  };

  const getTotalRevenue = () => {
    let total = 0;
    months.forEach((month: any) => {
      const monthly = getMonthlyRevenue(month.period.from);
      total = total + monthly;
    });
    return total;
  };

  const getTotalProfit = () => {
    let total = 0;
    months.forEach((month: any) => {
      total = total + getMonthlyProfit(month.period.from);
    });
    return total;
  };

  const getMonthlyProfit = (month: Date) => {
    if (!orders) return 0;
    let total = 0;
    orders.forEach((order: any) => {
      if (new Date(order.createdAt).getMonth() === month.getMonth()) {
        const cart = order.cart;
        let cartTotal = 0;
        if (cart) {
          cart.products.forEach((product: any) => {
            if (product && product.product.sale_price) {
              cartTotal =
                cartTotal +
                product.quantity *
                  (product.product.sale_price - product.product.purchase_price);
            }
          });
        }
        total = total + cartTotal;
      }
    });
    return total;
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.post("/api/orders/revenue", {
        from: fromDate,
        to: toDate,
      });
      if (data) {
        setOrders(data);
      }
    };
    fetchData();
  }, [fromDate, toDate]);

  return (
    <Box sx={{ paddingTop: "1.2rem" }}>
      <AlphaContainer sx={{ backgroundColor: "background.paper" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <form style={{ display: "flex", gap: "0.6rem" }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label="From"
                inputFormat="MM/dd/yyyy"
                value={fromDate}
                onChange={(value) => {
                  setFromDate(value);
                }}
                renderInput={(params: any) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label="To"
                inputFormat="MM/dd/yyyy"
                value={toDate}
                onChange={(value) => {
                  setToDate(value);
                }}
                renderInput={(params: any) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </form>
          <Button
            sx={{
              color: "text.primary",
              bgcolor: "info.main",
              fontFamily: "brutal-medium",
              fontSize: "0.75rem",
              // width: "100%",
              padding: "0.9rem 0.9rem",
              marginTop: "0.9rem",
              borderRadius: "0.6rem",
              "&:hover": {
                backgroundColor: "action.hover",
              },
            }}
            onClick={() => {
              rowGenerator();
            }}
          >
            Generate report
          </Button>
        </Box>
        <Stack
          // divider={<Divider orientation="horizontal" flexItem />}
          spacing={2}
          sx={{ padding: "0.9rem 0" }}
        >
          <Box
            sx={{
              display: "flex",
              fontFamily: "brutal-regular",
              color: "text.primary",
              gap: "0.3rem",
              // padding: "0.9rem 0",
            }}
          >
            <Typography variant={"h2"}>Total Revenue: </Typography>
            <Typography variant={"h2"}>${getTotalRevenue()}</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              fontFamily: "brutal-regular",
              color: "text.primary",
              gap: "0.3rem",
              // padding: "0.9rem 0",
            }}
          >
            <Typography variant={"h2"}>Total Profit: </Typography>
            <Typography variant={"h2"}>${getTotalProfit()}</Typography>
          </Box>
        </Stack>
        <TableContainer>
          <Table stickyHeader aria-label={"sticky-header"}>
            <TableHead>
              <TableRow>
                <TableCell>Month</TableCell>
                <TableCell>Revenue</TableCell>
                <TableCell>Profit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {months.map((month: any) => {
                return (
                  <TableRow
                    hover
                    role={"checkbox"}
                    tabIndex={-1}
                    key={month.name}
                  >
                    <TableCell>
                      {month.period.from.toLocaleDateString("en-US")} -{" "}
                      {month.period.to.toLocaleDateString("en-US")}
                    </TableCell>
                    <TableCell>
                      ${getMonthlyRevenue(month.period.from)}
                    </TableCell>
                    <TableCell>
                      ${getMonthlyProfit(month.period.from)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </AlphaContainer>
    </Box>
  );
};

export default Report;
