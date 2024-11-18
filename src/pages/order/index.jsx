import React, { useEffect, useState } from "react";
import { getOrders } from "../../api/order";
import { useNavigate } from "react-router-dom";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  const navigate = useNavigate();

  const fetchOrders = async (page, status, type) => {
    try {
      const data = await getOrders(page, 10, status, type);
      setOrders(data.content);
      setTotalPages(data.totalPages);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(page - 1, statusFilter, typeFilter);
  }, [page, statusFilter, typeFilter]);

  useEffect(() => {
    document.title = "AlaZea - Orders";
  }, []);

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
      case 6:
        return { label: "Pending", color: "#ffc107" };
      case 7:
        return { label: "Confirmed", color: "#17a2b8" };
      case 8:
        return { label: "Shipping", color: "#007bff" };
      case 9:
        return { label: "Delivered", color: "#28a745" };
      case 10:
        return { label: "Returning", color: "#ffc107" };
      case 11:
        return { label: "Completed", color: "#fd7e14" };
      case 12:
        return { label: "Cancelled", color: "#dc3545" };
      default:
        return { label: "Unknown", color: "#6c757d" };
    }
  };

  const navigateToOrderDetail = (orderId) => {
    navigate(`/admin/order/${orderId}`);
  };

  // Define status options for "BUY" and "RENT" types
  const buyStatusOptions = [
    { value: "", label: "All" },
    { value: "0", label: "Pending" },
    { value: "1", label: "Confirmed" },
    { value: "2", label: "Shipping" },
    { value: "3", label: "Delivered" },
    { value: "4", label: "Completed" },
    { value: "5", label: "Cancelled" },
  ];

  const rentStatusOptions = [
    { value: "", label: "All" },
    { value: "6", label: "Pending" },
    { value: "7", label: "Confirmed" },
    { value: "8", label: "Shipping" },
    { value: "9", label: "Delivered" },
    { value: "10", label: "Returning" },
    { value: "11", label: "Completed" },
    { value: "12", label: "Cancelled" },
  ];

  // Select the correct status options based on the type
  const statusOptions = typeFilter === "BUY" ? buyStatusOptions : rentStatusOptions;

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-4">Order List</h2>

      {/* Status Filter Select */}
      <div className="flex space-x-4 mb-4">
        <div className="w-1/4">
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            id="status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Type Filter Select */}
        <div className="w-1/4">
          <label htmlFor="type" className="block text-sm font-medium text-gray-700">
            Type
          </label>
          <select
            id="type"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All</option>
            <option value="BUY">BUY</option>
            <option value="RENT">RENT</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left font-medium text-gray-600">Order ID</th>
              <th className="px-4 py-2 text-left font-medium text-gray-600">Product</th>
              <th className="px-4 py-2 text-left font-medium text-gray-600">User</th>
              <th className="px-4 py-2 text-left font-medium text-gray-600">Type</th>
              <th className="px-4 py-2 text-left font-medium text-gray-600">Price</th>
              <th className="px-4 py-2 text-left font-medium text-gray-600">Payment Method</th>
              <th className="px-4 py-2 text-left font-medium text-gray-600">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                onClick={() => navigateToOrderDetail(order.id)}
                className="cursor-pointer hover:bg-gray-50 transition-all"
              >
                <td className="px-4 py-3">{order.id}</td>
                <td className="px-4 py-3 flex items-center space-x-2">
                  {/* Display product image and name */}
                  {order.orderDetails[0]?.product?.images?.[0] && (
                    <img
                      src={order.orderDetails[0]?.product?.images[0]}
                      alt={order.orderDetails[0]?.product?.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                  )}
                  <span>{order.orderDetails[0]?.product?.name}</span>
                </td>
                <td className="px-4 py-3">{order.user.fullname}</td>
                <td className="px-4 py-3">{order.type}</td>
                <td className="px-4 py-3">${order.price}</td>
                <td className="px-4 py-3">{order.payment}</td>
                <td className="px-4 py-3">
                  <span
                    className="px-3 py-1 rounded-full text-white font-semibold"
                    style={{
                      backgroundColor: getStatusDetails(order.status).color,
                    }}
                  >
                    {getStatusDetails(order.status).label}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-center">
        <nav className="flex items-center space-x-2">
          <button
            onClick={() => setPage(page - 1)}
            className={`px-4 py-2 border rounded-md ${page === 1 ? "text-gray-400" : "text-blue-600"}`}
            disabled={page === 1}
          >
            Prev
          </button>
          <span className="text-sm text-gray-700">
            {page} / {totalPages}
          </span>
          <button
            onClick={() => setPage(page + 1)}
            className={`px-4 py-2 border rounded-md ${page === totalPages ? "text-gray-400" : "text-blue-600"}`}
            disabled={page === totalPages}
          >
            Next
          </button>
        </nav>
      </div>
    </div>
  );
};

export default Order;
