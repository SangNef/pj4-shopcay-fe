import React, { useEffect, useState } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  Paper,
  Breadcrumbs,
  Typography,
  Button,
  Pagination,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Switch,
  FormControlLabel,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { getProducts, createProduct } from "../../api/product"; // Import the createProduct function

const Product = () => {
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    qty: "",
    status: true,
    canRent: false,
    rentPrice: "",
    images: [],
  });

  const fetchProducts = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const handleDialogOpen = () => {
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
    setNewProduct({
      name: "",
      price: "",
      description: "",
      category: "",
      qty: "",
      status: true,
      canRent: false,
      rentPrice: "",
      images: [],
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCreateProduct = async () => {
    try {
      await createProduct(newProduct); // Use createProduct to send data
      handleDialogClose();
      fetchProducts(); // Refresh product list
    } catch (error) {
      console.error("Failed to create product", error);
    }
  };

  const filteredData = products.filter((product) => product.name.toLowerCase().includes(filter.toLowerCase()));
  const paginatedData = filteredData.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <Box sx={{ padding: "20px", backgroundColor: "#f4f6f8", minHeight: "100vh" }}>
      <Breadcrumbs aria-label="breadcrumb">
        <Typography color="text.primary" sx={{ fontWeight: "bold", fontSize: "16px" }}>Home</Typography>
        <Typography color="text.primary" sx={{ fontWeight: "bold", fontSize: "16px" }}>Products</Typography>
      </Breadcrumbs>

      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "20px 0" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#333" }}>Products List</Typography>

        <Button
          variant="contained"
          sx={{
            backgroundColor: "#1976d2",
            borderRadius: "8px",
            padding: "8px 16px",
            "&:hover": {
              backgroundColor: "#1565c0",
            },
          }}
          onClick={handleDialogOpen}
        >
          Create Product
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ borderRadius: "12px", boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)" }}>
        <Table>
          <TableHead>
            <TableRow>
              {["ID", "Name", "Price", "Description", "Qty", "Status", "Can Rent", "Rental Price", "Actions"].map(
                (header) => (
                  <TableCell key={header} sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5", color: "#333" }}>
                    {header}
                  </TableCell>
                )
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((product) => (
              <TableRow key={product.id} sx={{ "&:hover": { backgroundColor: "#f1f3f5" } }}>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>{product.qty}</TableCell>
                <TableCell>{product.status ? "Active" : "Inactive"}</TableCell>
                <TableCell>{product.canRent ? "Yes" : "No"}</TableCell>
                <TableCell>{product.rentPrice || "N/A"}</TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", gap: "10px" }}>
                    <IconButton onClick={() => console.log("View")} color="primary">
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton onClick={() => console.log("Edit")} color="warning">
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => console.log("Delete")} color="error">
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination
        count={Math.ceil(filteredData.length / rowsPerPage)}
        page={page}
        onChange={handleChangePage}
        color="primary"
        sx={{ marginTop: "20px", justifyContent: "center", display: "flex" }}
      />

      {/* Create Product Dialog */}
      <Dialog open={open} onClose={handleDialogClose}>
        <DialogTitle>Create New Product</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            name="name"
            value={newProduct.name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Price"
            type="number"
            fullWidth
            name="price"
            value={newProduct.price}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Description"
            type="text"
            fullWidth
            multiline
            rows={4}
            name="description"
            value={newProduct.description}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Category"
            type="text"
            fullWidth
            name="category"
            value={newProduct.category}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Quantity"
            type="number"
            fullWidth
            name="qty"
            value={newProduct.qty}
            onChange={handleChange}
          />
          <FormControlLabel
            control={
              <Switch
                checked={newProduct.status}
                onChange={handleChange}
                name="status"
              />
            }
            label="Active"
          />
          <FormControlLabel
            control={
              <Switch
                checked={newProduct.canRent}
                onChange={handleChange}
                name="canRent"
              />
            }
            label="Can Rent"
          />
          <TextField
            margin="dense"
            label="Rental Price"
            type="number"
            fullWidth
            name="rentPrice"
            value={newProduct.rentPrice}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleCreateProduct}>Create</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Product;
