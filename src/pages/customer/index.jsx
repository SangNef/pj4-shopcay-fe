import React, { useEffect, useState } from "react";
import { getAllUsers } from "../../api/auth"; // Import the API function for fetching users
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Typography } from "@mui/material";

const Customer = () => {
  const [customers, setCustomers] = useState([]);

  // Fetch customers from the API
  const fetchCustomers = async () => {
    const data = await getAllUsers();
    setCustomers(data);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <Box sx={{ padding: "20px", backgroundColor: "#f4f6f8", minHeight: "100vh" }}>
      <Typography variant="h6" sx={{ fontWeight: "bold", color: "#333" }}>
        Customers List
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Full Name</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers?.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>{customer.id}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.username}</TableCell>
                <TableCell>{customer.fullname}</TableCell>
                <TableCell>{customer.role}</TableCell>
                <TableCell>{customer.status ? "Active" : "Inactive"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Customer;
