import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../../App";
import PrimaryTypo from "../../../components/PrimaryTypo";

interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: any) => string;
}

const columns: readonly Column[] = [
  { id: "id", label: "ID", minWidth: 50 },
  {
    id: "paidAt",
    label: "Date",
    minWidth: 100,
    format: (value: Date) => value.toLocaleDateString(),
  },
  { id: "method", label: "Payment method", minWidth: 50 },
  { id: "status", label: "Status", minWidth: 50 },
  { id: "itemsBreif", label: "Items", minWidth: 150 },
  {
    id: "total",
    label: "Total",
    minWidth: 50,
    format: (value: number) => `$${value}`,
  },
  { id: "viewOrderBtn", label: "View order", minWidth: 70 },
];

const createRow = (orders: any) => {
  const rows = orders.map((order: any) => {
    const {
      _id,
      createdAt: paidAt,
      payment_method: { method },
      status,
      total,
    } = order;

    const {
      cart: { products },
    } = order;
    const otherItems = products.length - 1;

    return {
      _id,
      paidAt: new Date(paidAt),
      method,
      status,
      itemsBreif: `${products[0].product.name} ${
        otherItems > 0 ? `and ${otherItems - 1} other items` : ""
      }`,
      total,
    };
  });

  const sorted = rows.sort((a: any, b: any) => b.paidAt - a.paidAt);
  return sorted;
};

const Orders = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [rows, setRows] = useState<any>([]);
  const [totalDocs, setTotalDocs] = useState<number>(0);
  const { loginToken } = useContext(GlobalContext);
  const handleChangePage = (_: unknown, newPage: number) => {
    console.log(newPage);
    setCurrentPage(newPage);
  };

  useEffect(() => {
    if (!loginToken) {
      return;
    }
    const fetchOrders = async () => {
      const { data } = await axios.get("/api/orders/user/all", {
        params: { limit: 10, skip: currentPage },
        headers: {
          Authorization: `Bearer ${loginToken}`,
        },
      });
      setRows(createRow(data.data));
      setTotalDocs(data.total_docs);
    };
    fetchOrders();
  }, [loginToken, currentPage]);

  return (
    <Box>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.length > 0 &&
                rows.map((row: any, index: number) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row._id}
                      sx={{
                        "&:hover": {
                          backgroundColor: "transparent !important",
                          // ...getTransparentOverlay({
                          //   alpha: 0,
                          //   background: "hsl(100, 100%, 100%)",
                          // }),
                        },
                      }}
                    >
                      {columns.map((column: any) => {
                        if (column.id === "viewOrderBtn") {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              <Link to={`/user/orders/${row._id}`}>
                                <PrimaryTypo
                                  sx={{ p: "0.1rem", borderRadius: "0.3rem" }}
                                >
                                  View order
                                </PrimaryTypo>
                              </Link>
                            </TableCell>
                          );
                        }
                        const value =
                          column.id === "id" ? index + 1 : row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format ? column.format(value) : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10]}
          component="div"
          count={totalDocs}
          rowsPerPage={10}
          page={currentPage}
          onPageChange={handleChangePage}
        />
      </Paper>
    </Box>
  );
};

export default Orders;
