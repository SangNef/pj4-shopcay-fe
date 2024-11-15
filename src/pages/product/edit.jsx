import React, { useState, useEffect } from "react";
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
    <div className={`fixed inset-0 z-50 bg-gray-900 bg-opacity-50 ${open ? 'block' : 'hidden'}`}>
      <div className="bg-white rounded-lg shadow-lg w-full md:max-w-3xl max-h-[600px] overflow-y-auto mx-auto mt-32 p-6">
        <h2 className="text-xl font-semibold mb-4">Edit Product</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={updatedProduct.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md text-sm"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Price</label>
          <input
            type="number"
            name="price"
            value={updatedProduct.price}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md text-sm"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={updatedProduct.description}
            onChange={handleChange}
            rows="4"
            className="w-full p-2 border border-gray-300 rounded-md text-sm"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Category</label>
          <select
            name="category"
            value={updatedProduct.category}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md text-sm"
          >
            <option value="Fruit Tree">Fruit Tree</option>
            <option value="Flowering Tree">Flowering Tree</option>
            <option value="Shade Tree">Shade Tree</option>
            <option value="Ornamental Tree">Ornamental Tree</option>
            <option value="Evergreen Tree">Evergreen Tree</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Quantity</label>
          <input
            type="number"
            name="qty"
            value={updatedProduct.qty}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md text-sm"
          />
        </div>

        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            checked={updatedProduct.canRent}
            onChange={handleChange}
            name="canRent"
            className="mr-2"
          />
          <span className="text-sm">Can Rent</span>
        </div>

        {updatedProduct.canRent && (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Rental Price</label>
            <input
              type="number"
              name="rentPrice"
              value={updatedProduct.rentPrice || ""}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md text-sm"
            />
          </div>
        )}

        <div className="mb-4">
          <h4 className="text-sm font-medium mb-2">Uploaded Images:</h4>
          <div className="flex space-x-2">
            {images.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={image}
                  alt={`uploaded-${index}`}
                  className="w-24 h-24 object-cover rounded-md"
                />
                <button
                  type="button"
                  className="absolute top-0 right-0 bg-white p-1 rounded-full shadow-md"
                  onClick={() => handleRemoveImage(index)}
                >
                  <CloseIcon fontSize="small" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <input
          accept="image/*"
          type="file"
          id="upload-image"
          multiple
          onChange={handleImageChange}
          className="hidden"
        />
        <label htmlFor="upload-image">
          <button className="w-full p-2 bg-blue-500 text-white rounded-md mt-4">
            Upload Images
          </button>
        </label>

        <div className="mt-4 flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-sm rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="px-4 py-2 bg-blue-500 text-white text-sm rounded-md"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default Edit;
