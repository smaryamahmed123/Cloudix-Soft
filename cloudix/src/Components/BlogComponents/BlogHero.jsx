// import React from "react";
// import { Box, Container, Typography, InputBase } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// import { motion } from "framer-motion";
// import blogBg from "../../assets/blog-bg.webp";

// const BlogHero = ({ search, setSearch }) => (
//   <Box
//     sx={{
//       py: { xs: 7, md: 10 },
//       color: "#fff",
//       backgroundColor: "primary.dark",
//       backgroundImage: `linear-gradient(90deg, rgba(17,30,44,1) 0%, rgba(17,30,44,0.92) 40%, rgba(17,30,44,0.55) 100%), url(${blogBg})`,
//       backgroundSize: "cover",
//       backgroundPosition: "center right",
//     }}
//   >
//     <Container maxWidth="lg">
//       <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
//         <Typography
//           component="span"
//           sx={{
//             display: "inline-block",
//             color: "accent.main",
//             fontWeight: 600,
//             fontSize: "0.85rem",
//             letterSpacing: 1,
//             textTransform: "uppercase",
//           }}
//         >
//           OUR BLOG
//         </Typography>

//         <Typography
//           component="h1"
//           sx={{
//             mt: 2.5,
//             maxWidth: 620,
//             fontWeight: 700,
//             lineHeight: 1.1,
//             fontSize: { xs: "2.4rem", md: "3.6rem" },
//             color: "#fff",
//           }}
//         >
//           Ideas That Help Your
//           <Box component="span" sx={{ display: "block", color: "secondary.main" }}>
//             Business Grow.
//           </Box>
//         </Typography>

//         <Typography
//           sx={{
//             mt: 2.5,
//             maxWidth: 480,
//             lineHeight: 1.7,
//             fontSize: { xs: "0.95rem", md: "1.02rem" },
//             color: "rgba(255,255,255,0.85)",
//           }}
//         >
//           Actionable insights, creative ideas and expert tips to help you build a stronger brand,
//           attract more customers and grow faster.
//         </Typography>

//         <Box
//           sx={{
//             mt: 4,
//             maxWidth: 560,
//             display: "flex",
//             alignItems: "center",
//             gap: 1,
//             pl: 2,
//             pr: 0.7,
//             py: 0.7,
//             bgcolor: "#fff",
//             borderRadius: "999px",
//             color: "primary.dark",
//           }}
//         >
//           <SearchIcon sx={{ color: "text.secondary" }} />
//           <InputBase
//             fullWidth
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             placeholder="Search articles, topics, or keywords..."
//             inputProps={{ "aria-label": "Search articles" }}
//             sx={{ fontSize: "0.9rem" }}
//           />
//           <Box
//             sx={{
//               width: 38,
//               height: 38,
//               borderRadius: "50%",
//               bgcolor: "primary.main",
//               color: "#fff",
//               display: "grid",
//               placeItems: "center",
//               flexShrink: 0,
//             }}
//           >
//             <ArrowForwardIcon fontSize="small" />
//           </Box>
//         </Box>
//       </motion.div>
//     </Container>
//   </Box>
// );

// export default BlogHero;


import HeroSection from "../HeroSection";
import { Box, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import blogBg from "../../assets/blog-bg.webp";

const BlogHero = ({ search, setSearch }) => (
  <HeroSection
    image={blogBg}
    eyebrow="OUR BLOG"
    title={
      <>
        Ideas That Help Your
        <Box component="span" sx={{ display: "block", color: "secondary.main" }}>
          Business Grow.
        </Box>
      </>
    }
    description="Actionable insights, creative ideas and expert tips to help you build a stronger brand, attract more customers and grow faster."
  >
    <Box
      sx={{
        mt: 4,
        maxWidth: 560,
        display: "flex",
        alignItems: "center",
        gap: 1,
        pl: 2,
        pr: 0.7,
        py: 0.7,
        bgcolor: "#fff",
        borderRadius: "999px",
        color: "primary.dark",
      }}
    >
      <SearchIcon sx={{ color: "text.secondary" }} />
      <InputBase
        fullWidth
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search articles, topics, or keywords..."
        inputProps={{ "aria-label": "Search articles" }}
        sx={{ fontSize: "0.9rem" }}
      />
      <Box sx={{ width: 38, height: 38, borderRadius: "50%", bgcolor: "primary.main", color: "#fff", display: "grid", placeItems: "center", flexShrink: 0 }}>
        <ArrowForwardIcon fontSize="small" />
      </Box>
    </Box>
  </HeroSection>
);

export default BlogHero;