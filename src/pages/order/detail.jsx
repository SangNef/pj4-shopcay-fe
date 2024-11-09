import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Snackbar, Alert } from '@mui/material'
import { getOrder, updateStatus, cancelOrder } from '../../api/order'

const OrderDetail = () => {
  const { id } = useParams()
  const [order, setOrder] = useState({})
  const [showSuccessToast, setShowSuccessToast] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  const fetchOrder = async () => {
    try {
      const response = await getOrder(id)
      setOrder(response)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchOrder()
  }, [id])

  const handleUpdateStatus = async () => {
    try {
      await updateStatus(id)
      fetchOrder()
      showSnackbar('Status updated successfully')
    } catch (error) {
      console.error(error)
    }
  }

  const handleCancelOrder = async () => {
    try {
      await cancelOrder(id)
      fetchOrder()
      showSnackbar('Order canceled successfully')
    } catch (error) {
      console.error(error)
    }
  }

  const showSnackbar = (message) => {
    setSuccessMessage(message)
    setShowSuccessToast(true)
  }

  if (!order.id) return <div>Loading...</div>

  const statusText = {
    0: 'Pending',
    1: 'Confirmed',
    2: 'Shipping',
    3: 'Delivered',
    4: 'Completed',
    5: 'Canceled'
  }

  const statusColors = {
    0: '#ffc107',
    1: '#17a2b8',
    2: '#007bff',
    3: '#28a745',
    4: '#fd7e14',
    5: '#dc3545'
  }

  return (
    <div style={{ margin: '24px', padding: '24px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>Order Detail</h1>

      <div style={{ display: 'flex', gap: '16px' }}>
        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '8px' }}>Product Information</h2>
          {order.orderDetails?.map((orderDetail, index) => (
            <div key={index}>
              <p><strong>Name:</strong> {orderDetail.product?.name}</p>
              <p><strong>Price:</strong> ${orderDetail.product?.price}</p>
              <p><strong>Quantity:</strong> {orderDetail.qty}</p>
              <p><strong>Total Price:</strong> ${orderDetail.price}</p>
              <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                {orderDetail.product?.images?.map((image, index) => (
                  <img key={index} src={image} alt="Product" style={{ width: '96px', height: '96px', borderRadius: '4px' }} />
                ))}
              </div>
              {orderDetail.reviews?.length > 0 && (
                orderDetail.reviews.map((review, index) => (
                  <div key={index} style={{ marginBottom: '8px' }}>
                    <p><strong>Review:</strong> {review.comment}</p>
                  </div>
                ))
              )}
              <hr />
            </div>
          ))}
        </div>

        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '8px' }}>Shipping Information</h2>
          <p><strong>Name:</strong> {order.user?.fullname}</p>
          <p><strong>Email:</strong> {order.user?.email}</p>
          <p><strong>Phone:</strong> {order.phone}</p>
          <h3 style={{ fontSize: '18px', fontWeight: '500', marginTop: '8px' }}>Shipping Address</h3>
          <p>{order.address}</p>
          <p>{order.ward?.name}, {order.ward?.district?.name}, {order.ward?.district?.province?.name}</p>
          <h3 style={{ fontSize: '18px', fontWeight: '500', marginTop: '8px' }}>Order Details</h3>
          {order.type == "RENT" && (
            <p><strong>Rent Start:</strong> {order.rentStart} - <strong>Rent End:</strong> {order.rentEnd}</p>
          )}
          <p><strong>Price:</strong>${order.price}</p>
          {order.type == "RENT" && <p><strong>Debt:</strong> ${order.debt}</p>}
          <p><strong>Payment Method:</strong> {order.payment}</p>
          <p>
            <strong>Status:</strong>
            <span style={{ color: statusColors[order.status], fontWeight: 'bold', marginLeft: '8px' }}>
              {statusText[order.status]}
            </span>
          </p>
          {order.status < 4 && (
            <button
              onClick={handleUpdateStatus}
              style={{
                marginTop: '12px',
                padding: '8px 16px',
                backgroundColor: '#007bff',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Update Status
            </button>
          )}
          {order.status === 0 && (
            <button
              onClick={handleCancelOrder}
              style={{
                marginTop: '12px',
                marginLeft: '8px',
                padding: '8px 16px',
                backgroundColor: '#dc3545',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Cancel Order
            </button>
          )}
        </div>
      </div>

      <Snackbar
        open={showSuccessToast}
        autoHideDuration={3000}
        onClose={() => setShowSuccessToast(false)}
      >
        <Alert onClose={() => setShowSuccessToast(false)} severity="success" sx={{ width: '100%' }}>
          {successMessage}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default OrderDetail
