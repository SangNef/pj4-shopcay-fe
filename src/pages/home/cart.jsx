import React, { useState, useEffect } from 'react';
import { getProduct } from '../../api/product';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  // Load cart from local storage
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(cart);
  }, []);

  // Fetch product data for each item in the cart
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productPromises = cartItems.map(async item => {
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

    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  const handleItemRemove = (productId) => {
    const updatedCart = cartItems.filter(item => item.productId !== productId);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));

    const updatedProducts = products.filter(product => product.id !== productId);
    setProducts(updatedProducts);
    window.location.reload();
  };

  const totalPrice = products.reduce((total, product) => total + product.price * product.quantity, 0);

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6">Cart Details</h2>

      {/* Check if cart is empty */}
      {cartItems.length === 0 ? (
        <p className="text-lg text-gray-600">Cart is empty</p>
      ) : (
        <>
          <table className="w-full border-collapse">
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
              {products.map(product => (
                <tr key={product.id} className="border-b border-gray-200">
                  <td className="p-4">
                    <div className="flex items-center">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-20 h-20 rounded object-cover mr-4"
                      />
                      <span className="text-lg font-medium">{product.name}</span>
                    </div>
                  </td>
                  <td className="p-4">${product.price}</td>
                  <td className="p-4 flex items-center">
                    <button
                      onClick={() => handleQuantityChange(product.id, product.quantity - 1)}
                      className="w-8 h-8 text-xl text-center bg-gray-300 rounded mr-2 flex items-center justify-center"
                    >
                      -
                    </button>
                    <span className="mx-2">{product.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(product.id, product.quantity + 1)}
                      className="w-8 h-8 text-xl text-center bg-gray-300 rounded flex items-center justify-center"
                    >
                      +
                    </button>
                  </td>
                  <td className="p-4">${(product.price * product.quantity).toFixed(2)}</td>
                  <td className="p-4">
                    <button
                      onClick={() => handleItemRemove(product.id)}
                      className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Total Price Display */}
          <div className="mt-6 text-lg font-semibold">
            <p>Total Price: ${totalPrice.toFixed(2)}</p>
          </div>

          {/* Checkout Button */}
          <div className="mt-6">
            <button
              className="px-5 py-3 text-lg font-semibold text-white bg-blue-500 rounded hover:bg-blue-600"
              onClick={handleCheckout}
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
