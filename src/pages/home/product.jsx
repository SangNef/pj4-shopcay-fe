import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProduct } from "../../api/product";
import { Button, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import "./product.css";
import defaultImg from "../../assets/9.png";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);

  const navigate = useNavigate();

  const fetchProduct = async () => {
    const data = await getProduct(id);
    setProduct(data);
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const handleBuyNow = () => {
    localStorage.setItem("selectedProduct", JSON.stringify({ id, quantity }));
    navigate("/checkout");
  };

  // Handlers for incrementing and decrementing quantity
  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  return (
    <div className="product-container">
      <div className="main-content">
        <div className="image">
          <img src={product.imageUrl || defaultImg} alt={product.name} />
        </div>
        <div className="product-info">
          <h2>{product.name}</h2>
          <p className="price">Price: ${product.price}</p>

          <div className="quantity">
            <strong>Quantity:</strong>
            <div
              className="quantity-input"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginTop: "10px",
              }}
            >
              <IconButton onClick={handleDecrement} disabled={quantity <= 1}>
                <RemoveIcon />
              </IconButton>
              <input
                type="number"
                value={quantity}
                readOnly
                style={{
                  width: "50px",
                  textAlign: "center",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  padding: "5px",
                }}
              />
              <IconButton onClick={handleIncrement}>
                <AddIcon />
              </IconButton>
            </div>
          </div>

          <div className="action-buttons">
            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <button
                style={{
                  padding: "8px 15px",
                  backgroundColor: "#70C745",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  transition: "background-color 0.3s",
                }}
                onClick={() => handleBuyNow(product.id)} // Navigate to checkout with product ID
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#5da035")}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#70C745")}
              >
                Buy Now
              </button>

              <button
                style={{
                  padding: "8px 15px",
                  backgroundColor: "#fff",
                  color: "#70C745",
                  border: "2px solid #70C745",
                  borderRadius: "5px",
                  cursor: "pointer",
                  transition: "background-color 0.3s, color 0.3s",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = "#70C745";
                  e.currentTarget.style.color = "#fff";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = "#fff";
                  e.currentTarget.style.color = "#70C745";
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="description">
        <h3>Description:</h3>
        <p>{product.description}</p>
      </div>
    </div>
  );
};

export default ProductDetail;
