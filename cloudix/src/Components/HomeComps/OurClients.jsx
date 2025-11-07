import React, { useEffect, useState } from "react";
import { Box, Container, Typography, Grid } from "@mui/material";
import axios from "axios";

const backendURL = import.meta.env.VITE_BACKEND_URL;

export default function OurClients() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    axios
      .get(`${backendURL}/api/logos`)
      .then((res) => {
        const firstFour = res.data.slice(0, 4); // 👈 get only first 4
        setClients(firstFour);
      })
      .catch((err) => console.error("Error fetching clients:", err));
  }, []);

  return (
    <Box sx={{ py: { xs: 6, md: 4 }, bgcolor: "transparent" }}>
      <Container>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            color: "#111E2C",
            textAlign: "center",
            mb: 2,
            fontSize: "2rem",
          }}
        >
          Our Clients
        </Typography>

        <Grid container spacing={4} justifyContent="center" alignItems="center">
          {clients.map((client, index) => (
            <Grid
              key={index}
              sx={{
                gridColumn: { xs: "span 12", md: "span 6" },
                display: "flex",
                justifyContent: "center",
              }}
            >
              <img
                src={client.image} // 👈 assuming API returns `image` URL field
                alt={client.title || client.name}
                style={{
                  maxHeight: 180,
                  objectFit: "contain",
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
