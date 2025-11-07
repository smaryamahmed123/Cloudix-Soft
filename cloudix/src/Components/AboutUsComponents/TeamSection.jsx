import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { motion as Motion } from "framer-motion"; // ✅ renamed to Motion to avoid eslint warning
import TeamImage from "../../assets/teamwork.png"; // replace with your image path

const TeamSection = ({ teamIntro }) => {
  if (!teamIntro) return null;

  const imageSrc = teamIntro.image?.startsWith("http")
    ? teamIntro.image
    : `${teamIntro.image}`;

  return (
    <Box
      sx={{
        backgroundColor: "#111E2C",
        color: "#fff",
        py: { xs: 8, md: 12 },
        px: { xs: 3, md: 8 },
      }}
    >
      <Grid
        container
        spacing={6}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <Grid
          sx={{
            gridColumn: { xs: "span 12", md: "span 6" },
          }}
        >
          {/* ---- Animate Whole Row ---- */}
          <Motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                justifyContent: "center",
                alignItems: "flex-start",
                gap: 4,
                width: "100%",
                height: "100%",
              }}
            >
              {/* ---- Left: Text ---- */}
              <Motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                style={{ flex: 1, maxWidth: "600px" }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: { xs: "center", md: "center" },
                    textAlign: "center",
                  }}
                >
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: 800,
                      lineHeight: 1.3,
                      color: "#A9B838",
                      mb: 4,
                      textAlign: "center",
                    }}
                  >
                    {teamIntro.title}
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: "1.3rem",
                      mb: 6,
                      color: "#d0d0d0",
                      lineHeight: 1.8,
                      textAlign: "justify",
                    }}
                  >
                    {teamIntro.description}
                  </Typography>
                </Box>
              </Motion.div>

              {/* ---- Right: Image ---- */}
              <Motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                style={{ maxWidth: "100%" }}
              >
                <Box
                  sx={{
                    position: "relative",
                    display: "inline-block",
                    overflow: "hidden",
                    maxWidth: { xs: "100%", md: "100%", lg: "100%" },
                    "&::before, &::after": {
                      content: '""',
                      position: "absolute",
                      width: "50%",
                      height: "50%",
                      border: "5px solid #A9B838",
                    },
                    "&::before": {
                      top: 0,
                      left: 0,
                      borderRight: "none",
                      borderBottom: "none",
                    },
                    "&::after": {
                      bottom: 0,
                      right: 0,
                      borderLeft: "none",
                      borderTop: "none",
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={imageSrc}
                    alt="Our Team"
                    sx={{
                      width: "100%",
                      height: "auto",
                      display: "block",
                      boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
                    }}
                  />
                </Box>
              </Motion.div>
            </Box>
          </Motion.div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TeamSection;
