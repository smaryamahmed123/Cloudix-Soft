import React from "react";
import { Box } from "@mui/material";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

/**
 * variant="corners" (default): the original look, accent brackets on two corners.
 * variant="offset": rounded image with a solid accent block offset behind it
 *                   (bottom-left), as in the About section.
 */
const SectionImage = ({
  src,
  alt = "",
  accentColor = "#A9B838",
  direction = "right",
  delay = 0.5,
  variant = "corners",
}) => {
  const isOffset = variant === "offset";

  return (
    <MotionBox
      initial={{ opacity: 0, x: direction === "right" ? 50 : -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      viewport={{ once: true }}
      sx={{
        flex: 1,
        maxWidth: { xs: "100%", md: "50%" },
        width: "100%",
        // room for the offset block so it never spills outside the column
        ...(isOffset && { pl: { xs: 1.5, md: 2.5 }, pb: { xs: 1.5, md: 2.5 } }),
      }}
    >
      {isOffset ? (
        <MotionBox
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 100 }}
          sx={{ position: "relative" }}
        >
          <Box
            aria-hidden
            sx={{
              position: "absolute",
              inset: 0,
              borderRadius: { xs: "18px", md: "24px" },
              backgroundColor: accentColor,
              transform: {
                xs: "translate(-12px, 12px)",
                md: "translate(-20px, 20px)",
              },
            }}
          />
          <Box
            sx={{
              position: "relative",
              borderRadius: { xs: "18px", md: "24px" },
              overflow: "hidden",
              aspectRatio: "4 / 3",
              boxShadow: "0 18px 40px rgba(17,30,44,0.12)",
            }}
          >
            <Box
              component="img"
              src={src}
              alt={alt}
              loading="lazy"
              sx={{
                width: "100%",
                height: "100%",
                display: "block",
                objectFit: "cover",
              }}
            />
          </Box>
        </MotionBox>
      ) : (
        <MotionBox
          whileHover={{ scale: 1.04 }}
          transition={{ type: "spring", stiffness: 100 }}
          sx={{
            position: "relative",
            display: "inline-block",
            width: "100%",
            borderRadius: "35px",
            overflow: "hidden",
            "&::before, &::after": {
              content: '""',
              position: "absolute",
              width: "50%",
              height: "50%",
              border: `5px solid ${accentColor}`,
              zIndex: 2,
              pointerEvents: "none",
            },
            "&::before": {
              top: 0,
              left: 0,
              borderRight: "none",
              borderBottom: "none",
              borderRadius: "35px 0 0 0",
            },
            "&::after": {
              bottom: 0,
              right: 0,
              borderLeft: "none",
              borderTop: "none",
              borderRadius: "0 0 35px 0",
            },
          }}
        >
          <Box
            component="img"
            src={src}
            alt={alt}
            loading="lazy"
            sx={{ width: "100%", height: "auto", display: "block" }}
          />
        </MotionBox>
      )}
    </MotionBox>
  );
};

export default SectionImage;