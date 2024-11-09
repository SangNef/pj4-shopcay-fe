import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { extendOrder, getOrder, sendReview } from "../../api/order";
import { differenceInCalendarDays } from "date-fns";

const UserOrder = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [showExtendModal, setShowExtendModal] = useState(false); // Trạng thái hiển thị modal
  const [newEndDate, setNewEndDate] = useState(""); // Ngày mới sau gia hạn
  const [additionalPayment, setAdditionalPayment] = useState(0);

  const fetchOrder = async () => {
    try {
      const response = await getOrder(id);
      setOrder(response);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleSendReview = async (orderDetailId) => {
    try {
      const response = await sendReview(orderDetailId, { comment: comment });
      console.log(response);
      setComment("");
      fetchOrder();
    } catch (error) {
      console.error(error);
    }
  };

  const handleExtend = () => {
    const response = extendOrder(id, { rentEnd: newEndDate, debt: additionalPayment});
    console.log(response);
    setShowExtendModal(false);
    window.location.reload();
  };

  useEffect(() => {
    fetchOrder();
  }, [id]);

  useEffect(() => {
    if (newEndDate && order) {
      const additionalPayment = orderDetails.reduce((total, item) => {
        const totalDays = differenceInCalendarDays(new Date(order.rentEnd), new Date(order.rentStart));
        const extraDays = differenceInCalendarDays(new Date(newEndDate), new Date(order.rentEnd));
        const pricePerDay = (item.product.price * item.qty) / totalDays;
        return total + pricePerDay * extraDays;
      }, 0).toFixed(0);
      setAdditionalPayment(additionalPayment); // Cập nhật thêm vào state
    }
  }, [newEndDate, order]);

  if (loading) return <div>Loading...</div>;
  if (!order) return <div>Order not found</div>;

  const { orderDetails } = order;

  return (
    <div className="max-w-6xl mx-auto mt-6 p-4 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Order Details</h2>

      {/* Order Summary */}
      <div className="mb-6">
        <p>
          <strong>Order ID:</strong> {order.id}
        </p>
        <p>
          <strong>User:</strong> {order.user.fullname} ({order.user.email})
        </p>
        <p>
          <strong>Phone:</strong> {order.phone}
        </p>
        <p>
          <strong>Address:</strong> {order.address}, {order.ward.name}, {order.ward.district.name},{" "}
          {order.ward.district.province.name}
        </p>
        <p>
          <strong>Status:</strong>{" "}
          {["Pending", "Confirmed", "Shipping", "Delivered", "Completed", "Canceled"][order.status]}
        </p>
        <p>
          <strong>Payment Method:</strong> {order.payment}
        </p>
        <p>
          <strong>Total Price:</strong> ${order.price}
        </p>
        <p>
          <strong>Type:</strong> {order.type}
        </p>
        {order.type === "RENT" && (
          <>
            <p>
              <strong>Start date:</strong> {order.rentStart} - <strong>End date:</strong> {order.rentEnd}
            </p>
            <p><strong>Debt: </strong> ${order.debt}</p>
            <button
              className="mt-2 px-4 py-2 bg-green-600 text-white rounded"
              onClick={() => setShowExtendModal(true)} // Hiển thị modal
            >
              Extend
            </button>
          </>
        )}
      </div>

      {/* Order Items */}
      <div>
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Order Items</h3>
        {orderDetails.map((item) => (
          <div key={item.id} className="border p-4 rounded mb-4">
            <div className="flex items-center">
              <img
                src={item.product.images[0]}
                alt={item.product.name}
                className="w-24 h-24 object-cover rounded mr-4"
              />
              <div>
                <p>
                  <strong>Product:</strong> {item.product.name}
                </p>
                <p>
                  <strong>Category:</strong> {item.product.category}
                </p>
                <p>
                  <strong>Price per Unit:</strong> ${item.product.price}
                </p>
                <p>
                  <strong>Quantity:</strong> {item.qty}
                </p>
                <p>
                  <strong>Total:</strong> ${item.price}
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              <strong>Description:</strong> {item.product.description}
            </p>
            {item.reviews && item.reviews.length > 0 ? (
              <div className="mt-4">
                <h4 className="font-semibold text-gray-800">Reviews:</h4>
                {item.reviews.map((review) => (
                  <div key={review.id} className="mt-2">
                    <p>{review.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              // Only show textarea for statuses 4 (Completed) and 6 (Canceled)
              (order.status === 4 || order.status === 6) && (
                <div className="mt-4">
                  <h4 className="font-semibold text-gray-800">Leave a Comment:</h4>
                  <textarea
                    className="w-full p-2 border rounded mt-2"
                    placeholder="Write your comment here..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <button
                    className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
                    onClick={() => handleSendReview(item.id)}
                  >
                    Submit Comment
                  </button>
                </div>
              )
            )}
          </div>
        ))}
      </div>

      {/* Modal Extend */}
      {showExtendModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Extend Rental Period</h3>
            <label className="block mb-2">
              New End Date:
              <input
                type="date"
                className="w-full p-2 border rounded"
                min={order.rentEnd}
                value={newEndDate}
                onChange={(e) => setNewEndDate(e.target.value)}
              />
            </label>
            {newEndDate && (
              <div className="mt-4 text-gray-700">
                <strong>Additional Payment:</strong> $
                {additionalPayment}
              </div>
            )}
            <div className="flex justify-end mt-4">
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded mr-2"
                onClick={() => setShowExtendModal(false)}
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={handleExtend}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserOrder;
