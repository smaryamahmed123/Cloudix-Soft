import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Rating,
  Button,
} from "@mui/material";

const backendURL =
  import.meta.env.VITE_BACKEND_URL;

const Testimonials = () => {
  const [testimonials, setTestimonials] =
    useState([]);

  const fetchTestimonials = async () => {
    try {
      const res = await axios.get(
        `${backendURL}/api/testimonials/published`
      );

      setTestimonials(
        res.data.slice(0, 6)
      );
    } catch (error) {
      console.error(
        "Failed to load testimonials:",
        error
      );
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  if (!testimonials.length) {
    return null;
  }

  return (
    <Box
      sx={{
        py: {
          xs: 7,
          md: 10,
        },
        backgroundColor: "#f9f9f9",
      }}
    >
      <Container maxWidth="xl">

        {/* Heading */}

        <Box
          textAlign="center"
          maxWidth={700}
          mx="auto"
          mb={6}
        >
          <Typography
            sx={{
              color: "#769914",
              fontWeight: 700,
              textTransform:
                "uppercase",
              letterSpacing: 2,
              mb: 1,
            }}
          >
            Client Feedback
          </Typography>

          <Typography
            variant="h2"
            sx={{
              color: "#111E2C",
              fontWeight: 800,
              fontSize: {
                xs: "2rem",
                md: "3rem",
              },
            }}
          >
            What Our Clients Say
          </Typography>

          <Typography
            color="text.secondary"
            mt={2}
          >
            Hear directly from the people
            and businesses we've worked with.
          </Typography>
        </Box>

        {/* Cards */}

        <Grid
          container
          spacing={3}
        >
          {testimonials.map(
            (testimonial) => (
              <Grid
                item
                xs={12}
                md={6}
                lg={4}
                key={testimonial._id}
              >
                <Card
                  sx={{
                    height: "100%",
                    borderRadius: 4,
                    overflow: "hidden",
                    border:
                      "1px solid rgba(17,30,44,0.08)",
                    boxShadow:
                      "0 10px 30px rgba(0,0,0,0.06)",
                  }}
                >
                  {/* Video */}

                  {testimonial.type ===
                    "video" &&
                    testimonial.video && (
                      <Box
                        sx={{
                          backgroundColor:
                            "#111E2C",
                        }}
                      >
                        <video
                          src={
                            testimonial.video
                          }
                          controls
                          preload="metadata"
                          style={{
                            width: "100%",
                            display:
                              "block",
                            aspectRatio:
                              "16/9",
                            objectFit:
                              "cover",
                          }}
                        />
                      </Box>
                    )}

                  <CardContent
                    sx={{ p: 3 }}
                  >
                    <Box
                      display="flex"
                      alignItems="center"
                      gap={2}
                      mb={2}
                    >
                      <Avatar
                        src={
                          testimonial.clientImage
                        }
                        alt={
                          testimonial.clientName
                        }
                        sx={{
                          width: 56,
                          height: 56,
                        }}
                      >
                        {testimonial.clientName?.charAt(
                          0
                        )}
                      </Avatar>

                      <Box>
                        <Typography
                          fontWeight={800}
                        >
                          {
                            testimonial.clientName
                          }
                        </Typography>

                        <Typography
                          variant="body2"
                          color="text.secondary"
                        >
                          {
                            testimonial.position
                          }
                          {testimonial.position &&
                            testimonial.companyName &&
                            " • "}
                          {
                            testimonial.companyName
                          }
                        </Typography>
                      </Box>
                    </Box>

                    <Rating
                      value={
                        testimonial.rating
                      }
                      readOnly
                      size="small"
                    />

                    <Typography
                      sx={{
                        mt: 2,
                        color: "#555",
                        lineHeight: 1.8,
                        fontStyle:
                          "italic",
                      }}
                    >
                      "{testimonial.text}"
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            )
          )}
        </Grid>

        {/* Optional button */}

        {testimonials.length >= 6 && (
          <Box
            textAlign="center"
            mt={5}
          >
            <Button
              variant="outlined"
              sx={{
                borderColor:
                  "#769914",
                color: "#769914",
                borderRadius: 2,
                px: 4,
                "&:hover": {
                  borderColor:
                    "#769914",
                  backgroundColor:
                    "rgba(118,153,20,0.08)",
                },
              }}
            >
              View All Testimonials
            </Button>
          </Box>
        )}

      </Container>
    </Box>
  );
};

export default Testimonials;