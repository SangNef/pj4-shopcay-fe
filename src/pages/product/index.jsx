import React, { useEffect, useState } from "react";
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

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");

  const fetchProducts = async () => {
    const filteredCategory = category === "" ? "" : category;
    const filteredStatus = status === "" ? "" : status;
    const data = await getProducts(name, filteredCategory, filteredStatus);
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, [name, category, status, page]);

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

  useEffect(() => {
    document.title = "AlaZea - Products";
  }, []);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {/* Breadcrumbs */}
      <div className="text-gray-700 font-semibold text-sm mb-6">
        <span>Home</span> &gt; <span>Products</span>
      </div>

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Products List</h2>
        <div className="flex gap-4 items-center">
          <input
            type="text"
            placeholder="Search by Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-4 py-2 border rounded-md"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-2 border rounded-md"
          >
            <option value="">All Categories</option>
            <option value="Fruit Tree">Fruit Tree</option>
            <option value="Flowering Tree">Flowering Tree</option>
            <option value="Shade Tree">Shade Tree</option>
            <option value="Ornamental Tree">Ornamental Tree</option>
            <option value="Evergreen Tree">Evergreen Tree</option>
          </select>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="px-4 py-2 border rounded-md"
          >
            <option value="">All Status</option>
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
          <button
            onClick={handleDialogOpen}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Create Product
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
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
                <th key={header} className="p-4 text-left font-semibold text-gray-700">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="p-4">{product.id}</td>
                <td className="p-4">{product.name}</td>
                <td className="p-4">
                  {product.images ? (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded-md"
                    />
                  ) : (
                    "No Image"
                  )}
                </td>
                <td className="p-4">{product.price}</td>
                <td className="p-4">{product.description}</td>
                <td className="p-4">{product.qty}</td>
                <td className="p-4">{product.status ? "Active" : "Inactive"}</td>
                <td className="p-4">{product.canRent ? "Yes" : "No"}</td>
                <td className="p-4">{product.rentPrice || "N/A"}</td>
                <td className="p-4">
                  <div className="flex gap-4">
                    <button
                      onClick={() => handleEditClick(product)}
                      className="text-yellow-500 hover:text-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleToggleStatus(product)}
                      className={`px-4 py-2 rounded-md ${product.status ? 'bg-red-600 text-white' : 'bg-green-600 text-white'}`}
                    >
                      {product.status ? "Lock" : "Unlock"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-300 rounded-md mr-2"
        >
          Prev
        </button>
        <span className="px-4 py-2">{page}</span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === Math.ceil(products.length / rowsPerPage)}
          className="px-4 py-2 bg-gray-300 rounded-md ml-2"
        >
          Next
        </button>
      </div>

      {/* Create Product Modal */}
      <Create open={openCreateModal} onClose={handleDialogClose} onProductCreated={fetchProducts} />
      {selectedProduct && (
        <Edit
          open={openEditModal}
          onClose={handleEditClose}
          product={selectedProduct}
          onProductUpdated={fetchProducts}
        />
      )}
    </div>
  );
};

export default Product;
