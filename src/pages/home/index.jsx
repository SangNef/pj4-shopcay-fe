import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import bg from "../../assets/bg.png";
import defaultImg from "../../assets/9.png";
import { getProducts } from "../../api/product";

const Home = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate(); // Hook for navigation

  const fetchProducts = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleBuyNow = (productId) => {
    // Redirect to checkout page with the product ID
    navigate(`/checkout/${productId}`);
  };

  return (
    <div style={{textAlign: "center", color: "#fff" }}>
      <img src={bg} alt="Background" style={{ width: "100%", height: "auto", opacity: 0.8 }} />
      <h2
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "2rem",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
        }}
      >
        Plants exist in the weather and light rays that surround them
      </h2>
      <div
        style={{
          position: "absolute",
          top: "60%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          gap: "20px",
        }}
      >
        <button
          style={{
            padding: "10px 20px",
            fontSize: "1rem",
            backgroundColor: "#70C745",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "background-color 0.3s",
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#5da035")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#70C745")}
        >
          GET STARTED
        </button>
        <button
          style={{
            padding: "10px 20px",
            fontSize: "1rem",
            backgroundColor: "transparent",
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
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = "#70C745";
          }}
        >
          CONTACT US
        </button>
      </div>

      {/* Product List */}
      <div style={{ marginTop: "20px", padding: "20px" }}>
        <h3 style={{ color: "#333", textAlign: "center" }}>Product List</h3>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "30px" }}>
          {products.length > 0 ? (
            products.map((product) => (
              <Link to={`/product/${product.id}`}
                key={product.id}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "20px",
                  width: "250px",
                  textAlign: "center",
                  backgroundColor: "#fff",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                <img
                  src={product.image || defaultImg}
                  alt={product.name}
                  style={{ width: "200px", height: "200px", objectFit: "cover", marginBottom: "15px" }}
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
              </Link>
            ))
          ) : (
            <p style={{ color: "#333" }}>No products available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
