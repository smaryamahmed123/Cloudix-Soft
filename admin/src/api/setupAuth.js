// src/api/setupAuth.js
// ONE place that handles auth for every axios client in the app.
//  - attaches the admin JWT, but ONLY to requests going to your own backend
//    (never to Cloudinary or any other site)
//  - on 401/403 from your backend, clears the token and sends you to /login
//
// Import it once, at the top of main.jsx:   import "./api/setupAuth";
import axios from "axios";

let backendOrigin = null;
try {
    backendOrigin = new URL(import.meta.env.VITE_BACKEND_URL).origin;
} catch {
    console.error("VITE_BACKEND_URL is missing or invalid; admin requests will not be authenticated.");
}

const isBackendRequest = (config = {}) => {
    if (!backendOrigin) return false;
    try {
        return new URL(config.url || "", config.baseURL || backendOrigin).origin === backendOrigin;
    } catch {
        return false;
    }
};

const isLoginRequest = (config = {}) => /\/auth\/login/.test(config.url || "");

export const attachAuth = (instance) => {
    instance.interceptors.request.use((config) => {
        const token = localStorage.getItem("token");
        if (token && isBackendRequest(config) && !config.headers?.Authorization) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });

    instance.interceptors.response.use(
        (res) => res,
        (err) => {
            const status = err.response?.status;

            if (
                (status === 401 || status === 403) &&
                localStorage.getItem("token") &&
                isBackendRequest(err.config) &&
                !isLoginRequest(err.config)
            ) {
                localStorage.removeItem("token");
                if (window.location.pathname !== "/login") window.location.assign("/login");
            }

            return Promise.reject(err);
        }
    );

    return instance;
};

// Covers every page that imports plain `axios` (and src/api/services.js)
attachAuth(axios);

export default attachAuth;