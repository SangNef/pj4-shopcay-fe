import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getProduct, randomProducts } from "../../api/product";
import { Button, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import "./product.css";
import defaultImg from "../../assets/9.png";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  const fetchProduct = async () => {
    try {
      const data = await getProduct(id);
      const randomData = await randomProducts();
      setProduct(data);
      setProducts(randomData);
    } catch (error) {
      console.error("Failed to fetch product data:", error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

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
            <div className="quantity-input">
              <IconButton onClick={handleDecrement} disabled={quantity <= 1}>
                <RemoveIcon />
              </IconButton>
              <input
                type="number"
                value={quantity}
                readOnly
                className="quantity-input-field"
              />
              <IconButton onClick={handleIncrement}>
                <AddIcon />
              </IconButton>
            </div>
          </div>

          <div className="action-buttons">
            <div className="button-group">
              <Button
                variant="contained"
                color="success"
                onClick={handleBuyNow}
                sx={{ marginRight: 1 }}
              >
                Buy Now
              </Button>
              <Button variant="outlined" color="success">
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="description">
        <h3>Description:</h3>
        <p>{product.description}</p>
      </div>

      {/* Additional sections for Delivery Service and Warranty Policy */}
      <div className="additional-info">
        <h3>Delivery Service:</h3>
        <p>
          We provide reliable delivery services to ensure that your products
          reach you on time. Our delivery partners are experienced and
          committed to providing safe and secure shipping. You can expect
          your order to arrive within 3-5 business days, depending on your
          location.
        </p>

        <h3>Warranty Policy:</h3>
        <p>
          We stand behind the quality of our products. All items come with a
          warranty period of 1 year from the date of purchase. If you
          encounter any defects in materials or workmanship, please contact
          our support team for assistance. Your satisfaction is our priority!
        </p>
      </div>

      {/* Suggestion Text for Random Products */}
      <div className="suggestion-text" style={{ margin: "20px 0", textAlign: "center" }}>
        <h3 style={{ color: "#555" }}>You might also like:</h3>
      </div>

      {/* Random Products Section */}
      <div className="random-products" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }}>
        {products.length > 0 ? (
          products.map((product) => (
            <Link
              to={`/product/${product.id}`}
              key={product.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "20px",
                textAlign: "center",
                backgroundColor: "#fff",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                textDecoration: "none",
              }}
            >
              <img
                src={product.image || defaultImg}
                alt={product.name}
                style={{
                  width: "200px",
                  height: "200px",
                  objectFit: "cover",
                  marginBottom: "15px",
                }}
              />
              <h4 style={{ color: "#333" }}>{product.name}</h4>
              <p style={{ fontWeight: "bold", color: "#70C745", marginTop: "6px" }}>${product.price}</p>

              {/* Buttons for "Buy Now" and "Add to Cart" */}
              <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "10px" }}>
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
                  onClick={(e) => {
                    e.preventDefault(); // Prevent navigation on button click
                    localStorage.setItem("selectedProduct", JSON.stringify({ id: product.id, quantity: 1 }));
                    navigate("/checkout");
                  }}
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
            </Link>
          ))
        ) : (
          <p style={{ color: "#333" }}>No products available</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
