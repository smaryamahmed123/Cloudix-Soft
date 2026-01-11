import React from "react";
import { Box, Skeleton } from "@mui/material";

/**
 * CardSkeleton
 * Used as a placeholder while card content is loading
 */
const CardSkeleton = React.memo(function CardSkeleton({
  width = 260,
  height = 200,
  iconSize = 40,
  titleWidth = "80%",
  subtitleWidth = "60%",
}) {
  return (
    <Box
      role="status"
      aria-busy="true"
      aria-label="Loading content"
      data-testid="card-skeleton"
      sx={{
        width,
        height,
        m: 2,
        p: 3,
        borderRadius: 4,
        boxShadow: 6,
        bgcolor: "background.paper",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Icon placeholder */}
      <Skeleton variant="circular" width={iconSize} height={iconSize} />

      {/* Title */}
      <Skeleton width={titleWidth} height={30} sx={{ mt: 2 }} />

      {/* Subtitle */}
      <Skeleton width={subtitleWidth} height={20} />
    </Box>
  );
});

export default CardSkeleton;
