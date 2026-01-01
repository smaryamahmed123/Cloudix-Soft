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


import { Box, Typography, Grid, Button, Tabs, Tab } from "@mui/material";
import { motion as Motion } from "framer-motion";
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

      {/* Category Tabs */}
      <Tabs
        value={category}
        onChange={(e, val) => setCategory(val)}
        centered
        textColor="inherit"
        indicatorColor="primary"
        sx={{ mb: 8 }}
      >
        <Tab value="ecommerce" label="E-Commerce Websites" />
        <Tab value="static" label="Business Websites" />
      </Tabs>

      {/* Website Cards */}
      <Grid container spacing={5} justifyContent="center">
        {filteredWebsites.map((site, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Motion.div
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Box
                sx={{
                  bgcolor: "#111a2e",
                  borderRadius: 4,
                  overflow: "hidden",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
                }}
              >
                <Box
                  component="img"
                  src={site.image}
                  alt={site.title}
                  sx={{ width: "100%", height: 220, objectFit: "cover" }}
                />

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
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default WebsiteDesignSection;
