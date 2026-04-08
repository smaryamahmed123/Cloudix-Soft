import React from "react";
import { Box, Typography, Container, useTheme, useMediaQuery } from "@mui/material";
import { motion } from "framer-motion";
import ShariahImage from "../../assets/Shariah-compliance.png"; // fallback

const MotionBox = motion(Box);
const MotionImg = motion("img");

const CommitmentSection = ({ compliance }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  if (!compliance) return null;

  const backendURL = import.meta.env.VITE_BACKEND_URL || "";
  const imageSrc = compliance.image
    ? compliance.image.startsWith("http")
      ? compliance.image
      : `${backendURL}${compliance.image}`
    : ShariahImage;

  return (
    <MotionBox
      component="section"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      sx={{
        py: { xs: theme.spacing(2), md: theme.spacing(6) },
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        overflowX: "hidden",
      }}
    >
      <Container maxWidth="lg">
        {/* Section Heading */}
        <MotionBox
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          sx={{ mb: theme.spacing(3), textAlign: "center" }}
        >
          <Typography
            component={motion.h3}
            variant="h3"
            sx={{
              fontWeight: theme.typography.fontWeightBold,
              lineHeight: 1.3,
              textDecoration: "underline",
              color: theme.palette.text.primary,
            }}
          >
            {compliance.title}
          </Typography>
        </MotionBox>

        {/* Paragraph + Image Row */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: "center",
            gap: theme.spacing(6),
            width: "100%",
          }}
        >
          {/* Left: Paragraph */}
          <MotionBox
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            sx={{
              flex: 1,
              maxWidth: { xs: "100%", md: "50%" },
              textAlign: { xs: "center", md: "left" },
            }}
          >
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: "1rem", md: "1.3rem" },
                lineHeight: 1.8,
                color: theme.palette.text.primary,
                mb: theme.spacing(4),
                textAlign: "justify",
                textJustify: "inter-word",
              }}
            >
              {compliance.description}
            </Typography>
          </MotionBox>

          {/* Right: Image */}
           {/* <MotionBox */}
            {/* initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            viewport={{ once: true }}
            sx={{
              flex: 1,
              maxWidth: { xs: "100%", md: "50%" },
              position: "relative",
              display: "flex",
              justifyContent: "center",
              overflow: "hidden",
              borderRadius: theme.shape.borderRadius,
              "&::before, &::after": {
                content: '""',
                position: "absolute",
                width: "50%",
                height: "50%",
                border: `5px solid ${theme.palette.text.primary}`, */}
              {/* },  */}
              // "&::before": { top: 0, left: 0, borderRight: "none", borderBottom: "none" },
              // "&::after": { bottom: 0, right: 0, borderLeft: "none", borderTop: "none" },
//                  "&::before": {
//   top: 0,
//   left: 0,
//   borderRight: "none",
//   borderBottom: "none",
//   borderRadius: `${theme.shape.borderRadius}px 0 0 0`, // ✅ sirf top-left
// },
// "&::after": {
//   bottom: 0,
//   right: 0,
//   borderLeft: "none",
//   borderTop: "none",
//   borderRadius: `0 0 ${theme.shape.borderRadius}px 0`, // ✅ sirf bottom-right
// },
//             }}
          // >
          //   <MotionImg
          //     src={imageSrc}
          //     alt={compliance.title || "Shariah Compliance"}
          //     whileHover={{ scale: 1.05 }}
          //     transition={{ duration: 0.4 }}
          //     loading="lazy"
          //     style={{
          //       width: "100%",
          //       maxHeight: isMobile ? "300px" : "100%",
          //       objectFit: "cover",
          //       borderRadius: theme.shape.borderRadius,
          //       boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
          //     }}
          //   />
          // </MotionBox>
  <Box sx={{ position: "relative", flex: 1, maxWidth: { xs: "100%", md: "50%" } }}>
  {/* Corners wrapper — no overflow hidden */}
  <Box sx={{
    position: "absolute", inset: 0,
    pointerEvents: "none",
    zIndex: 1,
    "&::before": {
      content: '""',
      position: "absolute",
      width: "50%",
      height: "50%",
      border: `5px solid ${theme.palette.text.primary}`,
      top: 0,
      left: 0,
      borderRight: "none",
      borderBottom: "none",
      borderRadius: `${theme.shape.borderRadius}px 0 0 0`,
    },
    "&::after": {
      content: '""',
      position: "absolute",
      width: "50%",
      height: "50%",
      border: `5px solid ${theme.palette.text.primary}`,
      bottom: 0,
      right: 0,
      borderLeft: "none",
      borderTop: "none",
      borderRadius: `0 0 ${theme.shape.borderRadius}px 0`,
    },
  }} />

  {/* Image box — overflow hidden for image clipping */}
  <MotionBox
    initial={{ opacity: 0, x: 50 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8, delay: 0.7 }}
    viewport={{ once: true }}
    sx={{
      width: "100%",
      overflow: "hidden",
      borderRadius: theme.shape.borderRadius,
      display: "flex",
      justifyContent: "center",
    }}
  >
    <MotionImg
      src={imageSrc}
      alt={compliance.title || "Shariah Compliance"}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.4 }}
      loading="lazy"
      style={{
        width: "100%",
        maxHeight: isMobile ? "300px" : "100%",
        objectFit: "cover",
        borderRadius: theme.shape.borderRadius,
        boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
      }}
    />
  </MotionBox>
</Box>
        </Box>
      </Container>
    </MotionBox>
  );
};

export default CommitmentSection;
