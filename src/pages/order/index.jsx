import React, { useEffect, useState } from "react";
import { getOrders } from "../../api/order";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Pagination,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // Track the total number of pages
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState(""); // State for selected status filter

  const navigate = useNavigate();

  const fetchOrders = async (page, status) => {
    try {
      const data = await getOrders(page, 10, status); // Send status filter as a parameter
      setOrders(data.content); // content contains the orders
      setTotalPages(data.totalPages); // totalPages will help in pagination
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(page - 1, statusFilter); // page is 1-based, so subtract 1 for the backend
  }, [page, statusFilter]);

  const getStatusDetails = (status) => {
    switch (status) {
      case 0:
        return { label: "Pending", color: "#ffc107" };
      case 1:
        return { label: "Confirmed", color: "#17a2b8" };
      case 2:
        return { label: "Shipping", color: "#007bff" };
      case 3:
        return { label: "Delivered", color: "#28a745" };
      case 4:
        return { label: "Completed", color: "#fd7e14" };
      case 5:
        return { label: "Cancelled", color: "#dc3545" };
      default:
        return { label: "Unknown", color: "#6c757d" };
    }
  };

  const navigateToOrderDetail = (orderId) => {
    navigate(`/admin/order/${orderId}`);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Order List
      </Typography>

      {/* Status Filter Select */}
      <FormControl style={{ marginBottom: "20px" }} className="w-40">
        <InputLabel>Status</InputLabel>
        <Select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          label="Status"
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="0">Pending</MenuItem>
          <MenuItem value="1">Confirmed</MenuItem>
          <MenuItem value="2">Shipping</MenuItem>
          <MenuItem value="3">Delivered</MenuItem>
          <MenuItem value="4">Completed</MenuItem>
          <MenuItem value="5">Cancelled</MenuItem>
        </Select>
      </FormControl>

      <TableContainer component={Paper} elevation={3}>
        <Table sx={{ minWidth: 650 }} aria-label="order table">
          <TableHead>
            <TableRow>
              <TableCell><strong>Order ID</strong></TableCell>
              <TableCell align="left"><strong>User</strong></TableCell>
              <TableCell align="left"><strong>Type</strong></TableCell>
              <TableCell align="left"><strong>Price</strong></TableCell>
              <TableCell align="left"><strong>Payment Method</strong></TableCell>
              <TableCell align="left"><strong>Phone</strong></TableCell>
              <TableCell align="left"><strong>Status</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <React.Fragment key={order.id}>
                <TableRow
                  onClick={() => navigateToOrderDetail(order.id)}
                  style={{ cursor: "pointer", transition: "background-color 0.3s" }}
                  hover
                >
                  <TableCell>{order.id}</TableCell>
                  <TableCell align="left">{order.user.fullname}</TableCell>
                  <TableCell align="left">{order.type}</TableCell>
                  <TableCell align="left">${order.price}</TableCell>
                  <TableCell align="left">{order.payment}</TableCell>
                  <TableCell align="left">{order.phone}</TableCell>
                  <TableCell align="left">
                    <span
                      style={{
                        backgroundColor: getStatusDetails(order.status).color,
                        color: "white",
                        padding: "5px 10px",
                        borderRadius: "5px",
                        fontWeight: "bold",
                      }}
                    >
                      {getStatusDetails(order.status).label}
                    </span>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <div style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={(event, value) => setPage(value)} // Update page state on page change
          color="primary"
        />
      </div>
    </div>
  );
};

export default Order;
