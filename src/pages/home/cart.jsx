import React, { useState, useEffect } from "react";
import { getProduct } from "../../api/product";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  // Load cart from local storage
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);
  }, []);

  // Fetch product data for each item in the cart
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productPromises = cartItems.map(async (item) => {
          const data = await getProduct(item.productId);
          return { ...data, quantity: item.quantity };
        });
        const results = await Promise.all(productPromises);
        setProducts(results);
      } catch (error) {
        console.error("Failed to fetch product data:", error);
      }
    };

    if (cartItems.length > 0) {
      fetchProducts();
    }
  }, [cartItems]);

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) return;

    const updatedCart = cartItems.map((item) =>
      item.productId === productId ? { ...item, quantity: newQuantity } : item
    );

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  const handleItemRemove = (productId) => {
    const updatedCart = cartItems.filter((item) => item.productId !== productId);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    const updatedProducts = products.filter((product) => product.id !== productId);
    setProducts(updatedProducts);
    window.location.reload();
  };

  const totalPrice = products.reduce((total, product) => total + product.price * product.quantity, 0);

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="max-w-[1600px] mx-auto p-6 mt-8">
      <h2 className="text-2xl font-semibold mb-6">Cart Details</h2>

      {cartItems.length === 0 ? (
        <p className="text-lg text-gray-600">Cart is empty</p>
      ) : (
        <div className="flex space-x-8 ">
          <table className="w-2/3 border-collapse h-max">
            <thead>
              <tr>
                <th className="text-lg p-4 text-left bg-gray-100 border-b-2 border-gray-300">Product</th>
                <th className="text-lg p-4 text-left bg-gray-100 border-b-2 border-gray-300">Price</th>
                <th className="text-lg p-4 text-left bg-gray-100 border-b-2 border-gray-300">Quantity</th>
                <th className="text-lg p-4 text-left bg-gray-100 border-b-2 border-gray-300">Total</th>
                <th className="text-lg p-4 text-left bg-gray-100 border-b-2 border-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-gray-200 h-[60px]">
                  {" "}
                  {/* Adjust the height here */}
                  <td className="p-4 h-[60px]">
                    <div className="flex items-center">
                      <img src={product.images[0]} alt={product.name} className="w-20 h-20 rounded object-cover mr-4 h-[60px]" />
                      <span className="text-lg font-medium">{product.name}</span>
                    </div>
                  </td>
                  <td className="p-4 h-[60px]">{product.price.toFixed(2)} $</td>
                  <td className="p-4 h-[60px] flex items-center">
                    <button
                      className="text-gray-600 transition hover:text-red-600"
                      onClick={() => handleQuantityChange(product.id, product.quantity - 1)}
                    >
                      -
                    </button>
                    <span className="mx-2">{product.quantity}</span>
                    <button
                      className="text-gray-600 transition hover:text-green-600"
                      onClick={() => handleQuantityChange(product.id, product.quantity + 1)}
                    >
                      +
                    </button>
                  </td>
                  <td className="p-4 h-[60px]">{(product.price * product.quantity).toFixed(2)} $</td>
                  <td className="p-4 h-[60px]">
                    <button
                      className="text-gray-600 transition hover:text-red-600"
                      onClick={() => handleItemRemove(product.id)}
                    >
                      <span className="sr-only">Remove item</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="w-1/3 bg-white p-6 rounded-lg shadow-md h-96 overflow-y-auto sticky top-4 z-10">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Summary</h3>

              <dl className="space-y-0.5 text-sm text-gray-700">
                <div className="flex justify-between">
                  <p>Total Price:</p>
                  <p>{totalPrice.toFixed(2)} $</p>
                </div>

                <div className="flex justify-between">
                  <dt>VAT</dt>
                  <dd>£25</dd>
                </div>

                <div className="flex justify-between">
                  <dt>Discount</dt>
                  <dd>-£20</dd>
                </div>

                <div className="flex justify-between !text-base font-medium">
                  <p>Total Price:</p>
                  <p className="text-red-600">{totalPrice.toFixed(2)} $</p>
                </div>
              </dl>

              <button
                className="w-full rounded bg-lime-600 px-5 py-3 text-sm text-gray-100 transition hover:bg-green-700"
                onClick={handleCheckout}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
