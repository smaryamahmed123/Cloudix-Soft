// import axios from 'axios';

// const BASE_URL = 'http://localhost:8000/api/services'; // Or use environment variable

// export const fetchServices = () => axios.get(BASE_URL);


import axios from "axios";

const BASE_URL = "http://localhost:8000/api/services";

export const reorderServices = (ids) =>
  axios.put(`${BASE_URL}/reorder`, { ids });

export const updateServiceVisibility = (id, visible) =>
  axios.put(`${BASE_URL}/${id}/visibility`, { visible });
