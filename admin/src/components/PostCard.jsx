import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTheme } from "@mui/material/styles";

export default function PostCard({ post, onDelete, loading }) {
  const theme = useTheme();

  return (
    <Card
      sx={{
        borderRadius: 2,
        boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
        transition: "transform 0.3s ease",
        "&:hover": { transform: "translateY(-5px)" },
      }}
    >
      <CardMedia
        component="img"
        image={post.image}
        alt={post.title}
        sx={{ height: 250, objectFit: "cover" }}
      />
      <CardContent
        sx={{
          textAlign: "center",
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{
            color: theme.palette.text.primary,
            fontWeight: 500,
          }}
        >
          {post.title}
        </Typography>
        <IconButton
          onClick={() => onDelete(post._id)}
          disabled={loading}
          sx={{
            color: theme.palette.error.main,
            "&:hover": {
              backgroundColor: `${theme.palette.error.main}15`, // subtle red hover
            },
          }}
        >
          <DeleteIcon />
        </IconButton>
      </CardContent>
    </Card>
  );
}
