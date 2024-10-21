import React, { useEffect, useState } from 'react';
import { getProduct } from '../../api/product';
import defaultImage from '../../assets/9.png';
import { createOrder } from '../../api/order';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const [product, setProduct] = useState({});
  const [shippingAddress, setShippingAddress] = useState('');
  const [city, setCity] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [payment, setPayment] = useState('PAY'); // Default payment method

  const selectedProduct = JSON.parse(localStorage.getItem('selectedProduct'));
  const user = JSON.parse(localStorage.getItem('user'));

  const navigate = useNavigate();

  const fetchProduct = async () => {
    const data = await getProduct(selectedProduct.id);
    setProduct(data);
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const handlePlaceOrder = async () => {
    const orderData = {
      product: { id: product.id },
      qty: selectedProduct.quantity,
      price: product.price * selectedProduct.quantity,
      user: { id: user.id },
      address: `${shippingAddress}, ${city}`,
      phone: phoneNumber,
      payment: payment, // Include the payment method
    };
    
    const response = await createOrder(orderData);
    if (response) {
      navigate('/')
    } else {
      alert('Failed to place order. Please try again.');
    }
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>Checkout</h1>

      {/* Product Info */}
      {product ? (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px' }}>
          <div style={{ flex: '1' }}>
            <img
              src={product.image || defaultImage}
              alt={product.name}
              style={{ width: '100%', maxWidth: '300px', borderRadius: '8px' }}
            />
          </div>
          <div style={{ flex: '2', marginLeft: '20px' }}>
            <h2 style={{ color: '#333' }}>{product.name}</h2>
            <p style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#70C745' }}>${product.price}</p>
            <p style={{ color: '#666' }}>QTY: {selectedProduct.quantity}</p>
            <p style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#333' }}>
              Total: ${product.price * selectedProduct.quantity}
            </p>
          </div>
        </div>
      ) : (
        <p>Loading product details...</p>
      )}

      {/* Billing and Shipping Form */}
      <div style={{ borderTop: '1px solid #ddd', paddingTop: '20px' }}>
        <h3 style={{ marginBottom: '20px', color: '#333' }}>Billing and Shipping Information</h3>

        <form style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          <div style={{ flex: '1', minWidth: '300px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: '#333' }}>Full Name</label>
            <input
              type="text"
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '5px',
                fontSize: '1rem',
              }}
              value={user.fullname}
              disabled
            />
          </div>

          <div style={{ flex: '1', minWidth: '300px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: '#333' }}>Email</label>
            <input
              type="email"
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '5px',
                fontSize: '1rem',
              }}
              value={user.email}
              disabled
            />
          </div>

          <div style={{ flex: '1', minWidth: '300px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: '#333' }}>Shipping Address</label>
            <input
              type="text"
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '5px',
                fontSize: '1rem',
              }}
              value={shippingAddress}
              onChange={(e) => setShippingAddress(e.target.value)}
              required
            />
          </div>

          <div style={{ flex: '1', minWidth: '300px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: '#333' }}>City</label>
            <input
              type="text"
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '5px',
                fontSize: '1rem',
              }}
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>

          <div style={{ flex: '1', minWidth: '300px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: '#333' }}>Phone Number</label>
            <input
              type="text"
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '5px',
                fontSize: '1rem',
              }}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>
        </form>

        {/* Payment Options */}
        <div style={{ marginTop: '30px' }}>
          <h3 style={{ color: '#333' }}>Payment Method</h3>
          
          <div style={{ marginBottom: '20px' }}>
            <label>
              <input
                type="radio"
                name="payment"
                value="PAY"
                checked={payment === 'PAY'}
                onChange={() => setPayment('PAY')}
              /> PayPal
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                name="payment"
                value="CASH"
                checked={payment === 'CASH'}
                onChange={() => setPayment('CASH')}
              /> Cash on Delivery
            </label>
          </div>
        </div>

        {/* Place Order Button */}
        <div style={{ marginTop: '30px', textAlign: 'center' }}>
          <button
            type="submit"
            style={{
              padding: '10px 20px',
              fontSize: '1.2rem',
              backgroundColor: '#70C745',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              transition: 'background-color 0.3s',
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#5da035')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#70C745')}
            onClick={handlePlaceOrder}
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
