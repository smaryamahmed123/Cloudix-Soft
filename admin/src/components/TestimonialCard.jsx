import React from "react";

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  IconButton,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import StarIcon from "@mui/icons-material/Star";

export default function TestimonialCard({
  testimonial,
  onDelete,
}) {
  return (
    <Card
      sx={{
        height: "100%",
        borderRadius: 3,
        overflow: "hidden",
        boxShadow: 3,
      }}
    >
      {/* Video */}

      {testimonial.type === "video" &&
        testimonial.video && (
          <Box
            sx={{
              position: "relative",
              backgroundColor: "#111E2C",
            }}
          >
            <video
              src={testimonial.video}
              controls
              preload="metadata"
              style={{
                width: "100%",
                display: "block",
                maxHeight: 250,
              }}
            />
          </Box>
        )}

      {/* Client image */}

      {testimonial.clientImage && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            pt: 3,
          }}
        >
          <CardMedia
            component="img"
            image={testimonial.clientImage}
            alt={testimonial.clientName}
            sx={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        </Box>
      )}

      <CardContent>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Chip
            size="small"
            icon={
              testimonial.type ===
              "video" ? (
                <PlayCircleOutlineIcon />
              ) : undefined
            }
            label={
              testimonial.type ===
              "video"
                ? "Video"
                : "Text"
            }
          />

          <IconButton
            color="error"
            onClick={() =>
              onDelete(testimonial._id)
            }
          >
            <DeleteIcon />
          </IconButton>
        </Box>

        <Typography
          variant="h6"
          fontWeight={700}
          mt={2}
        >
          {testimonial.clientName}
        </Typography>

        {testimonial.position && (
          <Typography
            variant="body2"
            color="text.secondary"
          >
            {testimonial.position}
          </Typography>
        )}

        {testimonial.companyName && (
          <Typography
            variant="body2"
            color="text.secondary"
          >
            {testimonial.companyName}
          </Typography>
        )}

        <Box mt={1}>
          <Box
            display="flex"
            alignItems="center"
            gap={0.5}
          >
            <StarIcon
              sx={{
                fontSize: 18,
                color: "#BBBF19",
              }}
            />

            <Typography>
              {testimonial.rating}/5
            </Typography>
          </Box>
        </Box>

        <Typography
          sx={{
            mt: 2,
            color: "text.secondary",
          }}
        >
          "{testimonial.text}"
        </Typography>

        <Box
          display="flex"
          gap={1}
          mt={2}
        >
          <Chip
            size="small"
            label={
              testimonial.isPublished
                ? "Published"
                : "Hidden"
            }
            color={
              testimonial.isPublished
                ? "success"
                : "default"
            }
          />

          {testimonial.isFeatured && (
            <Chip
              size="small"
              label="Featured"
              color="primary"
            />
          )}
        </Box>
      </CardContent>
    </Card>
  );
}