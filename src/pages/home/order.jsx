import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Snackbar,
  Alert,
  Pagination
} from "@mui/material";
import { useNavigate } from "react-router-dom";  // Import useNavigate
import { getOrdersByUser, updateStatus, cancelOrder } from "../../api/order";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [page, setPage] = useState(1); // Default page is 1
  const [totalPages, setTotalPages] = useState(1); // Total number of pages
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();  // Initialize useNavigate

  const fetchOrders = async (page = 1) => {
    try {
      const response = await getOrdersByUser(user.id, page - 1, 10); // Backend expects page 0-indexed
      setOrders(response.orders);
      setTotalPages(response.totalPages); // Assuming the backend returns totalPages
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders(page);
  }, [page]);

  const handleUpdateStatus = async (id) => {
    try {
      await updateStatus(id);
      fetchOrders(page);
      handleshowSnackbar("Status updated successfully");
    } catch (error) {
      console.error(error);
      handleshowSnackbar("Error updating status");
    }
  };

  const handleCancelOrder = async (id) => {
    try {
      await cancelOrder(id);
      fetchOrders(page);
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

  // Status and color definitions
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
  };

  // Type and color definitions
  const orderTypeColors = {
    'BUY': '#007bff',   // Blue for BUY
    'RENT': '#fd7e14',  // Orange for RENT
  };

  return (
    <Paper className="max-w-6xl mx-auto mt-6 p-4">
      <h2 className="text-center text-xl font-semibold mb-6 text-gray-800">Order List</h2>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>ID</strong></TableCell>
              <TableCell><strong>Type</strong></TableCell>
              <TableCell><strong>Total Price</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell><strong>Action</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow
                key={order.id}
                hover
                onClick={() => navigate(`/order/${order.id}`)}  // Navigate on row click
                style={{ cursor: "pointer" }}  // Optional: Makes the row clickable
              >
                <TableCell>{order.id}</TableCell>
                <TableCell>
                  <span
                    style={{
                      color: orderTypeColors[order.type] || '#000',
                      fontWeight: "bold",
                    }}
                  >
                    {order.type}
                  </span>
                </TableCell>
                <TableCell>${order.price}</TableCell>
                <TableCell>
                  <span
                    style={{
                      color: statusColors[order.status],
                      fontWeight: "bold",
                    }}
                  >
                    {statusText[order.status]}
                  </span>
                </TableCell>
                <TableCell>
                  {order.status === 3 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();  // Prevent navigating when clicking the button
                        handleUpdateStatus(order.id);
                      }}
                      className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                    >
                      Mark as Completed
                    </button>
                  )}
                  {order.status === 0 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();  // Prevent navigating when clicking the button
                        handleCancelOrder(order.id);
                      }}
                      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                      Cancel Order
                    </button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination
        count={totalPages}
        page={page}
        onChange={(_, value) => setPage(value)}
        className="mt-6 flex justify-center"
      />

      {/* Snackbar */}
      <Snackbar open={showSnackbar} autoHideDuration={3000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default Order;
