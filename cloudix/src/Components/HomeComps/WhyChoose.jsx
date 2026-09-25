import React, { memo } from "react";
import { Box, Container, Grid, Typography, useTheme } from "@mui/material";
import { motion as Motion, useReducedMotion } from "framer-motion";

import Check from "../../assets/Mask group.png";
import Light from "../../assets/Mask group (1).png";
import HandIcon from "../../assets/partnership.png";
import Integrity from "../../assets/Intigrity.png";
import Rocket from "../../assets/Together.png";

const FEATURES = [
  {
    icon: Check,
    alt: "Smart discovery icon",
    title: "Smart Discovery",
    description:
      "We take time to understand your goals and challenges so every solution is custom-engineered to your needs—not off-the-shelf templates.",
  },
  {
    icon: Light,
    alt: "Smart solutions icon",
    title: "Measurable Results",
    description:
      "Our focus is on delivering business value, optimized performance, and scalable code that drives real ROI.",
  },
  {
    icon: HandIcon,
    alt: "Strong partnership icon",
    title: "Dedicated Support",
    description:
      "We provide continuous maintenance, performance optimization, and long-term feature enhancements after project delivery.",
  },
  {
    icon: Integrity,
    alt: "Integrity icon",
    title: "Shariah-Compliant & Ethical",
    description:
      "We operate with 100% transparency: fixed pricing, no hidden costs, robust data privacy safeguards, and strict ethical business guidelines.",
  },
  {
    icon: Rocket,
    alt: "Growing together icon",
    title: "Long-Term Growth",
    description:
      "We build lasting relationships that scale alongside your expanding technical infrastructure and business needs.",
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

function WhyChooseUs() {
  const theme = useTheme();
  const prefersReducedMotion = useReducedMotion();

  return (
    <Container maxWidth="lg">
      <Box
        component="section"
        aria-labelledby="why-choose-us-heading"
        sx={{ py: { xs: 6, md: 10 }, textAlign: "center" }}
      >
        <Motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Typography
            id="why-choose-us-heading"
            component="h2"
            variant="h3"
            sx={{ mb: 2, color: theme.palette.primary.dark, fontWeight: 700 }}
          >
            Why Choose Cloudix Soft?
          </Typography>

          <Typography
            sx={{
              maxWidth: 720,
              mx: "auto",
              mb: 6,
              color: "text.secondary",
              fontSize: "1.05rem",
              lineHeight: 1.6,
            }}
          >
            Partnering with the right IT team determines your digital success. We deliver fast, secure, and ethical solutions engineered for growth.
          </Typography>
        </Motion.div>

        <Motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <Grid container spacing={4} justifyContent="center">
            {FEATURES.map((feature) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                key={feature.title}
                display="flex"
                justifyContent="center"
              >
                <Motion.div
                  variants={cardVariants}
                  whileHover={!prefersReducedMotion ? { scale: 1.03 } : undefined}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <Box
                    sx={{
                      p: 3,
                      maxWidth: 280,
                      textAlign: "center",
                    }}
                  >
                    <Box
                      sx={{
                        width: 90,
                        height: 90,
                        borderRadius: "50%",
                        mb: 2,
                        mx: "auto",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background:
                          "linear-gradient(#BBBF19, #BBBF19) padding-box, linear-gradient(to bottom, #111E2C, #A9B838) border-box",
                        border: "4px solid transparent",
                      }}
                    >
                      <Box
                        component="img"
                        src={feature.icon}
                        alt={feature.alt}
                        loading="lazy"
                        decoding="async"
                        width={60}
                        height={60}
                        sx={{ objectFit: "contain" }}
                      />
                    </Box>

                    <Typography
                      component="h3"
                      sx={{
                        fontWeight: 600,
                        color: "#A9B838",
                        mb: 1,
                        fontSize: "1.15rem",
                      }}
                    >
                      {feature.title}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary", lineHeight: 1.6 }}
                    >
                      {feature.description}
                    </Typography>
                  </Box>
                </Motion.div>
              </Grid>
            ))}
          </Grid>
        </Motion.div>
      </Box>
    </Container>
  );
}

export default memo(WhyChooseUs);
