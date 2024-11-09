import { post, put } from "./index";

export const register = async (userData) => {
  return await post("/auth/register", userData);
};

export const login = async (userData) => {
  return await post("/auth/login", userData);
};

export const updateProfile = async (id, userData) => {
  return await put(`/auth/edit-profile?userId=${id}`, userData);
};

export const updatePassword = async (id, userData) => {
  return await put(`/auth/update-password?userId=${id}`, userData);
};