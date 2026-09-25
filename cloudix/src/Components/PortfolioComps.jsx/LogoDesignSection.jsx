// import React, { useEffect, useState, useCallback } from "react";
// import {
//   Box, Typography, Grid, Card, CardMedia,
//   Container, CircularProgress, Skeleton, useTheme,
// } from "@mui/material";
// import axios from "axios";
// import { motion } from "framer-motion";

// const backendURL = import.meta.env.VITE_BACKEND_URL;
// const MotionBox = motion(Box);

// const cardVariants = {
//   hidden: { opacity: 0, scale: 0.85, y: 40 },
//   visible: { opacity: 1, scale: 1, y: 0 },
//   hover: { scale: 1.08 },
// };

// // ✅ Skeleton for logo grid
// const LogoSkeleton = () => (
//   <Grid container spacing={4} justifyContent="center">
//     {[...Array(8)].map((_, i) => (
//       <Grid item xs={12} sm={6} md={4} lg={3} key={i} display="flex" justifyContent="center">
//         <Skeleton
//           variant="rounded"
//           width={220}
//           height={220}
//           sx={{ borderRadius: 3, bgcolor: "#C6C7C8" }}
//         />
//       </Grid>
//     ))}
//   </Grid>
// );

// const LogoDesignSection = () => {
//   const theme = useTheme();
//   const [logos, setLogos] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(false);

//   const fetchLogos = useCallback(async () => {
//     try {
//       const res = await axios.get(`${backendURL}/api/logos`);
//       setLogos(res.data || []);
//     } catch (err) {
//       console.error("Failed to fetch logos:", err);
//       setError(true);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchLogos();
//   }, [fetchLogos]);

//   return (
//     <Box id="logos" sx={{ bgcolor: "#D9D9D9", position: "relative", zIndex: 2, pb: 10 }}>
//       <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 }, }}>

//         <Typography
//           variant="h2"
//           align="center"
//           sx={{
//             fontWeight: theme.typography.h2.fontWeight,
//             mb: 6,
//             color: theme.palette.primary.dark,   // ✅ theme
//           }}
//         >
//           Logo Design
//         </Typography>

//         {/* ✅ Skeleton */}
//         {loading && <LogoSkeleton />}

//         {/* Error */}
//         {!loading && error && (
//           <Typography align="center" color="error">
//             Failed to load logos. Please try again later.
//           </Typography>
//         )}

//         {/* Logos Grid */}
//         {!loading && !error && (
//           <Grid container spacing={4} justifyContent="center">
//             {logos.map((logo, index) => (
//               <Grid
//                 item
//                 xs={12} sm={6} md={4} lg={3}
//                 key={logo._id || index}
//                 display="flex"
//                 justifyContent="center"
//               >
//                 <MotionBox
//                   variants={cardVariants}
//                   initial="hidden"
//                   whileInView="visible"
//                   whileHover="hover"
//                   viewport={{ once: true }}
//                   transition={{ duration: 0.4, delay: index * 0.08 }}
//                 >
//                   <Card
//                     sx={{
//                       borderRadius: 3,
//                       p: 2,
//                       width: 220,
//                       height: 220,
//                       display: "flex",
//                       justifyContent: "center",
//                       alignItems: "center",
//                       bgcolor: "#C6C7C8",
//                       boxShadow: `5px 5px 12px ${theme.palette.primary.dark}E6`,  // ✅ theme
//                       transition: "transform 0.3s ease",
//                     }}
//                   >
//                     <CardMedia
//                       component="img"
//                       src={logo.image}
//                       alt={logo.title || "Logo design"}
//                       loading="lazy"
//                       sx={{ maxWidth: 160, maxHeight: 160, objectFit: "contain" }}
//                     />
//                   </Card>
//                 </MotionBox>
//               </Grid>
//             ))}
//           </Grid>
//         )}

//       </Container>
//     </Box>
//   );
// };

// export default LogoDesignSection;
import React, { useEffect, useState, useCallback } from "react";
import {
  Box, Typography, Grid, Card, CardMedia,
  Container, Skeleton, useTheme, Stack,
} from "@mui/material";
import axios from "axios";
import { motion } from "framer-motion";

const backendURL = import.meta.env.VITE_BACKEND_URL;
const MotionBox = motion(Box);

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 24 },
  visible: { opacity: 1, scale: 1, y: 0 },
  hover: { scale: 1.04 },
};

// Skeleton matching the new flatter card proportions (wider than tall)
const LogoSkeleton = () => (
  <Grid container spacing={{ xs: 1.5, sm: 2, md: 3 }}>
    {[...Array(8)].map((_, i) => (
      <Grid item xs={6} sm={6} md={3} key={i}>
        <Skeleton
          variant="rounded"
          height={140}
          sx={{ borderRadius: 2, bgcolor: "#E9EBEC" }}
        />
      </Grid>
    ))}
  </Grid>
);

const LogoDesignSection = () => {
  const theme = useTheme();
  const [logos, setLogos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchLogos = useCallback(async () => {
    try {
      const res = await axios.get(`${backendURL}/api/logos`);
      setLogos(res.data || []);
    } catch (err) {
      console.error("Failed to fetch logos:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLogos();
  }, [fetchLogos]);

  return (
    <Box id="logos" sx={{ bgcolor: theme.palette.background.subtle, position: "relative", zIndex: 2 }}>
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>

        {/* Header: eyebrow + title + subtitle. No "View All" CTA — this section
            already renders every logo, so there's nowhere for that link to go. */}
        <Box sx={{ mb: 5 }}>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1.5 }}>
            <Box sx={{ width: 24, height: 2, bgcolor: theme.palette.primary.main }} />
            <Typography
              variant="overline"
              sx={{
                color: theme.palette.primary.main,
                fontWeight: 600,
                letterSpacing: "0.08em",
              }}
            >
              LOGO DESIGN
            </Typography>
          </Stack>

          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              color: theme.palette.primary.dark,
              mb: 1,
            }}
          >
            Logos That Build Brands
          </Typography>

          <Typography
            variant="body1"
            sx={{ color: theme.palette.text.secondary, maxWidth: 480 }}
          >
            Clean, memorable and meaningful logos designed to make your
            brand stand out.
          </Typography>
        </Box>

        {loading && <LogoSkeleton />}

        {!loading && error && (
          <Typography align="center" color="error">
            Failed to load logos. Please try again later.
          </Typography>
        )}

        {!loading && !error && (
          <Grid container spacing={4} justifyContent="center">
            {logos.map((logo, index) => (
              <Grid
                item xs={12} sm={6} md={4} lg={3}
                key={logo._id || index}
                display="flex"
                justifyContent="center"
              >
                <MotionBox
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  whileHover="hover"
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: index * 0.06 }}
                >
                  <Card
                    elevation={0}
                    sx={{
                      borderRadius: 2,
                      height: 140,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      px: 2,
                      bgcolor: "#EEF0F1",
                      border: "1px solid #E2E4E6",
                      transition: "border-color 0.25s ease, box-shadow 0.25s ease",
                      "&:hover": {
                        borderColor: theme.palette.primary.main,
                        boxShadow: `0 6px 16px ${theme.palette.primary.dark}1A`,
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      src={logo.image}
                      alt={logo.title || "Logo design"}
                      loading="lazy"
                      sx={{ maxWidth: "80%", maxHeight: 70, objectFit: "contain" }}
                    />
                  </Card>
                </MotionBox>
              </Grid>
            ))}
          </Grid>
        )}

      </Container>
    </Box>
  );
};

export default LogoDesignSection;