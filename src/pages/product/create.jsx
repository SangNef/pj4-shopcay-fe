import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Switch,
  FormControlLabel,
  Box,
} from "@mui/material";
import { createProduct } from "../../api/product"; // Adjust the import path as needed
import axios from "axios";

const Create = ({ open, onClose, onProductCreated }) => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    qty: "",
    status: true,
    canRent: false,
    rentPrice: "",
    image: "", // Store the uploaded image URL here
  });
  
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file); // Store the image file
      const url = await uploadImage(file); // Upload the image and get the URL
      setImageUrl(url); // Set the uploaded image URL
      setNewProduct((prev) => ({
        ...prev,
        image: url, // Assign the URL to the image field in newProduct
      }));
    }
  };

  // Function to upload image to Cloudinary
  const uploadImage = async (file) => {
    const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dx2o9ki2g/image/upload";
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "unsigned_uploads"); // Use your upload preset

    try {
      const response = await axios.post(CLOUDINARY_URL, formData);
      return response.data.secure_url; // Return the secure URL from the response
    } catch (error) {
      console.error("Error uploading image:", error);
      return ""; // Return an empty string on error
    }
  };

  const handleCreateProduct = async () => {
    try {
      await createProduct(newProduct);
      onProductCreated(); // Call the passed function to refresh the product list
      onClose(); // Close the dialog
    } catch (error) {
      console.error("Failed to create product", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
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
          size="small" // Set input size to small
        />
        <TextField
          margin="dense"
          label="Price"
          type="number"
          fullWidth
          name="price"
          value={newProduct.price}
          onChange={handleChange}
          size="small" // Set input size to small
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
          size="small" // Set input size to small
        />
        <TextField
          margin="dense"
          label="Category"
          type="text"
          fullWidth
          name="category"
          value={newProduct.category}
          onChange={handleChange}
          size="small" // Set input size to small
        />
        <TextField
          margin="dense"
          label="Quantity"
          type="number"
          fullWidth
          name="qty"
          value={newProduct.qty}
          onChange={handleChange}
          size="small" // Set input size to small
        />
        <FormControlLabel
          control={<Switch checked={newProduct.canRent} onChange={handleChange} name="canRent" />}
          label="Can Rent"
        />
        {newProduct.canRent && ( // Conditionally render the Rental Price input
          <TextField
            margin="dense"
            label="Rental Price"
            type="number"
            fullWidth
            name="rentPrice"
            value={newProduct.rentPrice}
            onChange={handleChange}
            size="small" // Set input size to small
          />
        )}
        {/* Image Upload Field */}
        <input
          accept="image/*"
          style={{ display: "none" }}
          id="image-upload"
          type="file"
          onChange={handleImageChange}
        />
        <br />
        <label htmlFor="image-upload">
          <Button variant="contained" component="span">
            Upload Image
          </Button>
        </label>
        {imageUrl && (
          <Box sx={{ marginTop: 2 }}>
            <img src={imageUrl} alt="Uploaded" style={{ width: '100px', height: 'auto', borderRadius: '8px' }} />
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleCreateProduct}>Create</Button>
      </DialogActions>
    </Dialog>
  );
};

export default Create;
