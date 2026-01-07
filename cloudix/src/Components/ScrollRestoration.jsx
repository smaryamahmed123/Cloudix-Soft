import { useEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

const scrollPositions = {};

export default function ScrollRestoration() {
  const location = useLocation();
  const navigationType = useNavigationType();
  const prevPath = useRef(location.pathname);

  useEffect(() => {
    // Save previous page scroll
    scrollPositions[prevPath.current] = window.scrollY;

    if (navigationType === "POP") {
      // Back / forward → restore scroll
      const y = scrollPositions[location.pathname] ?? 0;
      window.scrollTo({ top: y, behavior: "instant" });
    } else {
      // New navigation → scroll to top
      window.scrollTo({ top: 0, behavior: "instant" });
    }

    prevPath.current = location.pathname;
  }, [location, navigationType]);

  return null;
}
