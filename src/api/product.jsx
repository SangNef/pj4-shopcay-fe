import { get, post } from "./index";

export const getProducts = async () => {
  return await get("/products/all");
};

export const createProduct = async (productData) => {
  return await post("/products/create", productData);
};

export const getProduct = async (id) => {
  return await get(`/products/${id}`);
};