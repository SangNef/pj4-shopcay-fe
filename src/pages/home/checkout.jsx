import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProduct } from '../../api/product';
import defaultImage from '../../assets/9.png';

const Checkout = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});

  const fetchProduct = async () => {
    const data = await getProduct(id);
    setProduct(data);
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

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
            <p style={{ color: '#666' }}>{product.description}</p>
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
              required
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
              required
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
              required
            />
          </div>

          <div style={{ flex: '1', minWidth: '300px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: '#333' }}>State</label>
            <input
              type="text"
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '5px',
                fontSize: '1rem',
              }}
              required
            />
          </div>

          <div style={{ flex: '1', minWidth: '300px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: '#333' }}>Postal Code</label>
            <input
              type="text"
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '5px',
                fontSize: '1rem',
              }}
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
              required
            />
          </div>
        </form>

        {/* Payment Button */}
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
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
