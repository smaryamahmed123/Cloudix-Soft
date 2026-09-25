import React from "react";
import { Box, Typography, Container, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import GradientButton from "../GradientButton";


const MissionSection = () => {
  const navigate = useNavigate();
  return (
    <Box component="section" sx={{ bgcolor: "background.paper", py: { xs: 6, md: 8 }, textAlign: "center" }}>
      <Container maxWidth="lg">
        <Typography variant="subtitle2" sx={{ color: "primary.main", fontWeight: 600, mb: 1 }}>
          Our mission
        </Typography>
        <Typography component="h2" variant="h3" sx={{ color: "primary.dark", fontWeight: 700, mb: 1 }}>
          Your Growth, Our Mission
        </Typography>
        <Typography variant="h6" sx={{ color: "text.secondary", fontWeight: 400, mb: 4 }}>
          We are ready to boost your business
        </Typography>
        {/* <Button
          variant="contained"
          onClick={() => navigate("/contact")}
          sx={{ bgcolor: "accent.main", color: "primary.dark", borderRadius: 99, px: 3.5, py: 1.2, boxShadow: "none", "&:hover": { bgcolor: "accent.light", boxShadow: "none" } }}
        >
          Contact us today
        </Button> */}
        <GradientButton
          text="Contact Us Today"
          onClick={() => navigate("/contact")}
        />
      </Container>
    </Box>
  );
};

export default MissionSection;