// import React from "react";
// import {
//   Box,
//   Typography,
//   Button,
// } from "@mui/material";
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// import { motion } from "framer-motion";

// const FeaturedBlog = ({ blog, onClick }) => {
//   if (!blog) return null;

//   return (
//     <Box sx={{ mb: { xs: 6, md: 9 } }}>
//       <Typography
//         variant="overline"
//         sx={{
//           color: "#769914",
//           fontWeight: 700,
//           letterSpacing: 1.5,
//         }}
//       >
//         FEATURED ARTICLE
//       </Typography>

//       <Box
//         component={motion.div}
//         whileHover={{ y: -4 }}
//         sx={{
//           mt: 2,
//           overflow: "hidden",
//           borderRadius: "22px",
//           backgroundColor: "#111E2C",
//           display: "grid",
//           gridTemplateColumns: { xs: "1fr", md: "1.15fr 1fr" },
//           boxShadow: "0 15px 45px rgba(17,30,44,0.15)",
//           cursor: "pointer",
//         }}
//         onClick={onClick}
//       >
//         <Box
//           sx={{
//             minHeight: { xs: 250, md: 420 },
//             backgroundImage: `url(${blog.image})`,
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//           }}
//         />

//         <Box
//           sx={{
//             p: { xs: 3, md: 5 },
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "center",
//           }}
//         >
//           <Typography
//             sx={{
//               color: "#BBBF19",
//               fontWeight: 700,
//               fontSize: "0.8rem",
//               textTransform: "uppercase",
//               mb: 1.5,
//             }}
//           >
//             {blog.category || "General"}
//           </Typography>

//           <Typography
//             component="h2"
//             sx={{
//               color: "#fff",
//               fontSize: { xs: "1.7rem", md: "2.3rem" },
//               lineHeight: 1.2,
//               fontWeight: 800,
//             }}
//           >
//             {blog.title}
//           </Typography>

//           <Typography
//             sx={{
//               mt: 2,
//               color: "rgba(255,255,255,0.72)",
//               lineHeight: 1.7,
//             }}
//           >
//             {blog.content?.slice(0, 190)}
//             {blog.content?.length > 190 ? "..." : ""}
//           </Typography>

//           <Box sx={{ mt: 3 }}>
//             <Button
//               endIcon={<ArrowForwardIcon />}
//               sx={{
//                 color: "#fff",
//                 backgroundColor: "#769914",
//                 borderRadius: "999px",
//                 px: 3,
//                 textTransform: "none",
//                 fontWeight: 700,
//                 "&:hover": {
//                   backgroundColor: "#5f7d10",
//                 },
//               }}
//             >
//               Read Article
//             </Button>
//           </Box>

//           <Typography
//             sx={{
//               mt: 3,
//               color: "rgba(255,255,255,0.5)",
//               fontSize: "0.8rem",
//             }}
//           >
//             {blog.author || "Cloudix Team"} •{" "}
//             {blog.createdAt
//               ? new Date(blog.createdAt).toLocaleDateString()
//               : ""}
//           </Typography>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default FeaturedBlog;

import React from "react";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { CategoryPill, CircleArrow, Cover, Meta, getExcerpt } from "./BlogShared";

const FeaturedBlog = ({ blog, onClick }) => {
  if (!blog) return null;

  return (
    <Box
      component={motion.div}
      whileHover={{ y: -3 }}
      onClick={onClick}
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "1.25fr 1fr" },
        overflow: "hidden",
        borderRadius: "16px",
        bgcolor: "primary.dark",
        boxShadow: "0 12px 40px rgba(17,30,44,0.15)",
        cursor: "pointer",
      }}
    >
      <Cover blog={blog} sx={{ minHeight: { xs: 220, md: 300 } }} />

      <Box sx={{ p: { xs: 3, md: 4.5 }, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <Box><CategoryPill>{blog.category || "General"}</CategoryPill></Box>

        <Typography
          component="h3"
          sx={{ mt: 2, color: "#fff", fontWeight: 700, lineHeight: 1.25, fontSize: { xs: "1.5rem", md: "1.9rem" } }}
        >
          {blog.title}
        </Typography>

        <Typography sx={{ mt: 2, color: "rgba(255,255,255,0.75)", lineHeight: 1.7, fontSize: "0.92rem" }}>
          {getExcerpt(blog, 170)}
        </Typography>

        <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 2 }}>
          <Meta blog={blog} light />
          <CircleArrow size={44} />
        </Box>
      </Box>
    </Box>
  );
};

export default FeaturedBlog;