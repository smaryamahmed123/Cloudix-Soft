import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Container, Typography, useTheme } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import GradientButton from "../GradientButton";
import FeaturedWorkSkeleton from "./FeaturedWorkSkeleton";

const backendURL = import.meta.env.VITE_BACKEND_URL;

const MotionBox = motion.create(Box);

const CHROME_H = 30; // browser-bar height in the website mockup (px)

/* ============================================================
   WEBSITE SHOWCASE
   Full-page screenshots are tall, so they are shown inside a
   browser mockup (top of the page visible) and scroll slowly
   through the whole screenshot on hover. Text sits beside the
   mockup, not on top of the image.
============================================================ */

const WebsiteShowcase = ({ website, onOpen }) => {
  const theme = useTheme();

  return (
    <MotionBox
      role="link"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={(e) => e.key === "Enter" && onOpen()}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      sx={{
        "--chrome": `${CHROME_H}px`,
        "--win": "250px",
        [theme.breakpoints.up("md")]: { "--win": "380px" },

        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "5fr 7fr" },
        alignItems: "center",
        gap: { xs: 3, md: 5 },
        p: { xs: 3, sm: 4, md: 5 },
        mb: 3,
        borderRadius: { xs: 3, md: 4 },
        cursor: "pointer",
        background:
          "linear-gradient(135deg, #07151f 0%, #0b1d29 50%, #081923 100%)",
        boxShadow: "0 15px 45px rgba(17,30,44,0.16)",

        // Scroll the screenshot top -> bottom on hover / keyboard focus
        "&:hover .site-shot, &:focus-visible .site-shot": {
          transform:
            "translateY(min(0px, calc(-100% + var(--win) - var(--chrome))))",
          transition: "transform 6s linear",
        },
        "@media (prefers-reduced-motion: reduce)": {
          "& .site-shot": { transition: "none" },
          "&:hover .site-shot, &:focus-visible .site-shot": {
            transform: "none",
          },
        },
      }}
    >
      {/* ---------- TEXT ---------- */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 1,
            px: 2,
            py: 0.8,
            mb: 2.5,
            borderRadius: "999px",
            bgcolor: theme.palette.secondary.main,
            color: theme.palette.primary.dark,
          }}
        >
          <OpenInNewIcon sx={{ fontSize: 16 }} />
          <Typography
            sx={{ fontSize: "11px", fontWeight: 800, letterSpacing: 1 }}
          >
            WEBSITE PROJECT
          </Typography>
        </Box>

        <Typography
          component="h3"
          sx={{
            color: "#fff",
            fontWeight: 800,
            fontSize: { xs: "27px", sm: "34px", md: "36px" },
            lineHeight: 1.15,
            mb: 2,
            overflowWrap: "anywhere",
          }}
        >
          {website.title || "Website Project"}
        </Typography>

        <Typography
          sx={{
            color: "rgba(255,255,255,0.78)",
            fontSize: { xs: "14px", sm: "15px" },
            lineHeight: 1.7,
            mb: 3,
            maxWidth: 440,
          }}
        >
          A modern, responsive website designed to create a strong digital
          presence and engaging user experience.
        </Typography>

        {website.link && (
          <GradientButton
            text="VIEW PROJECT"
            size="medium"
            onClick={(event) => {
              event.stopPropagation();
              window.open(website.link, "_blank", "noopener,noreferrer");
            }}
          />
        )}
      </Box>

      {/* ---------- BROWSER MOCKUP ---------- */}
      <Box
        sx={{
          height: "var(--win)",
          display: "flex",
          flexDirection: "column",
          borderRadius: 2,
          overflow: "hidden",
          bgcolor: "#fff",
          boxShadow: "0 20px 50px rgba(0,0,0,0.45)",
        }}
      >
        <Box
          sx={{
            height: "var(--chrome)",
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            gap: 0.8,
            px: 1.5,
            bgcolor: "#e9ecef",
          }}
        >
          {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
            <Box
              key={c}
              sx={{ width: 9, height: 9, borderRadius: "50%", bgcolor: c }}
            />
          ))}
        </Box>

        <Box sx={{ flex: 1, minHeight: 0, overflow: "hidden" }}>
          <Box
            className="site-shot"
            component="img"
            src={website.image}
            alt={website.title || "Website project"}
            loading="lazy"
            sx={{
              display: "block",
              width: "100%",
              height: "auto",
              transition: "transform 0.8s ease",
            }}
          />
        </Box>
      </Box>
    </MotionBox>
  );
};

/* ============================================================
   PORTFOLIO TILE (logo + post)
   Same structure as the video testimonial card: blurred
   backdrop + contained media, caption in a footer strip.
============================================================ */

