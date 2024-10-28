import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Collapse,
  Paper,
  IconButton,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { getOrdersByUser, updateStatus, cancelOrder } from "../../api/order";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [open, setOpen] = useState({}); // To manage which rows are open
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchOrders = async () => {
    try {
      const response = await getOrdersByUser(user.id);
      setOrders(response);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleExpandClick = (id) => {
    setOpen((prevOpen) => ({ ...prevOpen, [id]: !prevOpen[id] }));
  };

  const handleUpdateStatus = async (id) => {
    try {
      await updateStatus(id);
      fetchOrders();
      handleshowSnackbar("Status updated successfully");
    } catch (error) {
      console.error(error);
      handleshowSnackbar("Error updating status");
    }
  };

  const handleCancelOrder = async (id) => {
    try {
      await cancelOrder(id);
      fetchOrders();
      handleshowSnackbar("Order canceled successfully");
    } catch (error) {
      console.error(error);
      handleshowSnackbar("Error canceling order");
    }
  };

  const handleshowSnackbar = (message) => {
    setSnackbarMessage(message);
    setShowSnackbar(true);
  };

  const handleSnackbarClose = () => {
    setShowSnackbar(false);
  };

  // Định nghĩa mô tả và màu sắc cho các trạng thái
  const statusText = {
    0: "Pending",
    1: "Confirmed",
    2: "Shipping",
    3: "Delivered",
    4: "Completed",
    5: "Canceled",
  };

  const statusColors = {
    0: '#ffc107',
    1: '#17a2b8',
    2: '#007bff',
    3: '#28a745',
    4: '#fd7e14',
    5: '#dc3545'
  }

  return (
    <Paper
      style={{
        marginTop: "24px",
        maxWidth: "1200px",
        marginLeft: "auto",
        marginRight: "auto",
        borderRadius: "8px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
      }}
    >
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>
                <strong>Product Name</strong>
              </TableCell>
              <TableCell>
                <strong>Price</strong>
              </TableCell>
              <TableCell>
                <strong>Quantity</strong>
              </TableCell>
              <TableCell>
                <strong>Total Price</strong>
              </TableCell>
              <TableCell>
                <strong>Status</strong>
              </TableCell>
              <TableCell>
                <strong>Action</strong>
              </TableCell>{" "}
              {/* Thêm cột Action */}
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <React.Fragment key={order.id}>
                <TableRow>
                  <TableCell>
                    <IconButton onClick={() => handleExpandClick(order.id)}>
                      <ExpandMoreIcon
                        style={{
                          transform: open[order.id] ? "rotate(180deg)" : "rotate(0deg)",
                          transition: "transform 0.3s ease",
                        }}
                      />
                    </IconButton>
                  </TableCell>
                  <TableCell>{order.product.name}</TableCell>
                  <TableCell>{order.product.price.toLocaleString()} VND</TableCell>
                  <TableCell>{order.qty}</TableCell>
                  <TableCell>{(order.product.price * order.qty).toLocaleString()} VND</TableCell>
                  <TableCell>
                    <span style={{ color: statusColors[order.status], fontWeight: "bold" }}>
                      {statusText[order.status]}
                    </span>
                  </TableCell>
                  <TableCell>
                    {order.status < 4 && (
                      <button
                        onClick={() => handleUpdateStatus(order.id)}
                        style={{
                          marginTop: "12px",
                          padding: "8px 16px",
                          backgroundColor: "#007bff",
                          color: "#fff",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                        }}
                      >
                        Update Status
                      </button>
                    )}
                    {order.status === 0 && (
                      <button
                        onClick={() => handleCancelOrder(order.id)}
                        style={{
                            marginTop: '12px',
                            marginLeft: '8px',
                            padding: '8px 16px',
                            backgroundColor: '#dc3545',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                          }}
                      >
                        Cancel Order
                      </button>
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={7} style={{ paddingBottom: 0, paddingTop: 0 }}>
                    <Collapse in={open[order.id]} timeout="auto" unmountOnExit>
                      <Table size="small" aria-label="address details">
                        <TableHead>
                          <TableRow>
                            <TableCell>
                              <strong>Shipping Address</strong>
                            </TableCell>
                            <TableCell>
                              <strong>Phone</strong>
                            </TableCell>
                            <TableCell>
                              <strong>Payment Method</strong>
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell>
                              {order.address}, {order.ward.name}, {order.ward.district.name},{" "}
                              {order.ward.district.province.name}
                            </TableCell>
                            <TableCell>{order.phone}</TableCell>
                            <TableCell>{order.payment}</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Snackbar để hiển thị thông báo */}
      <Snackbar open={showSnackbar} autoHideDuration={3000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default Order;
