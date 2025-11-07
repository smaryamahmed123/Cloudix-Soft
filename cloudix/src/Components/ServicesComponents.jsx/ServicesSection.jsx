import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchServices } from "../../redux/servicesSlice";
import { Grid, Container, Typography, Box } from "@mui/material";
import ModernCard from "../Card";
import CardSkeleton from "../CardSkeleton";
import { useNavigate } from "react-router-dom";
import GradientButton from "../GradientButton";
import { motion } from "framer-motion";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // delay between cards
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const headingVariants = {
  hidden: { opacity: 0, y: -30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const buttonVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.6, delay: 0.4 } },
};

const ServicesSection = ({ limit = 4, sx = {} }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: services, loading } = useSelector((state) => state.services);

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  const visibleServices = services.filter((service) => service.visible);
  const displayedServices =
    limit === "all" ? visibleServices : visibleServices.slice(0, limit);
  const hasMore = limit !== "all" && visibleServices.length > limit;

  return (
    <Container sx={{ my: 8, ...sx }}>
      {/* Animated Heading */}
      <motion.div
        variants={headingVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <Typography
          variant="h3"
          align="center"
          sx={{
            fontWeight: "bold",
            mb: 4,
            color: "#FFFFFF",
            padding: "50px 0",
          }}
        >
          Our Features & Services
        </Typography>
      </motion.div>

      {/* Cards with staggered animation */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <Grid container spacing={4} justifyContent="center">
          {loading
            ? [...Array(limit === "all" ? 6 : limit)].map((_, index) => (
                <Grid
                  key={index}
                  sx={{ gridColumn: { xs: "span 12", md: "span 6" } }}
                >
                  <CardSkeleton />
                </Grid>
              ))
            : displayedServices.map((service) => (
                <Grid
                  key={service._id}
                  sx={{ gridColumn: { xs: "span 12", md: "span 6" } }}
                  component={motion.div}
                  variants={cardVariants}
                >
                  <ModernCard
                    iconImage={service.iconImage}
                    title={service.title}
                    description={service.description}
                  />
                </Grid>
              ))}
        </Grid>
      </motion.div>

      {/* Animated Button */}
      {hasMore && (
        <motion.div
          variants={buttonVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          style={{ textAlign: "center", marginTop: "2rem" }}
        >
          <GradientButton
            variant="contained"
            onClick={() => navigate("/services")}
            text="Show All"
          />
        </motion.div>
      )}
    </Container>
  );
};

export default ServicesSection;
