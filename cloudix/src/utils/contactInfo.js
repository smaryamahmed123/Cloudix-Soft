import axios from "axios";

const backendURL = import.meta.env.VITE_BACKEND_URL;
let request = null;

export function getContactInfo() {
    if (!backendURL) {
        return Promise.reject(new Error("VITE_BACKEND_URL is not defined"));
    }
    if (!request) {
        request = axios
            .get(`${backendURL}/api/contact-info`)
            .then((res) => res.data)
            .catch((err) => {
                request = null; // allow a retry on the next mount
                throw err;
            });
    }
    return request;
}