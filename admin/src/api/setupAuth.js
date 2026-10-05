// src/api/setupAuth.js
// Attaches the admin JWT to every request that goes to YOUR backend (and only
// your backend, so the token is never sent to Cloudinary or any other site).
import axios from "axios";

let backendOrigin = null;
try {
    backendOrigin = new URL(import.meta.env.VITE_BACKEND_URL).origin;
} catch {
    console.error("VITE_BACKEND_URL is missing or invalid; admin requests will not be authenticated.");
}

axios.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (!token || !backendOrigin || config.headers?.Authorization) return config;

    try {
        const target = new URL(config.url, config.baseURL || backendOrigin);
        if (target.origin === backendOrigin) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    } catch {
        /* unparsable URL: send without a token */
    }
    return config;
});

// Expired/invalid token -> back to the login page instead of silent failures.
axios.interceptors.response.use(
    (res) => res,
    (err) => {
        const status = err.response?.status;
        const cfgUrl = err.config?.url || "";
        const isLogin = /\/auth\/login/.test(cfgUrl);
        let fromBackend = false;
        try {
            fromBackend = new URL(cfgUrl, err.config?.baseURL || backendOrigin).origin === backendOrigin;
        } catch { /* ignore */ }
        if (fromBackend && (status === 401 || status === 403) && localStorage.getItem("token") && !isLogin) {
            localStorage.removeItem("token");
            window.location.assign("/login");
        }
        return Promise.reject(err);
    }
);