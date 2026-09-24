import React from "react";
import { Box, Typography, Chip, useTheme } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { motion } from "framer-motion";

/**
 * Shared service card (Services page + Home page).
 * variant: "regular" (default) | "featured" | "banner"
 * The Home page only uses "regular".
 */
const ServiceCard = ({ service, variant = "regular", onOpen }) => {
  const theme = useTheme();
  const featured = variant !== "regular";
  const banner = service.bannerImage || service.image; // optional photo from API

  return (
    <Box
      component={motion.article}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      onClick={onOpen}
      sx={{
        position: "relative", overflow: "hidden", cursor: "pointer", height: "100%",
        bgcolor: "background.paper", borderRadius: 2, p: 3,
        boxShadow: "0 4px 18px rgba(17,30,44,0.07)",
        border: "1px solid",
        borderColor: variant === "featured" ? theme.palette.accent.main : "transparent",
        display: "flex", flexDirection: "column", minHeight: featured ? 240 : 280,
      }}
    >
      {variant === "featured" && (
        <Chip
          label="Most popular" size="small"
          sx={{
            position: "absolute", top: 16, right: 16, zIndex: 2, height: 22, fontSize: 11,
            bgcolor: theme.palette.primary.main, color: "#fff", fontWeight: 600,
          }}
        />
      )}

      {featured && banner && (
        <Box
          sx={{
            display: { xs: "none", sm: "block" }, position: "absolute", top: 0, right: 0, bottom: 0,
            width: variant === "banner" ? "40%" : "45%",
            backgroundImage: `url(${banner})`, backgroundSize: "cover", backgroundPosition: "center",
            clipPath: "polygon(22% 0, 100% 0, 100% 100%, 0 100%)",
          }}
        />
      )}

      <Box sx={{ position: "relative", maxWidth: featured && banner ? { sm: "55%" } : "100%", display: "flex", flexDirection: "column", flex: 1 }}>
        <Box
          sx={{
            width: 56, height: 56, borderRadius: "50%", mb: 2, display: "grid", placeItems: "center",
            bgcolor: "rgba(212,225,87,0.25)",
          }}
        >
          <img src={service.iconImage} alt="" width={30} height={30} loading="lazy" style={{ objectFit: "contain" }} />
        </Box>
        <Typography variant="h6" component="h3" sx={{ color: "primary.dark", mb: 1, fontSize: "1.1rem" }}>
          {service.title}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.7, mb: 3 }}>
          {service.description}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            mt: "auto", alignSelf: "flex-start", fontWeight: 600, color: "primary.dark",
            display: "inline-flex", alignItems: "center", gap: 0.75,
            borderBottom: `2px solid ${theme.palette.primary.main}`, pb: 0.25,
          }}
        >
          Explore service <ArrowForwardIcon sx={{ fontSize: 16 }} />
        </Typography>
      </Box>
    </Box>
  );
};

export default ServiceCard;