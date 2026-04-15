import React from "react";
import { Box, Typography, Container, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import SectionImage from "../SectionImage";
import WorkTogetherImg from "../../assets/workTogether.png";

const MotionBox = motion(Box);

const WorkTogether = () => {
  const theme = useTheme();

  return (
    <MotionBox
      component="section"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
      sx={{
        backgroundColor: "#111E2C",
        color: "#fff",
        py: { xs: 6, md: 10 },
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            gap: { xs: 5, md: 10 },
          }}
        >
          {/* LEFT */}
          <Box flex={1}>
            <Typography
              variant="h3"
              sx={{
                mb: { xs: 2, md: 3 },
                lineHeight: 1.2,
                fontWeight: 800,
                color: "#d0d0d0",
              }}
            >
              Let’s Work Together
            </Typography>

            <Typography
              variant="body1"
              sx={{
                mb: { xs: 3, md: 4 },
                lineHeight: 1.7,
                maxWidth: "520px",
                textAlign: "justify",
                color: "#d0d0d0",
              }}
            >
              At Cloudix Soft, we’re passionate about helping businesses grow in
              the digital world. Whether you need a modern website, a stronger
              digital marketing strategy, or a custom software solution, our team
              has the skills and experience to make it happen.
            </Typography>

            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: "#A9B838",
                lineHeight: 1.6,
              }}
            >
              Ready to take your business to the next level? <br />
              Let’s connect and make it happen together.
            </Typography>
          </Box>

          {/* RIGHT */}
          <SectionImage
            src={WorkTogetherImg}
            alt="Work Together"
            accentColor={theme.palette.primary.light}
            direction="right"
            delay={0.5}
          />
        </Box>
      </Container>
    </MotionBox>
  );
};

export default WorkTogether;
