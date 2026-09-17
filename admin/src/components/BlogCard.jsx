import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

export default function BlogCard({
  blog,
  onDelete,
}) {
  const theme = useTheme();

  return (
    <Card
      sx={{
        backgroundColor: "#fff",
        borderRadius: 3,
        overflow: "hidden",
        boxShadow:
          "0 5px 18px rgba(0,0,0,0.08)",
        transition: "transform 0.25s ease",
        "&:hover": {
          transform: "translateY(-4px)",
        },
      }}
    >
      {blog.image && (
        <Box
          component="img"
          src={blog.image}
          alt={blog.title}
          loading="lazy"
          sx={{
            width: "100%",
            height: 220,
            display: "block",
            objectFit: "cover",
          }}
        />
      )}

      <CardContent sx={{ p: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1.5,
          }}
        >
          <Chip
            label={
              blog.category ||
              "Uncategorized"
            }
            size="small"
            sx={{
              color: theme.palette.primary.main,
              backgroundColor:
                "rgba(118,153,20,0.1)",
              fontWeight: 600,
            }}
          />

          <DragIndicatorIcon
            sx={{
              color: "text.disabled",
            }}
          />
        </Box>

        <Typography
          variant="h6"
          sx={{
            color:
              theme.palette.primary.main,
            fontWeight: 700,
            mb: 1,
          }}
        >
          {blog.title || "No Title"}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 2,
            display: "-webkit-box",
            WebkitLineClamp: 4,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            lineHeight: 1.7,
          }}
        >
          {blog.content || "No Content"}
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent:
              "space-between",
            alignItems: "center",
            gap: 2,
            mb: 2,
          }}
        >
          <Box>
            <Typography
              variant="caption"
              sx={{
                display: "block",
                fontWeight: 600,
              }}
            >
              {blog.author ||
                "Unknown Author"}
            </Typography>

            <Typography
              variant="caption"
              color="text.secondary"
            >
              {blog.createdAt
                ? new Date(
                    blog.createdAt
                  ).toLocaleDateString()
                : ""}
            </Typography>
          </Box>

          <Typography
            variant="caption"
            color="text.secondary"
          >
            #{(blog.order ?? 0) + 1}
          </Typography>
        </Box>

        <Button
          variant="outlined"
          color="error"
          startIcon={
            <DeleteOutlineIcon />
          }
          onClick={() =>
            onDelete(blog._id)
          }
          sx={{
            borderRadius: "999px",
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          Delete
        </Button>
      </CardContent>
    </Card>
  );
}