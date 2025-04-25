import axios from "axios";

import { getAuthHeaders } from "@/api/auth.ts";

export interface Project {
  id: string;
  owner: string;
  name: string;
  url: string;
  stars: number;
  forks: number;
  issues: number;
  addedAt: string;
  updatedAt: string;
}

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";

export const getProjects = async () => {
  const response = await axios.get(`${API_URL}/api/projects`, getAuthHeaders());
  return response.data;
};

export const createProject = async ({ repoPath }: { repoPath: string }) => {
  const response = await axios.post(`${API_URL}/api/projects`, { repoPath }, getAuthHeaders());
  return response.data;
};

export const deleteProject = async (id: string) => {
  await axios.delete(`${API_URL}/api/projects/${id}`, getAuthHeaders());
  return id;
};

export const refreshProject = async (id: string) => {
  const response = await axios.post(`${API_URL}/api/projects/${id}/refresh`, {}, getAuthHeaders());
  return response.data;
};
