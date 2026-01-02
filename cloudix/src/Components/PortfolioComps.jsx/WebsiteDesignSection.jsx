// import {
//   Box,
//   Typography,
//   Tabs,
//   Tab,
//   Button,
// } from "@mui/material";
// import { motion as Motion, AnimatePresence } from "framer-motion";
// import { useEffect, useState } from "react";

// const backendURL = import.meta.env.VITE_BACKEND_URL;

// const WebsiteDesignSection = () => {
//   const [websites, setWebsites] = useState([]);
//   const [category, setCategory] = useState("ecommerce");

//   useEffect(() => {
//     fetch(`${backendURL}/api/websites`)
//       .then((res) => res.json())
//       .then((data) => setWebsites(data));
//   }, []);

//   const filteredWebsites = websites.filter(
//     (site) => site.category === category
//   );

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
//         <Typography align="center" color="rgba(255,255,255,0.7)" mb={6}>
//           Modern, responsive, and high-performance websites built with React & MERN stack.
//         </Typography>
//       </Motion.div>

//       {/* Tabs */}
//       <Tabs
//         value={category}
//         onChange={(e, val) => setCategory(val)}
//         centered
//         textColor="inherit"
//         indicatorColor="primary"
//         sx={{ mb: 6 }}
//       >
//         <Tab value="ecommerce" label="E-Commerce Websites" />
//         <Tab value="static" label="Business Websites" />
//       </Tabs>

//       {/* Scrollable Projects */}
//       <AnimatePresence mode="wait">
//         <Motion.div
//           key={category}
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0, y: -20 }}
//           transition={{ duration: 0.4 }}
//         >
//           <Box
//             sx={{
//               display: "flex",
//               gap: 4,
//               px: 4,
//               overflowX: "auto",
//               scrollSnapType: "x mandatory",
//               pb: 2,
//               "&::-webkit-scrollbar": {
//                 height: 6,
//               },
//               "&::-webkit-scrollbar-thumb": {
//                 backgroundColor: "#1e88e5",
//                 borderRadius: 10,
//               },
//             }}
//           >
//             {filteredWebsites.map((site, index) => (
//               <Motion.div
//                 key={index}
//                 whileHover={{ y: -10 }}
//                 transition={{ duration: 0.3 }}
//                 style={{ scrollSnapAlign: "start" }}
//               >
//                 <Box
//                   sx={{
//                     minWidth: 320,
//                     maxWidth: 320,
//                     bgcolor: "#111a2e",
//                     borderRadius: 4,
//                     overflow: "hidden",
//                     boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
//                   }}
//                 >
//                   {/* Image with Gradient Overlay */}
//                   <Box sx={{ position: "relative" }}>
//                     <Box
//                       component="img"
//                       src={site.image}
//                       alt={site.title}
//                       loading="lazy"
//                       sx={{
//                         width: "100%",
//                         height: 220,
//                         objectFit: "cover",
//                       }}
//                     />
//                     <Box
//                       sx={{
//                         position: "absolute",
//                         inset: 0,
//                         background:
//                           "linear-gradient(to top, rgba(0,0,0,0.6), transparent)",
//                       }}
//                     />
//                   </Box>

//                   {/* Content */}
//                   <Box p={3}>
//                     <Typography variant="h6" fontWeight={600} mb={1}>
//                       {site.title}
//                     </Typography>
//                     <Typography
//                       variant="body2"
//                       color="rgba(255,255,255,0.7)"
//                       mb={3}
//                     >
//                       {site.description}
//                     </Typography>

//                     <Button
//                       variant="contained"
//                       fullWidth
//                       href={site.link}
//                       target="_blank"
//                     >
//                       Live Preview
//                     </Button>
//                   </Box>
//                 </Box>
//               </Motion.div>
//             ))}
//           </Box>
//         </Motion.div>
//       </AnimatePresence>

