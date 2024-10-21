import { post } from "./index";

export const register = async (userData) => {
  return await post("/auth/register", userData);
};

export const login = async (userData) => {
  return await post("/auth/login", userData);
};
