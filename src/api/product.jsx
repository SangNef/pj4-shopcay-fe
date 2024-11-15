import { get, post, put } from "./index";

export const getProducts = async (name = "", category = "", status = "") => {
  const response = await get(
    `/products/all?name=${name}&category=${category}&status=${status}`
  );
  return response;
};

export const getActiveProducts = async () => {
  return await get("/products/active");
};

export const createProduct = async (productData) => {
  return await post("/products/create", productData);
};

export const getProduct = async (id) => {
  return await get(`/products/${id}`);
};

export const updateProduct = async (id, productData) => {
  return await put(`/products/update/${id}`, productData);
};

export const toggleStatus = async (id) => {
  return await put(`/products/status/${id}`);
};

export const randomProducts = async () => {
  return await get("/products/random");
};

export const getFruitTrees = async (maxPrice, sortOrder) => {
  return await get(`/products/category/fruit-tree?maxPrice=${maxPrice}&sortOrder=${sortOrder}`);
}

export const getFlowers = async (maxPrice, sortOrder) => {
  return await get(`/products/category/flowering-tree?maxPrice=${maxPrice}&sortOrder=${sortOrder}`);
}

export const getShadeTrees = async (maxPrice, sortOrder) => {
  return await get(`/products/category/shade-tree?maxPrice=${maxPrice}&sortOrder=${sortOrder}`);
}

export const getOrnamentalTrees = async (maxPrice, sortOrder) => {
  return await get(`/products/category/ornamental-tree?maxPrice=${maxPrice}&sortOrder=${sortOrder}`);
}

export const getEvergreenTrees = async (maxPrice, sortOrder) => {
  return await get(`/products/category/evergreen-tree?maxPrice=${maxPrice}&sortOrder=${sortOrder}`);
}