import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Skeleton,
  useTheme,
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

  return (
    <Box
      component="section"
      aria-labelledby="our-clients-heading"
      sx={{ py: { xs: 6, md: 4 } }}
    >
      <Container maxwidth="lg">
        <Typography
          id="our-clients-heading"
          variant="h3"
          sx={{
            color: theme.palette.primary.dark,
            textAlign: "center",
            mb: 4,
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
                    maxHeight: 180,
                    objectFit: "contain",
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
