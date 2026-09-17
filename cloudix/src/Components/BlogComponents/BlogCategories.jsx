import React from "react";
import {
  Box,
  Button,
  Container,
} from "@mui/material";

const BlogCategories = ({ categories, selected, onSelect }) => {
  return (
    <Box
      sx={{
        borderBottom: "1px solid",
        borderColor: "divider",
        backgroundColor: "#fff",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            gap: 1,
            overflowX: "auto",
            py: 1.5,
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => onSelect(category)}
              variant={selected === category ? "contained" : "text"}
              sx={{
                flexShrink: 0,
                borderRadius: "999px",
                px: 2.5,
                textTransform: "none",
                fontWeight: 600,
                color:
                  selected === category ? "#fff" : "#111E2C",
                backgroundColor:
                  selected === category ? "#769914" : "transparent",
                "&:hover": {
                  backgroundColor:
                    selected === category
                      ? "#5f7d10"
                      : "rgba(118,153,20,0.08)",
                },
              }}
            >
              {category}
            </Button>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default BlogCategories;