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
  Box,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { getProducts, toggleStatus } from "../../api/product";
import Create from "./create";
import Edit from "./edit";

const Product = () => {
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const [products, setProducts] = useState([]);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchProducts = async () => {
    const data = await getProducts(filter);  // Pass filter to API
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, [filter, page]); // Add `filter` and `page` as dependencies

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const handleDialogOpen = () => {
    setOpenCreateModal(true);
  };

  const handleDialogClose = () => {
    setOpenCreateModal(false);
  };

  const handleToggleStatus = async (product) => {
    const response = await toggleStatus(product.id);
    if (response) {
      fetchProducts();
    }
  };

  const filteredData = products.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setOpenEditModal(true);
  };

  const handleEditClose = () => {
    setOpenEditModal(false);
    setSelectedProduct(null);
  };

  return (
    <Box sx={{ padding: "20px", backgroundColor: "#f4f6f8", minHeight: "100vh" }}>
      <Breadcrumbs aria-label="breadcrumb">
        <Typography color="text.primary" sx={{ fontWeight: "bold", fontSize: "16px" }}>
          Home
        </Typography>
        <Typography color="text.primary" sx={{ fontWeight: "bold", fontSize: "16px" }}>
          Products
        </Typography>
      </Breadcrumbs>

      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "20px 0" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#333" }}>
          Products List
        </Typography>

        <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <TextField
            label="Search by Name"
            variant="outlined"
            size="small"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            sx={{ width: "200px" }}
          />
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
      </Box>

      <TableContainer component={Paper} sx={{ borderRadius: "12px", boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)" }}>
        <Table>
          <TableHead>
            <TableRow>
              {[
                "ID",
                "Name",
                "Image",
                "Price",
                "Description",
                "Qty",
                "Status",
                "Can Rent",
                "Rental Price",
                "Actions",
              ].map((header) => (
                <TableCell key={header} sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5", color: "#333" }}>
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((product) => (
              <TableRow key={product.id} sx={{ "&:hover": { backgroundColor: "#f1f3f5" } }}>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>
                  {product.images ? (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      style={{ width: "50px", height: "auto", borderRadius: "4px" }}
                    />
                  ) : (
                    "No Image"
                  )}
                </TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>{product.qty}</TableCell>
                <TableCell>{product.status ? "Active" : "Inactive"}</TableCell>
                <TableCell>{product.canRent ? "Yes" : "No"}</TableCell>
                <TableCell>{product.rentPrice || "N/A"}</TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", gap: "10px" }}>
                    <Button onClick={() => handleEditClick(product)} color="warning">
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color={product.status ? "error" : "success"}
                      onClick={() => handleToggleStatus(product)}
                    >
                      {product.status ? "Lock" : "Unlock"}
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination
        count={Math.ceil(products.length / rowsPerPage)}
        page={page}
        onChange={handleChangePage}
        color="primary"
        sx={{ marginTop: "20px", justifyContent: "center", display: "flex" }}
      />

      {/* Create Product Dialog */}
      <Create open={openCreateModal} onClose={handleDialogClose} onProductCreated={fetchProducts} />
      {selectedProduct && (
        <Edit
          open={openEditModal}
          onClose={handleEditClose}
          product={selectedProduct}
          onProductUpdated={fetchProducts}
        />
      )}
    </Box>
  );
};

export default Product;
