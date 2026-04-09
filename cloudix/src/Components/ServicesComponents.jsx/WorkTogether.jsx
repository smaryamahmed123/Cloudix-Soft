import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { motion as Motion } from "framer-motion";
import WorkTogetherImg from "../../assets/workTogether.png";

// Animation Variants
const textVariants = {
  hidden: { opacity: 0, x: -50 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const paragraphVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.3 } },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.8, delay: 0.5 } },
};

const WorkTogether = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#111E2C",
        color: "#fff",
        py: { xs: 8, md: 12 },
        px: { xs: 3, md: 8 },
      }}
    >
      <Grid container spacing={6} sx={{ display: "flex", justifyContent: "center" }}>
        {/* Left Section */}
        <Grid sx={{ gridColumn: { xs: "span 12", md: "span 6" } }}>
          {/* Heading */}
          <Motion.div
            variants={textVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                mb: 2,
                lineHeight: 1.3,
                color: "#d0d0d0",
              }}
            >
              Let’s Work Together
            </Typography>
          </Motion.div>

          {/* Paragraph + Image */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "center",
              alignItems: "center",
              gap: 2,
              width: "100%",
              height: "100%",
            }}
          >
            {/* Paragraph Section */}
            <Motion.div
              variants={paragraphVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              style={{ flex: 1 }}
            >
              <Typography
                variant="body1"
                sx={{
                  fontSize: "1.5rem",
                  mb: 8,
                  color: "#d0d0d0",
                  maxWidth: "600px",
                  textAlign: "justify",
                }}
              >
                At Cloudix Soft, we’re passionate about helping businesses grow in
                the digital world. Whether you need a modern website, a stronger
                digital marketing strategy, or a custom software solution, our team
                has the skills and experience to make it happen. We don’t just
                deliver projects—we build solutions that bring real results.
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: "#A9B838",
                  fontSize: "1.5rem",
                  textAlign: "justify",
                }}
              >
                Ready to take your business to the next level? <br />
                Let’s connect and make it happen together.
              </Typography>
            </Motion.div>

            {/* Image with border effect */}
            <Motion.div
  variants={imageVariants}
  initial="hidden"
  whileInView="show"
  viewport={{ once: true }}
  whileHover={{ scale: 1.05 }}
  transition={{ type: "spring", stiffness: 100 }}
  style={{ maxWidth: "100%", position: "relative" }}
>
  <Box
    sx={{
      position: "relative",
      display: "inline-block",
      // ✅ NO overflow: hidden — was clipping the brackets
      // ✅ padding creates space for brackets to sit outside the image
      padding: "12px",
      maxWidth: { xs: "100%", md: "50%", lg: "100%" },

      "&::before, &::after": {
        content: '""',
        position: "absolute",
        width: 44,          // ✅ fixed px — not 50% (which scales with image)
        height: 44,
        border: "3px solid #A9B838",
        pointerEvents: "none",
        zIndex: 2,
      },
      "&::before": {
        top: 0,
        left: 0,
        borderRight: "none",
        borderBottom: "none",
        borderRadius: "3px 0 0 0",
      },
      "&::after": {
        bottom: 0,
        right: 0,
        borderLeft: "none",
        borderTop: "none",
        borderRadius: "0 0 3px 0",
      },
    }}
  >
   <Box
    component="img"
    src={WorkTogetherImg}
    alt="Work Together"
    loading="lazy"
    sx={{
      width: "100%",
      height: "auto",
      display: "block",
      borderRadius: 2,
      boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
    }}
  />
              </Box>
            </Motion.div>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default WorkTogether;
