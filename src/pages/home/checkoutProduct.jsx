import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { getProduct } from "../../api/product";
import { createOrder, getDistricts, getProvinces, getWards } from "../../api/order";
import { Button, FormControlLabel, Radio, RadioGroup, Snackbar } from "@mui/material";

const CheckoutProduct = () => {
  const { id } = useParams();
  const location = useLocation();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [provinces, setProvinces] = useState([]);
  const [selectedProvinceId, setSelectedProvinceId] = useState(null);
  const [districts, setDistricts] = useState([]);
  const [selectedDistrictId, setSelectedDistrictId] = useState(null);
  const [wards, setWards] = useState([]);
  const [selectedWardId, setSelectedWardId] = useState(null);

  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [payment, setPayment] = useState("PAY");
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const fetchProduct = async () => {
    try {
      const data = await getProduct(id);
      setProduct(data);
    } catch (error) {
      console.error("Failed to fetch product data:", error);
    }
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const qty = queryParams.get("qty");
    if (qty) {
      setQuantity(Number(qty));
    }
  }, [location.search]);

  const fetchProvinces = async () => {
    try {
      const response = await getProvinces();
      setProvinces(Array.isArray(response) ? response : []);
    } catch (error) {
      console.error("Error fetching provinces:", error);
    }
  };

  const fetchDistricts = async (provinceId) => {
    try {
      const response = await getDistricts(provinceId);
      setDistricts(Array.isArray(response) ? response : []);
      setWards([]); // Clear wards when a new province is selected
      setSelectedWardId(null); // Reset selected ward
    } catch (error) {
      console.error("Error fetching districts:", error);
    }
  };

  const fetchWards = async (districtId) => {
    try {
      const response = await getWards(districtId);
      setWards(Array.isArray(response) ? response : []);
    } catch (error) {
      console.error("Error fetching wards:", error);
    }
  };

  const handlePlaceOrder = async () => {
    const orderDetail = [
      {
        product: { id: id },
        price: product.price * quantity,
        qty: quantity,
      },
    ];

    const orderData = {
      user: { id: user.id },
      ward: { id: selectedWardId },
      type: "BUY",
      price: product.price * quantity,
      payment: payment,
      phone: phone,
      address: address,
      orderDetails: orderDetail,
    };

    try {
      const response = await createOrder(orderData);
      if (response) {
        setShowSuccessToast(true);
        setTimeout(() => {
          navigate("/orders");
        }, 1000);
      } else {
        alert("Failed to place order. Please try again.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("An error occurred while placing the order. Please try again.");
    }
  };

  useEffect(() => {
    fetchProduct();
    fetchProvinces();
  }, [id]);

  return (
    <div className="max-w-7xl mx-auto flex gap-5 py-5">
      <div className="w-[calc(100%-400px)]">
        <h2 className="w-full border-b text-center text-4xl font-semibold">Checkout</h2>
        <div className="w-full mt-6">
          <h3 className="text-2xl font-semibold mb-4">Billing and Shipping Information</h3>
          <div className="w-full mb-4 flex gap-4">
            <div className="flex-1">
              <label htmlFor="name" className="block text-sm">
                Name
              </label>
              <input type="text" id="name" className="w-full border rounded p-2" value={user.fullname} disabled />
            </div>
            <div className="flex-1">
              <label htmlFor="email" className="block text-sm">
                Email
              </label>
              <input type="text" id="email" className="w-full border rounded p-2" value={user.email} disabled />
            </div>
          </div>

          <div className="w-full mb-4">
            <label htmlFor="province" className="block text-sm">
              Province
            </label>
            <select
              id="province"
              className="w-full border rounded p-2"
              value={selectedProvinceId || ""}
              onChange={(e) => {
                setSelectedProvinceId(e.target.value);
                fetchDistricts(e.target.value);
              }}
            >
              <option value="">Select a province</option>
              {provinces.map((province) => (
                <option key={province.id} value={province.id}>
                  {province.name}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full mb-4">
            <label htmlFor="district" className="block text-sm">
              District
            </label>
            <select
              id="district"
              className="w-full border rounded p-2"
              value={selectedDistrictId || ""}
              onChange={(e) => {
                setSelectedDistrictId(e.target.value);
                fetchWards(e.target.value);
              }}
              disabled={!selectedProvinceId}
            >
              <option value="">Select a district</option>
              {districts.map((district) => (
                <option key={district.id} value={district.id}>
                  {district.name}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full mb-4">
            <label htmlFor="ward" className="block text-sm">
              Ward
            </label>
            <select
              id="ward"
              className="w-full border rounded p-2"
              value={selectedWardId || ""}
              onChange={(e) => setSelectedWardId(e.target.value)}
              disabled={!selectedDistrictId}
            >
              <option value="">Select a ward</option>
              {wards.map((ward) => (
                <option key={ward.id} value={ward.id}>
                  {ward.name}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full mb-4 flex gap-4">
            <div className="w-full">
              <label htmlFor="address" className="block text-sm">
                Address
              </label>
              <input
                id="address"
                className="w-full border rounded p-2"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="w-full">
              <label htmlFor="phone" className="block text-sm">
                Phone
              </label>
              <input
                id="phone"
                className="w-full border rounded p-2"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>
          <div style={{ marginTop: "30px" }}>
            <h3 className="text-2xl font-semibold">Payment Method</h3>
            <RadioGroup value={payment} onChange={(e) => setPayment(e.target.value)}>
              <FormControlLabel value="PAY" control={<Radio />} label="PayPal" />
              <FormControlLabel value="CASH" control={<Radio />} label="Cash on Delivery" />
            </RadioGroup>
          </div>
          <Button variant="contained" color="primary" onClick={handlePlaceOrder} style={{ marginTop: "20px" }}>
            Place Order
          </Button>
        </div>
      </div>

      <Snackbar
        open={showSuccessToast}
        message="Order placed successfully!"
        autoHideDuration={3000}
        onClose={() => setShowSuccessToast(false)}
      />

      <div className="w-[380px] bg-gray-200 border rounded h-max p-4">
        <h3 className="text-2xl font-semibold mb-4">Order Summary</h3>
        <div className="flex gap-4">
          <img src={product.images?.[0]} alt={product.name} className="w-32 h-32 object-cover" />
          <div>
            <h3 className="text-xl font-semibold">{product.name}</h3>
            <p className="text-lg">Price: ${product.price}</p>
            <p className="text-lg">Quantity: {quantity}</p>
            <p className="text-lg">Total Price: ${product.price * quantity}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutProduct;
