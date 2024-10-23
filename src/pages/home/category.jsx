import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getFruitTrees, getFlowers, getShadeTrees, getOrnamentalTrees, getEvergreenTrees } from "../../api/product"; // Import your API functions
import defaultImg from '../../assets/9.png'; // Replace with the path to your default image

const Category = () => {
  const { category } = useParams(); // Get the category from the URL
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products based on the category
    const fetchProducts = async () => {
      let data = [];
      switch (category) {
        case 'fruit-trees':
          data = await getFruitTrees();
          break;
        case 'flowering-trees':
          data = await getFlowers();
          break;
        case 'shade-trees':
          data = await getShadeTrees();
          break;
        case 'ornamental-trees':
          data = await getOrnamentalTrees();
          break;
        case 'evergreen-trees':
          data = await getEvergreenTrees();
          break;
        default:
          console.log('Invalid category');
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
    <div style={{ maxWidth: 1124, margin: "auto" }}>
      <h1>Category: {category.replace('-', ' ')}</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }}>
        {products.length > 0 ? (
          products.map((product) => (
            <Link
              to={`/product/${product.id}`}
              key={product.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "20px",
                width: "250px",
                textAlign: "center",
                backgroundColor: "#fff",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                textDecoration: "none",
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
  );
};

export default Category;
