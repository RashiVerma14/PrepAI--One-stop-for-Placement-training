import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";
export const DEMO_MODE = (import.meta.env.VITE_DEMO_MODE ?? "true").toLowerCase() === "true";

export const ENDPOINTS = {
  register: "/api/auth/register",
  login: "/api/auth/login",
  profile: "/api/user/profile",
  resumes: "/api/resumes",
  interviews: "/api/interviews",
  interviewStart: "/api/interviews/start",
  interviewAnswer: (id) => `/api/interviews/${id}/answer`,
  interviewReport: (id) => `/api/interviews/${id}/report`,
  dsa: "/api/dsa",
  placements: "/api/placements",
  companies: "/api/companies",
  roadmap: "/api/roadmap"
};

export const http = axios.create({
  baseURL,
  timeout: 25000,
  headers: { "Content-Type": "application/json" }
});

http.interceptors.request.use((config) => {
  const token = localStorage.getItem("placeprep_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export function unwrap(data) {
  if (data == null) return data;
  return data.data ?? data.content ?? data;
}

export async function apiGet(path, params) {
  const response = await http.get(path, { params });
  return unwrap(response.data);
}
export async function apiPost(path, body) {
  const response = await http.post(path, body);
  return unwrap(response.data);
}
export async function apiPut(path, body) {
  const response = await http.put(path, body);
  return unwrap(response.data);
}
export async function apiDelete(path) {
  const response = await http.delete(path);
  return unwrap(response.data);
}
