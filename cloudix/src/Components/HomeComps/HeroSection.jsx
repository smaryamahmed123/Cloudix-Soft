import React from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import GradientButton from "../GradientButton";
import BgImage from "../../assets/home-bg.webp";
import DiagonalStrip from "./DiagonalStrip";
import useDevice from "../../hooks/useDevice";

export default function HeroSection() {
  const navigate = useNavigate();
  const { isMobile, isDesktop, isLandscapeMobile } = useDevice();

  const buttonSize = isMobile ? "small" : isDesktop ? "large" : "medium";

  return (
    // <Box
    //   sx={{
    //     position: "relative",
    //     height: isLandscapeMobile ? "65vh" : { xs: "85vh", md: "100vh" },
    //     display: "flex",
    //     alignItems: "center",
    //     px: { xs: 3, md: 10 },
    //     overflow: "hidden",
    //     backgroundImage: `url(${BgImage})`,
    //     backgroundSize: "cover",
    //     backgroundPosition: "center",
    //   }}
    // >
    //   {/* Overlay */}
    //   <Box
    //     sx={{
    //       position: "absolute",
    //       inset: 0,
    //       background:
    //         "linear-gradient(90deg,#111E2C 10%,rgba(17,30,44,.85) 40%,rgba(17,30,44,.4) 100%)",
    //       zIndex: 1,
    //     }}
    //   />

    //   {/* Content */}
    //   <Box
    //     sx={{
    //       position: "relative",
    //       zIndex: 2,
    //       maxWidth: 800,
    //       textAlign: isLandscapeMobile ? "left" : { sm: "center", md: "left" },
    //     }}
    //   >
    <Box
      sx={{
        position: "relative",
        height: isLandscapeMobile ? "65vh" : { xs: "85vh", md: "100vh" },
        overflow: "hidden",
      }}
    >
      {/* ✅ LCP IMAGE */}
      <Box
        component="img"
        src="../../assets/home-bg.webp"
        alt="Cloudix Soft hero background"
        width="1600"
        height="900"
        loading="eager"
        decoding="async"
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
          zIndex: 1,
        }}
      />

      {/* Content */}
      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          alignItems: "center",
          height: "100%",
          px: { xs: 3, md: 10 },
        }}
      >
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: isLandscapeMobile
              ? 22
              : { sm: 30, md: 40, lg: 60, xl: 70 },
            lineHeight: 1.3,
            color: "#FFFFFF",
            mb: 3,
            textAlign: isLandscapeMobile ? "left" : "justify",
            textJustify: "inter-word",
          }}
        >
          {/* Line 1 */}
          <Box component="span" sx={{ whiteSpace: "nowrap" }}>
            Make Your Brand Stand
          </Box>

          <br />

          {/* Line 2 */}
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

          {/* Line 3 */}
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
            borderColor="#111E2C"
            angle={40}
            position="90%"
          />
          <DiagonalStrip
            texts={["UI/UX", "Marketing", "Motion", "Branding"]}
            bgColor="#111E2C"
            borderColor="#c6d24a"
            textColor="#fff"
            angle={-10}
            position="30%"
          />
        </>
      )}
    </Box>
  );
}
