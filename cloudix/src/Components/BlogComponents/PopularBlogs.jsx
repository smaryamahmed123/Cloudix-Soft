// import React from "react";
// import {
//   Box,
//   Typography,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemText,
//   Divider,
// } from "@mui/material";
// import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

// const PopularBlogs = ({ blogs, onClick }) => {
//   if (!blogs?.length) return null;

//   return (
//     <Box
//       sx={{
//         borderRadius: "18px",
//         backgroundColor: "#f7f8f4",
//         p: { xs: 2.5, md: 3 },
//       }}
//     >
//       <Typography
//         variant="h6"
//         sx={{
//           fontWeight: 800,
//           color: "#111E2C",
//           mb: 1,
//         }}
//       >
//         Editor's Picks
//       </Typography>

//       <Typography
//         variant="body2"
//         color="text.secondary"
//         sx={{ mb: 1 }}
//       >
//         Useful reads from the Cloudix Soft team.
//       </Typography>

//       <List disablePadding>
//         {blogs.slice(0, 4).map((blog, index) => (
//           <React.Fragment key={blog._id}>
//             <ListItem disablePadding>
//               <ListItemButton
//                 onClick={() => onClick(blog)}
//                 sx={{
//                   px: 0,
//                   py: 1.5,
//                   "&:hover": {
//                     backgroundColor: "transparent",
//                   },
//                 }}
//               >
//                 <Box
//                   sx={{
//                     minWidth: 35,
//                     fontSize: "0.8rem",
//                     fontWeight: 800,
//                     color: "#769914",
//                   }}
//                 >
//                   0{index + 1}
//                 </Box>

//                 <ListItemText
//                   primary={blog.title}
//                   secondary={blog.category || "General"}
//                   primaryTypographyProps={{
//                     fontWeight: 650,
//                     fontSize: "0.9rem",
//                     color: "#111E2C",
//                   }}
//                   secondaryTypographyProps={{
//                     fontSize: "0.72rem",
//                     sx: { mt: 0.4 },
//                   }}
//                 />

//                 <ArrowForwardIosIcon
//                   sx={{
//                     fontSize: 14,
//                     color: "#769914",
//                   }}
//                 />
//               </ListItemButton>
//             </ListItem>

//             {index < Math.min(blogs.length, 4) - 1 && <Divider />}
//           </React.Fragment>
//         ))}
//       </List>
//     </Box>
//   );
// };

// export default PopularBlogs;

import React from "react";
import { Box, Typography } from "@mui/material";
import { CircleArrow, Cover, formatDate } from "./BlogShared";

const PopularBlogs = ({ blogs, onClick }) => {
  if (!blogs?.length) return null;
  const picks = blogs.slice(0, 4);

  return (
    <Box sx={{ height: "100%", borderRadius: "16px", border: "1px solid rgba(17,30,44,0.08)", bgcolor: "#fff", overflow: "hidden" }}>
      <Box sx={{ px: 3, py: 2, display: "flex", alignItems: "center", gap: 1.5, bgcolor: "background.subtle" }}>
        <Box sx={{ width: 24, height: 3, bgcolor: "primary.main", borderRadius: 2 }} />
        <Typography component="h3" sx={{ fontWeight: 800, fontSize: "0.8rem", letterSpacing: 1.2, color: "primary.dark" }}>
          EDITOR'S PICKS
        </Typography>
      </Box>

      {picks.map((blog, i) => (
        <Box
          key={blog._id}
          onClick={() => onClick(blog)}
          sx={{
            px: 3, py: 1.6, display: "flex", alignItems: "center", gap: 2, cursor: "pointer",
            borderTop: i ? "1px solid" : "none", borderColor: "divider",
            "&:hover": { bgcolor: "background.subtle" },
          }}
        >
          <Cover blog={blog} sx={{ width: 64, height: 50, borderRadius: "8px", flexShrink: 0 }} />
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              sx={{
                fontSize: "0.85rem", fontWeight: 650, lineHeight: 1.35, color: "primary.dark",
                display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
              }}
            >
              {blog.title}
            </Typography>
            <Typography sx={{ mt: 0.4, fontSize: "0.7rem", color: "text.secondary" }}>
              {formatDate(blog.createdAt)}
            </Typography>
          </Box>
          <CircleArrow size={24} />
        </Box>
      ))}
    </Box>
  );
};

export default PopularBlogs;