import { get, post, put } from "./index";

export const getProducts = async (name = "") => {
  const response = await get(`/products/all?name=${name}`);
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

export const getFruitTrees = async () => {
  return await get("/products/category/fruit-tree");
}

export const getFlowers = async () => {
  return await get("/products/category/flowering-tree");
}

export const getShadeTrees = async () => {
  return await get("/products/category/shade-tree");
}

export const getOrnamentalTrees = async () => {
  return await get("/products/category/ornamental-tree");
}

export const getEvergreenTrees = async () => {
  return await get("/products/category/evergreen-tree");
}