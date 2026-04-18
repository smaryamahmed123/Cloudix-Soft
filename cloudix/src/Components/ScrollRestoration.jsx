import { useEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

// Stores scroll positions for each pathname
const scrollPositions = {};

export default function ScrollRestoration() {
  const location = useLocation();
  const navigationType = useNavigationType();
  const prevPath = useRef(location.pathname);
  const isInitialMount = useRef(true); // Track first render

  useEffect(() => {
    if (typeof window === "undefined") return; // SSR safe

    // On initial load / reload → always scroll to top
    if (isInitialMount.current) {
      window.scrollTo({ top: 0, behavior: "auto" });
      isInitialMount.current = false;
      return;
    }

    // Save scroll position of the previous page
    scrollPositions[prevPath.current] = window.scrollY;

    if (navigationType === "POP") {
      // Back / forward navigation → restore previous scroll position
      const y = scrollPositions[location.pathname] ?? 0;
      window.scrollTo({ top: y, behavior: "auto" });
    } else {
      // New navigation → scroll to top
      window.scrollTo({ top: 0, behavior: "auto" });
    }

    // Update previous path
    prevPath.current = location.pathname;
  }, [location, navigationType]);

  return null;
}
