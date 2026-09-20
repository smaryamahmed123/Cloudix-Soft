import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  Box,
  Container,
  Typography,
  Avatar,
  Rating,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import FormatQuoteRoundedIcon from "@mui/icons-material/FormatQuoteRounded";
import PlayCircleOutlineRoundedIcon from "@mui/icons-material/PlayCircleOutlineRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

const backendURL = import.meta.env.VITE_BACKEND_URL;

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [selectedTestimonial, setSelectedTestimonial] =
    useState(null);
  const [allStoriesOpen, setAllStoriesOpen] =
    useState(false);

  /* ============================================================
     FETCH TESTIMONIALS
  ============================================================ */

  const fetchTestimonials = async () => {
    try {
      const res = await axios.get(
        `${backendURL}/api/testimonials/published`
      );

      if (Array.isArray(res.data)) {
        setTestimonials(res.data);
      } else {
        setTestimonials([]);
      }
    } catch (error) {
      console.error(
        "Failed to load testimonials:",
        error
      );

      setTestimonials([]);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  /* ============================================================
     READ FULL FEEDBACK
  ============================================================ */

  const handleReadMore = (testimonial) => {
    setSelectedTestimonial(testimonial);
  };

  /* ============================================================
     CLOSE FULL FEEDBACK
  ============================================================ */

  const handleCloseFeedback = () => {
    setSelectedTestimonial(null);
  };

  /* ============================================================
     OPEN ALL STORIES
  ============================================================ */

  const handleOpenAllStories = () => {
    setAllStoriesOpen(true);
  };

  /* ============================================================
     CLOSE ALL STORIES
  ============================================================ */

  const handleCloseAllStories = () => {
    setAllStoriesOpen(false);
  };

  /* ============================================================
     HIDE SECTION IF THERE ARE NO TESTIMONIALS
  ============================================================ */

  if (!testimonials.length) {
    return null;
  }

  /* ============================================================
     FEATURED TESTIMONIAL

     Prefer video testimonial.
  ============================================================ */

  const featuredTestimonial =
    testimonials.find(
      (testimonial) =>
        testimonial.type === "video" &&
        testimonial.video
    ) || testimonials[0];

  /* ============================================================
     SMALLER HOMEPAGE STORIES
  ============================================================ */

  const homepageStories = testimonials
    .filter(
      (testimonial) =>
        testimonial._id !==
        featuredTestimonial._id
    )
    .slice(0, 3);

  const hasMoreStories =
    testimonials.length > 4;

  return (
    <Box
      sx={{
        position: "relative",

        py: {
          xs: 7,
          sm: 9,
          md: 12,
        },

        background:
          "linear-gradient(135deg, #07151f 0%, #0b1d29 50%, #081923 100%)",

        overflow: "hidden",

        "&::before": {
          content: '""',

          position: "absolute",

          width: {
            xs: 180,
            md: 360,
          },

          height: {
            xs: 180,
            md: 360,
          },

          top: -150,

          right: -110,

          background:
            "linear-gradient(135deg, rgba(118,153,20,0.32), rgba(187,191,25,0.03))",

          transform: "rotate(45deg)",

          borderRadius: "28%",

          pointerEvents: "none",
        },

        "&::after": {
          content: '""',

          position: "absolute",

          width: {
            xs: 180,
            md: 320,
          },

          height: {
            xs: 180,
            md: 320,
          },

          bottom: -180,

          left: -130,

          background:
            "linear-gradient(135deg, rgba(118,153,20,0.22), rgba(187,191,25,0.02))",

          transform: "rotate(45deg)",

          borderRadius: "28%",

          pointerEvents: "none",
        },
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* ======================================================
            SECTION HEADING
        ====================================================== */}

        <Box
          sx={{
            maxWidth: 700,

            mb: {
              xs: 5,
              md: 7,
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              mb: 1.5,
            }}
          >
            <Box
              sx={{
                width: {
                  xs: 28,
                  md: 38,
                },

                height: 2,

                backgroundColor: "#BBBF19",

                borderRadius: 5,
              }}
            />

            <Typography
              sx={{
                color: "#BBBF19",

                fontWeight: 800,

                fontSize: {
                  xs: "11px",
                  md: "13px",
                },

                letterSpacing: 1.8,

                textTransform: "uppercase",
              }}
            >
              Client Stories
            </Typography>
          </Box>

          <Typography
            component="h2"
            sx={{
              color: "#ffffff",

              fontWeight: 800,

              fontSize: {
                xs: "2.2rem",
                sm: "3rem",
                md: "4rem",
              },

              lineHeight: 1.05,

              letterSpacing: "-1.5px",
            }}
          >
            Real Experiences.
          </Typography>

          <Typography
            component="span"
            sx={{
              display: "block",

              color: "#A9B838",

              fontWeight: 800,

              fontSize: {
                xs: "2.2rem",
                sm: "3rem",
                md: "4rem",
              },

              lineHeight: 1.05,

              letterSpacing: "-1.5px",
            }}
          >
            Real Results.
          </Typography>

          <Typography
            sx={{
              mt: 2.5,

              color:
                "rgba(255,255,255,0.68)",

              fontSize: {
                xs: "14px",
                sm: "15px",
                md: "17px",
              },

              lineHeight: 1.7,

              maxWidth: 580,
            }}
          >
            Hear directly from the people and
            businesses we've worked with and
            discover their experience with
            Cloudix Soft.
          </Typography>
        </Box>

        {/* ======================================================
            FEATURED CLIENT STORY
        ====================================================== */}

        <Box
          sx={{
            display: "grid",

            gridTemplateColumns: {
              xs: "1fr",
              md: "1.6fr 0.8fr",
            },

            gap: {
              xs: 2.5,
              md: 4,
            },

            p: {
              xs: 1.3,
              sm: 1.7,
              md: 2,
            },

            borderRadius: {
              xs: 3,
              md: 4,
            },

            background:
              "linear-gradient(145deg, rgba(20,42,56,0.96), rgba(9,28,39,0.96))",

            border:
              "1px solid rgba(118,153,20,0.30)",

            boxShadow:
              "0 25px 70px rgba(0,0,0,0.28)",

            overflow: "hidden",

            transition:
              "transform 0.35s ease, box-shadow 0.35s ease",

            "&:hover": {
              transform: "translateY(-4px)",

              boxShadow:
                "0 30px 80px rgba(0,0,0,0.36)",
            },
          }}
        >
          {/* ====================================================
              FEATURED MEDIA
          ==================================================== */}

          <Box
            sx={{
              position: "relative",

              width: "100%",

              aspectRatio: "16 / 9",

              minHeight: 0,

              borderRadius: {
                xs: 2.5,
                md: 3,
              },

              overflow: "hidden",

              backgroundColor: "#000",

              alignSelf: "start",
            }}
          >
            {featuredTestimonial.type ===
              "video" &&
            featuredTestimonial.video ? (
              <>
                {/* BLURRED BACKGROUND */}

                <video
                  src={featuredTestimonial.video}
                  muted
                  autoPlay
                  loop
                  playsInline
                  preload="metadata"
                  aria-hidden="true"
                  style={{
                    position: "absolute",

                    inset: 0,

                    width: "100%",

                    height: "100%",

                    objectFit: "cover",

                    filter: "blur(25px)",

                    transform: "scale(1.15)",

                    opacity: 0.45,
                  }}
                />

                {/* DARK OVERLAY */}

                <Box
                  sx={{
                    position: "absolute",

                    inset: 0,

                    background:
                      "rgba(0,0,0,0.18)",

                    zIndex: 1,

                    pointerEvents: "none",
                  }}
                />

                {/* MAIN VERTICAL VIDEO */}

                <video
                  src={featuredTestimonial.video}
                  controls
                  playsInline
                  preload="metadata"
                  style={{
                    position: "relative",

                    width: "100%",

                    height: "100%",

                    display: "block",

                    objectFit: "contain",

                    zIndex: 2,

                    backgroundColor: "transparent",
                  }}
                />
              </>
            ) : featuredTestimonial.clientImage ? (
              <Box
                component="img"
                src={featuredTestimonial.clientImage}
                alt={
                  featuredTestimonial.clientName ||
                  "Client"
                }
                loading="lazy"
                sx={{
                  width: "100%",

                  height: "100%",

                  display: "block",

                  objectFit: "cover",

                  transition:
                    "transform 0.6s ease",

                  "&:hover": {
                    transform: "scale(1.04)",
                  },
                }}
              />
            ) : (
              <Box
                sx={{
                  width: "100%",

                  height: "100%",

                  minHeight: 250,

                  display: "flex",

                  alignItems: "center",

                  justifyContent: "center",

                  background:
                    "linear-gradient(135deg, #111E2C, #26394a)",
                }}
              >
                <Avatar
                  sx={{
                    width: 110,

                    height: 110,

                    backgroundColor: "#769914",

                    color: "#fff",

                    fontSize: 42,

                    fontWeight: 800,
                  }}
                >
                  {featuredTestimonial.clientName?.charAt(
                    0
                  )}
                </Avatar>
              </Box>
            )}

            {/* FEATURED BADGE */}

            <Box
              sx={{
                position: "absolute",

                left: {
                  xs: 12,
                  md: 18,
                },

                bottom: {
                  xs: 12,
                  md: 18,
                },

                display: "flex",

                alignItems: "center",

                gap: 0.8,

                px: 1.5,

                py: 0.8,

                borderRadius: "999px",

                backgroundColor:
                  "rgba(7,21,31,0.90)",

                backdropFilter: "blur(10px)",

                color: "#ffffff",

                fontSize: "10px",

                fontWeight: 800,

                letterSpacing: 0.8,

                zIndex: 4,

                pointerEvents: "none",
              }}
            >
              {featuredTestimonial.type ===
              "video" ? (
                <>
                  <PlayCircleOutlineRoundedIcon
                    sx={{
                      fontSize: 18,
                      color: "#BBBF19",
                    }}
                  />

                  FEATURED CLIENT STORY
                </>
              ) : (
                <>
                  <FormatQuoteRoundedIcon
                    sx={{
                      fontSize: 18,
                      color: "#BBBF19",
                    }}
                  />

                  CLIENT FEEDBACK
                </>
              )}
            </Box>
          </Box>

          {/* ====================================================
              FEATURED CONTENT
          ==================================================== */}

          <Box
            sx={{
              display: "flex",

              flexDirection: "column",

              justifyContent: "center",

              px: {
                xs: 1.5,
                sm: 2,
                md: 2,
              },

              py: {
                xs: 2,
                md: 3,
              },
            }}
          >
            {featuredTestimonial.type ===
            "video" ? (
              <>
                <PlayCircleOutlineRoundedIcon
                  sx={{
                    fontSize: {
                      xs: 45,
                      md: 58,
                    },

                    color: "#769914",

                    mb: 1,
                  }}
                />

                <Typography
                  sx={{
                    color: "#ffffff",

                    fontSize: {
                      xs: "21px",
                      sm: "25px",
                      md: "30px",
                    },

                    fontWeight: 700,

                    lineHeight: 1.35,
                  }}
                >
                  Hear directly from our
                  client.
                </Typography>

                <Typography
                  sx={{
                    color:
                      "rgba(255,255,255,0.58)",

                    fontSize: {
                      xs: "13px",
                      md: "15px",
                    },

                    lineHeight: 1.7,

                    mt: 1.5,

                    maxWidth: 430,
                  }}
                >
                  Watch their experience of
                  working with Cloudix Soft.
                </Typography>
              </>
            ) : (
              <>
                <FormatQuoteRoundedIcon
                  sx={{
                    fontSize: {
                      xs: 50,
                      md: 65,
                    },

                    color: "#769914",

                    mb: -1,
                  }}
                />

                <Typography
                  sx={{
                    color: "#ffffff",

                    fontSize: {
                      xs: "18px",
                      sm: "21px",
                      md: "24px",
                    },

                    fontWeight: 600,

                    lineHeight: 1.55,

                    display: "-webkit-box",

                    WebkitLineClamp: {
                      xs: 4,
                      md: 5,
                    },

                    WebkitBoxOrient:
                      "vertical",

                    overflow: "hidden",
                  }}
                >
                  “
                  {featuredTestimonial.text}
                  ”
                </Typography>

                <Typography
                  component="button"
                  type="button"
                  onClick={() =>
                    handleReadMore(
                      featuredTestimonial
                    )
                  }
                  sx={{
                    alignSelf: "flex-start",

                    mt: 2,

                    border: 0,

                    background: "transparent",

                    padding: 0,

                    color: "#A9B838",

                    fontFamily: "inherit",

                    fontSize: "13px",

                    fontWeight: 800,

                    cursor: "pointer",

                    transition:
                      "all 0.25s ease",

                    "&:hover": {
                      color: "#BBBF19",

                      transform:
                        "translateX(4px)",
                    },
                  }}
                >
                  Read Full Feedback →
                </Typography>

                {featuredTestimonial.rating >
                  0 && (
                  <Box
                    sx={{
                      display: "flex",

                      alignItems: "center",

                      gap: 1,

                      mt: 2.5,
                    }}
                  >
                    <Rating
                      value={
                        featuredTestimonial.rating
                      }
                      readOnly
                      size="small"
                      sx={{
                        "& .MuiRating-iconFilled":
                          {
                            color: "#BBBF19",
                          },
                      }}
                    />

                    <Typography
                      sx={{
                        color:
                          "rgba(255,255,255,0.5)",

                        fontSize: "11px",

                        fontWeight: 700,
                      }}
                    >
                      {
                        featuredTestimonial.rating
                      }
                      /5
                    </Typography>
                  </Box>
                )}
              </>
            )}

            {/* FEATURED CLIENT */}

            <Box
              sx={{
                display: "flex",

                alignItems: "center",

                gap: 1.5,

                mt: 3.5,
              }}
            >
              {featuredTestimonial.type !==
                "video" && (
                <Avatar
                  src={
                    featuredTestimonial.clientImage ||
                    undefined
                  }
                  sx={{
                    width: 50,

                    height: 50,

                    backgroundColor: "#769914",

                    color: "#fff",

                    fontWeight: 800,

                    border:
                      "2px solid rgba(187,191,25,0.5)",
                  }}
                >
                  {featuredTestimonial.clientName?.charAt(
                    0
                  )}
                </Avatar>
              )}

              <Box>
                <Typography
                  sx={{
                    color: "#ffffff",

                    fontWeight: 800,

                    fontSize: "15px",
                  }}
                >
                  {featuredTestimonial.clientName}
                </Typography>

                {(featuredTestimonial.position ||
                  featuredTestimonial.companyName) && (
                  <Typography
                    sx={{
                      color:
                        "rgba(255,255,255,0.55)",

                      fontSize: "12px",

                      mt: 0.3,
                    }}
                  >
                    {featuredTestimonial.position}

                    {featuredTestimonial.position &&
                      featuredTestimonial.companyName &&
                      " • "}

                    {featuredTestimonial.companyName}
                  </Typography>
                )}
              </Box>
            </Box>
          </Box>
        </Box>

        {/* ======================================================
            SMALLER CLIENT STORIES
        ====================================================== */}

        {homepageStories.length > 0 && (
          <Box
            sx={{
              display: "grid",

              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                lg: "repeat(3, 1fr)",
              },

              gap: {
                xs: 2.5,
                md: 3,
              },

              mt: {
                xs: 2.5,
                md: 3,
              },
            }}
          >
            {homepageStories.map(
              (testimonial) => (
                <Box
                  key={testimonial._id}
                  sx={{
                    borderRadius: 3,

                    overflow: "hidden",

                    background:
                      "linear-gradient(145deg, rgba(20,42,56,0.92), rgba(9,28,39,0.96))",

                    border:
                      "1px solid rgba(118,153,20,0.24)",

                    minHeight: {
                      xs: 360,
                      md: 390,
                    },

                    display: "flex",

                    flexDirection: "column",

                    transition:
                      "transform 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease",

                    "&:hover": {
                      transform:
                        "translateY(-7px)",

                      borderColor:
                        "rgba(169,184,56,0.55)",

                      boxShadow:
                        "0 20px 50px rgba(0,0,0,0.28)",
                    },
                  }}
                >
                  {/* ==================================================
                      SMALL VIDEO CARD
                      
                      SAME DESIGN AS FEATURED TESTIMONIAL
                  ================================================== */}

                  {testimonial.type ===
                    "video" &&
                  testimonial.video ? (
                    <Box
                      sx={{
                        position: "relative",

                        width: "100%",

                        aspectRatio: "16 / 9",

                        flexShrink: 0,

                        overflow: "hidden",

                        backgroundColor: "#000",
                      }}
                    >
                      {/* BLURRED VIDEO BACKGROUND */}

                      <video
                        src={testimonial.video}
                        muted
                        autoPlay
                        loop
                        playsInline
                        preload="metadata"
                        aria-hidden="true"
                        style={{
                          position: "absolute",

                          inset: 0,

                          width: "100%",

                          height: "100%",

                          objectFit: "cover",

                          filter: "blur(25px)",

                          transform: "scale(1.15)",

                          opacity: 0.45,
                        }}
                      />

                      {/* DARK OVERLAY */}

                      <Box
                        sx={{
                          position: "absolute",

                          inset: 0,

                          background:
                            "rgba(0,0,0,0.18)",

                          zIndex: 1,

                          pointerEvents: "none",
                        }}
                      />

                      {/* MAIN VERTICAL VIDEO */}

                      <video
                        src={testimonial.video}
                        controls
                        playsInline
                        preload="metadata"
                        style={{
                          position: "relative",

                          width: "100%",

                          height: "100%",

                          display: "block",

                          objectFit: "contain",

                          zIndex: 2,

                          backgroundColor:
                            "transparent",
                        }}
                      />

                      {/* VIDEO BADGE */}

                      <Box
                        sx={{
                          position: "absolute",

                          top: 12,

                          left: 12,

                          display: "flex",

                          alignItems: "center",

                          gap: 0.6,

                          px: 1.3,

                          py: 0.65,

                          borderRadius: "999px",

                          backgroundColor:
                            "rgba(7,21,31,0.90)",

                          backdropFilter:
                            "blur(8px)",

                          color: "#ffffff",

                          fontSize: "9px",

                          fontWeight: 800,

                          letterSpacing: 0.8,

                          pointerEvents: "none",

                          zIndex: 4,
                        }}
                      >
                        <PlayCircleOutlineRoundedIcon
                          sx={{
                            fontSize: 16,

                            color: "#BBBF19",
                          }}
                        />

                        VIDEO TESTIMONIAL
                      </Box>
                    </Box>
                  ) : (
                    /* ==================================================
                       TEXT TESTIMONIAL

                       NO LARGE IMAGE
                    ================================================== */

                    <Box
                      sx={{
                        px: {
                          xs: 2.5,
                          md: 3,
                        },

                        pt: {
                          xs: 2.8,
                          md: 3.2,
                        },

                        pb: 2,

                        flexShrink: 0,

                        minHeight: {
                          xs: 145,
                          md: 155,
                        },

                        display: "flex",

                        alignItems: "flex-start",

                        background:
                          "linear-gradient(135deg, rgba(17,30,44,0.95), rgba(27,51,66,0.95))",

                        position: "relative",

                        overflow: "hidden",
                      }}
                    >
                      <FormatQuoteRoundedIcon
                        sx={{
                          fontSize: {
                            xs: 55,
                            md: 62,
                          },

                          color:
                            "rgba(187,191,25,0.85)",

                          position: "relative",

                          zIndex: 1,
                        }}
                      />

                      {/* DECORATIVE QUOTE */}

                      <FormatQuoteRoundedIcon
                        sx={{
                          position: "absolute",

                          right: -5,

                          bottom: -18,

                          fontSize: 105,

                          color:
                            "rgba(118,153,20,0.08)",

                          transform:
                            "rotate(180deg)",
                        }}
                      />
                    </Box>
                  )}

                  {/* ==================================================
                      CARD CONTENT
                  ================================================== */}

                  <Box
                    sx={{
                      p: {
                        xs: 2.5,
                        md: 3,
                      },

                      display: "flex",

                      flexDirection: "column",

                      flex: 1,
                    }}
                  >
                    {/* TEXT TESTIMONIAL */}

                    {testimonial.type !==
                      "video" &&
                      testimonial.text && (
                        <>
                          <Typography
                            sx={{
                              color:
                                "rgba(255,255,255,0.78)",

                              fontSize:
                                "13.5px",

                              lineHeight: 1.75,

                              display:
                                "-webkit-box",

                              WebkitLineClamp: 3,

                              WebkitBoxOrient:
                                "vertical",

                              overflow: "hidden",

                              mb: 1.5,
                            }}
                          >
                            “
                            {testimonial.text}
                            ”
                          </Typography>

                          {/* RATING */}

                          {testimonial.rating >
                            0 && (
                            <Box
                              sx={{
                                display:
                                  "flex",

                                alignItems:
                                  "center",

                                gap: 1,

                                mb: 1.8,
                              }}
                            >
                              <Rating
                                value={
                                  testimonial.rating
                                }
                                readOnly
                                size="small"
                                sx={{
                                  "& .MuiRating-iconFilled":
                                    {
                                      color:
                                        "#BBBF19",
                                    },
                                }}
                              />

                              <Typography
                                sx={{
                                  color:
                                    "rgba(255,255,255,0.45)",

                                  fontSize:
                                    "11px",
                                }}
                              >
                                {
                                  testimonial.rating
                                }
                                /5
                              </Typography>
                            </Box>
                          )}

                          {/* READ FULL */}

                          <Typography
                            component="button"
                            type="button"
                            onClick={() =>
                              handleReadMore(
                                testimonial
                              )
                            }
                            sx={{
                              alignSelf:
                                "flex-start",

                              border: 0,

                              background:
                                "transparent",

                              padding: 0,

                              color: "#A9B838",

                              fontSize:
                                "12px",

                              fontWeight: 800,

                              cursor: "pointer",

                              fontFamily:
                                "inherit",

                              mb: 2.5,

                              transition:
                                "all 0.25s ease",

                              "&:hover": {
                                color:
                                  "#BBBF19",

                                transform:
                                  "translateX(3px)",
                              },
                            }}
                          >
                            Read Full Feedback →
                          </Typography>
                        </>
                      )}

                    {/* VIDEO LABEL */}

                    {testimonial.type ===
                      "video" && (
                      <Box
                        sx={{
                          display: "flex",

                          alignItems:
                            "center",

                          gap: 0.8,

                          mb: 2.5,
                        }}
                      >
                        <PlayCircleOutlineRoundedIcon
                          sx={{
                            color:
                              "#A9B838",

                            fontSize: 19,
                          }}
                        />

                        <Typography
                          sx={{
                            color:
                              "#A9B838",

                            fontSize:
                              "11px",

                            fontWeight: 800,

                            letterSpacing:
                              0.7,

                            textTransform:
                              "uppercase",
                          }}
                        >
                          Video Testimonial
                        </Typography>
                      </Box>
                    )}

                    {/* CLIENT INFORMATION */}

                    <Box
                      sx={{
                        display: "flex",

                        alignItems: "center",

                        gap: 1.4,

                        mt: "auto",
                      }}
                    >
                      {/* 
                        Avatar is intentionally removed
                        from video testimonials because the
                        video already represents the client.
                      */}

                      {testimonial.type !==
                        "video" && (
                        <Avatar
                          sx={{
                            width: 44,

                            height: 44,

                            backgroundColor:
                              "#769914",

                            color: "#fff",

                            fontWeight: 800,

                            fontSize: 15,

                            border:
                              "2px solid rgba(169,184,56,0.35)",
                          }}
                        >
                          {testimonial.clientName?.charAt(
                            0
                          )}
                        </Avatar>
                      )}

                      <Box
                        sx={{
                          minWidth: 0,
                        }}
                      >
                        <Typography
                          sx={{
                            color: "#ffffff",

                            fontWeight: 800,

                            fontSize: "14px",

                            whiteSpace:
                              "nowrap",

                            overflow:
                              "hidden",

                            textOverflow:
                              "ellipsis",
                          }}
                        >
                          {testimonial.clientName}
                        </Typography>

                        {(testimonial.position ||
                          testimonial.companyName) && (
                          <Typography
                            sx={{
                              color:
                                "rgba(255,255,255,0.48)",

                              fontSize: "11px",

                              mt: 0.3,

                              whiteSpace:
                                "nowrap",

                              overflow:
                                "hidden",

                              textOverflow:
                                "ellipsis",
                            }}
                          >
                            {testimonial.position}

                            {testimonial.position &&
                              testimonial.companyName &&
                              " • "}

                            {testimonial.companyName}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  </Box>
                </Box>
              )
            )}
          </Box>
        )}

        {/* ======================================================
            VIEW ALL CLIENT STORIES
        ====================================================== */}

        {hasMoreStories && (
          <Box
            sx={{
              display: "flex",

              justifyContent: "center",

              mt: {
                xs: 4,
                md: 5,
              },
            }}
          >
            <Box
              component="button"
              type="button"
              onClick={handleOpenAllStories}
              sx={{
                display: "flex",

                alignItems: "center",

                justifyContent: "center",

                gap: 1,

                px: {
                  xs: 2.5,
                  md: 3.5,
                },

                py: 1.4,

                minWidth: {
                  xs: 210,
                  md: 245,
                },

                borderRadius: "999px",

                border:
                  "1px solid #A9B838",

                backgroundColor:
                  "transparent",

                color: "#BBBF19",

                fontFamily: "inherit",

                fontSize: {
                  xs: "12px",
                  md: "13px",
                },

                fontWeight: 800,

                cursor: "pointer",

                transition:
                  "all 0.3s ease",

                "&:hover": {
                  backgroundColor:
                    "#769914",

                  color: "#ffffff",

                  borderColor:
                    "#769914",

                  transform:
                    "translateY(-3px)",

                  boxShadow:
                    "0 10px 30px rgba(118,153,20,0.22)",
                },
              }}
            >
              View All Client Stories

              <ArrowForwardRoundedIcon
                sx={{
                  fontSize: 18,
                }}
              />
            </Box>
          </Box>
        )}
      </Container>

      {/* ========================================================
          READ FULL FEEDBACK DIALOG
      ======================================================== */}

      <Dialog
        open={Boolean(selectedTestimonial)}
        onClose={handleCloseFeedback}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,

            overflow: "hidden",

            backgroundColor: "#ffffff",
          },
        }}
      >
        {selectedTestimonial && (
          <>
            <DialogTitle
              sx={{
                backgroundColor: "#111E2C",

                color: "#ffffff",

                pr: 7,

                fontWeight: 800,
              }}
            >
              Client Feedback

              <IconButton
                onClick={handleCloseFeedback}
                sx={{
                  position: "absolute",

                  right: 10,

                  top: 10,

                  color: "#ffffff",
                }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>

            <DialogContent
              sx={{
                p: {
                  xs: 3,
                  md: 4,
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",

                  alignItems: "center",

                  gap: 2,

                  mb: 3,
                }}
              >
                <Avatar
                  src={
                    selectedTestimonial.clientImage ||
                    undefined
                  }
                  alt={
                    selectedTestimonial.clientName ||
                    "Client"
                  }
                  sx={{
                    width: 60,

                    height: 60,

                    backgroundColor: "#769914",
                  }}
                >
                  {selectedTestimonial.clientName?.charAt(
                    0
                  )}
                </Avatar>

                <Box>
                  <Typography
                    sx={{
                      fontWeight: 800,

                      color: "#111E2C",
                    }}
                  >
                    {
                      selectedTestimonial.clientName
                    }
                  </Typography>

                  {(selectedTestimonial.position ||
                    selectedTestimonial.companyName) && (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      {
                        selectedTestimonial.position
                      }

                      {selectedTestimonial.position &&
                        selectedTestimonial.companyName &&
                        " • "}

                      {
                        selectedTestimonial.companyName
                      }
                    </Typography>
                  )}
                </Box>
              </Box>

              {selectedTestimonial.rating >
                0 && (
                <Rating
                  value={
                    selectedTestimonial.rating
                  }
                  readOnly
                  sx={{
                    mb: 2,

                    "& .MuiRating-iconFilled":
                      {
                        color: "#BBBF19",
                      },
                  }}
                />
              )}

              <FormatQuoteRoundedIcon
                sx={{
                  fontSize: 48,

                  color: "#769914",

                  mb: -1,
                }}
              />

              <Typography
                sx={{
                  color: "#444",

                  lineHeight: 1.9,

                  fontSize: "15px",

                  whiteSpace: "pre-line",
                }}
              >
                “
                {selectedTestimonial.text}
                ”
              </Typography>
            </DialogContent>
          </>
        )}
      </Dialog>

      {/* ========================================================
          ALL CLIENT STORIES DIALOG
      ======================================================== */}

      <Dialog
        open={allStoriesOpen}
        onClose={handleCloseAllStories}
        fullWidth
        maxWidth="lg"
        PaperProps={{
          sx: {
            borderRadius: {
              xs: 0,
              md: 4,
            },

            maxHeight: {
              xs: "100vh",
              md: "90vh",
            },

            height: {
              xs: "100vh",
              md: "auto",
            },

            background: "#07151f",

            color: "#ffffff",

            overflow: "hidden",
          },
        }}
      >
        {/* HEADER */}

        <DialogTitle
          sx={{
            position: "relative",

            background:
              "linear-gradient(135deg, #111E2C, #0b1d29)",

            color: "#ffffff",

            px: {
              xs: 2.5,
              md: 4,
            },

            py: {
              xs: 2.5,
              md: 3,
            },

            borderBottom:
              "1px solid rgba(118,153,20,0.25)",
          }}
        >
          <Typography
            sx={{
              color: "#BBBF19",

              fontSize: "11px",

              fontWeight: 800,

              letterSpacing: 1.8,

              textTransform: "uppercase",

              mb: 0.7,
            }}
          >
            Client Stories
          </Typography>

          <Typography
            sx={{
              fontSize: {
                xs: "24px",
                md: "32px",
              },

              fontWeight: 800,

              lineHeight: 1.15,
            }}
          >
            What Our Clients Say
          </Typography>

          <Typography
            sx={{
              mt: 0.8,

              color:
                "rgba(255,255,255,0.58)",

              fontSize: {
                xs: "12px",
                md: "14px",
              },
            }}
          >
            Explore all of our published client
            stories.
          </Typography>

          <IconButton
            onClick={handleCloseAllStories}
            sx={{
              position: "absolute",

              right: {
                xs: 8,
                md: 18,
              },

              top: {
                xs: 8,
                md: 15,
              },

              color: "#ffffff",

              "&:hover": {
                backgroundColor:
                  "rgba(255,255,255,0.08)",
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        {/* ALL STORIES CONTENT */}

        <DialogContent
          sx={{
            p: {
              xs: 2,
              sm: 3,
              md: 4,
            },

            background:
              "linear-gradient(135deg, #07151f, #0b1d29)",

            overflowY: "auto",

            "&::-webkit-scrollbar": {
              width: "7px",
            },

            "&::-webkit-scrollbar-track": {
              background:
                "rgba(255,255,255,0.04)",
            },

            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#769914",

              borderRadius: "20px",
            },
          }}
        >
          <Box
            sx={{
              display: "grid",

              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                lg: "repeat(3, 1fr)",
              },

              gap: {
                xs: 2,
                md: 2.5,
              },
            }}
          >
            {testimonials.map(
              (testimonial) => (
                <Box
                  key={testimonial._id}
                  sx={{
                    borderRadius: 3,

                    overflow: "hidden",

                    background:
                      "linear-gradient(145deg, rgba(20,42,56,0.95), rgba(9,28,39,0.98))",

                    border:
                      "1px solid rgba(118,153,20,0.24)",

                    transition:
                      "all 0.3s ease",

                    "&:hover": {
                      transform:
                        "translateY(-5px)",

                      borderColor:
                        "rgba(169,184,56,0.55)",
                    },
                  }}
                >
                  {/* ==================================================
                      ALL STORIES VIDEO

                      SAME FEATURED DESIGN
                  ================================================== */}

                  {testimonial.type ===
                    "video" &&
                  testimonial.video ? (
                    <Box
                      sx={{
                        position: "relative",

                        width: "100%",

                        aspectRatio: "16 / 9",

                        overflow: "hidden",

                        backgroundColor: "#000",
                      }}
                    >
                      {/* BLURRED BACKGROUND */}

                      <video
                        src={testimonial.video}
                        muted
                        autoPlay
                        loop
                        playsInline
                        preload="metadata"
                        aria-hidden="true"
                        style={{
                          position: "absolute",

                          inset: 0,

                          width: "100%",

                          height: "100%",

                          objectFit: "cover",

                          filter: "blur(25px)",

                          transform: "scale(1.15)",

                          opacity: 0.45,
                        }}
                      />

                      {/* OVERLAY */}

                      <Box
                        sx={{
                          position: "absolute",

                          inset: 0,

                          background:
                            "rgba(0,0,0,0.18)",

                          zIndex: 1,

                          pointerEvents: "none",
                        }}
                      />

                      {/* MAIN VIDEO */}

                      <video
                        src={testimonial.video}
                        controls
                        playsInline
                        preload="metadata"
                        style={{
                          position: "relative",

                          width: "100%",

                          height: "100%",

                          display: "block",

                          objectFit: "contain",

                          zIndex: 2,

                          backgroundColor:
                            "transparent",
                        }}
                      />

                      <Box
                        sx={{
                          position: "absolute",

                          top: 12,

                          left: 12,

                          display: "flex",

                          alignItems: "center",

                          gap: 0.5,

                          px: 1.2,

                          py: 0.6,

                          borderRadius:
                            "999px",

                          backgroundColor:
                            "rgba(7,21,31,0.90)",

                          backdropFilter:
                            "blur(8px)",

                          color: "#ffffff",

                          fontSize: "9px",

                          fontWeight: 800,

                          pointerEvents:
                            "none",

                          zIndex: 4,
                        }}
                      >
                        <PlayCircleOutlineRoundedIcon
                          sx={{
                            fontSize: 15,

                            color: "#BBBF19",
                          }}
                        />

                        VIDEO
                      </Box>
                    </Box>
                  ) : (
                    /* ==================================================
                       ALL STORIES TEXT

                       NO LARGE IMAGE
                    ================================================== */

                    <Box
                      sx={{
                        position: "relative",

                        minHeight: 125,

                        display: "flex",

                        alignItems: "center",

                        px: 2.5,

                        py: 2.5,

                        background:
                          "linear-gradient(135deg, #111E2C, #1b3342)",

                        overflow: "hidden",
                      }}
                    >
                      <FormatQuoteRoundedIcon
                        sx={{
                          fontSize: 58,

                          color: "#BBBF19",

                          position:
                            "relative",

                          zIndex: 1,
                        }}
                      />

                      <FormatQuoteRoundedIcon
                        sx={{
                          position:
                            "absolute",

                          right: -8,

                          bottom: -20,

                          fontSize: 110,

                          color:
                            "rgba(118,153,20,0.08)",
                        }}
                      />
                    </Box>
                  )}

                  {/* ==================================================
                      ALL STORIES DETAILS
                  ================================================== */}

                  <Box
                    sx={{
                      p: 2.5,
                    }}
                  >
                    {testimonial.type ===
                    "video" ? (
                      <Box
                        sx={{
                          display: "flex",

                          alignItems: "center",

                          gap: 0.8,

                          mb: 2,
                        }}
                      >
                        <PlayCircleOutlineRoundedIcon
                          sx={{
                            color: "#A9B838",

                            fontSize: 19,
                          }}
                        />

                        <Typography
                          sx={{
                            color: "#A9B838",

                            fontSize: "11px",

                            fontWeight: 800,

                            letterSpacing: 0.7,

                            textTransform:
                              "uppercase",
                          }}
                        >
                          Video Testimonial
                        </Typography>
                      </Box>
                    ) : (
                      <>
                        <Typography
                          sx={{
                            color:
                              "rgba(255,255,255,0.78)",

                            fontSize: "13px",

                            lineHeight: 1.7,

                            display:
                              "-webkit-box",

                            WebkitLineClamp: 3,

                            WebkitBoxOrient:
                              "vertical",

                            overflow: "hidden",

                            mb: 1.5,
                          }}
                        >
                          “
                          {testimonial.text}
                          ”
                        </Typography>

                        {testimonial.rating >
                          0 && (
                          <Rating
                            value={
                              testimonial.rating
                            }
                            readOnly
                            size="small"
                            sx={{
                              mb: 1.5,

                              "& .MuiRating-iconFilled":
                                {
                                  color:
                                    "#BBBF19",
                                },
                            }}
                          />
                        )}

                        <Typography
                          component="button"
                          type="button"
                          onClick={() =>
                            handleReadMore(
                              testimonial
                            )
                          }
                          sx={{
                            border: 0,

                            background:
                              "transparent",

                            padding: 0,

                            color: "#A9B838",

                            fontFamily:
                              "inherit",

                            fontSize: "12px",

                            fontWeight: 800,

                            cursor: "pointer",

                            mb: 2,

                            "&:hover": {
                              color: "#BBBF19",
                            },
                          }}
                        >
                          Read Full Feedback →
                        </Typography>
                      </>
                    )}

                    {/* CLIENT */}

                    <Box
                      sx={{
                        display: "flex",

                        alignItems: "center",

                        gap: 1.2,
                      }}
                    >
                      {testimonial.type !==
                        "video" && (
                        <Avatar
                          sx={{
                            width: 42,

                            height: 42,

                            backgroundColor:
                              "#769914",

                            fontSize: 14,

                            fontWeight: 800,
                          }}
                        >
                          {testimonial.clientName?.charAt(
                            0
                          )}
                        </Avatar>
                      )}

                      <Box
                        sx={{
                          minWidth: 0,
                        }}
                      >
                        <Typography
                          sx={{
                            color: "#ffffff",

                            fontWeight: 800,

                            fontSize: "13px",

                            whiteSpace:
                              "nowrap",

                            overflow:
                              "hidden",

                            textOverflow:
                              "ellipsis",
                          }}
                        >
                          {
                            testimonial.clientName
                          }
                        </Typography>

                        {(testimonial.position ||
                          testimonial.companyName) && (
                          <Typography
                            sx={{
                              color:
                                "rgba(255,255,255,0.48)",

                              fontSize:
                                "10.5px",

                              mt: 0.2,
                            }}
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
                        )}
                      </Box>
                    </Box>
                  </Box>
                </Box>
              )
            )}
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Testimonials;

