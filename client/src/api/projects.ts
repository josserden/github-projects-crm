import axios from "axios";
import { StorageKeys, StorageService } from "../libs/storageService";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001/api";

const getAuthHeaders = () => {
  const token = StorageService.getItem(StorageKeys.token);
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getProjects = async () => {
  const response = await axios.get(`${API_URL}/projects`, getAuthHeaders());
  return response.data;
};

export const createProject = async ({ repoPath }: { repoPath: string }) => {
  const response = await axios.post(
    `${API_URL}/projects`,
    { repoPath },
    getAuthHeaders(),
  );
  return response.data;
};

export const deleteProject = async (id: string) => {
  await axios.delete(`${API_URL}/projects/${id}`, getAuthHeaders());
  return id;
};

export const refreshProject = async (id: string) => {
  const response = await axios.post(
    `${API_URL}/projects/${id}/refresh`,
    {},
    getAuthHeaders(),
  );
  return response.data;
};
