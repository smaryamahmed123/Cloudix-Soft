import React from "react";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function BlogCard({ blog, onDelete }) {
  const theme = useTheme();

  return (
    <Card
      sx={{
        backgroundColor: "#fff",
        borderRadius: 2,
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        transition: "transform 0.3s ease",
        "&:hover": { transform: "translateY(-5px)" },
      }}
    >
      {blog.image && (
        <img
          src={blog.image}
          alt={blog.title}
          style={{
            width: "100%",
            borderRadius: "8px 8px 0 0",
            objectFit: "cover",
            maxHeight: 250,
          }}
        />
      )}
      <CardContent>
        {/* Blog category */}
        <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, display: 'block' }}>
          {blog.category || "Uncategorized"}
        </Typography>

        {/* Blog title */}
        <Typography variant="h6" sx={{ color: theme.palette.primary.main, fontWeight: 'bold', mb: 1 }}>
          {blog.title || "No Title"}
        </Typography>

        {/* Blog content preview */}
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {blog.content || "No Content"}
        </Typography>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 1,
          }}
        >
          <Typography variant="caption" color="text.secondary">
            {blog.author || "Unknown Author"}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {new Date(blog.createdAt).toLocaleDateString()}
          </Typography>
        </Box>


        {/* Delete button */}
        <Button
          variant="outlined"
          color="error"
          onClick={() => onDelete(blog._id)}
          sx={{ mt: 2 }}
        >
          Delete
        </Button>
      </CardContent>
    </Card>
  );
}
