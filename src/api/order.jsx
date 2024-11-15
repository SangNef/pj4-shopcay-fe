import { post, get, put } from "./index";

export const createOrder = async (data) => {
  return post("/orders", data);
};

export const getOrders = async (page, size, status, type) => {
  let url = `/orders?page=${page}&size=${size}`;
  if (status !== "") {
    url += `&status=${status}`; // Add status filter if provided
  }
  if (type !== "") {
    url += `&type=${type}`; // Add type filter if provided
  }
  const response = await get(url);
  return response; // assuming the API returns data with 'content' and 'totalPages'
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

export const getOrdersByUser = async (userId, page = 1, pageSize = 10) => {
  return get(`/orders/user/${userId}?page=${page}&pageSize=${pageSize}`);
};

export const sendReview = async (id, data) => {
  return post(`/reviews/${id}`, data);
}

export const extendOrder = async (id, data) => {
  return put(`/orders/extend/${id}`, data);
}