//       {/* View All Projects CTA */}
//       <Box textAlign="center" mt={10}>
//         <Button
//           size="large"
//           variant="contained"
//           sx={{
//             px: 6,
//             py: 1.5,
//             fontSize: "1rem",
//           }}
//           href="/projects"
//         >
//           View All Projects
//         </Button>
//       </Box>
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
    <Box
      sx={{
        py: 16,
        color: "#fff",
        background:
          "radial-gradient(circle at top, #12234a 0%, #060b18 50%, #030712 100%)",
      }}
    >
      {/* Heading */}
      <Motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
      >
        <Typography
          variant="h3"
          align="center"
          fontWeight={800}
          mb={2}
        >
          Website Design & Development
        </Typography>
        <Typography
          align="center"
          maxWidth={700}
          mx="auto"
          color="rgba(255,255,255,0.65)"
          mb={8}
        >
          High-impact, conversion-focused websites crafted with modern
          technologies and refined user experience.
        </Typography>
      </Motion.div>

      {/* Tabs */}
      <Box display="flex" justifyContent="center" mb={8}>
        <Tabs
          value={category}
          onChange={(e, val) => setCategory(val)}
          textColor="inherit"
          TabIndicatorProps={{ style: { display: "none" } }}
          sx={{
            bgcolor: "rgba(255,255,255,0.06)",
            borderRadius: "999px",
            p: 0.5,
            backdropFilter: "blur(12px)",
          }}
        >
          {["ecommerce", "static"].map((val) => (
            <Tab
              key={val}
              value={val}
              label={
                val === "ecommerce"
                  ? "E-Commerce"
                  : "Business Websites"
              }
              sx={{
                textTransform: "none",
                fontWeight: 600,
                px: 4,
                borderRadius: "999px",
                "&.Mui-selected": {
                  bgcolor: "#769914",
                },
              }}
            />
          ))}
        </Tabs>
      </Box>

      {/* Projects */}
      <AnimatePresence mode="wait">
        <Motion.div
          key={category}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.45 }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: filteredWebsites.length < 3 ? "center" : "flex-start",
              gap: 5,
              px: { xs: 2, md: 6 },
              overflowX: "auto",
              scrollSnapType: "x mandatory",
              pb: 3,

              "&::-webkit-scrollbar": { height: 6 },
              "&::-webkit-scrollbar-thumb": {
                background: "linear-gradient(90deg,#1e88e5,#42a5f5)",
                borderRadius: 8,
              },
            }}
          >

            {filteredWebsites.map((site, index) => (
              <Motion.div
                key={index}
                whileHover={{ y: -12 }}
                transition={{ type: "spring", stiffness: 200 }}
                style={{
                  scrollSnapAlign: "center",
                  flexShrink: 0,
                }}
              >
                <Box
                  sx={{
                    width: 440,
                    bgcolor: "rgba(255,255,255,0.05)",
                    backdropFilter: "blur(16px)",
                    borderRadius: 5,
                    overflow: "hidden",
                    border: "1px solid rgba(255,255,255,0.08)",
                    boxShadow:
                      "0 30px 60px rgba(0,0,0,0.5)",
                    "&:hover img": {
                      transform: "scale(1.08)",
                    },
                  }}
                >
                  {/* Image */}
                  <Box
                    sx={{
                      position: "relative",
                      height: 260,
                      overflowY: "auto",
                      scrollbarWidth: "none",
                      "&::-webkit-scrollbar": { display: "none" },
                    }}
                  >
                    <Box
                      component="img"
                      src={site.image}
                      alt={site.title}
                      loading="lazy"
                      sx={{
                        width: "100%",
                        transform: "translateY(0)",
                        transition: "transform 6s linear",
                      }}
                    />

                    {/* Gradient overlay */}
                    <Box
                      sx={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(to top, rgba(0,0,0,0.6), transparent)",
                        pointerEvents: "none",
                      }}
                    />
                  </Box>

                  {/* Content */}
                  <Box p={3}>
                    <Typography
                      variant="h6"
                      fontWeight={700}
                      mb={1}
                    >
                      {site.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="rgba(255,255,255,0.65)"
                      mb={3}
                    >
                      {site.description}
                    </Typography>

                    <Button
                      variant="contained"
                      fullWidth
                      sx={{
                        borderRadius: "999px",
                        textTransform: "none",
                        fontWeight: 600,
                      }}
                      href={site.link}
                      target="_blank"
                    >
                      View Live Website
                    </Button>
                  </Box>
                </Box>
              </Motion.div>
            ))}
          </Box>
        </Motion.div>
      </AnimatePresence>

      {/* CTA */}
      <Box textAlign="center" mt={12}>
        <Button
          size="large"
          variant="outlined"
          sx={{
            px: 7,
            py: 1.8,
            borderRadius: "999px",
            textTransform: "none",
            fontWeight: 600,
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
