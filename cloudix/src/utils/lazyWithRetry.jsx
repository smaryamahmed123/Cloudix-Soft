// src/utils/lazyWithRetry.js
import { lazy } from "react";

export const lazyWithRetry = (componentImport) =>
  lazy(async () => {
    const pageHasBeenRefreshed = JSON.parse(
      window.sessionStorage.getItem("page-has-been-refreshed") || "false"
    );

    try {
      return await componentImport();
    } catch (error) {
      if (!pageHasBeenRefreshed) {
        window.sessionStorage.setItem("page-has-been-refreshed", "true");
        window.location.reload();
      }
      throw error;
    }
  });