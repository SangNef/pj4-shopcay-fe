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

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [expandedRows, setExpandedRows] = useState({});

  const fetchOrders = async () => {
    const data = await getOrders();
    setOrders(data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleToggleRow = (id) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

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
        return { label: "Returned", color: "#fd7e14" }; // Orange
      case 5:
        return { label: "Cancelled", color: "#dc3545" }; // Red
      default:
        return { label: "Unknown", color: "#6c757d" }; // Gray
    }
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
                  onClick={() => handleToggleRow(order.id)}
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
                {expandedRows[order.id] && (
                  <TableRow>
                    <TableCell colSpan={8} style={{ padding: '20px', backgroundColor: '#f9f9f9' }}>
                      <strong>Address Details:</strong>
                      <div style={{ marginTop: '10px' }}>
                        <Table>
                          <TableBody>
                            <TableRow>
                              <TableCell><strong>Address:</strong></TableCell>
                              <TableCell>{order.address}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell><strong>Ward:</strong></TableCell>
                              <TableCell>{order.ward.name}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell><strong>District:</strong></TableCell>
                              <TableCell>{order.ward.district.name}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell><strong>Province:</strong></TableCell>
                              <TableCell>{order.ward.district.province.name}</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Order;
