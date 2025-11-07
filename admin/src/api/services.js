import { ExitToApp } from '@mui/icons-material';
import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/services'; // Or use environment variable
export const ABOUT_BASE_URL = 'http://localhost:8000/api/about';
export const ADMIN_BLOG_URL = 'http://localhost:8000/api/blogs';
export const ADMIN_CONTACT_INFO_URL = 'http://localhost:8000/api/contact-info';
export const ADMIN_CONTACT_MSG_URL = 'http://localhost:8000/api/contact';
export const ADMIN_LOGIN_URL = 'http://localhost:8000/api/auth/login';
export const fetchServices = () => axios.get(BASE_URL);
export const createService = (data) => axios.post(BASE_URL, data);
export const updateService = (id, data) => axios.put(`${BASE_URL}/${id}`, data);
export const deleteService = (id) => axios.delete(`${BASE_URL}/${id}`);
export const reorderServices = (ids) => axios.put(`${BASE_URL}/reorder`, { ids });
export const updateServiceVisibility = (id, visible) => axios.put(`${BASE_URL}/${id}/visibility`, { visible });  // ✅ this must exist

