import { Box, Typography, Container, Stack, useTheme } from "@mui/material";
import GradientButton from "../GradientButton";
import { motion as Motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const PortfolioSection3 = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  // The new design shows the contact form living on this same page
  // ("Send Us a Message" section right below this CTA), so this scrolls
  // to it instead of navigating to a separate /contact route.
  // If /contact is still a real standalone page, swap this back to
  // useNavigate() + navigate("/contact").
  const scrollToContact = () => {
    document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Box
      component="section"
      role="region"
      aria-label="Call to action"
      sx={{
        bgcolor: theme.palette.primary.dark,
        color: theme.palette.common.white,
        py: { xs: 6, md: 8 },
        position: "relative",
        overflow: "hidden",
        isolation: "isolate",
      }}
    >
      {/* Subtle static glow, replacing the old pulsing circle — the new
          mockup doesn't show an animated shape here */}
      <Box
        aria-hidden="true"
        sx={{
          position: "absolute",
          top: "-140px",
          right: "-140px",
          width: 360,
          height: 360,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${theme.palette.accent.sectionDivider}22 0%, transparent 70%)`,
          zIndex: 0,
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", md: "center" }}
          spacing={{ xs: 4, md: 3 }}
        >
          <Motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1.5 }}>
              <Box sx={{ width: 24, height: 2, bgcolor: theme.palette.accent.light }} />
              <Typography
                variant="overline"
                sx={{
                  color: theme.palette.accent.light,
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                }}
              >
                LET'S WORK TOGETHER
              </Typography>
            </Stack>

            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                color: theme.palette.common.white,
                mb: 1.5,
              }}
            >
              We Are Waiting to Hear From You!
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: theme.palette.text.secondary,
                maxWidth: 480,
              }}
            >
              Have a project in mind? Let's talk. We'd love to help you turn
              your ideas into reality.
            </Typography>
          </Motion.div>

          <Motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ flexShrink: 0 }}
          >
            <GradientButton
              text="Send a Message"
              onClick={scrollToContact}
              aria-label="Send a message"
            />
          </Motion.div>
        </Stack>
      </Container>
    </Box>
  );
};

export default PortfolioSection3;