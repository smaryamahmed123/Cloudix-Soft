// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchServices } from "../../redux/servicesSlice";
// import {
//   Grid,
//   Container,
//   Typography,
//   Box,
//   useTheme,
// } from "@mui/material";
// import ModernCard from "../Card";
// import CardSkeleton from "../CardSkeleton";
// import { useNavigate } from "react-router-dom";
// import GradientButton from "../GradientButton";
// import { motion } from "framer-motion";

// const containerVariants = {
//   hidden: { opacity: 0 },
//   show: { opacity: 1, transition: { staggerChildren: 0.15 } },
// };

// const cardVariants = {
//   hidden: { opacity: 0, y: 30 },
//   show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
// };

// const headingVariants = {
//   hidden: { opacity: 0, y: -20 },
//   show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
// };

// const buttonVariants = {
//   hidden: { opacity: 0, scale: 0.95 },
//   show: { opacity: 1, scale: 1, transition: { duration: 0.4, delay: 0.2 } },
// };

// const ServicesSection = ({ limit = 4, sx = {} }) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const theme = useTheme();

//   const { data: services = [], loading, fetched } = useSelector(
//     (state) => state.services
//   );

//   // Guard against unnecessary refetches using a fetched flag or status check
//   useEffect(() => {
//     if (!fetched && !loading && services.length === 0) {
//       dispatch(fetchServices());
//     }
//   }, [dispatch, fetched, loading, services.length]);

//   const visibleServices = services.filter(
//     (service) => service?.visible === true || service?.visible === "true"
//   );

//   const displayedServices =
//     limit === "all" ? visibleServices : visibleServices.slice(0, limit);

//   const hasMore = limit !== "all" && visibleServices.length > limit;
//   const isShowingAll = limit === "all";

//   return (
//     <Container maxWidth="lg" sx={{ my: 4, ...sx }}>
//       {/* Heading */}
//       <motion.div
//         variants={headingVariants}
//         initial="hidden"
//         whileInView="show"
//         viewport={{ once: true }}
//       >
//         <Box sx={{ textAlign: "center", py: { xs: 6, md: 8 } }}>
//           <Typography
//             component="h2"
//             variant="h3"
//             sx={{
//               fontWeight: "bold",
//               color: isShowingAll
//                 ? theme.palette.text.primary
//                 : theme.palette.common.white,
//               mb: 2,
//             }}
//           >
//             {isShowingAll ? "What We Offer" : "Our Features & Services"}
//           </Typography>

//           {isShowingAll && (
//             <Typography
//               variant="body1"
//               sx={{
//                 color: theme.palette.accent.light,
//                 maxWidth: 620,
//                 mx: "auto",
//                 lineHeight: 1.7,
//               }}
//             >
//               From custom web app development to targeted digital marketing campaigns, explore our full spectrum of IT solutions.
//             </Typography>
//           )}
//         </Box>
//       </motion.div>

//       {/* Cards Grid */}
//       <motion.div
//         variants={containerVariants}
//         initial="hidden"
//         whileInView="show"
//         viewport={{ once: true }}
//       >
//         <Grid
//           container
//           rowSpacing={{ xs: 2, md: 3 }}
//           columnSpacing={{ xs: 2, md: 3 }}
//           justifyContent="center"
//         >
//           {loading
//             ? [...Array(limit === "all" ? 6 : limit)].map((_, index) => (
//                 <Grid item xs={12} sm={6} md={3} key={index}>
//                   <CardSkeleton />
//                 </Grid>
//               ))
//             : displayedServices.map((service) => (
//                 <Grid
//                   item
//                   xs={12}
//                   sm={6}
//                   md={3}
//                   key={service._id || service.id}
//                   component={motion.div}
//                   variants={cardVariants}
//                 >
//                   <ModernCard
//                     iconImage={service.iconImage}
//                     title={service.title}
//                     description={service.description}
//                   />
//                 </Grid>
//               ))}
//         </Grid>
//       </motion.div>

//       {/* View All Button */}
//       {hasMore && (
//         <motion.div
//           variants={buttonVariants}
//           initial="hidden"
//           whileInView="show"
//           viewport={{ once: true }}
//         >
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "center",
//               mt: 5,
//             }}
//           >
//             <GradientButton
//               variant="contained"
//               onClick={() => navigate("/services")}
//               text="View All Services"
//             />
//           </Box>
//         </motion.div>
//       )}
//     </Container>
//   );
// };

// export default ServicesSection;


// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchServices } from "../../redux/servicesSlice";
// import { Grid, Container, Typography, Box } from "@mui/material";
// import ModernCard from "../Card";
// import CardSkeleton from "../CardSkeleton";
// import { useNavigate } from "react-router-dom";
// import GradientButton from "../GradientButton";
// import { motion } from "framer-motion";

// const containerVariants = {
//   hidden: { opacity: 0 },
//   show: { opacity: 1, transition: { staggerChildren: 0.15 } },
// };

// const cardVariants = {
//   hidden: { opacity: 0, y: 30 },
//   show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
// };

// const headingVariants = {
//   hidden: { opacity: 0, y: -20 },
//   show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
// };

// const buttonVariants = {
//   hidden: { opacity: 0, scale: 0.95 },
//   show: { opacity: 1, scale: 1, transition: { duration: 0.4, delay: 0.2 } },
// };

