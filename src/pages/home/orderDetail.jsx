import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { extendOrder, getOrder, sendReview, updateStatus } from "../../api/order";
import { differenceInCalendarDays } from "date-fns";

// Star Rating Component
const StarRating = ({ rating, onRatingChange }) => {
  const handleClick = (star) => {
    onRatingChange(star);
  };

  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, index) => (
        <span
          key={index}
          className={`cursor-pointer text-2xl ${
            index < rating ? "text-yellow-500" : "text-gray-300"
          }`}
          onClick={() => handleClick(index + 1)}
        >
          ★
        </span>
      ))}
    </div>
  );
};

const UserOrder = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);  // New state for the rating
  const [loading, setLoading] = useState(true);
  const [showExtendModal, setShowExtendModal] = useState(false);
  const [newEndDate, setNewEndDate] = useState("");
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
      const response = await sendReview(orderDetailId, { comment, rate: rating });
      console.log(response);
      setComment("");
      setRating(0); // Reset rating after submission
      fetchOrder();
    } catch (error) {
      console.error(error);
    }
  };

  const handleExtend = () => {
    const response = extendOrder(id, { rentEnd: newEndDate, debt: additionalPayment });
    console.log(response);
    setShowExtendModal(false);
    window.location.reload();
  };

  useEffect(() => {
    fetchOrder();
  }, [id]);

  useEffect(() => {
    if (newEndDate && order) {
      const additionalPayment = orderDetails
        .reduce((total, item) => {
          const totalDays = differenceInCalendarDays(new Date(order.rentEnd), new Date(order.rentStart));
          const extraDays = differenceInCalendarDays(new Date(newEndDate), new Date(order.rentEnd));
          const pricePerDay = (item.product.price * item.qty) / totalDays;
          return total + pricePerDay * extraDays;
        }, 0)
        .toFixed(0);
      setAdditionalPayment(additionalPayment);
    }
  }, [newEndDate, order]);

  const handleUpdateStatus = async (id) => {
    try {
      await updateStatus(id);
      fetchOrder();
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!order) return <div>Order not found</div>;

  const { orderDetails } = order;

  return (
    <div className="max-w-6xl mx-auto mt-6 p-4 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Order Details</h2>

      {/* Order Summary */}
      <div className="border rounded mb-6">
        <div className="grid grid-cols-2 text-gray-700 font-semibold p-2 bg-gray-100">
          <p>Detail</p>
          <p>Information</p>
        </div>
        <div className="grid grid-cols-2 p-2 border-t">
          <p className="font-semibold">Order ID:</p>
          <p>{order.id}</p>
        </div>
        <div className="grid grid-cols-2 p-2 border-t">
          <p className="font-semibold">User:</p>
          <p>{order.user.fullname} ({order.user.email})</p>
        </div>
        <div className="grid grid-cols-2 p-2 border-t">
          <p className="font-semibold">Phone:</p>
          <p>{order.phone}</p>
        </div>
        <div className="grid grid-cols-2 p-2 border-t">
          <p className="font-semibold">Address:</p>
          <p>{order.address}, {order.ward.name}, {order.ward.district.name}, {order.ward.district.province.name}</p>
        </div>
        <div className="grid grid-cols-2 p-2 border-t">
          <p className="font-semibold">Status:</p>
          <p>{["Pending", "Confirmed", "Shipping", "Delivered", "Completed", "Canceled", "Pending", "Confirmed", "Shipping", "Delivered", "Returning", "Completed", "Canceled"][order.status]}</p>
        </div>
        <div className="grid grid-cols-2 p-2 border-t">
          <p className="font-semibold">Payment Method:</p>
          <p>{order.payment}</p>
        </div>
        <div className="grid grid-cols-2 p-2 border-t">
          <p className="font-semibold">Total Price:</p>
          <p>${order.price}</p>
        </div>
        {order.type === "RENT" && (
          <>
            <div className="grid grid-cols-2 p-2 border-t">
              <p className="font-semibold">Start Date:</p>
              <p>{order.rentStart}</p>
            </div>
            <div className="grid grid-cols-2 p-2 border-t">
              <p className="font-semibold">End Date:</p>
              <p>{order.rentEnd}</p>
            </div>
            <div className="grid grid-cols-2 p-2 border-t">
              <p className="font-semibold">Debt:</p>
              <p>${order.debt}</p>
            </div>
            {order.status === 9 && (
              <div className="flex justify-center p-2">
                <button className="px-4 py-2 bg-green-600 text-white rounded" onClick={() => setShowExtendModal(true)}>
                  Extend
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Order Items Table */}
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
              // Only show rating and textarea for statuses 4 (Completed) and 6 (Canceled)
              (order.status === 4 || order.status === 11) && (
                <div className="mt-4">
                  <h4 className="font-semibold text-gray-800">Leave a Comment and Rate:</h4>
                  <StarRating rating={rating} onRatingChange={setRating} />
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
                    Submit Review
                  </button>
                </div>
              )
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserOrder;
