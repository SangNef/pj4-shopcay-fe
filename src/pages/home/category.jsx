import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getFruitTrees, getFlowers, getShadeTrees, getOrnamentalTrees, getEvergreenTrees } from "../../api/product"; // Import your API functions
import ov from "../../assets/sp_msph_lv.jpg";
import defaultImg from "../../assets/9.png";

const Category = () => {
  const { category } = useParams(); // Get the category from the URL
  const [products, setProducts] = useState([]);
  const [maxPrice, setMaxPrice] = useState(500); // Initialize max price state
  const [sortOrder, setSortOrder] = useState("asc"); // Initialize sort order
  const navigate = useNavigate();

  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  useEffect(() => {
    const fetchProducts = async () => {
      let data = [];
      switch (category) {
        case "fruit-trees":
          data = await getFruitTrees(maxPrice, sortOrder);
          break;
        case "flowering-trees":
          data = await getFlowers(maxPrice, sortOrder);
          break;
        case "shade-trees":
          data = await getShadeTrees(maxPrice, sortOrder);
          break;
        case "ornamental-trees":
          data = await getOrnamentalTrees(maxPrice, sortOrder);
          break;
        case "evergreen-trees":
          data = await getEvergreenTrees(maxPrice, sortOrder);
          break;
        default:
          console.log("Invalid category");
          break;
      }
      setProducts(data);
    };

    fetchProducts();
  }, [category, maxPrice, sortOrder]); // Re-run the effect when category, maxPrice, or sortOrder changes

  const handleBuyNow = (productId) => {
    navigate(`/checkout/${productId}/?qty=1`);
  };

  const handleAddToCart = (productId) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const productIndex = cart.findIndex((item) => item.productId === productId);
    if (productIndex > -1) {
      cart[productIndex].quantity += 1;
    } else {
      cart.push({ productId, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    window.location.reload(); // Reload the page to update the cart icon
    console.log(`Product ${productId} added to cart with quantity 1`);
  };

  const handleFilterChange = (e) => {
    setMaxPrice(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  return (
    <div className="relative max-w-full overflow-hidden">
      <img src={ov} alt="" className="h-[300px] w-full object-cover" />

      <div className="absolute top-[120px] left-1/2 transform -translate-x-1/2 text-white text-center text-3xl z-2 drop-shadow-xl">
        SHOP
      </div>

      <div className="absolute top-0 left-0 w-full h-[300px] bg-black bg-opacity-50 z-1" />

      <div className="max-w-7xl mx-auto flex gap-5 mt-10">
        {/* Filter Column */}
        <div className="w-1/4 p-5 bg-gray-100 rounded-lg">
          <h3 className="mb-4 text-gray-800">Filters</h3>

          {/* Rank Price Filter */}
          <div className="mb-5">
            <h4 className="mb-2 text-green-500">Rank Price</h4>
            <input
              type="range"
              min="0"
              max="5000"
              step="1"
              value={maxPrice}
              onChange={handleFilterChange}
              className="w-full"
            />
            <div className="flex justify-between">
              <span>$0</span>
              <span>${maxPrice}</span>
            </div>
          </div>

          {/* Sort Order */}
          <div>
            <h4 className="mb-2 text-green-500">Sort By Price</h4>
            <select value={sortOrder} onChange={handleSortChange} className="w-full py-2 px-3 border rounded-md">
              <option value="asc">Price: Low to High</option>
              <option value="desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Product List */}
        <div className="w-3/4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {products.length > 0 ? (
              products.map((product) => (
                <div
                  key={product.id}
                  className="relative border border-gray-300 rounded-lg p-5 text-center bg-white shadow-md"
                >
                  {product.canRent && (
                    <span className="absolute top-2 left-2 bg-orange-500 text-white text-sm font-bold py-1 px-3 rounded">
                      Rental
                    </span>
                  )}

                  <Link to={`/product/${product.id}`} className="text-inherit no-underline">
                    <img
                      src={product.images[0] || defaultImg}
                      alt={product.name}
                      className="w-48 h-48 object-cover mb-4 mx-auto"
                    />
                    <h4 className="text-gray-800">{product.name}</h4>
                    <p className="font-bold text-green-500 mt-2">${product.price}</p>
                  </Link>

                  <div className="flex justify-center gap-4 mt-4">
                    <button
                      className="py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition whitespace-nowrap"
                      onClick={() => handleBuyNow(product.id)}
                    >
                      Buy Now
                    </button>

                    <button
                      className="py-2 px-4 bg-white text-green-500 border-2 border-green-500 rounded-lg hover:bg-green-100 transition whitespace-nowrap"
                      onClick={() => handleAddToCart(product.id)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-800">No products available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
