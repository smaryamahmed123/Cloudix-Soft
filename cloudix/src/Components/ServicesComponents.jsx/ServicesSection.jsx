import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchServices } from "../../redux/servicesSlice";
import { Grid, Container, Typography, Box, useTheme } from "@mui/material";
import ModernCard from "../Card";
import CardSkeleton from "../CardSkeleton";
import { useNavigate } from "react-router-dom";
import GradientButton from "../GradientButton";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.2 } },
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
  const theme = useTheme();
  const { data: services, loading } = useSelector((state) => state.services);

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  const visibleServices = services.filter((service) => service.visible);
  const displayedServices =
    limit === "all" ? visibleServices : visibleServices.slice(0, limit);
  const hasMore = limit !== "all" && visibleServices.length > limit;
  const isShowingAll = limit === "all";             // ✅ flag for conditional heading

  return (
    <Container maxWidth="lg" sx={{ my: 4, ...sx }}>

      {/* Heading */}
      <motion.div
        variants={headingVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <Box sx={{ textAlign: "center", py: { xs: 4, md: 6 } }}>

          {/* Main heading — same on both pages */}
         <Typography
            variant="h2"
            sx={{
              fontWeight: "bold",
              color: isShowingAll
              ? theme.palette.text.primary      // ✅ dark text on services page
              : theme.palette.common.white,     // ✅ white text on home page
              mb: 2,
            }}
          >
          {isShowingAll ? "What We Offer" : "Our Features & Services"}
          </Typography>
          {/* Subheading — only on full services page */}
          {isShowingAll && (
            <Typography
              variant="body1"
              sx={{
                color: theme.palette.accent.light,
                maxWidth: 620,
                mx: "auto",
                lineHeight: 1.7,
                // ✅ theme responsiveFontSizes handles size
              }}
            >
              From web development to digital marketing  explore the full range
              of services we provide to help your business grow.
            </Typography>
          )}

        </Box>
      </motion.div>

      {/* Cards */}
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

      {/* Show All Button */}
      {hasMore && (
        <motion.div
          variants={buttonVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <GradientButton
              variant="contained"
              onClick={() => navigate("/services")}
              text="Show All"
            />
          </Box>
        </motion.div>
      )}
    </Container>
  );
};

export default ServicesSection;
