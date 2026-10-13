import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Container,
  Typography,
  Skeleton,
} from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import GradientButton from "../GradientButton";

const backendURL = import.meta.env.VITE_BACKEND_URL;

const MotionBox = motion(Box);

/* ============================================================
   FEATURED WORK SKELETON
============================================================ */

const FeaturedWorkSkeleton = () => {
  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: "#f9f9f9",
        overflow: "hidden",
      }}
    >
      <Container maxWidth="lg">

        {/* ================= SECTION HEADING ================= */}

        <Box
          sx={{
            textAlign: "center",
            mb: {
              xs: 5,
              md: 7,
            },
          }}
        >
          {/* Our Work */}

          <Skeleton
            variant="text"
            animation="wave"
            sx={{
              width: {
                xs: 90,
                sm: 105,
              },
              height: 24,
              mx: "auto",
              mb: 1,
            }}
          />

          {/* Featured Projects */}

          <Skeleton
            variant="text"
            animation="wave"
            sx={{
              width: {
                xs: 230,
                sm: 330,
                md: 400,
              },
              height: {
                xs: 48,
                sm: 58,
                md: 68,
              },
              mx: "auto",
            }}
          />

          {/* Description */}

          <Skeleton
            variant="text"
            animation="wave"
            sx={{
              width: {
                xs: "90%",
                sm: 500,
                md: 600,
              },
              height: 24,
              mx: "auto",
              mt: 1,
            }}
          />

          <Skeleton
            variant="text"
            animation="wave"
            sx={{
              width: {
                xs: "65%",
                sm: 400,
              },
              height: 24,
              mx: "auto",
            }}
          />
        </Box>

        {/* ================= WEBSITE SKELETON ================= */}

        <Box
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
          }}
        >
          <Skeleton
            variant="rectangular"
            animation="wave"
            width="100%"
            height="100%"
            sx={{
              transform: "none",
              borderRadius: {
                xs: 3,
                md: 4,
              },
            }}
          />

          {/* Fake website content */}

          <Box
            sx={{
              position: "absolute",
              left: {
                xs: 24,
                sm: 40,
                md: 48,
              },
              top: "50%",
              transform: "translateY(-50%)",
              width: {
                xs: "75%",
                sm: "60%",
                md: "45%",
              },
            }}
          >
            {/* Label */}

            <Skeleton
              variant="rounded"
              animation="wave"
              sx={{
                width: 145,
                height: 32,
                mb: 2.5,
                borderRadius: "999px",
              }}
            />

            {/* Title */}

            <Skeleton
              variant="text"
              animation="wave"
              sx={{
                width: {
                  xs: "85%",
                  sm: 300,
                  md: 350,
                },
                height: {
                  xs: 45,
                  sm: 55,
                },
                mb: 1,
              }}
            />

            {/* Description */}

            <Skeleton
              variant="text"
              animation="wave"
              sx={{
                width: "95%",
                height: 22,
              }}
            />

            <Skeleton
              variant="text"
              animation="wave"
              sx={{
                width: "75%",
                height: 22,
                mb: 2,
              }}
            />

            {/* Button */}

            <Skeleton
              variant="rounded"
              animation="wave"
              sx={{
                width: 150,
                height: 48,
                borderRadius: "50px",
              }}
            />
          </Box>
        </Box>

        {/* ================= LOGO + POST SKELETON ================= */}

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

          {/* ================= LOGO ================= */}

          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: {
                xs: 330,
                sm: 380,
                md: 390,
              },
              borderRadius: 4,
              overflow: "hidden",
            }}
          >
            <Skeleton
              variant="rectangular"
              animation="wave"
              width="100%"
              height="100%"
              sx={{
                transform: "none",
                borderRadius: 4,
              }}
            />

            <Box
              sx={{
                position: "absolute",
                top: 20,
                left: 20,
              }}
            >
              <Skeleton
                variant="rounded"
                animation="wave"
                width={120}
                height={32}
                sx={{
                  borderRadius: "999px",
                }}
              />
            </Box>

            <Box
              sx={{
                position: "absolute",
                bottom: 22,
                left: 22,
                right: 22,
              }}
            >
              <Skeleton
                variant="text"
                animation="wave"
                width={170}
                height={40}
              />

              <Skeleton
                variant="text"
                animation="wave"
                width={230}
                height={25}
              />
            </Box>
          </Box>

          {/* ================= POST ================= */}

          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: {
                xs: 330,
                sm: 380,
                md: 390,
              },
              borderRadius: 4,
              overflow: "hidden",
            }}
          >
            <Skeleton
              variant="rectangular"
              animation="wave"
              width="100%"
              height="100%"
              sx={{
                transform: "none",
                borderRadius: 4,
              }}
            />

            <Box
              sx={{
                position: "absolute",
                top: 20,
                left: 20,
              }}
            >
              <Skeleton
                variant="rounded"
                animation="wave"
                width={125}
                height={32}
                sx={{
                  borderRadius: "999px",
                }}
              />
            </Box>

            <Box
              sx={{
                position: "absolute",
                bottom: 22,
                left: 22,
                right: 22,
              }}
            >
              <Skeleton
                variant="text"
                animation="wave"
                width={180}
                height={40}
              />

              <Skeleton
                variant="text"
                animation="wave"
                width={240}
                height={25}
              />
            </Box>
          </Box>
        </Box>

        {/* ================= BUTTON SKELETON ================= */}

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: {
              xs: 5,
              md: 6,
            },
          }}
        >
          <Skeleton
            variant="rounded"
            animation="wave"
            width={210}
            height={50}
            sx={{
              borderRadius: "50px",
            }}
          />
        </Box>
      </Container>
    </Box>
  );
};

