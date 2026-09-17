import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { HelmetProvider } from "react-helmet-async";
import theme from "./theme";
import { store } from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Provider store={store}>
          <App />
        </Provider>
      </ThemeProvider>
    </HelmetProvider>
  </React.StrictMode>
);

// Remove loader after React app mounts
const loader = document.getElementById("logo-loader");
if (loader) {
  loader.style.opacity = "0";
  loader.addEventListener("transitionend", () => loader.remove());
}