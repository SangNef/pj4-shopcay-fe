import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { getOrdersByUser, updateStatus, cancelOrder } from "../../api/order";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [page, setPage] = useState(1); // Default page is 1
  const [totalPages, setTotalPages] = useState(1); // Total number of pages
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate(); // Initialize useNavigate

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
    6: "Pending",
    7: "Confirmed",
    8: "Shipping",
    9: "Delivered",
    10: "Returning",
    11: "Completed",
    12: "Canceled",
  };

  const statusColors = {
    0: "#ffc107",
    1: "#17a2b8",
    2: "#007bff",
    3: "#28a745",
    4: "#fd7e14",
    5: "#dc3545",
    6: "#ffc107",
    7: "#17a2b8",
    8: "#007bff",
    9: "#28a745",
    10: "#ffc107",
    11: "#fd7e14",
  };

  // Type and color definitions
  const orderTypeColors = {
    BUY: "#007bff", // Blue for BUY
    RENT: "#fd7e14", // Orange for RENT
  };

  return (
    <div className="max-w-7xl mx-auto mt-6 p-4">
      <h2 className="text-center text-xl font-semibold mb-6 text-gray-800">Order List</h2>

      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">ID</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Product</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Type</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Total Price</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Status</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => navigate(`/order/${order.id}`)} // Navigate on row click
              >
                <td className="px-6 py-4">{order.id}</td>
                <td className="px-6 py-4 flex items-center gap-4">
                  <img src={order.orderDetails[0].product.images[0]} alt="" className="w-16 h-16 object-cover" />
                  <p>{order.orderDetails[0].product.name}</p>
                </td>
                <td className="px-6 py-4">
                  <span
                    style={{
                      color: orderTypeColors[order.type] || "#000",
                      fontWeight: "bold",
                    }}
                  >
                    {order.type}
                  </span>
                </td>
                <td className="px-6 py-4">${order.price}</td>
                <td className="px-6 py-4">
                  <span
                    style={{
                      color: statusColors[order.status],
                      fontWeight: "bold",
                    }}
                  >
                    {statusText[order.status]}
                  </span>
                </td>
                <td className="px-6 py-4 h-full flex items-center justify-center gap-4 mb-8">
                  {order.status === 2 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent navigating when clicking the button
                        handleUpdateStatus(order.id);
                      }}
                      className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                    >
                      Mark as Delivered
                    </button>
                  )}
                  {(order.status === 0 || order.status === 6) && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent navigating when clicking the button
                        handleCancelOrder(order.id);
                      }}
                      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                      Cancel Order
                    </button>
                  )}
                  {order.status === 9 &&
                    new Date().toISOString().split("T")[0] === order.rentEnd &&
                    order.returnBy === "USER" && (
                      <button
                        className="mt-2 px-4 py-2 bg-green-600 text-white rounded"
                        onClick={() => handleUpdateStatus(order.id)} // Hiển thị modal
                      >
                        Returning
                      </button>
                    )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={() => setPage(page - 1)}
          className={`px-4 py-2 ${page === 1 ? "bg-gray-300" : "bg-blue-500 text-white"} rounded-md`}
          disabled={page === 1}
        >
          Previous
        </button>
        <span className="mx-4 my-auto">{page}</span>
        <button
          onClick={() => setPage(page + 1)}
          className={`px-4 py-2 ${page === totalPages ? "bg-gray-300" : "bg-blue-500 text-white"} rounded-md`}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>

      {/* Snackbar */}
      {showSnackbar && (
        <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 w-full max-w-xs p-4 bg-green-500 text-white rounded-md shadow-lg">
          {snackbarMessage}
          <button onClick={handleSnackbarClose} className="absolute top-0 right-0 p-2 text-white">
            X
          </button>
        </div>
      )}
    </div>
  );
};

export default Order;
