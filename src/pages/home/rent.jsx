import React, { useEffect, useState } from "react";
import { getProduct } from "../../api/product";
import defaultImage from "../../assets/9.png"; // Ensure you have a default image
import { createOrder, getDistricts, getProvinces, getWards } from "../../api/order";
import { useNavigate } from "react-router-dom";
import { MenuItem, Select, InputLabel, FormControl, TextField, Button, Snackbar, Alert, RadioGroup, FormControlLabel, Radio } from "@mui/material";

const Rent = () => {
  const [product, setProduct] = useState({});
  const [shippingAddress, setShippingAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [rentDays, setRentDays] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState(""); // New state for payment method
  const [provinces, setProvinces] = useState([]);
  const [selectedProvinceId, setSelectedProvinceId] = useState(null);
  const [districts, setDistricts] = useState([]);
  const [selectedDistrictId, setSelectedDistrictId] = useState(null);
  const [wards, setWards] = useState([]);
  const [selectedWardId, setSelectedWardId] = useState(null);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const productRent = JSON.parse(localStorage.getItem("productRent"));
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    fetchProduct();
    fetchProvinces();
  }, []);

  const fetchProduct = async () => {
    const data = await getProduct(productRent.id);
    setProduct(data);
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
    const response = await getDistricts(provinceId);
    setDistricts(response);
  };

  const fetchWards = async (districtId) => {
    const response = await getWards(districtId);
    setWards(response);
  };

  const handleRent = async () => {
    if (!paymentMethod) {
      alert("Please select a payment method.");
      return;
    }

    const orderData = {
      product: { id: product.id },
      qty: productRent.quantity,
      price: product.rentPrice * rentDays,
      user: { id: user.id },
      address: `${shippingAddress}`,
      phone: phoneNumber,
      ward: { id: selectedWardId },
      type: "RENT",
      rentDay: rentDays,
      paymentMethod: paymentMethod, // Include selected payment method
    };

    const response = await createOrder(orderData);
    if (response) {
      setShowSuccessToast(true);
      setTimeout(() => {
        navigate("/orders");
      }, 1000);
    } else {
      alert("Failed to place order. Please try again.");
    }
  };

  return (
    <div
      style={{
        maxWidth: "1280px",
        margin: "0 auto",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        display: "flex",
        gap: "20px",
      }}
    >
      <div style={{ flex: "2", background: "#fff" }}>
        <h1 style={{ textAlign: "center", color: "#333" }}>Rent Product</h1>
        <div style={{ borderTop: "1px solid #ddd", paddingTop: "20px" }}>
          <h3 style={{ marginBottom: "20px", color: "#333" }}>Shipping Information</h3>
          <form style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <TextField
              label="Full Name"
              variant="outlined"
              fullWidth
              value={user.fullname}
              size="small"
              disabled
              inputProps={{ style: { height: "35px", fontSize: "14px" } }}
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={user.email}
              size="small"
              disabled
              inputProps={{ style: { height: "35px", fontSize: "14px" } }}
            />
            <TextField
              label="Shipping Address"
              variant="outlined"
              fullWidth
              value={shippingAddress}
              size="small"
              onChange={(e) => setShippingAddress(e.target.value)}
              required
              inputProps={{ style: { height: "35px", fontSize: "14px" } }}
            />
            <FormControl fullWidth variant="outlined" sx={{ height: "50px", fontSize: "16px", padding: "8px 0" }}>
              <InputLabel>Province</InputLabel>
              <Select
                value={selectedProvinceId || ""}
                onChange={(e) => {
                  setSelectedProvinceId(e.target.value);
                  setDistricts([]);
                  setWards([]);
                  fetchDistricts(e.target.value);
                }}
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 200,
                    },
                  },
                }}
              >
                {provinces.map((province) => (
                  <MenuItem key={province.id} value={province.id}>
                    {province.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth variant="outlined" sx={{ height: "50px", fontSize: "16px", padding: "8px 0" }}>
              <InputLabel>District</InputLabel>
              <Select
                value={selectedDistrictId || ""}
                onChange={(e) => {
                  setSelectedDistrictId(e.target.value);
                  setWards([]);
                  fetchWards(e.target.value);
                }}
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 200,
                    },
                  },
                }}
              >
                {districts.map((district) => (
                  <MenuItem key={district.id} value={district.id}>
                    {district.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth variant="outlined" sx={{ height: "50px", fontSize: "16px", padding: "8px 0" }}>
              <InputLabel>Ward</InputLabel>
              <Select
                value={selectedWardId || ""}
                onChange={(e) => setSelectedWardId(e.target.value)}
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 200,
                    },
                  },
                }}
              >
                {wards.map((ward) => (
                  <MenuItem key={ward.id} value={ward.id}>
                    {ward.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Phone Number"
              variant="outlined"
              fullWidth
              value={phoneNumber}
              size="small"
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              inputProps={{ style: { height: "35px", fontSize: "14px" } }}
            />
            <TextField
              label="Number of Rental Days"
              variant="outlined"
              type="number"
              size="small"
              fullWidth
              value={rentDays}
              onChange={(e) => setRentDays(e.target.value)}
              inputProps={{ min: 1, style: { height: "35px", fontSize: "14px" } }}
            />

            {/* Payment Method Selection */}
            <div style={{ marginTop: "30px" }}>
              <h3 style={{ color: "#333" }}>Payment Method</h3>
              <RadioGroup 
                value={paymentMethod} 
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <FormControlLabel value="PAYPAL" control={<Radio />} label="PayPal" checked />
                <FormControlLabel value="CASH" control={<Radio />} label="Cash on Delivery" />
              </RadioGroup>
            </div>
          </form>
        </div>

        <div style={{ marginTop: "30px", textAlign: "center" }}>
          <Button variant="contained" color="success" onClick={handleRent}>
            Confirm Rent
          </Button>
        </div>
      </div>

      {/* Product Info */}
      <div style={{ flex: "1", marginLeft: "20px", background: "#fff" }}>
        {product ? (
          <div style={{ display: "flex", border: "1px solid #ccc", boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)" }}>
            <img
              src={product?.images?.[0] || defaultImage}
              alt={product.name}
              style={{ width: "100%", maxWidth: "200px", borderRadius: "8px" }}
            />
            <div style={{ marginLeft: "20px" }}>
              <h2 style={{ color: "#333" }}>{product.name}</h2>
              <p style={{ fontWeight: "bold" }}>Price: {product.rentPrice} USD</p>
              <p style={{ fontWeight: "bold" }}>Available Quantity: {product.availableQuantity}</p>
              <p style={{ fontWeight: "bold" }}>Description: {product.description}</p>
            </div>
          </div>
        ) : (
          <p>Loading product details...</p>
        )}
      </div>

      <Snackbar
        open={showSuccessToast}
        autoHideDuration={3000}
        onClose={() => setShowSuccessToast(false)}
      >
        <Alert onClose={() => setShowSuccessToast(false)} severity="success" sx={{ width: "100%" }}>
          Order placed successfully!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Rent;
