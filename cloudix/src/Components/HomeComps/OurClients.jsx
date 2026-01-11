// import React, { useEffect, useState } from "react";
// import { Box, Container, Typography, Grid } from "@mui/material";
// import axios from "axios";

// const backendURL = import.meta.env.VITE_BACKEND_URL;

// export default function OurClients() {
//   const [clients, setClients] = useState([]);

//   useEffect(() => {
//     axios
//       .get(`${backendURL}/api/logos`)
//       .then((res) => {
//         const firstFour = res.data.slice(0, 4); // 👈 get only first 4
//         setClients(firstFour);
//       })
//       .catch((err) => console.error("Error fetching clients:", err));
//   }, []);

//   return (
//     <Box sx={{ py: { xs: 6, md: 4 }, bgcolor: "transparent" }}>
//       <Container>
//         <Typography
//           variant="h4"
//           sx={{
//             fontWeight: 800,
//             color: "#111E2C",
//             textAlign: "center",
//             mb: 2,
//             fontSize: "2rem",
//           }}
//         >
//           Our Clients
//         </Typography>

//         <Grid container spacing={4} justifyContent="center" alignItems="center">
//           {clients.map((client, index) => (
//             <Grid
//               key={index}
//               sx={{
//                 gridColumn: { xs: "span 12", md: "span 6" },
//                 display: "flex",
//                 justifyContent: "center",
//               }}
//             >
//               <img
//                 src={client.image} // 👈 assuming API returns `image` URL field
//                 alt={client.title || client.name}
//                 style={{
//                   maxHeight: 180,
//                   objectFit: "contain",
//                 }}
//               />
//             </Grid>
//           ))}
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
} from "@mui/material";
import axios from "axios";

const backendURL = import.meta.env.VITE_BACKEND_URL;

export default function OurClients() {
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

  return (
    <Box
      component="section"
      aria-labelledby="our-clients-heading"
      sx={{ py: { xs: 6, md: 4 } }}
    >
      <Container>
        <Typography
          id="our-clients-heading"
          component="h2"
          sx={{
            fontWeight: 800,
            color: "#111E2C",
            textAlign: "center",
            mb: 4,
            fontSize: "2rem",
          }}
        >
          Our Clients
        </Typography>

        <Grid
          container
          spacing={4}
          justifyContent="center"
          alignItems="center"
        >
          {loading &&
            Array.from({ length: 4 }).map((_, i) => (
              <Grid item xs={12} sm={6} key={i} textAlign="center">
                <Skeleton
                  variant="rectangular"
                  width={220}
                  height={120}
                  sx={{ mx: "auto", borderRadius: 2 }}
                />
              </Grid>
            ))}

          {!loading && !error &&
            clients.map((client, index) => (
              <Grid
                item
                xs={12}
                sm={6}
                key={client._id || index}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Box
                  component="img"
                  src={client.image}
                  alt={
                    client.title ||
                    client.name ||
                    "Client company logo"
                  }
                  loading="lazy"
                  decoding="async"
                  width={220}
                  height={120}
                  sx={{
                    objectFit: "contain",
                    filter: "grayscale(100%)",
                    transition: "filter 0.3s ease",
                    "&:hover": {
                      filter: "grayscale(0%)",
                    },
                  }}
                />
              </Grid>
            ))}

          {!loading && error && (
            <Typography
              sx={{ textAlign: "center", color: "text.secondary" }}
            >
              Unable to load client logos at the moment.
            </Typography>
          )}
        </Grid>
      </Container>
    </Box>
  );
}
