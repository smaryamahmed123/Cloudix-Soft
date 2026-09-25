import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Container, Typography, Skeleton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ServiceCard from "../ServiceCard";
import { fetchServices } from "../../redux/servicesSlice";

// Grid layout (12-col): first card = featured (6 cols), last card = full-width banner,
// everything else = 3 cols. Featured/banner only apply with 6+ services.
const spanFor = (i, total) => {
  if (total >= 6 && i === 0) return { xs: "span 12", md: "span 6" };
  if (total >= 6 && i === total - 1) return { xs: "span 12" };
  return { xs: "span 12", sm: "span 6", md: "span 3" };
};

const variantFor = (i, total) =>
  total >= 6 && i === 0 ? "featured" : total >= 6 && i === total - 1 ? "banner" : "regular";

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
            : visible.map((service, i) => (
                <Box key={service._id || service.id} sx={{ gridColumn: spanFor(i, visible.length) }}>
                  <ServiceCard
                    service={service}
                    variant={variantFor(i, visible.length)}
                    onOpen={() => navigate("/contact")}
                  />
                </Box>
              ))}
        </Box>
      </Container>
    </Box>
  );
};

export default ServicesShowcase;