import React from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import GradientButton from "../GradientButton";
import BgImage from "../../assets/home-bg.png";
import DiagonalStrip from "./DiagonalStrip";
import useDevice from "../../hooks/useDevice";

export default function HeroSection() {
  const navigate = useNavigate();
  const { isMobile, isDesktop, isLandscapeMobile } = useDevice();

  const buttonSize = isMobile ? "small" : isDesktop ? "large" : "medium";

  return (
    <Box
      sx={{
        position: "relative",
        height: isLandscapeMobile ? "65vh" : { xs: "85vh", md: "100vh" },
        display: "flex",
        alignItems: "center",
        px: { xs: 3, md: 10 },
        overflow: "hidden",
        backgroundImage: `url(${BgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg,#111E2C 10%,rgba(17,30,44,.85) 40%,rgba(17,30,44,.4) 100%)",
          zIndex: 1,
        }}
      />

      {/* Content */}
      <Box sx={{ position: "relative", zIndex: 2, maxWidth: 800 }}>
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: isLandscapeMobile
              ? 22
              : { sm: 30, md: 40, lg: 60 },
            lineHeight: 1.25,
            color: "#fff",
            mb: 3,
            textAlign: isLandscapeMobile ? "left" : "justify",
          }}
        >
          Make Your Brand Stand Out Through{" "}
          <Box component="span" sx={{ bgcolor: "#BBBF19", color: "#111E2C", px: 1 }}>
            Social Media
          </Box>{" "}
          Marketing
        </Typography>

        <GradientButton
          text="Let's Talk"
          size={buttonSize}
          onClick={() => navigate("/contact")}
        />
      </Box>

      {/* Decorative strips — desktop only */}
      {!isMobile && !isLandscapeMobile && (
        <>
          <DiagonalStrip
            texts={["Development", "Branding", "E-Commerce", "Animation"]}
            bgColor="#c6d24a"
            angle={40}
            position="90%"
          />
          <DiagonalStrip
            texts={["UI/UX", "Marketing", "Motion", "Branding"]}
            bgColor="#111E2C"
            textColor="#fff"
            angle={-10}
            position="30%"
          />
        </>
      )}
    </Box>
  );
}
