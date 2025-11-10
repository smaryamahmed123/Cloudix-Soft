import { ExitToApp } from '@mui/icons-material';
import axios from 'axios';
const backendURL = import.meta.env.VITE_BACKEND_URL;
export const fetchServices = () => axios.get(backendURL);
export const createService = (data) => axios.post(backendURL, data);
export const updateService = (id, data) => axios.put(`${backendURL}/${id}`, data);
export const deleteService = (id) => axios.delete(`${backendURL}/${id}`);
export const reorderServices = (ids) => axios.put(`${backendURL}/reorder`, { ids });
export const updateServiceVisibility = (id, visible) => axios.put(`${backendURL}/${id}/visibility`, { visible });  // ✅ this must exist