const PortfolioTile = ({ image, alt, label, title, description, delay = 0, onClick }) => (
  <MotionBox
    component="button"
    type="button"
    onClick={onClick}
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7, delay }}
    sx={{
      width: "100%",
      height: { xs: 330, sm: 380, md: 390 },
      display: "flex",
      flexDirection: "column",
      p: 0,
      border: 0,
      borderRadius: 4,
      overflow: "hidden",
      cursor: "pointer",
      textAlign: "left",
      font: "inherit",
      background: "linear-gradient(145deg, rgba(20,42,56,0.96), rgba(9,28,39,0.98))",
      boxShadow: "0 12px 35px rgba(17,30,44,0.14)",
      "&:hover .tile-image": { transform: "scale(1.04)" },
    }}
  >
    {/* Image area: blurred backdrop + contained image, same as video cards */}
    <Box
      sx={{
        position: "relative",
        flex: 1,
        minHeight: 0,
        bgcolor: "#07151f",
        overflow: "hidden",
      }}
    >
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url("${image}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(22px) brightness(0.6)",
          transform: "scale(1.25)",
        }}
      />
      <Box
        className="tile-image"
        component="img"
        src={image}
        alt={alt}
        loading="lazy"
        sx={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "contain",
          transition: "transform 0.6s ease",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: 16,
          left: 16,
          px: 2,
          py: 0.8,
          borderRadius: "999px",
          backgroundColor: "rgba(17,30,44,0.8)",
          border: "1px solid rgba(255,255,255,0.35)",
          backdropFilter: "blur(8px)",
          pointerEvents: "none",
        }}
      >
        <Typography
          sx={{ color: "#fff", fontSize: "11px", fontWeight: 800, letterSpacing: 1 }}
        >
          {label}
        </Typography>
      </Box>
    </Box>

    {/* Footer strip: caption no longer covers the image */}
    <Box sx={{ px: 2.75, py: 2, borderTop: "1px solid rgba(255,255,255,0.07)" }}>
      <Typography
        component="h3"
        sx={{ color: "#fff", fontWeight: 800, fontSize: { xs: "20px", sm: "22px" }, mb: 0.4 }}
      >
        {title}
      </Typography>
      <Typography sx={{ color: "rgba(255,255,255,0.72)", fontSize: "13px" }}>
        {description}
      </Typography>
    </Box>
  </MotionBox>
);

/* ============================================================
   FEATURED WORK
============================================================ */

export default function FeaturedWork() {
  const navigate = useNavigate();

  const [website, setWebsite] = useState(null);
  const [logo, setLogo] = useState(null);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedWork = async () => {
      try {
        const [
          websitesRes,
          logosRes,
          postsRes,
        ] = await Promise.all([
          axios.get(`${backendURL}/api/websites`),
          axios.get(`${backendURL}/api/logos`),
          axios.get(`${backendURL}/api/posts`),
        ]);

        const websites = Array.isArray(
          websitesRes.data
        )
          ? websitesRes.data
          : [];

        const logos = Array.isArray(
          logosRes.data
        )
          ? logosRes.data
          : [];

        const posts = Array.isArray(
          postsRes.data
        )
          ? postsRes.data
          : [];

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
     SHOW SKELETON WHILE API IS LOADING
  ============================================================ */

  if (loading) {
    return <FeaturedWorkSkeleton />;
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
            Explore some of the websites, logos and
            creative designs we've created for our
            clients.
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

            <Box
              sx={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(90deg, rgba(5,15,29,0.95) 0%, rgba(5,15,29,0.72) 40%, rgba(5,15,29,0.15) 100%)",
              }}
            />

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

          {/* ================= LOGO ================= */}

          {logo && (
            <PortfolioTile
              image={logo.image}
              alt={logo.title || "Logo design"}
              label="LOGO DESIGN"
              title="Logo Design"
              description="Creative identity for your brand."
              delay={0.1}
              onClick={() => navigate("/portfolio#logos")}
            />
          )}

          {/* ================= POST ================= */}

          {post && (
            <PortfolioTile
              image={post.image}
              alt={post.title || "Post design"}
              label="POST DESIGN"
              title="Post Design"
              description="Engaging designs for social media."
              delay={0.2}
              onClick={() => navigate("/portfolio#posts")}
            />
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