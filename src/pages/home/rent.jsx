import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getProduct } from "../../api/product";
import { createOrder, getDistricts, getProvinces, getWards } from "../../api/order";
import { Button, FormControlLabel, Radio, RadioGroup, Snackbar } from "@mui/material";
import { addDays, format, differenceInCalendarDays } from "date-fns";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

const Rent = () => {
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
  const [rentStart, setRentStart] = useState(format(addDays(new Date(), 1), "yyyy-MM-dd"));
  const [rentEnd, setRentEnd] = useState(format(addDays(new Date(), 2), "yyyy-MM-dd"));
  const [payment, setPayment] = useState("PAY");
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

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

  const handleRentStartChange = (e) => {
    const storedCheckoutData = JSON.parse(localStorage.getItem("checkout")) || {};

    const newRentStart = e.target.value;
    setRentStart(newRentStart);

    // push to local storage
    const updatedData = {
      selectedProvinceId: storedCheckoutData.selectedProvinceId,
      selectedDistrictId: storedCheckoutData.selectedDistrictId,
      selectedWardId: storedCheckoutData.selectedWardId,
      address: storedCheckoutData.address,
      phone: storedCheckoutData.phone,
      payment: storedCheckoutData.payment,
      rentStart: newRentStart,
      rentEnd: storedCheckoutData.rentEnd,
    };

    localStorage.setItem("checkout", JSON.stringify(updatedData));

    // Set rentEnd to one day after rentStart if rentEnd is earlier than this
    const minimumRentEnd = format(addDays(new Date(newRentStart), 1), "yyyy-MM-dd");
    setRentEnd((prevRentEnd) => (new Date(prevRentEnd) < new Date(minimumRentEnd) ? minimumRentEnd : prevRentEnd));
  };

  const handlePlaceOrder = async () => {
    const orderDetail = [
      {
        product: { id: id },
        price: product.price * quantity,
        qty: quantity,
      },
    ];

    const checkout = JSON.parse(localStorage.getItem("checkout")) || {};

    const orderData = {
      user: { id: user.id },
      ward: { id: selectedWardId },
      type: "RENT",
      price: totalPrice,
      payment: payment,
      address: checkout.address,
      phone: checkout.phone,
      orderDetail: orderDetail,
      rentStart: checkout.rentStart,
      rentEnd: checkout.rentEnd,
    };

    try {
      const response = await createOrder(orderData);
      if (response) {
        setShowSuccessToast(true);
        localStorage.removeItem("checkout");
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
    const queryParams = new URLSearchParams(location.search);
    const qty = queryParams.get("qty");
    if (qty) {
      setQuantity(Number(qty));
    }
  }, [location.search]);

  const handlePayPalSuccess = async (details) => {
    console.log("Payment completed successfully:", details);
    handlePlaceOrder(); // Call order creation after successful payment
  };

  useEffect(() => {
    const storedCheckoutData = JSON.parse(localStorage.getItem("checkout")) || {};
    setSelectedProvinceId(storedCheckoutData.selectedProvinceId || null);
    setSelectedDistrictId(storedCheckoutData.selectedDistrictId || null);
    setSelectedWardId(storedCheckoutData.selectedWardId || null);
    setAddress(storedCheckoutData.address || "");
    setPhone(storedCheckoutData.phone || "");
    setPayment(storedCheckoutData.payment || "PAY");

    fetchProduct();
    fetchProvinces();
  }, [id]);

  useEffect(() => {
    if (product.price && rentStart && rentEnd) {
      const rentalDays = differenceInCalendarDays(new Date(rentEnd), new Date(rentStart));
      if (rentalDays > 0) {
        setTotalPrice(rentalDays * product.rentPrice * quantity);
      } else {
        setTotalPrice(0);
      }
    }
  }, [product.price, rentStart, rentEnd, quantity]);

  const handleChange = (field, value) => {
    // Update local state
    if (field === "selectedProvinceId") {
      setSelectedProvinceId(value);
      fetchDistricts(value);
    } else if (field === "selectedDistrictId") {
      setSelectedDistrictId(value);
      fetchWards(value);
    } else if (field === "selectedWardId") {
      setSelectedWardId(value);
    } else if (field === "address") {
      setAddress(value);
    } else if (field === "phone") {
      setPhone(value);
    } else if (field === "payment") {
      setPayment(value);
    } else if (field === "rentStart") {
      setRentStart(value);
    } else if (field === "rentEnd") {
      setRentEnd(value);
    }
  
    // Update localStorage directly
    const updatedData = {
      selectedProvinceId,
      selectedDistrictId,
      selectedWardId,
      address,
      phone,
      payment,
      rentStart,
      rentEnd,
      [field]: value, // Override the specific field being changed
    };
    localStorage.setItem("checkout", JSON.stringify(updatedData));
  };
  
  // Sync localStorage on any relevant field change
  useEffect(() => {
    const checkoutData = {
      selectedProvinceId,
      selectedDistrictId,
      selectedWardId,
      address,
      phone,
      payment,
      rentStart,
      rentEnd,
    };
    localStorage.setItem("checkout", JSON.stringify(checkoutData));
  }, [selectedProvinceId, selectedDistrictId, selectedWardId, address, phone, payment, rentStart, rentEnd]);

  return (
    <div className="max-w-7xl mx-auto flex gap-5 py-5">
      <div className="w-[calc(100%-400px)]">
        <h2 className="w-full border-b text-center text-4xl font-semibold">Rent Product</h2>
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
              onChange={(e) => handleChange("selectedProvinceId", e.target.value)}
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
              onChange={(e) => handleChange("selectedDistrictId", e.target.value)}
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
              onChange={(e) => handleChange("selectedWardId", e.target.value)}
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
                onChange={(e) => handleChange("address", e.target.value)}
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
                onChange={(e) => handleChange("phone", e.target.value)}
              />
            </div>
          </div>
          <div className="w-full mb-4 flex gap-4">
            <div className="flex-1">
              <label htmlFor="rent_start" className="block text-sm">
                Rent Start
              </label>
              <input
                type="date"
                id="rent_start"
                className="w-full border rounded p-2"
                value={rentStart}
                min={format(addDays(new Date(), 1), "yyyy-MM-dd")}
                onChange={handleRentStartChange}
              />
            </div>
            <div className="flex-1">
              <label htmlFor="rent_end" className="block text-sm">
                Rent End
              </label>
              <input
                type="date"
                id="rent_end"
                className="w-full border rounded p-2"
                value={rentEnd}
                min={format(addDays(new Date(rentStart), 1), "yyyy-MM-dd")}
                onChange={(e) => handleChange("rentEnd", e.target.value)}
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
          {payment === "PAY" && (
            <PayPalScriptProvider options={{ "client-id": "AbJhiq9DxgLJ3tSTj5A643WM8ipUDGNZCZgrdXyOAr7AbfrKC9WMUfnZKiOZPR5ZLuGVtd_2iGo6zuS8" }}>
              <PayPalButtons
                style={{ layout: "vertical" }}
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [{
                      amount: {
                        value: totalPrice.toFixed(2),
                      },
                    }],
                  });
                }}
                onApprove={(data, actions) => {
                  return actions.order.capture().then(handlePayPalSuccess);
                }}
                onError={(error) => {
                  console.error("PayPal payment error:", error);
                }}
              />
            </PayPalScriptProvider>
          )}
          
          {payment === "CASH" && (
            <Button variant="contained" color="primary" onClick={handlePlaceOrder} style={{ marginTop: "20px" }}>
              Place Order
            </Button>
          )}
        </div>
      </div>

      <div className="w-[380px]">
        <div className="bg-gray-200 border rounded h-max p-4">
          <h3 className="text-2xl font-semibold mb-4">Order Summary</h3>
          <div className="flex gap-4">
            <img src={product.images?.[0]} alt={product.name} className="w-32 h-32 object-cover" />
            <div>
              <h3 className="text-xl font-semibold">{product.name}</h3>
              <p className="text-lg"><span className="font-semibold">Price: </span>${product.rentPrice}</p>
              <p className="text-lg"><span className="font-semibold">Quantity: </span>{quantity}</p>
              <p className="text-lg"><span className="font-semibold">Total Price: </span>${product.rentPrice * quantity}</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-200 border rounded h-max p-4 mt-4">
          <h3 className="text-2xl font-semibold mb-4">Rent Details</h3>
          <p className="text-lg"><span className="font-semibold">Product Price: </span>${product.rentPrice * quantity}</p>
          <p className="text-xl"><span className="font-semibold">Rent Day: </span>{differenceInCalendarDays(new Date(rentEnd), new Date(rentStart))} days</p>
          <p className="text-xl"><span className="font-semibold">Total: </span>${totalPrice}</p>
        </div>
      </div>
    </div>
  );
};

export default Rent;
