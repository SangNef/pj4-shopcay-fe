import React, { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { createProduct } from "../../api/product";
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
    images: [],
  });

  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    const uploadedImages = await Promise.all(files.map(uploadImage));

    setImages((prevImages) => [...prevImages, ...uploadedImages]);
    setNewProduct((prev) => ({
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
    setNewProduct((prev) => ({
      ...prev,
      images: updatedImages,
    }));
  };

  const handleCreateProduct = async () => {
    try {
      await createProduct(newProduct);
      onProductCreated();
      onClose();
    } catch (error) {
      console.error("Failed to create product", error);
    }
  };

  return (
    <div className={`fixed inset-0 z-50 bg-gray-900 bg-opacity-50 ${open ? 'block' : 'hidden'}`}>
      <div className="bg-white rounded-lg shadow-lg w-full md:max-w-3xl mx-auto mt-32 p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Create New Product</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <CloseIcon />
          </button>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={newProduct.name}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <label className="block text-sm font-medium text-gray-700 mt-4">Price</label>
          <input
            type="number"
            name="price"
            value={newProduct.price}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <label className="block text-sm font-medium text-gray-700 mt-4">Description</label>
          <textarea
            name="description"
            value={newProduct.description}
            onChange={handleChange}
            rows="4"
            className="w-full mt-1 p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>

          <label className="block text-sm font-medium text-gray-700 mt-4">Category</label>
          <select
            name="category"
            value={newProduct.category}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Fruit Tree">Fruit Tree</option>
            <option value="Flowering Tree">Flowering Tree</option>
            <option value="Shade Tree">Shade Tree</option>
            <option value="Ornamental Tree">Ornamental Tree</option>
            <option value="Evergreen Tree">Evergreen Tree</option>
          </select>

          <label className="block text-sm font-medium text-gray-700 mt-4">Quantity</label>
          <input
            type="number"
            name="qty"
            value={newProduct.qty}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="flex items-center mt-4">
            <input
              type="checkbox"
              name="canRent"
              checked={newProduct.canRent}
              onChange={handleChange}
              className="mr-2"
            />
            <label className="text-sm text-gray-700">Can Rent</label>
          </div>

          {newProduct.canRent && (
            <>
              <label className="block text-sm font-medium text-gray-700 mt-4">Rental Price</label>
              <input
                type="number"
                name="rentPrice"
                value={newProduct.rentPrice}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </>
          )}

          <input
            accept="image/*"
            type="file"
            multiple
            onChange={handleImageChange}
            id="image-upload"
            className="hidden"
          />
          <label htmlFor="image-upload" className="inline-block mt-4 text-sm font-medium text-blue-500 cursor-pointer">
            Upload Images
          </label>

          <div className="mt-4 flex gap-2 flex-wrap">
            {images.map((url, index) => (
              <div key={index} className="relative">
                <img src={url} alt="Uploaded" className="w-24 h-24 object-cover rounded-md" />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-0 right-0 p-1 bg-white rounded-full shadow-md text-gray-500 hover:text-gray-700"
                >
                  <CloseIcon fontSize="small" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 border rounded-md hover:bg-gray-100">
            Cancel
          </button>
          <button
            onClick={handleCreateProduct}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default Create;
