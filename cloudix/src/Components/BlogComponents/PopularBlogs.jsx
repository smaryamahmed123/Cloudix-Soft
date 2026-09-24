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