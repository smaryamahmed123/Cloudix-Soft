// import React from "react";
// import {
//   Box,
//   Container,
//   Typography,
//   TextField,
//   InputAdornment,
// } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";
// import { motion } from "framer-motion";
// import blogBg from "../../assets/blog-bg.webp";

// const BlogHero = ({ search, setSearch }) => {
//   return (
//     <Box
//       sx={{
//         position: "relative",
//         overflow: "hidden",
//         py: { xs: 9, md: 13 },
//         color: "#fff",

//         // Background image + dark overlay
//         backgroundImage: `
//           linear-gradient(
//             135deg,
//             rgba(17, 30, 44, 0.94) 0%,
//             rgba(17, 30, 44, 0.82) 55%,
//             rgba(17, 30, 44, 0.72) 100%
//           ),
//           url(${blogBg})
//         `,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundRepeat: "no-repeat",
//       }}
//     >
//       {/* Decorative green circle */}
//       <Box
//         sx={{
//           position: "absolute",
//           width: 300,
//           height: 300,
//           borderRadius: "50%",
//           background: "rgba(118,153,20,0.12)",
//           top: -150,
//           right: -80,
//           pointerEvents: "none",
//         }}
//       />

//       {/* Decorative square */}
//       <Box
//         sx={{
//           position: "absolute",
//           width: 220,
//           height: 220,
//           transform: "rotate(35deg)",
//           border: "1px solid rgba(187,191,25,0.18)",
//           bottom: -100,
//           left: -80,
//           pointerEvents: "none",
//         }}
//       />

//       <Container
//         maxWidth="lg"
//         sx={{
//           position: "relative",
//           zIndex: 1,
//         }}
//       >
//         <motion.div
//           initial={{ opacity: 0, y: 25 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.7 }}
//         >
//           <Typography
//             variant="overline"
//             sx={{
//               color: "#BBBF19",
//               fontWeight: 700,
//               letterSpacing: 2,
//             }}
//           >
//             CLOUDIX SOFT INSIGHTS
//           </Typography>

//           <Typography
//             component="h1"
//             sx={{
//               mt: 1,
//               fontSize: {
//                 xs: "2.5rem",
//                 sm: "3.5rem",
//                 md: "4.5rem",
//               },
//               lineHeight: 1.05,
//               fontWeight: 800,
//               maxWidth: 850,
//             }}
//           >
//             Ideas That Help Your{" "}
//             <Box
//               component="span"
//               sx={{
//                 color: "#A9B838",
//               }}
//             >
//               Business Grow.
//             </Box>
//           </Typography>

//           <Typography
//             sx={{
//               mt: 3,
//               maxWidth: 700,
//               fontSize: {
//                 xs: "1rem",
//                 md: "1.15rem",
//               },
//               lineHeight: 1.8,
//               color: "rgba(255,255,255,0.8)",
//             }}
//           >
//             Practical insights about digital marketing, websites, branding,
//             e-commerce, technology, and building better digital experiences.
//           </Typography>

//           <TextField
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             placeholder="Search articles..."
//             fullWidth
//             sx={{
//               mt: 4,
//               maxWidth: 600,

//               "& .MuiOutlinedInput-root": {
//                 backgroundColor: "#fff",
//                 borderRadius: "12px",
//                 color: "#111E2C",

//                 "& fieldset": {
//                   borderColor: "transparent",
//                 },

//                 "&:hover fieldset": {
//                   borderColor: "#769914",
//                 },

//                 "&.Mui-focused fieldset": {
//                   borderColor: "#769914",
//                 },
//               },
//             }}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <SearchIcon />
//                 </InputAdornment>
//               ),
//             }}
//           />
//         </motion.div>
//       </Container>
//     </Box>
//   );
// };

// export default BlogHero;

import React from "react";
import { Box, Container, Typography, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { motion } from "framer-motion";
import blogBg from "../../assets/blog-bg.webp";

const BlogHero = ({ search, setSearch }) => (
  <Box
    sx={{
      py: { xs: 7, md: 10 },
      color: "#fff",
      backgroundColor: "primary.dark",
      backgroundImage: `linear-gradient(90deg, rgba(17,30,44,1) 0%, rgba(17,30,44,0.92) 40%, rgba(17,30,44,0.55) 100%), url(${blogBg})`,
      backgroundSize: "cover",
      backgroundPosition: "center right",
    }}
  >
    <Container maxWidth="lg">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <Box
          component="span"
          sx={{
            display: "inline-block",
            px: 1.8,
            py: 0.5,
            borderRadius: "8px",
            bgcolor: "primary.main",
            fontSize: "0.72rem",
            fontWeight: 700,
            letterSpacing: 1,
          }}
        >
          OUR BLOG
        </Box>

        <Typography
          component="h1"
          sx={{
            mt: 2.5,
            maxWidth: 620,
            fontWeight: 700,
            lineHeight: 1.1,
            fontSize: { xs: "2.4rem", md: "3.6rem" },
          }}
        >
          Ideas That Help Your
          <Box component="span" sx={{ display: "block", color: "secondary.main" }}>
            Business Grow.
          </Box>
        </Typography>

        <Typography
          sx={{
            mt: 2.5,
            maxWidth: 480,
            lineHeight: 1.7,
            fontSize: { xs: "0.95rem", md: "1.02rem" },
            color: "rgba(255,255,255,0.85)",
          }}
        >
          Actionable insights, creative ideas and expert tips to help you build a stronger brand,
          attract more customers and grow faster.
        </Typography>

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
          <Box
            sx={{
              width: 38,
              height: 38,
              borderRadius: "50%",
              bgcolor: "primary.main",
              color: "#fff",
              display: "grid",
              placeItems: "center",
              flexShrink: 0,
            }}
          >
            <ArrowForwardIcon fontSize="small" />
          </Box>
        </Box>
      </motion.div>
    </Container>
  </Box>
);

export default BlogHero;