const PortfolioTile = ({
  image,
  alt,
  label,
  title,
  description,
  delay = 0,
  onClick,
}) => (
  <MotionBox
    component="button"
    type="button"
    onClick={onClick}
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7, delay }}
    sx={{
      width: "100%",
      height: { xs: 330, sm: 380, md: 390 },
      display: "flex",
      flexDirection: "column",
      p: 0,
      border: 0,
      borderRadius: 4,
      overflow: "hidden",
      cursor: "pointer",
      textAlign: "left",
      font: "inherit",
      background:
        "linear-gradient(145deg, rgba(20,42,56,0.96), rgba(9,28,39,0.98))",
      boxShadow: "0 12px 35px rgba(17,30,44,0.14)",
      "&:hover .tile-image": { transform: "scale(1.04)" },
    }}
  >
    <Box
      sx={{
        position: "relative",
        flex: 1,
        minHeight: 0,
        bgcolor: "#07151f",
        overflow: "hidden",
      }}
    >
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url("${image}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(22px) brightness(0.6)",
          transform: "scale(1.25)",
        }}
      />
      <Box
        className="tile-image"
        component="img"
        src={image}
        alt={alt}
        loading="lazy"
        sx={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "contain",
          transition: "transform 0.6s ease",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: 16,
          left: 16,
          px: 2,
          py: 0.8,
          borderRadius: "999px",
          backgroundColor: "rgba(17,30,44,0.8)",
          border: "1px solid rgba(255,255,255,0.35)",
          backdropFilter: "blur(8px)",
          pointerEvents: "none",
        }}
      >
        <Typography
          sx={{
            color: "#fff",
            fontSize: "11px",
            fontWeight: 800,
            letterSpacing: 1,
          }}
        >
          {label}
        </Typography>
      </Box>
    </Box>

    <Box
      sx={{
        px: 2.75,
        py: 2,
        borderTop: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <Typography
        component="h3"
        sx={{
          color: "#fff",
          fontWeight: 800,
          fontSize: { xs: "20px", sm: "22px" },
          mb: 0.4,
        }}
      >
        {title}
      </Typography>
      <Typography sx={{ color: "rgba(255,255,255,0.72)", fontSize: "13px" }}>
        {description}
      </Typography>
    </Box>
  </MotionBox>
);

/* ============================================================
   FEATURED WORK
============================================================ */

export default function FeaturedWork() {
  const navigate = useNavigate();

  const [website, setWebsite] = useState(null);
  const [logo, setLogo] = useState(null);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const fetchFeaturedWork = async () => {
      try {
        const [websitesRes, logosRes, postsRes] = await Promise.all([
          axios.get(`${backendURL}/api/websites`),
          axios.get(`${backendURL}/api/logos`),
          axios.get(`${backendURL}/api/posts`),
        ]);

        if (!active) return;

        const first = (res) =>
          Array.isArray(res.data) ? res.data[0] || null : null;

        setWebsite(first(websitesRes));
        setLogo(first(logosRes));
        setPost(first(postsRes));
      } catch (error) {
        console.error("Failed to load featured portfolio:", error);
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchFeaturedWork();
    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          py: { xs: 8, md: 12 },
          backgroundColor: "#f9f9f9",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: 300,
        }}
      >
        <FeaturedWorkSkeleton />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: "#f9f9f9",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        {/* ---------- SECTION HEADING ---------- */}
        <MotionBox
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          sx={{ textAlign: "center", mb: { xs: 5, md: 7 } }}
        >
          <Typography
            sx={{
              color: "#769914",
              fontSize: { xs: "12px", md: "14px" },
              fontWeight: 800,
              letterSpacing: 3,
              textTransform: "uppercase",
              mb: 1.5,
            }}
          >
            Our Work
          </Typography>

          <Typography
            component="h2"
            sx={{
              color: "#111E2C",
              fontSize: { xs: "32px", sm: "40px", md: "50px" },
              lineHeight: 1.1,
              fontWeight: 800,
            }}
          >
            Featured{" "}
            <Box component="span" sx={{ color: "#769914" }}>
              Projects
            </Box>
          </Typography>

          <Typography
            sx={{
              mt: 2,
              maxWidth: 650,
              mx: "auto",
              color: "#687386",
              fontSize: { xs: "14px", sm: "15px", md: "16px" },
              lineHeight: 1.7,
            }}
          >
            Explore some of the websites, logos and creative designs we've
            created for our clients.
          </Typography>
        </MotionBox>

        {/* ---------- WEBSITE ---------- */}
        {website && (
          <WebsiteShowcase
            website={website}
            onOpen={() => navigate("/portfolio#websites")}
          />
        )}

        {/* ---------- LOGO + POST ---------- */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: 3,
          }}
        >
          {logo && (
            <PortfolioTile
              image={logo.image}
              alt={logo.title || "Logo design"}
              label="LOGO DESIGN"
              title="Logo Design"
              description="Creative identity for your brand."
              delay={0.1}
              onClick={() => navigate("/portfolio#logos")}
            />
          )}

          {post && (
            <PortfolioTile
              image={post.image}
              alt={post.title || "Post design"}
              label="POST DESIGN"
              title="Post Design"
              description="Engaging designs for social media."
              delay={0.2}
              onClick={() => navigate("/portfolio#posts")}
            />
          )}
        </Box>

        {/* ---------- VIEW FULL PORTFOLIO ---------- */}
        <MotionBox
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: { xs: 5, md: 6 },
          }}
        >
          <GradientButton
            text="VIEW FULL PORTFOLIO"
            size="medium"
            onClick={() => navigate("/portfolio")}
          />
        </MotionBox>
      </Container>
    </Box>
  );
}