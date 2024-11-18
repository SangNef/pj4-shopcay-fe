import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import bg from "../../assets/bg.png";
import service from "../../assets/service.png";
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
    document.title = "AlaZea - Home";
  }, []);

  const handleBuyNow = (productId) => {
    // Redirect to checkout page with the product ID
    navigate(`/checkout/${productId}`);
  };

  return (
    <div style={{ textAlign: "center", color: "#fff" }}>
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
      <div style={{ marginTop: "50px", textAlign: "center" }}>
        <h2 style={{ fontSize: "2rem", color: "#70C745", marginBottom: "20px" }}>OUR SERVICES</h2>
        <p style={{ fontSize: "1.2rem", marginBottom: "30px", color: "#000" }}>
          We provide the perfect service for you.
        </p>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "flex-start",
            gap: "40px",
            flexWrap: "wrap",
            padding: "20px",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          <div style={{ width: "45%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center"}}>
            <div
              style={{
                color: "#fff",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <h3 style={{ fontSize: "1.5rem", margin: "8px 0", color: "black" }}>Plants Care</h3>
              <p style={{ color: "#4f4f4f" }}>
                In Aenean purus, pretium sito amet sapien denim moste consectet sedoni urna placerat sodales. Service
                its.
              </p>
            </div>
            <div
              style={{
                color: "#fff",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <h3 style={{ fontSize: "1.5rem", margin: "8px 0", color: "black" }}>Pressure Washing</h3>
              <p style={{ color: "#4f4f4f" }}>
                In Aenean purus, pretium sito amet sapien denim moste consectet sedoni urna placerat sodales. Service
                its.
              </p>
            </div>
            <div
              style={{
                color: "#fff",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <h3 style={{ fontSize: "1.5rem", margin: "8px 0", color: "black" }}>Tree Service & Trimming</h3>
              <p style={{ color: "#4f4f4f" }}>
                In Aenean purus, pretium sito amet sapien denim moste consectet sedoni urna placerat sodales. Service
                its.
              </p>
            </div>
          </div>
          <div style={{ width: "45%"}}>
            <img src={service} alt="Service" style={{ width: "auto", height: "540px", borderRadius: "8px" }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
