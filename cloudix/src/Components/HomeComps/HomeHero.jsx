import React, { memo } from "react";
import { Box, Typography, Container, useTheme } from "@mui/material";  // ✅ add Container
import { useNavigate } from "react-router-dom";
import GradientButton from "../GradientButton";
import BgImage from "../../assets/home-bg.webp";
import DiagonalStrip from "./DiagonalStrip";
import useDevice from "../../hooks/useDevice";

function HeroSection() {
  const navigate = useNavigate();
  const theme = useTheme();
  const { isMobile, isDesktop, isLandscapeMobile } = useDevice();
  const buttonSize = isMobile ? "small" : isDesktop ? "large" : "medium";

  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        height: isLandscapeMobile ? "65vh" : { xs: "85vh", md: "100vh" },
        overflow: "hidden",
        display: "flex",          // ✅ needed to center Container vertically
        alignItems: "center",
      }}
    >
      {/* LCP Optimized Image */}
      <Box
        component="img"
        src={BgImage}
        alt="Cloudix Soft digital marketing services"
        width="1600"
        height="900"
        loading="eager"
        decoding="async"
        fetchpriority="high"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />

      {/* Overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(90deg, ${theme.palette.primary.dark} 10%, ${theme.palette.primary.dark}D9 40%, ${theme.palette.primary.dark}66 100%)`,
          zIndex: 0,
        }}
      />

      {/* ✅ Container for consistent width */}
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 3 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 3,
            alignItems: "flex-start",
            // maxWidth: { xs: "100%", md: 700 },  // ✅ text doesn't stretch full width on desktop
            maxWidth: { xs: "100%", sm: "85%", md: 600, lg: 700 },
            pb: { xs: 8, md: 0 },
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontSize: isLandscapeMobile
                ? 22
                : { sm: 30, md: 40, lg: 60, xl: 70 },
              lineHeight: 1.5,
              color: theme.palette.common.white,
              textAlign: isLandscapeMobile ? "left" : "justify",
            }}
          >
            <Box component="span" sx={{ whiteSpace: "nowrap" }}>
              Make Your Brand Stand
            </Box>
            <br />
            <Box component="span" sx={{ whiteSpace: "nowrap" }}>
              Out Through{" "}
              <Box
                component="span"
                sx={{
                  bgcolor: theme.palette.secondary.main,
                  color: theme.palette.primary.dark,
                  px: 1,
                  borderRadius: 1.5,
                  display: "inline-block",
                  mb: 0.5,
                  lineHeight: 1.3,
                }}
              >
                Social Media
              </Box>
            </Box>
            <br />
            <Box
              component="span"
              sx={{
                bgcolor: theme.palette.secondary.main,
                color: theme.palette.primary.dark,
                px: 1,
                borderRadius: 1.5,
                display: "inline-block",
                lineHeight: 1.3,
              }}
            >
              Marketing
            </Box>
          </Typography>

          <GradientButton
            aria-label="Contact Cloudix Soft"
            text="Let's Talk"
            size={buttonSize}
            onClick={() => navigate("/contact")}
          />
        </Box>
      </Container>

      {/* Decorative strips — desktop only */}
      {!isMobile && !isLandscapeMobile && (
        <>
          <DiagonalStrip
            texts={["Development", "Branding", "E-Commerce", "Animation"]}
            bgColor={theme.palette.accent.main}
            borderColor={theme.palette.primary.dark}
            angle={40}
            // position="90%"
            position="5%"
          />
          <DiagonalStrip
            texts={["UI/UX", "Marketing", "Motion", "Branding"]}
            bgColor={theme.palette.primary.dark}
            borderColor="#d9d9d9"
            textColor={theme.palette.common.white}
            angle={-10}
            //position="30%"
            position="-5%" 
          />
        </>
      )}
    </Box>
  );
}

export default memo(HeroSection);
