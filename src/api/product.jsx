import { get, post } from "./index";

export const getProducts = async () => {
  return await get("/products");
};

export const createProduct = async (productData) => {
  return await post("/products", productData);
};

export const getProduct = async (id) => {
  return await get(`/products/${id}`);
};