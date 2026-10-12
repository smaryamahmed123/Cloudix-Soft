// src/api/axios.js
// Same behaviour as plain axios, with your base URL. Auth + 401 handling
// come from setupAuth.js, so there is no second copy of that logic.
import axios from "axios";
import { attachAuth } from "./setupAuth";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

attachAuth(api);

export default api;