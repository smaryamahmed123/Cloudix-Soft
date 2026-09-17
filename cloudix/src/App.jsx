import React, { Suspense, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";

import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import ScrollRestoration from "./Components/ScrollRestoration";
import { lazyWithRetry } from "./utils/lazyWithRetry";

// Safe Lazy Loaded Pages
const Home = lazyWithRetry(() => import("./Pages/Home"));
const About = lazyWithRetry(() => import("./Pages/About"));
const Services = lazyWithRetry(() => import("./Pages/Services"));
const Portfolio = lazyWithRetry(() => import("./Pages/Portfolio"));
const Contact = lazyWithRetry(() => import("./Pages/Contact"));
const PrivacyPolicy = lazyWithRetry(() => import("./Pages/PrivacyPolicy"));
const Blogs = lazyWithRetry(() => import("./Pages/Blogs"));
const BlogDetails = lazyWithRetry(() => import("./Pages/BlogDetails"));


// Route Fallback Loader
const PageLoader = () => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "60vh",
    }}
  >
    <CircularProgress sx={{ color: "#769914" }} />
  </Box>
);

function AnimatedRoutes() {
  const location = useLocation();

  // Reset retry flag on successful navigation
  useEffect(() => {
    window.sessionStorage.removeItem("page-has-been-refreshed");
  }, [location]);

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:slug" element={<BlogDetails />} />
      </Routes>
    </Suspense>
  );
}

function App() {
  return (
    <Router>
      <ScrollRestoration />
      <Navbar />
      <AnimatedRoutes />
      <Footer />
    </Router>
  );
}

export default App;