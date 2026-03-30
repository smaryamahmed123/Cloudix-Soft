import React, { memo } from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import GradientButton from "../GradientButton";
import BgImage from "../../assets/home-bg.webp";
import DiagonalStrip from "./DiagonalStrip";
import useDevice from "../../hooks/useDevice";

function HeroSection() {
  const navigate = useNavigate();
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
      {/* 🔥 LCP Optimized Image */}
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
          background:
            "linear-gradient(90deg,#111E2C 10%,rgba(17,30,44,.85) 40%,rgba(17,30,44,.4) 100%)",
          zIndex: 0,
        }}
      />

      {/* Content
      <Box
        sx={{
          position: "relative",
          zIndex: 3,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "100%",
          px: { xs: 3, md: 10 },
          maxWidth: 900,
        }}
      >
        <Typography
          component="h1"
          sx={{
            fontWeight: 700,
            fontSize: isLandscapeMobile
              ? 22
              : { sm: 30, md: 40, lg: 60, xl: 70 },
            lineHeight: 1.25,
            color: "#fff",
            mb: 3,
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
                bgcolor: "#BBBF19",
                color: "#111E2C",
                px: 1,
                borderRadius: 1.5,
                display: "inline-block",
              }}
            >
              Social Media
            </Box>
          </Box>
          <br />
          <Box
            component="span"
            sx={{
              bgcolor: "#BBBF19",
              color: "#111E2C",
              px: 1,
              borderRadius: 1.5,
              display: "inline-block",
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
      </Box> */}

      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column", // stack heading + button
          justifyContent: "center",
          height: "100%",
          px: { xs: 3, md: 10 },
          maxWidth: 900,
          gap: 3, // vertical spacing between heading and button
          alignItems: "flex-start", // button aligned to start (left)
        }}
      >
        {/* Heading */}
        <Typography
          component="h1"
          sx={{
            fontWeight: 700,
            fontSize: isLandscapeMobile
              ? 22
              : { sm: 30, md: 40, lg: 60, xl: 70 },
            lineHeight: 1.25,
            color: "#fff",
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
                bgcolor: "#BBBF19",
                color: "#111E2C",
                px: 1,
                borderRadius: 1.5,
                display: "inline-block",
              }}
            >
              Social Media
            </Box>
          </Box>
          <br />
          <Box
            component="span"
            sx={{
              bgcolor: "#BBBF19",
              color: "#111E2C",
              px: 1,
              borderRadius: 1.5,
              display: "inline-block",
            }}
          >
            Marketing
          </Box>
        </Typography>

        {/* ✅ Button below the heading */}
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
            bgColor="#c6d24a"
            borderColor="#111E2C"
            angle={40}
            position="90%"
          />
          <DiagonalStrip
            texts={["UI/UX", "Marketing", "Motion", "Branding"]}
            bgColor="#111E2C"
            borderColor="#d9d9d9"
            textColor="#fff"
            angle={-10}
            position="30%"
          />
        </>
      )}
    </Box>
  );
}

export default memo(HeroSection);
