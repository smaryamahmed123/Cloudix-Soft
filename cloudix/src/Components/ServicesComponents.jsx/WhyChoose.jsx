import React from "react";
import { Box, Container, Typography } from "@mui/material";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import HandshakeOutlinedIcon from "@mui/icons-material/HandshakeOutlined";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";

const items = [
  { Icon: VerifiedUserOutlinedIcon, title: "Shariah-compliant business", text: "Operating with integrity, transparency and ethical practices." },
  { Icon: HandshakeOutlinedIcon, title: "On-time delivery", text: "We respect your time and deliver projects within the agreed timeline." },
  { Icon: SupportAgentIcon, title: "Dedicated support", text: "We're always here to support you before, during and after the project." },
];

const WhyChoose = () => (
  <Box component="section" sx={{ bgcolor: "primary.dark", color: "#fff", py: { xs: 6, md: 8 } }}>
    <Container maxWidth="lg">
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1.4fr" }, gap: { xs: 4, md: 6 }, alignItems: "center" }}>
        <Box>
          <Typography variant="subtitle2" sx={{ color: "accent.main", fontWeight: 600, mb: 1 }}>
            Why choose us
          </Typography>
          <Typography component="h2" variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
            Transparent &amp; Ethical Delivery Guaranteed
          </Typography>
          <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.85)", maxWidth: 420 }}>
            We believe in honest communication, fair pricing and delivering real value.
            Your trust matters to us.
          </Typography>
        </Box>

        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" }, gap: 3 }}>
          {items.map(({ Icon, title, text }) => (
            <Box key={title} sx={{ textAlign: "center", px: 2, borderLeft: { sm: "1px solid rgba(255,255,255,0.12)" } }}>
              <Icon sx={{ fontSize: 40, color: "accent.main", mb: 1.5 }} />
              <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>{title}</Typography>
              <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.75)", lineHeight: 1.7 }}>{text}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  </Box>
);

export default WhyChoose;