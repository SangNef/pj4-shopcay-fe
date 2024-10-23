import React, { useEffect, useState } from "react";
import { getProduct } from "../../api/product";
import defaultImage from "../../assets/9.png";
import { createOrder, getDistricts, getProvinces, getWards } from "../../api/order";
import { useNavigate } from "react-router-dom";
import { MenuItem, Select, InputLabel, FormControl, TextField, RadioGroup, FormControlLabel, Radio, Button, Snackbar, Alert } from '@mui/material';

const Checkout = () => {
  const [product, setProduct] = useState({});
  const [shippingAddress, setShippingAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [payment, setPayment] = useState("PAY");
  const [provinces, setProvinces] = useState([]);
  const [selectedProvinceId, setSelectedProvinceId] = useState(null);
  const [districts, setDistricts] = useState([]);
  const [selectedDistrictId, setSelectedDistrictId] = useState(null);
  const [wards, setWards] = useState([]);
  const [selectedWardId, setSelectedWardId] = useState(null);
  const [showSuccessToast, setShowSuccessToast] = useState(false);  // State for Snackbar

  const selectedProduct = JSON.parse(localStorage.getItem("selectedProduct"));
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const fetchProduct = async () => {
    const data = await getProduct(selectedProduct.id);
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

  useEffect(() => {
    fetchProduct();
    fetchProvinces();
  }, []);

  const handlePlaceOrder = async () => {
    const orderData = {
      product: { id: product.id },
      qty: selectedProduct.quantity,
      price: product.price * selectedProduct.quantity,
      user: { id: user.id },
      address: `${shippingAddress}`,
      phone: phoneNumber,
      payment: payment,
      ward: { id: selectedWardId }
    };

    const response = await createOrder(orderData);
    if (response) {
      // Show the success Snackbar and delay navigation
      setShowSuccessToast(true);
      setTimeout(() => {
        navigate("/");
      }, 1000);  // 3-second delay before navigating
    } else {
      alert("Failed to place order. Please try again.");
    }
  };

  return (
    <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "20px", fontFamily: "Arial, sans-serif", display: "flex", gap: "20px" }}>
      <div style={{ flex: "2", background: "#fff" }}>
        <h1 style={{ textAlign: "center", color: "#333" }}>Checkout</h1>
        <div style={{ borderTop: "1px solid #ddd", paddingTop: "20px" }}>
          <h3 style={{ marginBottom: "20px", color: "#333" }}>Billing and Shipping Information</h3>
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
            <FormControl fullWidth>
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
                inputProps={{ style: { height: "35px", fontSize: "14px" } }} 
              >
                {provinces.map(province => (
                  <MenuItem key={province.id} value={province.id}>{province.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
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
                inputProps={{ style: { height: "35px", fontSize: "14px" } }} 
              >
                {districts.map(district => (
                  <MenuItem key={district.id} value={district.id}>{district.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
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
                inputProps={{ style: { height: "35px", fontSize: "14px" } }} 
              >
                {wards.map(ward => (
                  <MenuItem key={ward.id} value={ward.id}>{ward.name}</MenuItem>
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
          </form>

          {/* Payment Options */}
          <div style={{ marginTop: "30px" }}>
            <h3 style={{ color: "#333" }}>Payment Method</h3>
            <RadioGroup value={payment} onChange={(e) => setPayment(e.target.value)}>
              <FormControlLabel value="PAY" control={<Radio />} label="PayPal" />
              <FormControlLabel value="CASH" control={<Radio />} label="Cash on Delivery" />
            </RadioGroup>
          </div>

          {/* Place Order Button */}
          <div style={{ marginTop: "30px", textAlign: "center" }}>
            <Button
              variant="contained"
              color="success"
              onClick={handlePlaceOrder}
            >
              Place Order
            </Button>
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div style={{ flex: "1", marginLeft: "20px", background: "#fff" }}>
        {product ? (
          <div style={{ display: "flex", border: "1px solid #ccc", boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)" }}>
            <img
              src={product.image || defaultImage}
              alt={product.name}
              style={{ width: "100%", maxWidth: "200px", borderRadius: "8px" }}
            />
            <div style={{ marginLeft: "20px" }}>
              <h2 style={{ color: "#333" }}>{product.name}</h2>
              <p style={{ fontSize: "1.2rem", fontWeight: "bold", color: "#70C745" }}>${product.price}</p>
              <p style={{ color: "#666" }}>QTY: {selectedProduct.quantity}</p>
              <p style={{ fontSize: "1.2rem", fontWeight: "bold", color: "#333" }}>
                Total: ${product.price * selectedProduct.quantity}
              </p>
            </div>
          </div>
        ) : (
          <p style={{ color: "#666" }}>Loading product details...</p>
        )}
      </div>

      {/* Snackbar for success toast */}
      <Snackbar
        open={showSuccessToast}
        autoHideDuration={3000}
        onClose={() => setShowSuccessToast(false)}
      >
        <Alert onClose={() => setShowSuccessToast(false)} severity="success" sx={{ width: '100%' }}>
          Order placed successfully!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Checkout;
