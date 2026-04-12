import React, { memo } from "react";
import { Box, Typography, useTheme } from "@mui/material";
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
          background: `linear-gradient(90deg, ${theme.palette.primary.dark} 10%, ${theme.palette.primary.dark}D9 40%, ${theme.palette.primary.dark}66 100%)`,  // ✅ D9 = 85%, 66 = 40% opacity
          zIndex: 0,
        }}
      />

      {/* Content */}
      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "100%",
          px: { xs: 2, md: 4 },
          maxWidth: 900,
          gap: 3,
          alignItems: "flex-start",
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontSize: isLandscapeMobile
              ? 22
              : { sm: 30, md: 40, lg: 60, xl: 70 },
            lineHeight: 1.5,
            color: theme.palette.common.white,         // ✅
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
                bgcolor: theme.palette.secondary.main,  // ✅ #BBBF19
                color: theme.palette.primary.dark,       // ✅ #111E2C
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
              bgcolor: theme.palette.secondary.main,    // ✅
              color: theme.palette.primary.dark,         // ✅
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

      {/* Decorative strips – desktop only */}
      {!isMobile && !isLandscapeMobile && (
        <>
          <DiagonalStrip
            texts={["Development", "Branding", "E-Commerce", "Animation"]}
            bgColor={theme.palette.accent.main}         // ✅ #D4E157
            borderColor={theme.palette.primary.dark}    // ✅ #111E2C
            angle={40}
            position="90%"
          />
          <DiagonalStrip
            texts={["UI/UX", "Marketing", "Motion", "Branding"]}
            bgColor={theme.palette.primary.dark}        // ✅ #111E2C
            borderColor="#d9d9d9"
            textColor={theme.palette.common.white}      // ✅
            angle={-10}
            position="30%"
          />
        </>
      )}
    </Box>
  );
}

export default memo(HeroSection);
