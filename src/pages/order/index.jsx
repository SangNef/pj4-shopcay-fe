import React, { useEffect, useState } from 'react';
import { getOrders } from '../../api/order';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from '@mui/material';

const Order = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const data = await getOrders();
    setOrders(data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Order List
      </Typography>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="order table">
          <TableHead>
            <TableRow>
              <TableCell><strong>Order ID</strong></TableCell>
              {/* user table cell */}
              <TableCell align="left"><strong>User</strong></TableCell>
              <TableCell align="left"><strong>Product Name</strong></TableCell>
              <TableCell align="left"><strong>Quantity</strong></TableCell>
              <TableCell align="left"><strong>Price</strong></TableCell>
              <TableCell align="left"><strong>Payment Method</strong></TableCell>
              <TableCell align="left"><strong>Phone</strong></TableCell>
              <TableCell align="left"><strong>Address</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell align="left">{order.user.fullname}</TableCell>
                <TableCell align="left">{order.product.name}</TableCell>
                <TableCell align="left">{order.qty}</TableCell>
                <TableCell align="left">${order.price}</TableCell>
                <TableCell align="left">{order.payment}</TableCell>
                <TableCell align="left">{order.phone}</TableCell>
                <TableCell align="left">{order.address}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Order;
