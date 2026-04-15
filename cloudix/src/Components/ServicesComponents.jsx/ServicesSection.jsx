import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchServices } from "../../redux/servicesSlice";
import {
  Grid,
  Container,
  Typography,
  Box,
  useTheme,
} from "@mui/material";
import ModernCard from "../Card";
import CardSkeleton from "../CardSkeleton";
import { useNavigate } from "react-router-dom";
import GradientButton from "../GradientButton";
import { motion } from "framer-motion";

// Animations
const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const headingVariants = {
  hidden: { opacity: 0, y: -30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const buttonVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, delay: 0.4 },
  },
};

const ServicesSection = ({ limit = 4, sx = {} }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

  const { data: services = [], loading } = useSelector(
    (state) => state.services
  );

  // ✅ Prevent unnecessary refetch
  useEffect(() => {
    if (!services || services.length === 0) {
      dispatch(fetchServices());
    }
  }, [dispatch, services]);

  // ✅ Safe filtering (handles boolean + string)
  const visibleServices = services.filter(
    (service) =>
      service?.visible === true || service?.visible === "true"
  );

  const displayedServices =
    limit === "all"
      ? visibleServices
      : visibleServices.slice(0, limit);

  const hasMore =
    limit !== "all" && visibleServices.length > limit;

  const isShowingAll = limit === "all";

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
          <Typography
            variant="h2"
            sx={{
              fontWeight: "bold",
              color: isShowingAll
                ? theme.palette.text.primary
                : theme.palette.common.white,
              mb: 2,
            }}
          >
            {isShowingAll
              ? "What We Offer"
              : "Our Features & Services"}
          </Typography>

          {isShowingAll && (
            <Typography
              variant="body1"
              sx={{
                color: theme.palette.accent.light,
                maxWidth: 620,
                mx: "auto",
                lineHeight: 1.7,
              }}
            >
              From web development to digital marketing explore the full
              range of services we provide to help your business grow.
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
        <Grid
          container
          rowSpacing={{ xs: 2, md: 2 }}
          columnSpacing={{ xs: 1.5, md: 2 }}
          justifyContent="center"
        >
          {loading
            ? [...Array(limit === "all" ? 6 : limit)].map(
                (_, index) => (
                  <Grid item xs={12} md={6} key={index}>
                    <CardSkeleton />
                  </Grid>
                )
              )
            : displayedServices.map((service) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={3}
                  key={service._id}
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 4,
            }}
          >
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
