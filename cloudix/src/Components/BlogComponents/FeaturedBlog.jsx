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