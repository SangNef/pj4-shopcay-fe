import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  IconButton,
} from "@mui/material";
import { updateProduct } from "../../api/product"; // Import API function
import axios from "axios"; // Make sure to import axios
import CloseIcon from '@mui/icons-material/Close';

const Edit = ({ open, onClose, product, onProductUpdated }) => {
  const [updatedProduct, setUpdatedProduct] = useState({ ...product });
  const [images, setImages] = useState(updatedProduct.images || []); // Initialize images

  useEffect(() => {
    setUpdatedProduct({ ...product });
    setImages(product.images || []); // Initialize images from product
  }, [product]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setUpdatedProduct((prev) => {
      if (name === "canRent") {
        return {
          ...prev,
          canRent: checked,
          rentPrice: checked ? prev.rentPrice : null,
        };
      }

      return {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  };

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    const uploadedImages = await Promise.all(files.map(uploadImage));

    setImages((prevImages) => [...prevImages, ...uploadedImages]);
    setUpdatedProduct((prev) => ({
      ...prev,
      images: [...prev.images, ...uploadedImages],
    }));
  };

  const uploadImage = async (file) => {
    const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dx2o9ki2g/image/upload";
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "unsigned_uploads");

    try {
      const response = await axios.post(CLOUDINARY_URL, formData);
      return response.data.secure_url;
    } catch (error) {
      console.error("Error uploading image:", error);
      return "";
    }
  };

  const handleRemoveImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
    setUpdatedProduct((prev) => ({
      ...prev,
      images: updatedImages,
    }));
  };

  const handleUpdate = async () => {
    await updateProduct(product.id, updatedProduct); // Call API to update product
    onProductUpdated(); // Refresh product list in parent
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Product</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Name"
          type="text"
          fullWidth
          name="name"
          value={updatedProduct.name}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Price"
          type="number"
          fullWidth
          name="price"
          value={updatedProduct.price}
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
          value={updatedProduct.description}
          onChange={handleChange}
        />
        <FormControl fullWidth margin="dense">
          <InputLabel>Category</InputLabel>
          <Select
            name="category"
            value={updatedProduct.category}
            onChange={handleChange}
            size="small"
            MenuProps={{ PaperProps: { sx: { maxHeight: 200 } } }}
          >
            <MenuItem value="Fruit Tree">Fruit Tree</MenuItem>
            <MenuItem value="Flowering Tree">Flowering Tree</MenuItem>
            <MenuItem value="Shade Tree">Shade Tree</MenuItem>
            <MenuItem value="Ornamental Tree">Ornamental Tree</MenuItem>
            <MenuItem value="Evergreen Tree">Evergreen Tree</MenuItem>
          </Select>
        </FormControl>

        <TextField
          margin="dense"
          label="Quantity"
          type="number"
          fullWidth
          name="qty"
          value={updatedProduct.qty}
          onChange={handleChange}
        />
        
        <FormControlLabel
          control={
            <Switch
              checked={updatedProduct.canRent}
              onChange={handleChange}
              name="canRent"
            />
          }
          label="Can Rent"
        />

        {updatedProduct.canRent && (
          <TextField
            margin="dense"
            label="Rental Price"
            type="number"
            fullWidth
            name="rentPrice"
            value={updatedProduct.rentPrice || ""}
            onChange={handleChange}
          />
        )}

        {/* Display uploaded images */}
        <div>
          <h4>Uploaded Images:</h4>
          <div className="image-preview" style={{ display: "flex"}}>
            {images.map((image, index) => (
              <div key={index} style={{ position: 'relative', margin: '10px' }}>
                <img src={image} alt={`uploaded-${index}`} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                <IconButton
                  style={{ position: 'absolute', top: 0, right: 0 }}
                  onClick={() => handleRemoveImage(index)}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </div>
            ))}
          </div>
        </div>

        {/* Button to upload images */}
        <input
          accept="image/*"
          type="file"
          id="upload-image"
          multiple
          onChange={handleImageChange}
          style={{ margin: '20px 0', display: 'none' }}
        />
        <label htmlFor="upload-image">
          <Button variant="contained" component="span">
            Upload Images
          </Button>
        </label>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleUpdate} variant="contained" color="primary">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Edit;
