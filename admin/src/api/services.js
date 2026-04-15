import axios from "axios";
const backendURL = import.meta.env.VITE_BACKEND_URL;

// Use the correct route prefix
const API_URL = `${backendURL}/api/services`;
console.log("API URL:", API_URL);
export const fetchServices = () => axios.get(API_URL);
export const createService = (data) => axios.post(API_URL, data);
export const updateService = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteService = (id) => axios.delete(`${API_URL}/${id}`);
export const reorderServices = (ids) => axios.put(`${API_URL}/reorder`, { ids });
export const updateServiceVisibility = (id, visible) =>
  axios.put(`${API_URL}/${id}/visibility`, { visible });
