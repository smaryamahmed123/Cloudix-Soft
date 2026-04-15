import { Box, Typography, Container, useTheme } from "@mui/material";
import GradientButton from "../GradientButton";
import { useNavigate } from "react-router-dom";
import { motion as Motion } from "framer-motion";

const PortfolioSection3 = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Box
      component="section"
      role="region"
      aria-label="Call to action"
      sx={{
        bgcolor: theme.palette.primary.dark,
        color: theme.palette.common.white,
        textAlign: "center",
        py: { xs: 6, md: 10 },
        position: "relative",
        overflow: "hidden",
        isolation: "isolate",
      }}
    >
      {/* Animated Background Circle */}
      <Motion.div
        aria-hidden="true"
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: [0.85, 1.1, 0.85], opacity: 0.2 }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: "-120px",
          right: "-120px",
          width: "300px",
          height: "300px",
          border: `1px solid ${theme.palette.accent.sectionDivider}33`,
          borderRadius: "50%",
          zIndex: 0,
          willChange: "transform, opacity",
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        {/* Heading */}
        <Motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              letterSpacing: "0.5px",
              color: theme.palette.common.white,
              // ✅ theme responsiveFontSizes handles size automatically
            }}
          >
            We Are Waiting to Hear From You!
          </Typography>
        </Motion.div>

        {/* Subheading */}
        <Motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.25 }}
        >
          <Typography
            variant="body1"
            sx={{
              fontWeight: 600,
              mt: 2,
              mb: 8,
              letterSpacing: "0.4px",
              color: theme.palette.accent.light,
              // ✅ theme responsiveFontSizes handles size automatically
            }}
          >
            Don't beat around the bush. Tell us about your project.
          </Typography>
        </Motion.div>

        {/* Button */}
        <Motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.45 }}
        >
          <GradientButton
            text="Contact Us Today!"
            onClick={() => navigate("/contact")}
            aria-label="Contact us"
          />
        </Motion.div>
      </Container>
    </Box>
  );
};

export default PortfolioSection3;
