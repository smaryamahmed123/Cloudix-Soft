import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Container, Typography, Skeleton, Chip, useTheme } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { fetchServices } from "../../redux/servicesSlice";

// Grid layout matching the new design (12-col):
// first card = featured (6 cols), last card = full-width banner, everything else = 3 cols
const spanFor = (i, total) => {
  if (total >= 6 && i === 0) return { xs: "span 12", md: "span 6" };
  if (total >= 6 && i === total - 1) return { xs: "span 12", sm: "span 12", md: "span 12" };
  return { xs: "span 12", sm: "span 6", md: "span 3" };
};

const ServiceCard = ({ service, variant, onOpen }) => {
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

      {/* Photo panel for featured + banner cards */}
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

const ServicesShowcase = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: services = [], loading, fetched } = useSelector((s) => s.services);

  useEffect(() => {
    if (!fetched && !loading && services.length === 0) dispatch(fetchServices());
  }, [dispatch, fetched, loading, services.length]);

  const visible = services.filter((s) => s?.visible === true || s?.visible === "true");

  return (
    <Box id="what-we-offer" component="section" sx={{ bgcolor: "background.subtle", py: { xs: 6, md: 9 } }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: { xs: 4, md: 6 }, maxWidth: 560 }}>
          <Typography variant="subtitle2" sx={{ color: "primary.main", fontWeight: 600, mb: 1 }}>
            Our services
          </Typography>
          <Typography component="h2" variant="h3" sx={{ color: "primary.dark", fontWeight: 700, mb: 1.5 }}>
            What We Offer
          </Typography>
          <Typography variant="body1">
            From custom web app development to targeted digital marketing campaigns,
            explore our full spectrum of IT solutions.
          </Typography>
        </Box>

        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: { xs: 2, md: 3 } }}>
          {loading
            ? [...Array(8)].map((_, i) => (
                <Box key={i} sx={{ gridColumn: { xs: "span 12", sm: "span 6", md: "span 3" } }}>
                  <Skeleton variant="rounded" height={280} />
                </Box>
              ))
            : visible.map((service, i) => {
                const total = visible.length;
                const variant = total >= 6 && i === 0 ? "featured" : total >= 6 && i === total - 1 ? "banner" : "regular";
                return (
                  <Box key={service._id || service.id} sx={{ gridColumn: spanFor(i, total) }}>
                    <ServiceCard service={service} variant={variant} onOpen={() => navigate("/contact")} />
                  </Box>
                );
              })}
        </Box>
      </Container>
    </Box>
  );
};

export default ServicesShowcase;