// import React from "react";
// import {
//   Card,
//   CardMedia,
//   CardContent,
//   Typography,
//   Box,
//   Button,
// } from "@mui/material";
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// import AccessTimeIcon from "@mui/icons-material/AccessTime";
// import { motion } from "framer-motion";

// const calculateReadingTime = (content = "") => {
//   const words = content.trim().split(/\s+/).length;
//   return Math.max(1, Math.ceil(words / 200));
// };

// const BlogCard = ({ blog, onClick }) => {
//   return (
//     <Card
//       component={motion.div}
//       whileHover={{ y: -7 }}
//       sx={{
//         height: "100%",
//         display: "flex",
//         flexDirection: "column",
//         overflow: "hidden",
//         borderRadius: "18px",
//         border: "1px solid rgba(17,30,44,0.08)",
//         boxShadow: "0 5px 20px rgba(0,0,0,0.06)",
//         backgroundColor: "#fff",
//       }}
//     >
//       <Box sx={{ position: "relative" }}>
//         <CardMedia
//           component="img"
//           image={blog.image}
//           alt={blog.title}
//           loading="lazy"
//           sx={{
//             height: { xs: 210, md: 220 },
//             objectFit: "cover",
//           }}
//         />

//         <Box
//           sx={{
//             position: "absolute",
//             top: 15,
//             left: 15,
//             px: 1.5,
//             py: 0.6,
//             borderRadius: "999px",
//             backgroundColor: "#111E2C",
//             color: "#fff",
//             fontSize: "0.72rem",
//             fontWeight: 700,
//           }}
//         >
//           {blog.category || "General"}
//         </Box>
//       </Box>

//       <CardContent
//         sx={{
//           p: 3,
//           display: "flex",
//           flexDirection: "column",
//           flexGrow: 1,
//         }}
//       >
//         <Typography
//           component="h2"
//           variant="h6"
//           sx={{
//             fontWeight: 750,
//             lineHeight: 1.35,
//             color: "#111E2C",
//             display: "-webkit-box",
//             WebkitLineClamp: 2,
//             WebkitBoxOrient: "vertical",
//             overflow: "hidden",
//           }}
//         >
//           {blog.title}
//         </Typography>

//         <Typography
//           sx={{
//             mt: 1.5,
//             color: "text.secondary",
//             lineHeight: 1.7,
//             fontSize: "0.92rem",
//             display: "-webkit-box",
//             WebkitLineClamp: 3,
//             WebkitBoxOrient: "vertical",
//             overflow: "hidden",
//           }}
//         >
//           {blog.content}
//         </Typography>

//         <Box
//           sx={{
//             mt: "auto",
//             pt: 2.5,
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             gap: 1,
//           }}
//         >
//           <Box>
//             <Typography
//               sx={{
//                 fontSize: "0.76rem",
//                 fontWeight: 600,
//                 color: "#111E2C",
//               }}
//             >
//               {blog.author || "Cloudix Team"}
//             </Typography>

//             <Box
//               sx={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 0.5,
//                 mt: 0.4,
//                 color: "text.secondary",
//               }}
//             >
//               <AccessTimeIcon sx={{ fontSize: 14 }} />

//               <Typography sx={{ fontSize: "0.72rem" }}>
//                 {calculateReadingTime(blog.content)} min read
//               </Typography>
//             </Box>
//           </Box>

//           <Button
//             onClick={() => onClick(blog)}
//             endIcon={<ArrowForwardIcon />}
//             sx={{
//               minWidth: "auto",
//               px: 0,
//               color: "#769914",
//               textTransform: "none",
//               fontWeight: 700,
//               "&:hover": {
//                 backgroundColor: "transparent",
//                 color: "#5f7d10",
//               },
//             }}
//           >
//             Read
//           </Button>
//         </Box>
//       </CardContent>
//     </Card>
//   );
// };

// export default BlogCard;


import React from "react";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { CategoryPill, CircleArrow, Cover, Meta, getExcerpt } from "./BlogShared";

const BlogCard = ({ blog, onClick }) => (
  <Box
    component={motion.article}
    whileHover={{ y: -5 }}
    onClick={() => onClick(blog)}
    sx={{
      height: "100%",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      borderRadius: "14px",
      border: "1px solid rgba(17,30,44,0.08)",
      boxShadow: "0 4px 18px rgba(0,0,0,0.05)",
      bgcolor: "#fff",
      cursor: "pointer",
    }}
  >
    <Cover blog={blog} sx={{ height: 170, flexShrink: 0 }} />

    <Box sx={{ p: 2.5, display: "flex", flexDirection: "column", flexGrow: 1 }}>
      <Box><CategoryPill>{blog.category || "General"}</CategoryPill></Box>

      <Typography
        component="h3"
        sx={{
          mt: 1.5,
          fontSize: "1.02rem",
          fontWeight: 700,
          lineHeight: 1.35,
          color: "primary.dark",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {blog.title}
      </Typography>

      <Typography
        sx={{
          mt: 1,
          fontSize: "0.82rem",
          lineHeight: 1.65,
          color: "text.secondary",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {getExcerpt(blog, 110)}
      </Typography>

      <Box sx={{ mt: "auto", pt: 2, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 1 }}>
        <Meta blog={blog} />
        <CircleArrow size={32} />
      </Box>
    </Box>
  </Box>
);

export default BlogCard;