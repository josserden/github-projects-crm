import axios from "axios";

import { StorageKeys, StorageService } from "@/libs/storageService.ts";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";

export interface LoginPayload {
  email: string;
  password: string;
}

export const getAuthHeaders = () => {
  const token = StorageService.getItem(StorageKeys.token, true);

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const login = async (data: LoginPayload) => {
  const response = await axios.post(`${API_URL}/api/auth/login`, data);
  return response.data;
};

export const register = async (data: LoginPayload) => {
  const response = await axios.post(`${API_URL}/api/auth/register`, data);
  return response.data;
};

export const logout = async () => {
  try {
    await axios.post(`${API_URL}/api/auth/logout`, {}, getAuthHeaders());
    StorageService.removeItem(StorageKeys.token);
    StorageService.removeItem(StorageKeys.user);
    return true;
  } catch (error) {
    console.error("Logout error:", error);
    StorageService.removeItem(StorageKeys.token);
    StorageService.removeItem(StorageKeys.user);
    return false;
  }
};
