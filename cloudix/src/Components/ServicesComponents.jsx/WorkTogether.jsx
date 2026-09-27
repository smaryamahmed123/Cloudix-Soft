import React from "react";
import { Box, Container, Typography, Button, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import GradientButton from "../GradientButton";
import WorkTogetherImg from "../../assets/workTogether.webp";

const WorkTogether = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box component="section" sx={{ bgcolor: "background.paper", py: { xs: 6, md: 9 } }}>
      <Container maxWidth="lg">
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1.2fr" }, gap: { xs: 4, md: 8 }, alignItems: "center" }}>
          <Box>
            <Typography variant="subtitle2" sx={{ color: "primary.main", fontWeight: 600, mb: 1 }}>
              Let's talk
            </Typography>
            <Typography component="h2" variant="h3" sx={{ color: "primary.dark", fontWeight: 700, mb: 2 }}>
              Let's Work Together
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, maxWidth: 440, lineHeight: 1.8 }}>
              Ready to bring your ideas to life? Let's create something amazing together.
              Get in touch today and take the first step towards your digital success.
            </Typography>
            <GradientButton
              text="Contact us Today"
              onClick={() => navigate("/contact")}
            />
          </Box>

          <Box
            component="img"
            src={WorkTogetherImg}
            alt="Team working together on a laptop"
            loading="lazy"
            sx={{ width: "100%", height: { xs: 240, md: 320 }, objectFit: "cover", borderRadius: 3, boxShadow: "0 12px 32px rgba(17,30,44,0.18)" }}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default WorkTogether;