// // Home-page teaser: shows the first `limit` services + a link to /services.
// // The full listing now lives in ServicesComponents/ServicesShowcase.
// const ServicesSection = ({ limit = 4, sx = {} }) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { data: services = [], loading, fetched } = useSelector(
//     (state) => state.services
//   );

//   useEffect(() => {
//     if (!fetched && !loading && services.length === 0) {
//       dispatch(fetchServices());
//     }
//   }, [dispatch, fetched, loading, services.length]);

//   const visibleServices = services.filter(
//     (service) => service?.visible === true || service?.visible === "true"
//   );
//   const displayedServices = visibleServices.slice(0, limit);
//   const hasMore = visibleServices.length > limit;

//   return (
//     <Container maxWidth="lg" sx={{ my: 4, ...sx }}>
//       <motion.div
//         variants={headingVariants}
//         initial="hidden"
//         whileInView="show"
//         viewport={{ once: true }}
//       >
//         <Box sx={{ textAlign: "center", py: { xs: 6, md: 8 } }}>
//           <Typography
//             component="h2"
//             variant="h3"
//             sx={{ fontWeight: "bold", color: "common.white", mb: 2 }}
//           >
//             Our Features & Services
//           </Typography>
//         </Box>
//       </motion.div>

//       <motion.div
//         variants={containerVariants}
//         initial="hidden"
//         whileInView="show"
//         viewport={{ once: true }}
//       >
//         <Grid
//           container
//           rowSpacing={{ xs: 2, md: 3 }}
//           columnSpacing={{ xs: 2, md: 3 }}
//           justifyContent="center"
//         >
//           {loading
//             ? [...Array(limit)].map((_, index) => (
//                 <Grid item xs={12} sm={6} md={3} key={index}>
//                   <CardSkeleton />
//                 </Grid>
//               ))
//             : displayedServices.map((service) => (
//                 <Grid
//                   item
//                   xs={12}
//                   sm={6}
//                   md={3}
//                   key={service._id || service.id}
//                   component={motion.div}
//                   variants={cardVariants}
//                 >
//                   <ModernCard
//                     iconImage={service.iconImage}
//                     title={service.title}
//                     description={service.description}
//                   />
//                 </Grid>
//               ))}
//         </Grid>
//       </motion.div>

//       {hasMore && (
//         <motion.div
//           variants={buttonVariants}
//           initial="hidden"
//           whileInView="show"
//           viewport={{ once: true }}
//         >
//           <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
//             <GradientButton
//               variant="contained"
//               onClick={() => navigate("/services")}
//               text="View All Services"
//             />
//           </Box>
//         </motion.div>
//       )}
//     </Container>
//   );
// };

// export default ServicesSection;


import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchServices } from "../../redux/servicesSlice";
import { Grid, Container, Typography, Box, Skeleton } from "@mui/material";
import ServiceCard from "../ServiceCard";
import { useNavigate } from "react-router-dom";
import GradientButton from "../GradientButton";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const headingVariants = {
  hidden: { opacity: 0, y: -20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const buttonVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.4, delay: 0.2 } },
};

// Home-page teaser: first `limit` services, all rendered as "regular" cards.
const ServicesSection = ({ limit = 4, sx = {} }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: services = [], loading, fetched } = useSelector((state) => state.services);

  useEffect(() => {
    if (!fetched && !loading && services.length === 0) dispatch(fetchServices());
  }, [dispatch, fetched, loading, services.length]);

  const visibleServices = services.filter(
    (service) => service?.visible === true || service?.visible === "true"
  );
  const displayedServices = visibleServices.slice(0, limit);
  const hasMore = visibleServices.length > limit;

  return (
    <Container maxWidth="lg" sx={{ my: 4, ...sx }}>
      <motion.div variants={headingVariants} initial="hidden" whileInView="show" viewport={{ once: true }}>
        <Box sx={{ textAlign: "center", py: { xs: 6, md: 8 } }}>
          <Typography component="h2" variant="h3" sx={{ fontWeight: "bold", color: "common.white", mb: 2 }}>
            Our Features & Services
          </Typography>
        </Box>
      </motion.div>

      <motion.div variants={containerVariants} initial="hidden" whileInView="show" viewport={{ once: true }}>
        <Grid container rowSpacing={{ xs: 2, md: 3 }} columnSpacing={{ xs: 2, md: 3 }} justifyContent="center">
          {loading
            ? [...Array(limit)].map((_, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Skeleton
                    variant="rounded"
                    height={280}
                    sx={{ bgcolor: "rgba(255,255,255,0.08)" }}
                  />
                </Grid>
              ))
            : displayedServices.map((service) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={3}
                  key={service._id || service.id}
                  component={motion.div}
                  variants={cardVariants}
                >
                  <ServiceCard
                    service={service}
                    variant="regular"
                    onOpen={() => navigate("/contact")}
                  />
                </Grid>
              ))}
        </Grid>
      </motion.div>

      {hasMore && (
        <motion.div variants={buttonVariants} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
            <GradientButton variant="contained" onClick={() => navigate("/services")} text="View All Services" />
          </Box>
        </motion.div>
      )}
    </Container>
  );
};

export default ServicesSection;