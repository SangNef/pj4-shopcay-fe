import React, { useState } from 'react';
import { Table, TableHead, TableBody, TableCell, TableRow, TableContainer, Paper, Breadcrumbs, Typography, TextField, Button, Pagination, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';

const fakeData = [
  { id: 1, name: 'Product 1', price: 100, description: 'Description of Product 1' },
  { id: 2, name: 'Product 2', price: 200, description: 'Description of Product 2' },
  { id: 3, name: 'Product 3', price: 300, description: 'Description of Product 3' },
  { id: 4, name: 'Product 4', price: 400, description: 'Description of Product 4' },
  { id: 5, name: 'Product 5', price: 500, description: 'Description of Product 5' },
  { id: 6, name: 'Product 6', price: 600, description: 'Description of Product 6' },
  { id: 7, name: 'Product 7', price: 700, description: 'Description of Product 7' },
  { id: 8, name: 'Product 8', price: 800, description: 'Description of Product 8' },
  { id: 9, name: 'Product 9', price: 900, description: 'Description of Product 9' },
  { id: 10, name: 'Product 10', price: 1000, description: 'Description of Product 10' },
];

const Product = () => {
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const handleView = (id) => {
    console.log(`View product with id: ${id}`);
  };

  const handleEdit = (id) => {
    console.log(`Edit product with id: ${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Delete product with id: ${id}`);
  };

  const filteredData = fakeData.filter(product => product.name.toLowerCase().includes(filter.toLowerCase()));
  const paginatedData = filteredData.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <div style={{ padding: '20px' }}>
      {/* Breadcrumb */}
      <Breadcrumbs aria-label="breadcrumb">
        <Typography color="text.primary">Home</Typography>
        <Typography color="text.primary">Products</Typography>
      </Breadcrumbs>

      {/* Header with Flexbox */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '20px 0' }}>
        <Typography variant="h6">Products List</Typography>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <TextField
            label="Filter"
            variant="outlined"
            size="small" // Dạng nhỏ
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{ marginRight: '20px' }} // Khoảng cách giữa input và button
          />
          <Button variant="contained" color="primary">
            Create Product
          </Button>
        </div>
      </div>

      {/* Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <IconButton onClick={() => handleView(product.id)} color="primary">
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton onClick={() => handleEdit(product.id)} color="warning">
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(product.id)} color="error">
                      <DeleteIcon />
                    </IconButton>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Pagination
        count={Math.ceil(filteredData.length / rowsPerPage)}
        page={page}
        onChange={handleChangePage}
        color="primary"
        style={{ marginTop: '20px' }}
      />
    </div>
  );
};

export default Product;
