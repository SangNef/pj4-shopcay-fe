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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { getProducts } from "../../api/product"; // Import the getProducts function
import Create from "./create"; // Import the Create component

const Product = () => {
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);

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
  };

  const filteredData = products.filter((product) =>
    product.name.toLowerCase().includes(filter.toLowerCase())
  );
  const paginatedData = filteredData.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

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
              {["ID", "Name", "Image", "Price", "Description", "Qty", "Status", "Can Rent", "Rental Price", "Actions"].map(
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
                <TableCell>
                  {product.image ? (
                    <img src={product.image} alt={product.name} style={{ width: '50px', height: 'auto', borderRadius: '4px' }} />
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
      <Create open={open} onClose={handleDialogClose} onProductCreated={fetchProducts} />
    </Box>
  );
};

export default Product;
