import axios from "axios";

// Axios instance for public requests

export const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
});

// Axios instance for private/authenticated requests

export const axiosPrivate = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
