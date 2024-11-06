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

  // Handle quantity change
  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) return; // Prevent negative or zero quantity

    // Update the product quantity in the state
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === productId ? { ...product, quantity: newQuantity } : product
      )
    );

    // Update the quantity in localStorage
    const updatedCart = cartItems.map(item =>
      item.productId === productId ? { ...item, quantity: newQuantity } : item
    );
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  // Handle item removal
  const handleItemRemove = (productId) => {
    // Remove the product from both the state and localStorage
    const updatedCart = cartItems.filter(item => item.productId !== productId);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));

    // Remove the product from the products array
    const updatedProducts = products.filter(product => product.id !== productId);
    setProducts(updatedProducts);
    window.location.reload();
  };

  // Calculate total price of all items in the cart
  const totalPrice = products.reduce((total, product) => total + product.price * product.quantity, 0);

  const handleCheckout = () => {
    navigate('/checkout');
  }

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '20px' }}>
      <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>Cart Details</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={headerStyle}>Product</th>
            <th style={headerStyle}>Price</th>
            <th style={headerStyle}>Quantity</th>
            <th style={headerStyle}>Total</th>
            <th style={headerStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={cellStyle}>
                <div style={flexContainer}>
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    style={{
                      width: '80px',
                      height: '80px',
                      borderRadius: '4px',
                      objectFit: 'cover',
                      marginRight: '10px',
                    }}
                  />
                  <span style={{ fontSize: '16px', fontWeight: '500' }}>{product.name}</span>
                </div>
              </td>
              <td style={cellStyle}>${product.price}</td>
              <td style={cellStyle}>
                <button
                  onClick={() => handleQuantityChange(product.id, product.quantity - 1)}
                  style={buttonStyle}
                >
                  -
                </button>
                <span style={{ margin: '0 10px' }}>{product.quantity}</span>
                <button
                  onClick={() => handleQuantityChange(product.id, product.quantity + 1)}
                  style={buttonStyle}
                >
                  +
                </button>
              </td>
              <td style={cellStyle}>${(product.price * product.quantity)}</td>
              <td style={cellStyle}>
                <button
                  onClick={() => handleItemRemove(product.id)}
                  style={deleteButtonStyle}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Total Price Display */}
      <div style={{ marginTop: '20px', fontSize: '18px', fontWeight: '600' }}>
        <p>Total Price: ${totalPrice}</p>
      </div>

      {/* Checkout Button */}
      <div style={{ marginTop: '20px' }}>
        <button style={checkoutButtonStyle} onClick={() => handleCheckout()}>
          Checkout
        </button>
      </div>
    </div>
  );
};

// Inline CSS styles
const headerStyle = {
  fontSize: '18px',
  padding: '10px',
  textAlign: 'left',
  backgroundColor: '#f5f5f5',
  borderBottom: '2px solid #ccc',
};

const cellStyle = {
  padding: '10px',
  textAlign: 'left',
};

const flexContainer = {
  display: 'flex',
  alignItems: 'center',
};

const buttonStyle = {
  width: '30px',
  height: '30px',
  fontSize: '18px',
  textAlign: 'center',
  borderRadius: '4px',
  backgroundColor: '#ddd',
  cursor: 'pointer',
  border: 'none',
  margin: '0 5px',
};

const deleteButtonStyle = {
  padding: '5px 10px',
  fontSize: '14px',
  backgroundColor: '#FF6347',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

const checkoutButtonStyle = {
  padding: '10px 20px',
  fontSize: '16px',
  fontWeight: '600',
  backgroundColor: '#007BFF',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

export default Cart;
