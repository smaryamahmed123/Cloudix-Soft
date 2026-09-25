// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Container,
//   Typography,
//   Grid,
//   Skeleton,
//   useTheme,
// } from "@mui/material";
// import axios from "axios";

// const backendURL = import.meta.env.VITE_BACKEND_URL;

// export default function OurClients() {
//   const theme = useTheme();
//   const [clients, setClients] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(false);

//   useEffect(() => {
//     const controller = new AbortController();

//     async function fetchClients() {
//       try {
//         const res = await axios.get(`${backendURL}/api/logos`, {
//           signal: controller.signal,
//         });

//         setClients(Array.isArray(res.data) ? res.data.slice(0, 4) : []);
//       } catch (err) {
//         if (!axios.isCancel(err)) {
//           console.error("Error fetching clients:", err);
//           setError(true);
//         }
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchClients();

//     return () => controller.abort();
//   }, []);

//   return (
//     <Box
//       component="section"
//       aria-labelledby="our-clients-heading"
//       sx={{ py: { xs: 6, md: 10 }, }}
//     >
//       <Container maxwidth="lg">
//         <Typography
//           id="our-clients-heading"
//           variant="h3"
//           sx={{
//             color: theme.palette.primary.dark,
//             textAlign: "center",
//             mb: 4,
//           }}
//         >
//           Our Clients
//         </Typography>

//         <Grid
//           container
//           spacing={4}
//           justifyContent="center"
//           alignItems="center"
//         >
//           {loading &&
//             Array.from({ length: 4 }).map((_, i) => (
//               <Grid item xs={12} sm={6} key={i} textAlign="center">
//                 <Skeleton
//                   variant="rectangular"
//                   width={220}
//                   height={120}
//                   sx={{ mx: "auto", borderRadius: 2 }}
//                 />
//               </Grid>
//             ))}

//           {!loading && !error &&
//             clients.map((client, index) => (
//               <Grid
//                 item
//                 xs={12}
//                 sm={6}
//                 key={client._id || index}
//                 display="flex"
//                 justifyContent="center"
//                 alignItems="center"
//               >
//                 <Box
//                   component="img"
//                   src={client.image}
//                   alt={
//                     client.title ||
//                     client.name ||
//                     "Client company logo"
//                   }
//                   loading="lazy"
//                   decoding="async"
//                   width={220}
//                   height={120}
//                   sx={{
//                     maxHeight: 180,
//                     objectFit: "contain",
//                   }}
//                 />
//               </Grid>
//             ))}

//           {!loading && error && (
//             <Typography
//               sx={{ textAlign: "center", color: "text.secondary" }}
//             >
//               Unable to load client logos at the moment.
//             </Typography>
//           )}
//         </Grid>
//       </Container>
//     </Box>
//   );
// }

import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Skeleton,
  useTheme,
  alpha,
} from "@mui/material";
import axios from "axios";

const backendURL = import.meta.env.VITE_BACKEND_URL;

export default function OurClients() {
  const theme = useTheme();
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchClients() {
      try {
        const res = await axios.get(`${backendURL}/api/logos`, {
          signal: controller.signal,
        });

        setClients(Array.isArray(res.data) ? res.data.slice(0, 4) : []);
      } catch (err) {
        if (!axios.isCancel(err)) {
          console.error("Error fetching clients:", err);
          setError(true);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchClients();

    return () => controller.abort();
  }, []);

  // Nothing to show and nothing broken: don't render an empty section
  if (!loading && !error && clients.length === 0) return null;

  return (
    <Box
      component="section"
      aria-labelledby="our-clients-heading"
      sx={{ py: { xs: 7, md: 10 }, bgcolor: theme.palette.background.subtle }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: { xs: 4, md: 5 } }}>
          {/* ================= EYEBROW (inline) ================= */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1.5,
              mb: 1.5,
            }}
          >
            <Box
              sx={{
                width: { xs: 28, md: 38 },
                height: 2,
                borderRadius: 5,
                bgcolor: theme.palette.primary.main,
              }}
            />
            <Typography
              sx={{
                color: theme.palette.primary.main,
                fontWeight: 700,
                fontSize: { xs: "11px", md: "13px" },
                letterSpacing: 1.8,
                textTransform: "uppercase",
              }}
            >
              Trusted By
            </Typography>
          </Box>

          <Typography
            id="our-clients-heading"
            component="h2"
            variant="h3"
            sx={{ color: theme.palette.primary.dark }}
          >
            Our Clients
          </Typography>
        </Box>

        {error ? (
          <Typography sx={{ textAlign: "center", color: "text.secondary" }}>
            Unable to load client logos at the moment.
          </Typography>
        ) : (
          <Grid container spacing={3} justifyContent="center" alignItems="stretch">
            {(loading ? Array.from({ length: 4 }) : clients).map((client, index) => (
              <Grid
                item
                xs={6}
                md={3}
                key={client?._id || index}
                display="flex"
              >
                <Box
                  sx={{
                    width: "100%",
                    height: 120,
                    p: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 3,
                    bgcolor: "#fff",
                    border: `1px solid ${alpha(theme.palette.primary.dark, 0.08)}`,
                    boxShadow: `0 8px 24px ${alpha(theme.palette.primary.dark, 0.05)}`,
                    transition: "border-color .25s, box-shadow .25s, transform .25s",
                    "&:hover": {
                      borderColor: theme.palette.primary.main,
                      boxShadow: `0 12px 32px ${alpha(theme.palette.primary.dark, 0.1)}`,
                      transform: "translateY(-3px)",
                    },
                  }}
                >
                  {loading ? (
                    <Skeleton variant="rounded" width="70%" height={64} />
                  ) : (
                    <Box
                      component="img"
                      src={client.image}
                      alt={client.title || client.name || "Client company logo"}
                      loading="lazy"
                      decoding="async"
                      sx={{
                        maxWidth: "100%",
                        maxHeight: 80,
                        objectFit: "contain",
                      }}
                    />
                  )}
                </Box>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}