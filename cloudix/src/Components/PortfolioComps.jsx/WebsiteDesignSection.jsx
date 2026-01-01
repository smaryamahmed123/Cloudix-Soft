// import { Box, Typography, Grid, IconButton } from "@mui/material";
// import { motion as Motion } from "framer-motion";
// import { useEffect, useState } from "react";
// import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
// import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
// import WebsitePreview from "./WebsitePreview";

// const backendURL = import.meta.env.VITE_BACKEND_URL;

// const WebsiteDesignSection = () => {
//   const [staticWebsites, setStaticWebsites] = useState([]);
//   const [ecommerceWebsites, setEcommerceWebsites] = useState([]);

//   // Track current index for each category
//   const [staticIndex, setStaticIndex] = useState(0);
//   const [ecommerceIndex, setEcommerceIndex] = useState(0);

//   useEffect(() => {
//     fetch(`${backendURL}/api/websites`)
//       .then((res) => res.json())
//       .then((data) => {
//         setStaticWebsites(data.filter((w) => w.category === "static"));
//         setEcommerceWebsites(data.filter((w) => w.category === "ecommerce"));
//       });
//   }, []);

//   const handlePrev = (category) => {
//     if (category === "static") {
//       setStaticIndex((prev) => (prev === 0 ? staticWebsites.length - 1 : prev - 1));
//     } else {
//       setEcommerceIndex((prev) => (prev === 0 ? ecommerceWebsites.length - 1 : prev - 1));
//     }
//   };

//   const handleNext = (category) => {
//     if (category === "static") {
//       setStaticIndex((prev) => (prev === staticWebsites.length - 1 ? 0 : prev + 1));
//     } else {
//       setEcommerceIndex((prev) => (prev === ecommerceWebsites.length - 1 ? 0 : prev + 1));
//     }
//   };

//   return (
//     <Box sx={{ bgcolor: "#0b1220", py: 14, color: "#fff" }}>
//       {/* Heading */}
//       <Motion.div
//         initial={{ opacity: 0, y: 30 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//       >
//         <Typography variant="h3" align="center" fontWeight={700} mb={2}>
//           Website Design & Development
//         </Typography>
//         <Typography align="center" color="rgba(255,255,255,0.7)" mb={10}>
//           Modern, responsive, and high-performance websites built with React & MERN stack.
//         </Typography>
//       </Motion.div>

//       {/* STATIC WEBSITES */}
//       <Typography variant="h5" align="center" mb={5}>
//         Static Websites
//       </Typography>
//       {staticWebsites.length > 0 && (
//         <Box display="flex" justifyContent="center" alignItems="center" gap={2} mb={10}>
//           <IconButton onClick={() => handlePrev("static")} sx={{ color: "#fff" }}>
//             <ArrowBackIosNewIcon />
//           </IconButton>

//           <WebsitePreview
//             image={staticWebsites[staticIndex].image}
//             link={staticWebsites[staticIndex].link}
//           />

//           <IconButton onClick={() => handleNext("static")} sx={{ color: "#fff" }}>
//             <ArrowForwardIosIcon />
//           </IconButton>
//         </Box>
//       )}

//       {/* E-COMMERCE WEBSITES */}
//       <Typography variant="h5" align="center" mb={5}>
//         E-Commerce Websites
//       </Typography>
//       {ecommerceWebsites.length > 0 && (
//         <Box display="flex" justifyContent="center" alignItems="center" gap={2}>
//           <IconButton onClick={() => handlePrev("ecommerce")} sx={{ color: "#fff" }}>
//             <ArrowBackIosNewIcon />
//           </IconButton>

//           <WebsitePreview
//             image={ecommerceWebsites[ecommerceIndex].image}
//             link={ecommerceWebsites[ecommerceIndex].link}
//           />

//           <IconButton onClick={() => handleNext("ecommerce")} sx={{ color: "#fff" }}>
//             <ArrowForwardIosIcon />
//           </IconButton>
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default WebsiteDesignSection;

import {
  Box,
  Typography,
  Tabs,
  Tab,
  Button,
} from "@mui/material";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const backendURL = import.meta.env.VITE_BACKEND_URL;

const WebsiteDesignSection = () => {
  const [websites, setWebsites] = useState([]);
  const [category, setCategory] = useState("ecommerce");

  useEffect(() => {
    fetch(`${backendURL}/api/websites`)
      .then((res) => res.json())
      .then((data) => setWebsites(data));
  }, []);

  const filteredWebsites = websites.filter(
    (site) => site.category === category
  );

  return (
    <Box sx={{ bgcolor: "#0b1220", py: 14, color: "#fff" }}>
      {/* Heading */}
      <Motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Typography variant="h3" align="center" fontWeight={700} mb={2}>
          Website Design & Development
        </Typography>
        <Typography align="center" color="rgba(255,255,255,0.7)" mb={6}>
          Modern, responsive, and high-performance websites built with React & MERN stack.
        </Typography>
      </Motion.div>

      {/* Tabs */}
      <Tabs
        value={category}
        onChange={(e, val) => setCategory(val)}
        centered
        textColor="inherit"
        indicatorColor="primary"
        sx={{ mb: 6 }}
      >
        <Tab value="ecommerce" label="E-Commerce Websites" />
        <Tab value="static" label="Business Websites" />
      </Tabs>

      {/* Scrollable Projects */}
      <AnimatePresence mode="wait">
        <Motion.div
          key={category}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
        >
          <Box
            sx={{
              display: "flex",
              gap: 4,
              px: 4,
              overflowX: "auto",
              scrollSnapType: "x mandatory",
              pb: 2,
              "&::-webkit-scrollbar": {
                height: 6,
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#1e88e5",
                borderRadius: 10,
              },
            }}
          >
            {filteredWebsites.map((site, index) => (
              <Motion.div
                key={index}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
                style={{ scrollSnapAlign: "start" }}
              >
                <Box
                  sx={{
                    minWidth: 320,
                    maxWidth: 320,
                    bgcolor: "#111a2e",
                    borderRadius: 4,
                    overflow: "hidden",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
                  }}
                >
                  {/* Image with Gradient Overlay */}
                  <Box sx={{ position: "relative" }}>
                    <Box
                      component="img"
                      src={site.image}
                      alt={site.title}
                      loading="lazy"
                      sx={{
                        width: "100%",
                        height: 220,
                        objectFit: "cover",
                      }}
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(to top, rgba(0,0,0,0.6), transparent)",
                      }}
                    />
                  </Box>

                  {/* Content */}
                  <Box p={3}>
                    <Typography variant="h6" fontWeight={600} mb={1}>
                      {site.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="rgba(255,255,255,0.7)"
                      mb={3}
                    >
                      {site.description}
                    </Typography>

                    <Button
                      variant="contained"
                      fullWidth
                      href={site.link}
                      target="_blank"
                    >
                      Live Preview
                    </Button>
                  </Box>
                </Box>
              </Motion.div>
            ))}
          </Box>
        </Motion.div>
      </AnimatePresence>

      {/* View All Projects CTA */}
      <Box textAlign="center" mt={10}>
        <Button
          size="large"
          variant="contained"
          sx={{
            px: 6,
            py: 1.5,
            fontSize: "1rem",
          }}
          href="/projects"
        >
          View All Projects
        </Button>
      </Box>
    </Box>
  );
};

export default WebsiteDesignSection;
