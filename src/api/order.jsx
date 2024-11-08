import { post, get, put } from "./index";

export const createOrder = async (data) => {
  return post("/orders", data);
};

export const getOrders = async () => {
  return get("/orders");
};

export const getProvinces = async () => {
  return get("/orders/provinces");
};

export const getDistricts = async (provinceId) => {
  return get(`/orders/districts/${provinceId}`);
};

export const getWards = async (districtId) => {
  return get(`/orders/wards/${districtId}`);
};

export const getOrder = async (orderId) => {
  return get(`/orders/${orderId}`);
};

export const updateStatus = async (orderId) => {
  return put(`/orders/update-status/${orderId}`);
};

export const cancelOrder = async (orderId) => {
  return put(`/orders/cancel/${orderId}`);
};

export const getOrdersByUser = async (userId) => {
  return get(`/orders/user/${userId}`);
};