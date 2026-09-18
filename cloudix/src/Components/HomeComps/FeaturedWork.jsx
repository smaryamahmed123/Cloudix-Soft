import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Chip,
} from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import { motion } from "framer-motion";

const backendURL = import.meta.env.VITE_BACKEND_URL;

export default function FeaturedWork() {
  const [items, setItems] = useState([]);
  const [category, setCategory] = useState("all");

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const [websitesRes, logosRes, postsRes] =
          await Promise.all([
            axios.get(`${backendURL}/api/websites`),
            axios.get(`${backendURL}/api/logos`),
            axios.get(`${backendURL}/api/posts`),
          ]);

        const websites = websitesRes.data.map((item) => ({
          ...item,
          portfolioType: "websites",
        }));

        const logos = logosRes.data.map((item) => ({
          ...item,
          portfolioType: "logos",
        }));

        const posts = postsRes.data.map((item) => ({
          ...item,
          portfolioType: "posts",
        }));

        const combined = [
          ...websites,
          ...logos,
          ...posts,
        ];

        setItems(combined.slice(0, 6));
      } catch (error) {
        console.error(
          "Failed to fetch featured work:",
          error
        );
      }
    };

    fetchPortfolio();
  }, []);

  const filteredItems =
    category === "all"
      ? items
      : items.filter(
          (item) =>
            item.portfolioType === category
        );

  return (
    <Box
      sx={{
        py: { xs: 7, md: 10 },
        backgroundColor: "#f9f9f9",
      }}
    >
      <Container maxWidth="xl">

        {/* Heading */}

        <Box
          textAlign="center"
          mb={5}
        >
          <Typography
            sx={{
              color: "#769914",
              fontWeight: 700,
              fontSize: "14px",
              letterSpacing: 2,
              textTransform: "uppercase",
              mb: 1,
            }}
          >
            Our Work
          </Typography>

          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              color: "#111E2C",
              fontSize: {
                xs: "32px",
                md: "48px",
              },
            }}
          >
            Featured Projects
          </Typography>

          <Typography
            sx={{
              mt: 2,
              maxWidth: 650,
              mx: "auto",
              color: "#666",
            }}
          >
            Explore some of the digital experiences,
            websites and creative designs we've
            created for our clients.
          </Typography>
        </Box>

        {/* Filters */}

        <Box
          display="flex"
          justifyContent="center"
          gap={1}
          flexWrap="wrap"
          mb={5}
        >
          {[
            ["all", "All"],
            ["websites", "Websites"],
            ["logos", "Logo Designs"],
            ["posts", "Post Designs"],
          ].map(([value, label]) => (
            <Chip
              key={value}
              label={label}
              onClick={() => setCategory(value)}
              sx={{
                px: 1,
                py: 2.5,
                fontWeight: 700,
                borderRadius: 2,
                backgroundColor:
                  category === value
                    ? "#769914"
                    : "#fff",
                color:
                  category === value
                    ? "#fff"
                    : "#111E2C",
                border:
                  category === value
                    ? "none"
                    : "1px solid #ddd",
                "&:hover": {
                  backgroundColor:
                    category === value
                      ? "#657f11"
                      : "#f1f1f1",
                },
              }}
            />
          ))}
        </Box>

        {/* Projects */}

        <Grid
          container
          spacing={3}
        >
          {filteredItems.map(
            (item, index) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                key={`${item._id}-${item.portfolioType}`}
              >
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 30,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.08,
                  }}
                >
                  <Card
                    sx={{
                      borderRadius: 3,
                      overflow: "hidden",
                      height: "100%",
                      boxShadow:
                        "0 8px 30px rgba(0,0,0,0.08)",
                      transition:
                        "0.3s ease",
                      "&:hover": {
                        transform:
                          "translateY(-6px)",
                        boxShadow:
                          "0 15px 40px rgba(0,0,0,0.14)",
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={
                        item.image
                      }
                      alt={
                        item.title ||
                        item.clientName ||
                        "Cloudix Soft project"
                      }
                      sx={{
                        height: 260,
                        objectFit:
                          "cover",
                      }}
                    />

                    <CardContent>
                      <Typography
                        variant="h6"
                        fontWeight={800}
                        color="#111E2C"
                      >
                        {item.title ||
                          item.clientName}
                      </Typography>

                      <Typography
                        sx={{
                          mt: 1,
                          color:
                            "#769914",
                          fontWeight: 600,
                          textTransform:
                            "capitalize",
                        }}
                      >
                        {item.portfolioType ===
                        "websites"
                          ? "Website Design"
                          : item.portfolioType ===
                            "logos"
                          ? "Logo Design"
                          : "Post Design"}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            )
          )}
        </Grid>

        {/* View All */}

        <Box
          textAlign="center"
          mt={6}
        >
          <Button
            variant="contained"
            href="/portfolio"
            endIcon={<ArrowForward />}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 2,
              backgroundColor:
                "#111E2C",
              fontWeight: 700,
              "&:hover": {
                backgroundColor:
                  "#769914",
              },
            }}
          >
            View All Projects
          </Button>
        </Box>

      </Container>
    </Box>
  );
}