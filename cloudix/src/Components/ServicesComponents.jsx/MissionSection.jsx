import React from "react";
import { Box, Typography, Container } from "@mui/material";
import GradientButton from "../GradientButton";
import DecorativeCircle from "../DecorativeCircle";
import { useNavigate } from "react-router-dom";
import { motion as Motion } from "framer-motion"; // 👈 Import framer-motion

const MissionSection = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        py: { xs: 8, md: 12 },
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ✅ Animated Decorative Circles */}
      <Motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
        style={{ position: "absolute" }}
      >
        <DecorativeCircle
          size={{ xs: 250, sm: 350, md: 400, lg: 500 }}
          borderColor="#111e2c22"
          innerSize={{ xs: 180, sm: 280, md: 320, lg: 420 }}
          innerBorderColor="#dadc6961"
          position={{ left: "-15%", top: "10%" }}
          zIndex={0}
        />
      </Motion.div>

      <Motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
        viewport={{ once: true }}
        style={{ position: "absolute" }}
      >
        <DecorativeCircle
          size={{ xs: 300, sm: 400, md: 450 }}
          borderColor="#E5E8C1"
          innerSize={{ xs: 220, sm: 320, md: 380 }}
          innerBorderColor="#C4C8CC"
          position={{ left: "-15%", top: "20%" }}
          zIndex={-1}
        />
      </Motion.div>

      <Container>
        {/* ✅ Animated Heading */}
        <Motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              color: "#111E2C",
              mb: 2,
              textDecoration: "underline",
              textDecorationThickness: "3px",
            }}
          >
            Your Growth, Our Mission
          </Typography>
        </Motion.div>

        {/* ✅ Animated Subtitle */}
        <Motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Typography
            variant="h5"
            sx={{
              color: "#A9B23E",
              mb: 4,
            }}
          >
            We are Ready to Boost Your Business
          </Typography>
        </Motion.div>

        {/* ✅ Animated Button */}
        <Motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.4 }}
          viewport={{ once: true }}
        >
          <GradientButton
            text="Contact Us Today!"
            onClick={() => navigate("/contact")}
          />
        </Motion.div>
      </Container>
    </Box>
  );
};

export default MissionSection;
