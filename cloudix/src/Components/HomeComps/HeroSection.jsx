// HeroSection.jsx
import React from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import GradientButton from "../GradientButton";
import BgImage from "../../assets/home-bg.png";
import { useNavigate } from "react-router-dom";
import DiagonalStrip from "./DiagonalStrip";

export default function HeroSection() {
  const theme = useTheme();
  const navigate = useNavigate();

  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const isMd = useMediaQuery(theme.breakpoints.between("sm", "lg"));
  const isLg = useMediaQuery(theme.breakpoints.up("lg"));


  // Determine button size based on screen width
  let buttonSize = "medium";
  if (isSm) buttonSize = "small";
  else if (isLg) buttonSize = "large";

  let textVariant = "h5"; // default for small
  if (isMd) textVariant = "h3";
  if (isLg) textVariant = "h3";

  return (
    <Box
      sx={{
        position: "relative",
        height: { xs: "85vh", md: "100vh" },
        boxShadow: 3,
        display: "flex",
        alignItems: { xs: "center", md: "center" },
        justifyContent: { xs: "center", sm: "flex-start", md: "flex-start" },
        px: { xs: 3, md: 10 },
        color: "#fff",
        overflow: "hidden",
        backgroundImage: `url(${BgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay gradient */}
      <Box
        sx={{
          background: `linear-gradient(
            90deg,
            #111E2C 10%, 
            rgba(17,30,44,0.85) 40%, 
            rgba(17,30,44,0.5) 80%, 
            rgba(17,30,44,0.2) 100%
          )`,
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1,
        }}
      />
      {/* Desktop vertical side text */}
      {!isSm && (
        <Box
          sx={{
            position: "absolute",
            left: 0,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 5,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            pl: 2,
          }}
        >
          <Box
            sx={{
              transform: "rotate(-90deg)",
              transformOrigin: "left top",
              ml: 5,
              mb: -34,
              letterSpacing: 1,
            }}
          >
            <Typography
              variant="caption"
              sx={{
                display: "block",
                mb: 0.5,
                fontSize: 10,
                fontWeight: 500,
                color: "rgba(255,255,255,0.7)",
                textTransform: "uppercase",
                letterSpacing: 2,
              }}
            >
              Creative Design · UI/UX · Marketing
            </Typography>
          </Box>
        </Box>
      )}

      {/* Main content */}
      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          textAlign: { sm: "center", md: "left" },
          ml: { sm: "60px", md: "10px", lg: "20px", xl: "30px" },
          transition: "margin 0.3s ease-in-out",
        }}
      >
        <Typography
          variant={textVariant}
          sx={{
            fontWeight: 700,
            fontSize: { sm: 30, md: 40, lg: 60, xl: 70 },
            mb: 3,
            color: "#FFFFFF",
            lineHeight: 1.3,
            textAlign: "justify",
            textJustify: "inter-word",
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
                bgcolor: "rgba(187, 191, 25, 1)",
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
              bgcolor: "rgba(187, 191, 25, 1)",
              color: "#111E2C",
              px: 1,
              borderRadius: 1.5,
              display: "inline-block",
            }}
          >
            Marketing
          </Box>
        </Typography>

        <Box sx={{ display: "flex", justifyContent: { xs: "flex-start", md: "flex-start" } }}>
          <GradientButton
            text="Let's Talk"
            size={buttonSize}
            onClick={() => navigate("/contact")}
          />
        </Box>
      </Box>

      {/* Strips */}
      {!isSm && (
        <>
          {/* Green strip */}
          <DiagonalStrip
            texts={["Development", "Branding", "E-Commerce", "Editing", "App Development", "Creative Design", "Animation",]}
            bgColor="#c6d24a"
            textColor="#111E2C"
            dotColor="#111E2C"
            borderColor="#111E2C"
            angle={40}
            position="90%"
          />

          {/* Dark strip */}
          <DiagonalStrip
            texts={[
              "Creative Design",
              "UI/UX",
              "Marketing",
              "Animation",
              "Motion",
              "E-commerce",
              "Branding",
              "Development",
            ]}
            bgColor="#111E2C"
            textColor="#FFFFFF"
            dotColor="#c6d24a"
            borderColor="#c6d24a"
            angle={-10}
            position="30%"
          />
        </>
      )}

    </Box>
  );
}
