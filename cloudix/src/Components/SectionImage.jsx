import { Box } from "@mui/material";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const SectionImage = ({
  src,
  alt = "",
  accentColor = "#A9B838",
  direction = "right",
  delay = 0.5,
}) => {
  return (
    <MotionBox
      initial={{ opacity: 0, x: direction === "right" ? 50 : -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      viewport={{ once: true }}
      sx={{
        flex: 1,
        maxWidth: { xs: "100%", md: "50%" },
        position: "relative",
        display: "inline-block",
        width: "100%",

        "&::before, &::after": {
          content: '""',
          position: "absolute",
          width: 40,
          height: 40,
          border: `2px solid ${accentColor}`,
          zIndex: 2,
          pointerEvents: "none",
        },
        "&::before": {
          top: -10,
          left: -10,
          borderRight: "none",
          borderBottom: "none",
          borderRadius: "4px 0 0 0",
        },
        "&::after": {
          bottom: -10,
          right: -10,
          borderLeft: "none",
          borderTop: "none",
          borderRadius: "0 0 4px 0",
        },
      }}
    >
      <MotionBox
        component="img"
        src={src}
        alt={alt}
        loading="lazy"
        whileHover={{ scale: 1.04 }}
        transition={{ duration: 0.4 }}
        sx={{
          width: "100%",
          height: "auto",
          display: "block",
          borderRadius: 3,
          boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
        }}
      />
    </MotionBox>
  );
};

export default SectionImage;
