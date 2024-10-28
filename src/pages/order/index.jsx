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
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Order = () => {
  const [orders, setOrders] = useState([]);

  const navigate = useNavigate();

  const fetchOrders = async () => {
    const data = await getOrders();
    setOrders(data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);


  // Function to map status codes to their label and color
  const getStatusDetails = (status) => {
    switch (status) {
      case 0:
        return { label: "Pending", color: "#ffc107" }; // Yellow
      case 1:
        return { label: "Confirmed", color: "#17a2b8" }; // Blue
      case 2:
        return { label: "Shipping", color: "#007bff" }; // Light Blue
      case 3:
        return { label: "Delivered", color: "#28a745" }; // Green
      case 4:
        return { label: "Completed", color: "#fd7e14" }; // Orange
      case 5:
        return { label: "Cancelled", color: "#dc3545" }; // Red
      default:
        return { label: "Unknown", color: "#6c757d" }; // Gray
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

      <TableContainer component={Paper} elevation={3}>
        <Table sx={{ minWidth: 650 }} aria-label="order table">
          <TableHead>
            <TableRow>
              <TableCell><strong>Order ID</strong></TableCell>
              <TableCell align="left"><strong>User</strong></TableCell>
              <TableCell align="left"><strong>Product Name</strong></TableCell>
              <TableCell align="left"><strong>Quantity</strong></TableCell>
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
                  <TableCell align="left">{order.product.name}</TableCell>
                  <TableCell align="left">{order.qty}</TableCell>
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
    </div>
  );
};

export default Order;
