import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Container,
  Typography,
  CircularProgress,
} from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import GradientButton from "../GradientButton";

const backendURL = import.meta.env.VITE_BACKEND_URL;

const MotionBox = motion(Box);

export default function FeaturedWork() {
  const navigate = useNavigate();

  const [website, setWebsite] = useState(null);
  const [logo, setLogo] = useState(null);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedWork = async () => {
      try {
        const [websitesRes, logosRes, postsRes] =
          await Promise.all([
            axios.get(`${backendURL}/api/websites`),
            axios.get(`${backendURL}/api/logos`),
            axios.get(`${backendURL}/api/posts`),
          ]);

        const websites = Array.isArray(websitesRes.data)
          ? websitesRes.data
          : [];

        const logos = Array.isArray(logosRes.data)
          ? logosRes.data
          : [];

        const posts = Array.isArray(postsRes.data)
          ? postsRes.data
          : [];

        /*
         * First item from each portfolio category
         * is displayed as featured work.
         */
        setWebsite(websites[0] || null);
        setLogo(logos[0] || null);
        setPost(posts[0] || null);
      } catch (error) {
        console.error(
          "Failed to load featured portfolio:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedWork();
  }, []);

  /* ============================================================
     LOADING
  ============================================================ */

  if (loading) {
    return (
      <Box
        sx={{
          py: { xs: 8, md: 12 },
          backgroundColor: "#f9f9f9",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: 300,
        }}
      >
        <CircularProgress
          sx={{
            color: "#769914",
          }}
        />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: "#f9f9f9",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* ======================================================
            SECTION HEADING
        ====================================================== */}

        <MotionBox
          initial={{
            opacity: 0,
            y: 35,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.7,
          }}
          sx={{
            textAlign: "center",
            mb: {
              xs: 5,
              md: 7,
            },
          }}
        >
          <Typography
            sx={{
              color: "#769914",
              fontSize: {
                xs: "12px",
                md: "14px",
              },
              fontWeight: 800,
              letterSpacing: 3,
              textTransform: "uppercase",
              mb: 1.5,
            }}
          >
            Our Work
          </Typography>

          <Typography
            component="h2"
            sx={{
              color: "#111E2C",
              fontSize: {
                xs: "32px",
                sm: "40px",
                md: "50px",
              },
              lineHeight: 1.1,
              fontWeight: 800,
            }}
          >
            Featured{" "}
            <Box
              component="span"
              sx={{
                color: "#769914",
              }}
            >
              Projects
            </Box>
          </Typography>

          <Typography
            sx={{
              mt: 2,
              maxWidth: 650,
              mx: "auto",
              color: "#687386",
              fontSize: {
                xs: "14px",
                sm: "15px",
                md: "16px",
              },
              lineHeight: 1.7,
            }}
          >
            Explore some of the websites, logos and creative
            designs we've created for our clients.
          </Typography>
        </MotionBox>

        {/* ======================================================
            WEBSITE FEATURED PROJECT
        ====================================================== */}

        {website && (
          <MotionBox
            initial={{
              opacity: 0,
              y: 50,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.7,
            }}
            onClick={() =>
              navigate("/portfolio#websites")
            }
            sx={{
              position: "relative",
              height: {
                xs: 360,
                sm: 420,
                md: 450,
              },
              borderRadius: {
                xs: 3,
                md: 4,
              },
              overflow: "hidden",
              mb: 3,
              boxShadow:
                "0 15px 45px rgba(17,30,44,0.16)",
              cursor: "pointer",

              "&:hover .website-image": {
                transform: "scale(1.05)",
              },
            }}
          >
            {/* Website Image */}

            <Box
              className="website-image"
              component="img"
              src={website.image}
              alt={
                website.title ||
                "Website project"
              }
              loading="lazy"
              sx={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition:
                  "transform 0.6s ease",
              }}
            />

            {/* Dark Overlay */}

            <Box
              sx={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(90deg, rgba(5,15,29,0.95) 0%, rgba(5,15,29,0.72) 40%, rgba(5,15,29,0.15) 100%)",
              }}
            />

            {/* Website Content */}

            <Box
              sx={{
                position: "relative",
                zIndex: 2,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "flex-start",
                px: {
                  xs: 3,
                  sm: 5,
                  md: 6,
                },
                maxWidth: {
                  xs: "100%",
                  md: "55%",
                },
              }}
            >
              {/* Label */}

              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 1,
                  backgroundColor: "#769914",
                  color: "#fff",
                  px: 2,
                  py: 0.8,
                  borderRadius: "999px",
                  mb: 2.5,
                }}
              >
                <OpenInNewIcon
                  sx={{
                    fontSize: 16,
                  }}
                />

                <Typography
                  sx={{
                    fontSize: "11px",
                    fontWeight: 800,
                    letterSpacing: 1,
                  }}
                >
                  WEBSITE PROJECT
                </Typography>
              </Box>

              {/* Title */}

              <Typography
                component="h3"
                sx={{
                  color: "#fff",
                  fontWeight: 800,
                  fontSize: {
                    xs: "27px",
                    sm: "34px",
                    md: "40px",
                  },
                  lineHeight: 1.15,
                  mb: 2,
                }}
              >
                {website.title ||
                  "Website Project"}
              </Typography>

              {/* Description */}

              <Typography
                sx={{
                  color:
                    "rgba(255,255,255,0.78)",
                  fontSize: {
                    xs: "14px",
                    sm: "15px",
                  },
                  lineHeight: 1.7,
                  mb: 3,
                  maxWidth: 470,
                }}
              >
                A modern, responsive website
                designed to create a strong
                digital presence and engaging
                user experience.
              </Typography>

              {/* =================================================
                  LIVE WEBSITE BUTTON

                  stopPropagation prevents the parent card
                  from navigating to /portfolio#websites.
              ================================================= */}

              {website.link && (
                <GradientButton
                  text="VIEW PROJECT"
                  size="medium"
                  onClick={(event) => {
                    event?.stopPropagation();

                    window.open(
                      website.link,
                      "_blank",
                      "noopener,noreferrer"
                    );
                  }}
                />
              )}
            </Box>
          </MotionBox>
        )}

        {/* ======================================================
            LOGO + POST
        ====================================================== */}

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "1fr 1fr",
            },
            gap: 3,
          }}
        >
          {/* ====================================================
              LOGO DESIGN
          ==================================================== */}

          {logo && (
            <MotionBox
              component="button"
              type="button"
              onClick={() =>
                navigate("/portfolio#logos")
              }
              initial={{
                opacity: 0,
                y: 50,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.7,
                delay: 0.1,
              }}
              sx={{
                position: "relative",
                width: "100%",
                height: {
                  xs: 330,
                  sm: 380,
                  md: 390,
                },
                border: 0,
                padding: 0,
                borderRadius: 4,
                overflow: "hidden",
                cursor: "pointer",
                textAlign: "left",
                background: "none",
                boxShadow:
                  "0 12px 35px rgba(17,30,44,0.14)",

                "&:hover .portfolio-image": {
                  transform: "scale(1.06)",
                },
              }}
            >
              {/* Logo Image */}

              <Box
                className="portfolio-image"
                component="img"
                src={logo.image}
                alt={
                  logo.title ||
                  "Logo design"
                }
                loading="lazy"
                sx={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition:
                    "transform 0.6s ease",
                }}
              />

              {/* Overlay */}

              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, rgba(0,0,0,0.05) 25%, rgba(8,18,32,0.94) 100%)",
                }}
              />

              {/* Label */}

              <Box
                sx={{
                  position: "absolute",
                  top: 20,
                  left: 20,
                  px: 2,
                  py: 0.8,
                  borderRadius: "999px",
                  backgroundColor:
                    "rgba(17,30,44,0.8)",
                  border:
                    "1px solid rgba(255,255,255,0.35)",
                  backdropFilter:
                    "blur(8px)",
                }}
              >
                <Typography
                  sx={{
                    color: "#fff",
                    fontSize: "11px",
                    fontWeight: 800,
                    letterSpacing: 1,
                  }}
                >
                  LOGO DESIGN
                </Typography>
              </Box>

              {/* Bottom Content */}

              <Box
                sx={{
                  position: "absolute",
                  bottom: 22,
                  left: 22,
                  right: 22,
                }}
              >
                <Typography
                  component="h3"
                  sx={{
                    color: "#fff",
                    fontWeight: 800,
                    fontSize: {
                      xs: "22px",
                      sm: "25px",
                    },
                    mb: 0.8,
                  }}
                >
                  Logo Design
                </Typography>

                <Typography
                  sx={{
                    color:
                      "rgba(255,255,255,0.72)",
                    fontSize: "13px",
                  }}
                >
                  Creative identity for your
                  brand.
                </Typography>
              </Box>
            </MotionBox>
          )}

          {/* ====================================================
              POST DESIGN
          ==================================================== */}

          {post && (
            <MotionBox
              component="button"
              type="button"
              onClick={() =>
                navigate("/portfolio#posts")
              }
              initial={{
                opacity: 0,
                y: 50,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.7,
                delay: 0.2,
              }}
              sx={{
                position: "relative",
                width: "100%",
                height: {
                  xs: 330,
                  sm: 380,
                  md: 390,
                },
                border: 0,
                padding: 0,
                borderRadius: 4,
                overflow: "hidden",
                cursor: "pointer",
                textAlign: "left",
                background: "none",
                boxShadow:
                  "0 12px 35px rgba(17,30,44,0.14)",

                "&:hover .portfolio-image": {
                  transform: "scale(1.06)",
                },
              }}
            >
              {/* Post Image */}

              <Box
                className="portfolio-image"
                component="img"
                src={post.image}
                alt={
                  post.title ||
                  "Post design"
                }
                loading="lazy"
                sx={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition:
                    "transform 0.6s ease",
                }}
              />

              {/* Overlay */}

              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, rgba(0,0,0,0.05) 25%, rgba(8,18,32,0.94) 100%)",
                }}
              />

              {/* Label */}

              <Box
                sx={{
                  position: "absolute",
                  top: 20,
                  left: 20,
                  px: 2,
                  py: 0.8,
                  borderRadius: "999px",
                  backgroundColor:
                    "rgba(17,30,44,0.8)",
                  border:
                    "1px solid rgba(255,255,255,0.35)",
                  backdropFilter:
                    "blur(8px)",
                }}
              >
                <Typography
                  sx={{
                    color: "#fff",
                    fontSize: "11px",
                    fontWeight: 800,
                    letterSpacing: 1,
                  }}
                >
                  POST DESIGN
                </Typography>
              </Box>

              {/* Bottom Content */}

              <Box
                sx={{
                  position: "absolute",
                  bottom: 22,
                  left: 22,
                  right: 22,
                }}
              >
                <Typography
                  component="h3"
                  sx={{
                    color: "#fff",
                    fontWeight: 800,
                    fontSize: {
                      xs: "22px",
                      sm: "25px",
                    },
                    mb: 0.8,
                  }}
                >
                  Post Design
                </Typography>

                <Typography
                  sx={{
                    color:
                      "rgba(255,255,255,0.72)",
                    fontSize: "13px",
                  }}
                >
                  Engaging designs for social
                  media.
                </Typography>
              </Box>
            </MotionBox>
          )}
        </Box>

        {/* ======================================================
            VIEW FULL PORTFOLIO
        ====================================================== */}

        <MotionBox
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.6,
            delay: 0.2,
          }}
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: {
              xs: 5,
              md: 6,
            },
          }}
        >
          <GradientButton
            text="VIEW FULL PORTFOLIO"
            size="medium"
            onClick={() =>
              navigate("/portfolio")
            }
          />
        </MotionBox>
      </Container>
    </Box>
  );
}