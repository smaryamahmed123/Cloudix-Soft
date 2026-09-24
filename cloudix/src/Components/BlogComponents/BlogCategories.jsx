import React from "react";
import { Box, ButtonBase } from "@mui/material";

// Not in the mockup, kept so category filtering isn't lost. Compact, non-sticky.
const BlogCategories = ({ categories, selected, onSelect }) => (
  <Box sx={{ display: "flex", gap: 1, overflowX: "auto", pb: 1, mb: 3, scrollbarWidth: "none", "&::-webkit-scrollbar": { display: "none" } }}>
    {categories.map((c) => {
      const active = selected === c;
      return (
        <ButtonBase
          key={c}
          onClick={() => onSelect(c)}
          sx={{
            flexShrink: 0,
            px: 1.8,
            py: 0.6,
            borderRadius: "999px",
            fontSize: "0.78rem",
            fontWeight: 600,
            fontFamily: "inherit",
            border: "1px solid",
            borderColor: active ? "primary.main" : "divider",
            bgcolor: active ? "primary.main" : "transparent",
            color: active ? "#fff" : "primary.dark",
            "&:hover": { bgcolor: active ? "primary.main" : "rgba(118,153,20,0.08)" },
          }}
        >
          {c}
        </ButtonBase>
      );
    })}
  </Box>
);

export default BlogCategories;