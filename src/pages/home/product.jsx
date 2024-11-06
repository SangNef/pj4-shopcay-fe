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
      setProduct(data);
      console.log(data);
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

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const productIndex = cart.findIndex((item) => item.productId === Number(id)); // Convert id to a number
    if (productIndex > -1) {
      cart[productIndex].quantity += quantity;
    } else {
      cart.push({ productId: Number(id), quantity }); // Ensure the id is a number
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    window.location.reload();
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

  // Function to handle renting the product
  const handleRent = () => {
    localStorage.setItem("productRent", JSON.stringify({ id, quantity })); // Store the product ID in localStorage
    navigate("/rent"); // Navigate to the rent page
  };

  return (
    <div className="product-container">
      <div className="main-content">
        <div className="image" style={{ display: "flex", flexDirection: "column" }}>
          <img
            src={product?.images?.[0] || defaultImg}
            alt={product.name}
            style={{ width: "450px", height: "500px", objectFit: "cover" }}
          />
          <div>
            {product?.images?.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={product.name}
                style={{ width: "100px", height: "100px", objectFit: "cover", margin: "10px 5px", cursor: "pointer" }}
              />
            ))}
          </div>
        </div>
        <div className="product-info">
          <h2>{product.name}</h2>
          <p className="price">Price: ${product.price}</p>
          {product.canRent && <p>Rent price: ${product.rentPrice}</p>}
          <p className="category">Category: {product.category}</p>

          <div className="quantity">
            <strong>Quantity:</strong>
            <div className="quantity-input">
              <IconButton onClick={handleDecrement} disabled={quantity <= 1} className="icon-button">
                <RemoveIcon />
              </IconButton>
              <input type="number" value={quantity} readOnly className="quantity-input-field" />
              <IconButton onClick={handleIncrement} className="icon-button">
                <AddIcon />
              </IconButton>
            </div>
          </div>

          <div className="action-buttons">
            <div className="button-group">
              <Button variant="contained" color="success" onClick={handleBuyNow} sx={{ marginRight: 1 }}>
                Buy Now
              </Button>
              <Button variant="outlined" color="success" onClick={handleAddToCart}>
                Add to Cart
              </Button>
              {product.canRent && (
                <Button
                  variant="contained"
                  color="warning"
                  sx={{ marginLeft: 1 }}
                  onClick={handleRent} // Attach handleRent to Rent button
                >
                  Rent
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="description">
        <h3>Description:</h3>
        <p>{product.description}</p>
      </div>

      <div className="additional-info">
        <h3>Delivery Service:</h3>
        <p>
          We provide reliable delivery services to ensure that your products reach you on time. Our delivery partners
          are experienced and committed to providing safe and secure shipping. You can expect your order to arrive
          within 3-5 business days, depending on your location.
        </p>

        <h3>Warranty Policy:</h3>
        <p>
          We stand behind the quality of our products. All items come with a warranty period of 1 year from the date of
          purchase. If you encounter any defects in materials or workmanship, please contact our support team for
          assistance. Your satisfaction is our priority!
        </p>
      </div>

      <div className="suggestion-text" style={{ margin: "20px 0", textAlign: "center" }}>
        <h3 style={{ color: "#555" }}>You might also like:</h3>
      </div>
    </div>
  );
};

export default ProductDetail;
