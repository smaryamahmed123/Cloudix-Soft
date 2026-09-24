import React from "react";
import { Box, Button, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

/* ---------- data helpers ---------- */
const decode = (s) => {
  const t = document.createElement("textarea");
  t.innerHTML = s;
  return t.value;
};

// Content is stored as (sometimes escaped) HTML: decode, strip tags, decode again.
export const stripHtml = (html = "") =>
  decode(decode(html).replace(/<[^>]*>/g, " ")).replace(/\s+/g, " ").trim();

export const getExcerpt = (blog, len = 120) => {
  const text = blog.excerpt || stripHtml(blog.content);
  return text.length > len ? text.slice(0, len).trimEnd() + "…" : text;
};

export const getImage = (blog) => blog.coverImage || blog.image || "";

export const readTime = (blog) =>
  Math.max(1, Math.ceil(stripHtml(blog.content).split(" ").length / 200));

export const formatDate = (d) =>
  d
    ? new Date(d).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "";

/* ---------- shared UI ---------- */
export const CircleArrow = ({ size = 34 }) => (
  <Box
    sx={{
      width: size,
      height: size,
      borderRadius: "50%",
      bgcolor: "primary.main",
      color: "#fff",
      display: "grid",
      placeItems: "center",
      flexShrink: 0,
    }}
  >
    <ArrowForwardIcon sx={{ fontSize: size * 0.5 }} />
  </Box>
);

export const CategoryPill = ({ children }) => (
  <Box
    component="span"
    sx={{
      display: "inline-block",
      px: 1.3,
      py: 0.35,
      borderRadius: "6px",
      bgcolor: "primary.main",
      color: "#fff",
      fontSize: "0.68rem",
      fontWeight: 600,
    }}
  >
    {children}
  </Box>
);

export const Meta = ({ blog, light = false }) => (
  <Box
    sx={{
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      gap: 2,
      fontSize: "0.72rem",
      color: light ? "rgba(255,255,255,0.75)" : "text.secondary",
    }}
  >
    <Box sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
      <CalendarTodayOutlinedIcon sx={{ fontSize: 14 }} />
      {formatDate(blog.createdAt)}
    </Box>
    <Box sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
      <AccessTimeIcon sx={{ fontSize: 14 }} />
      {readTime(blog)} min read
    </Box>
  </Box>
);

// Image with gradient fallback if the URL is missing/broken
export const Cover = ({ blog, sx }) => {
  const src = getImage(blog);
  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(135deg,#1d3448,#111E2C)",
        ...sx,
      }}
    >
      {src && (
        <Box
          component="img"
          src={src}
          alt={blog.title}
          loading="lazy"
          onError={(e) => (e.currentTarget.style.visibility = "hidden")}
          sx={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      )}
    </Box>
  );
};

export const SectionHeading = ({ title, large = false, onAction, actionLabel = "View All Articles" }) => (
  <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
    <Box sx={{ width: 32, height: 3, bgcolor: "primary.main", borderRadius: 2 }} />
    <Typography
      component="h2"
      sx={{
        fontWeight: 800,
        color: "primary.dark",
        textTransform: "uppercase",
        letterSpacing: 1.2,
        fontSize: large ? { xs: "1.25rem", md: "1.5rem" } : "0.8rem",
      }}
    >
      {title}
    </Typography>
    <Box sx={{ flex: 1, height: "1px", bgcolor: "divider" }} />
    {onAction && (
      <Button
        onClick={onAction}
        endIcon={<ArrowForwardIcon sx={{ fontSize: 14 }} />}
        sx={{ textTransform: "none", fontSize: "0.75rem", color: "primary.main", minWidth: "auto" }}
      >
        {actionLabel}
      </Button>
    )}
  </Box>
);