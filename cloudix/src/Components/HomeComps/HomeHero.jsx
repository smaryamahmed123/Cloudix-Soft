import React, { memo } from "react";
import { Box, Typography, Container, useTheme, useMediaQuery } from "@mui/material";
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
  const isWiderThan600 = useMediaQuery(theme.breakpoints.up("sm"));

  const showStrips = isWiderThan600;
  const showSideLabels = isDesktop;

  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        height: isLandscapeMobile ? "65vh" : { xs: "85vh", md: "100vh" },
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* 🚀 HERO IMAGE (LCP OPTIMIZED) */}
      <Box
        component="img"
        src={BgImage}
        alt="Cloudix Soft digital marketing services"
        loading="eager"
        decoding="async"
        fetchPriority="high"
        sx={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: "translateZ(0)", // GPU acceleration
        }}
      />

      {/* 🌑 OVERLAY */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(
            ${theme.palette.primary.dark}80,
            ${theme.palette.primary.dark}80
          )`,
          zIndex: 0,
        }}
      />

      {/* CONTENT */}
      <Container
        maxWidth="lg"
        sx={{
          position: "relative",
          zIndex: 3,
          pt: { xs: 10, sm: 11, md: 0 },
        }}
      >
        {/* SIDE LABELS */}
        {showSideLabels && (
          <Box
            aria-hidden
            sx={{
              position: "absolute",
              left: { lg: -2, xl: -4 },
              top: "50%",
              transform: "translateY(-50%)",
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            {["Marketing", "UI/UX", "Creative Design"].map((label) => (
              <Typography
                key={label}
                sx={{
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  fontSize: "0.55rem",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.28)",
                  userSelect: "none",
                }}
              >
                {label}
              </Typography>
            ))}
          </Box>
        )}

        {/* HERO TEXT */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            alignItems: "flex-start",
            maxWidth: { xs: "100%", sm: "82%", md: "56%", lg: 600 },
            pb: { xs: 4, md: 0 },
          }}
        >
          <Typography
            variant="h3"
            sx={{
              ...(isLandscapeMobile && { fontSize: "1.2rem" }),
              lineHeight: 1.25,
              color: theme.palette.common.white,
              fontWeight: 800,
            }}
          >
            Make Your Brand Stand
            <br />
            Out Through{" "}
            <Box
              component="span"
              sx={{
                bgcolor: theme.palette.secondary.main,
                color: theme.palette.primary.dark,
                px: 1,
                borderRadius: 1,
              }}
            >
              Social Media
            </Box>
            <br />
            <Box
              component="span"
              sx={{
                bgcolor: theme.palette.secondary.main,
                color: theme.palette.primary.dark,
                px: 1,
                borderRadius: 1,
              }}
            >
              Marketing
            </Box>
          </Typography>

          <GradientButton
            text="Let's Talk"
            size={buttonSize}
            onClick={() => navigate("/contact")}
          />
        </Box>
      </Container>

      {/* STRIPS */}
      {showStrips && (
        <>
          <DiagonalStrip
            texts={["Development", "Branding", "Animation", "E-Commerce", "Editing"]}
            bgColor={theme.palette.accent.main}
            borderColor={theme.palette.primary.dark}
            textColor={theme.palette.primary.dark}
            angle={40}
            position="86%"
          />

          <DiagonalStrip
            texts={["Creative Design", "UI/UX", "Marketing", "Motion", "Editing"]}
            bgColor={theme.palette.primary.dark}
            borderColor={theme.palette.accent.main}
            textColor={theme.palette.common.white}
            angle={-12}
            position="22%"
            reverse
          />
        </>
      )}
    </Box>
  );
}

export default memo(HeroSection);
