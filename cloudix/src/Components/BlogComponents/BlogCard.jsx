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