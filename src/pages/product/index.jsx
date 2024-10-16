import React, { useState } from 'react';
import {
  Table, TableHead, TableBody, TableCell, TableRow, TableContainer, Paper, Breadcrumbs, Typography, TextField, Button, Pagination, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Switch, FormControlLabel, Box
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';

const fakeData = [
  { id: 1, name: 'Product 1', price: 100, description: 'Description of Product 1', qty: 10, status: true, can_rent: true, rental_price: 20 },
  { id: 2, name: 'Product 2', price: 200, description: 'Description of Product 2', qty: 15, status: false, can_rent: false, rental_price: null },
];

const Product = () => {
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    description: '',
    qty: '',
    status: false,
    can_rent: false,
    rental_price: '',
    images: []
  });

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const handleCreateProduct = () => {
    console.log('Creating new product:', newProduct);
    setOpenCreateDialog(false);
  };

  const handleOpenCreateDialog = () => {
    setOpenCreateDialog(true);
  };

  const handleCloseCreateDialog = () => {
    setOpenCreateDialog(false);
  };

  // Xử lý khi chọn file ảnh
  const handleImageChange = (event) => {
    const files = event.target.files;
    const newImages = [...newProduct.images];

    // Thêm từng ảnh vào mảng images
    for (let i = 0; i < files.length; i++) {
      newImages.push(URL.createObjectURL(files[i]));
    }

    setNewProduct({ ...newProduct, images: newImages });
  };

  const filteredData = fakeData.filter(product => product.name.toLowerCase().includes(filter.toLowerCase()));
  const paginatedData = filteredData.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <Box sx={{ padding: '20px', backgroundColor: '#f4f6f8', minHeight: '100vh' }}>
      {/* Breadcrumb */}
      <Breadcrumbs aria-label="breadcrumb">
        <Typography color="text.primary" sx={{ fontWeight: 'bold', fontSize: '16px' }}>Home</Typography>
        <Typography color="text.primary" sx={{ fontWeight: 'bold', fontSize: '16px' }}>Products</Typography>
      </Breadcrumbs>

      {/* Header with Flexbox */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '20px 0' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>Products List</Typography>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <TextField
            label="Filter"
            variant="outlined"
            size="small"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            sx={{ marginRight: '20px', backgroundColor: '#fff', borderRadius: '8px' }}
          />
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#1976d2', // Primary color
              borderRadius: '8px',
              padding: '8px 16px',
              '&:hover': {
                backgroundColor: '#1565c0',
              },
            }}
            onClick={handleOpenCreateDialog}
          >
            Create Product
          </Button>
        </Box>
      </Box>

      {/* Table */}
      <TableContainer component={Paper} sx={{ borderRadius: '12px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)' }}>
        <Table>
          <TableHead>
            <TableRow>
              {['ID', 'Name', 'Price', 'Description', 'Qty', 'Status', 'Can Rent', 'Rental Price', 'Actions'].map((header) => (
                <TableCell key={header} sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5', color: '#333' }}>
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((product) => (
              <TableRow key={product.id} sx={{ '&:hover': { backgroundColor: '#f1f3f5' } }}>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>{product.qty}</TableCell>
                <TableCell>{product.status ? 'Active' : 'Inactive'}</TableCell>
                <TableCell>{product.can_rent ? 'Yes' : 'No'}</TableCell>
                <TableCell>{product.rental_price || 'N/A'}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: '10px' }}>
                    <IconButton onClick={() => console.log('View')} color="primary">
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton onClick={() => console.log('Edit')} color="warning">
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => console.log('Delete')} color="error">
                      <DeleteIcon />
                    </IconButton>
                  </Box>
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
        sx={{ marginTop: '20px', justifyContent: 'center', display: 'flex' }}
      />

      {/* Dialog Create Product */}
      <Dialog open={openCreateDialog} onClose={handleCloseCreateDialog}>
        <DialogTitle>Create New Product</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the details of the new product.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Product Name"
            type="text"
            fullWidth
            size='small'
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            sx={{ marginBottom: '16px' }}
          />
          <TextField
            margin="dense"
            label="Price"
            type="number"
            fullWidth
            size='small'
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            sx={{ marginBottom: '16px' }}
          />
          <TextField
            margin="dense"
            label="Description"
            type="text"
            fullWidth
            size='small'
            value={newProduct.description}
            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
            sx={{ marginBottom: '16px' }}
          />
          <TextField
            margin="dense"
            label="Quantity"
            type="number"
            fullWidth
            size='small'
            value={newProduct.qty}
            onChange={(e) => setNewProduct({ ...newProduct, qty: e.target.value })}
            sx={{ marginBottom: '16px' }}
          />
          <FormControlLabel
            control={
              <Switch
                checked={newProduct.status}
                onChange={(e) => setNewProduct({ ...newProduct, status: e.target.checked })}
              />
            }
            label="Active Status"
          />
          <FormControlLabel
            control={
              <Switch
                checked={newProduct.can_rent}
                onChange={(e) => setNewProduct({ ...newProduct, can_rent: e.target.checked })}
              />
            }
            label="Can Rent"
          />
          {newProduct.can_rent && (
            <TextField
              margin="dense"
              label="Rental Price"
              type="number"
              fullWidth
              value={newProduct.rental_price}
              onChange={(e) => setNewProduct({ ...newProduct, rental_price: e.target.value })}
              sx={{ marginBottom: '16px' }}
            />
          )}
          
          {/* Input để thêm hình ảnh */}
          <br />
          <Button
            variant="contained"
            component="label"
            sx={{ marginBottom: '16px' }}
          >
            Upload Images
            <input
              type="file"
              hidden
              multiple
              accept="image/*"
              onChange={handleImageChange}
            />
          </Button>

          {/* Preview các ảnh đã tải lên */}
          <Box sx={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {newProduct.images.map((image, index) => (
              <Box key={index} sx={{ width: '100px', height: '100px', borderRadius: '8px', overflow: 'hidden' }}>
                <img src={image} alt={`Preview ${index}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </Box>
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCreateDialog}>Cancel</Button>
          <Button onClick={handleCreateProduct} variant="contained">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Product;
