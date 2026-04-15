import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme";
import { store } from "./redux/store";

// Mount React App
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>
);

// Remove loader after React app mounts
const loader = document.getElementById("logo-loader");
if (loader) {
  loader.style.opacity = "0";
  loader.addEventListener("transitionend", () => loader.remove());
}
