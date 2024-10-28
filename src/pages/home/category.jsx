import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getFruitTrees, getFlowers, getShadeTrees, getOrnamentalTrees, getEvergreenTrees } from "../../api/product"; // Import your API functions
import ov from "../../assets/sp_msph_lv.jpg";
import defaultImg from "../../assets/9.png";

const Category = () => {
  const { category } = useParams(); // Get the category from the URL
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products based on the category
    const fetchProducts = async () => {
      let data = [];
      switch (category) {
        case "fruit-trees":
          data = await getFruitTrees();
          break;
        case "flowering-trees":
          data = await getFlowers();
          break;
        case "shade-trees":
          data = await getShadeTrees();
          break;
        case "ornamental-trees":
          data = await getOrnamentalTrees();
          break;
        case "evergreen-trees":
          data = await getEvergreenTrees();
          break;
        default:
          console.log("Invalid category");
          break;
      }
      setProducts(data);
    };

    fetchProducts();
  }, [category]); // Re-run the effect whenever the category changes

  const handleBuyNow = (productId) => {
    // Implement your buy now logic, e.g., navigate to checkout
    console.log(`Buy now for product ID: ${productId}`);
  };

  return (
    <div style={{ position: "relative", maxWidth: "100%", overflow: "hidden" }}>
      <img src={ov} alt="" style={{ height: "300px", width: "100%", objectFit: "cover" }} />

      {/* Title above the overlay */}
      <div
        style={{
          position: "absolute",
          top: "120px", // Adjust the position as needed
          left: "50%",
          transform: "translateX(-50%)",
          color: "#fff",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
          textAlign: "center",
          fontSize: "2.5rem",
          zIndex: 2, // Ensure title is above the overlay
        }}
      >
        SHOP
      </div>

      {/* Overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "300px",
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent overlay
          zIndex: 1, // Overlay below the title
        }}
      />

      <div style={{ maxWidth: "1120px", margin: "0 auto", display: "flex", gap: "20px" }}>
        {/* Filter Column */}
        <div style={{ width: "25%", padding: "20px", backgroundColor: "#f8f8f8", borderRadius: "8px" }}>
          <h3 style={{ marginBottom: "15px", color: "#333" }}>Filters</h3>

          {/* Rank Price Filter */}
          <div style={{ marginBottom: "20px" }}>
            <h4 style={{ margin: "10px 0", color: "#70C745" }}>Rank Price</h4>
            <input type="range" min="0" max="100" step="1" style={{ width: "100%" }} />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>$0</span>
              <span>$100</span>
            </div>
          </div>

          {/* Category Checkbox Filter */}
          <div style={{ marginBottom: "20px" }}>
            <h4 style={{ margin: "10px 0", color: "#70C745" }}>Category</h4>
            <label>
              <input type="checkbox" />
              Fruit Trees
            </label>
            <br />
            <label>
              <input type="checkbox" />
              Flowering Trees
            </label>
            <br />
            <label>
              <input type="checkbox" />
              Shade Trees
            </label>
            <br />
            <label>
              <input type="checkbox" />
              Ornamental Trees
            </label>
            <br />
            <label>
              <input type="checkbox" />
              Evergreen Trees
            </label>
          </div>

          {/* Sort By Filter */}
          <div>
            <h4 style={{ margin: "10px 0", color: "#70C745" }}>Sort By</h4>
            <select style={{ width: "100%", padding: "8px" }}>
              <option value="default">Select</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="newest">Newest Arrivals</option>
            </select>
          </div>
        </div>

        {/* Product List */}
        <div style={{ width: "75%" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "20px" }}>
            {products.length > 0 ? (
              products.map((product) => (
                <Link
                  to={`/product/${product.id}`}
                  key={product.id}
                  style={{
                    position: "relative", // Enable positioning for the rental flag
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    padding: "20px",
                    textAlign: "center",
                    backgroundColor: "#fff",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    textDecoration: "none",
                  }}
                >
                  {product.canRent && (
                    <span
                      style={{
                        position: "absolute",
                        top: "10px",
                        left: "10px",
                        backgroundColor: "#FFA500", // Flag color
                        color: "#fff",
                        padding: "5px 10px",
                        borderRadius: "5px",
                        fontSize: "0.9rem",
                        fontWeight: "bold",
                      }}
                    >
                      Rental
                    </span>
                  )}
                  
                  <img
                    src={product.images[0] || defaultImg}
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
    </div>
  );
};

export default Category;
