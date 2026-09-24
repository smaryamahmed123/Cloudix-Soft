import React from "react";
import { Box, Container, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

const steps = [
  { Icon: SearchIcon, title: "Discover", text: "We understand your business, goals and unique needs." },
  { Icon: MapOutlinedIcon, title: "Strategy", text: "We create a clear plan with the right approach and solution." },
  { Icon: EditOutlinedIcon, title: "Create", text: "Our team designs, develops and delivers with precision." },
  { Icon: TrendingUpIcon, title: "Grow", text: "We optimize, support and help you achieve long-term success." },
];

const ProcessSection = () => (
  <Box component="section" sx={{ bgcolor: "background.paper", py: { xs: 6, md: 9 } }}>
    <Container maxWidth="lg">
      <Typography variant="subtitle2" sx={{ color: "primary.main", fontWeight: 600, mb: 1 }}>
        Our approach
      </Typography>
      <Typography component="h2" variant="h3" sx={{ color: "primary.dark", fontWeight: 700, mb: 1 }}>
        Our Process
      </Typography>
      <Typography variant="body1" sx={{ mb: 6 }}>
        A simple and effective process to turn your ideas into real results.
      </Typography>

      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }, gap: 4 }}>
        {steps.map(({ Icon, title, text }, i) => (
          <Box key={title} sx={{ textAlign: "center", position: "relative" }}>
            {/* connector line between steps */}
            {i < steps.length - 1 && (
              <Box sx={{ display: { xs: "none", md: "block" }, position: "absolute", top: 36, left: "calc(50% + 50px)", width: "calc(100% - 100px)", borderTop: "2px dashed", borderColor: "accent.light", opacity: 0.6 }} />
            )}
            <Box sx={{ width: 72, height: 72, mx: "auto", mb: 2, borderRadius: "50%", bgcolor: "primary.main", color: "#fff", display: "grid", placeItems: "center", position: "relative", zIndex: 1 }}>
              <Icon fontSize="large" />
            </Box>
            <Typography variant="subtitle2" sx={{ color: "primary.main", fontWeight: 700 }}>
              {String(i + 1).padStart(2, "0")}
            </Typography>
            <Typography variant="h6" sx={{ color: "primary.dark", mb: 1 }}>{title}</Typography>
            <Typography variant="body2" sx={{ color: "text.secondary", maxWidth: 220, mx: "auto", lineHeight: 1.7 }}>
              {text}
            </Typography>
          </Box>
        ))}
      </Box>
    </Container>
  </Box>
);

export default ProcessSection;