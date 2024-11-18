import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { extendOrder, getOrder, sendReview, updateStatus } from "../../api/order";
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
      setAdditionalPayment(additionalPayment); // Cập nhật thêm vào state
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
          <p>
            {order.user.fullname} ({order.user.email})
          </p>
        </div>
        <div className="grid grid-cols-2 p-2 border-t">
          <p className="font-semibold">Phone:</p>
          <p>{order.phone}</p>
        </div>
        <div className="grid grid-cols-2 p-2 border-t">
          <p className="font-semibold">Address:</p>
          <p>
            {order.address}, {order.ward.name}, {order.ward.district.name}, {order.ward.district.province.name}
          </p>
        </div>
        <div className="grid grid-cols-2 p-2 border-t">
          <p className="font-semibold">Status:</p>
          <p>{
            [
              "Pending",
              "Confirmed",
              "Shipping",
              "Delivered",
              "Completed",
              "Canceled",
              "Pending",
              "Confirmed",
              "Shipping",
              "Delivered",
              "Return",
              "Completed",
              "Canceled",
            ][order.status]
          }</p>
        </div>
        <div className="grid grid-cols-2 p-2 border-t">
          <p className="font-semibold">Payment Method:</p>
          <p>{order.payment}</p>
        </div>
        <div className="grid grid-cols-2 p-2 border-t">
          <p className="font-semibold">Total Price:</p>
          <p>${order.price}</p>
        </div>
        <div className="grid grid-cols-2 p-2 border-t">
          <p className="font-semibold">Type:</p>
          <p>{order.type}</p>
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
            <div className="flex justify-center p-2">
              <button className="px-4 py-2 bg-green-600 text-white rounded" onClick={() => setShowExtendModal(true)}>
                Extend
              </button>
            </div>
          </>
        )}
      </div>

      {/* Order Items Table */}
      <div>
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Order Items</h3>
        <div className="border rounded">
          <div className="grid grid-cols-4 text-gray-700 font-semibold p-2 bg-gray-100">
            <p>Product</p>
            <p>Price</p>
            <p>QTY</p>
            {order.type === "RENT" && <p>Days</p>}
            <p>Total</p>
          </div>
          {orderDetails.map((item) => (
            <div key={item.id} className="grid grid-cols-4 items-center p-2 border-t">
              <p>{item.product.name}</p>
              {order.type === "RENT" ? (
                <p>${item.product.rentPrice}/day</p>
              ) : (
                <p>${item.product.price}</p>
              )}
              <p>{item.qty}</p>
              {order.type === "RENT" && (
                <p>{differenceInCalendarDays(new Date(order.rentEnd), new Date(order.rentStart))}</p>
              )}
              <p>${item.price}</p>
            </div>
          ))}
          <div className="grid grid-cols-4 p-2 bg-gray-100 font-semibold text-gray-800">
            <p></p>
            <p></p>
            <p>Total:</p>
            <p>${order.price}</p>
          </div>
        </div>
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
                <strong>Additional Payment:</strong> ${additionalPayment}
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
