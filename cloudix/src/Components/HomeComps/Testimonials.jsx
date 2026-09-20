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
     CLOSE FEEDBACK
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
     HIDE SECTION IF EMPTY
  ============================================================ */

  if (!testimonials.length) {
    return null;
  }

  /* ============================================================
     SHOW ONLY FIRST 6 ON HOMEPAGE
  ============================================================ */

  const homepageTestimonials =
    testimonials.slice(0, 6);

  const hasMoreTestimonials =
    testimonials.length > 6;

  /* ============================================================
     CLIENT INFO
  ============================================================ */

  const ClientInfo = ({
    testimonial,
    compact = false,
  }) => {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.4,
        }}
      >
        {/* Avatar only for text testimonials */}
        {testimonial.type !== "video" && (
          <Avatar
            src={
              testimonial.clientImage ||
              undefined
            }
            alt={
              testimonial.clientName ||
              "Client"
            }
            sx={{
              width: compact ? 42 : 46,
              height: compact ? 42 : 46,

              backgroundColor: "#769914",

              color: "#ffffff",

              fontWeight: 800,

              fontSize: compact ? 14 : 15,

              flexShrink: 0,

              border:
                "2px solid rgba(169,184,56,0.35)",
            }}
          >
            {testimonial.clientName?.charAt(0)}
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

              fontSize: compact
                ? "13px"
                : "14px",

              lineHeight: 1.3,

              whiteSpace: "nowrap",

              overflow: "hidden",

              textOverflow: "ellipsis",
            }}
          >
            {testimonial.clientName}
          </Typography>

          {(testimonial.position ||
            testimonial.companyName) && (
            <Typography
              sx={{
                color:
                  "rgba(255,255,255,0.50)",

                fontSize: compact
                  ? "10.5px"
                  : "11px",

                mt: 0.35,

                lineHeight: 1.4,

                whiteSpace: "nowrap",

                overflow: "hidden",

                textOverflow: "ellipsis",
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
    );
  };

  /* ============================================================
     TESTIMONIAL CARD
  ============================================================ */

  const TestimonialCard = ({
    testimonial,
  }) => {
    const isVideo =
      testimonial.type === "video" &&
      testimonial.video;

    return (
      <Box
        sx={{
          width: "100%",

          minHeight: {
            xs: isVideo ? 390 : 340,
            sm: isVideo ? 400 : 350,
            md: isVideo ? 410 : 360,
          },

          display: "flex",

          flexDirection: "column",

          overflow: "hidden",

          borderRadius: {
            xs: 2.5,
            md: 3,
          },

          background:
            "linear-gradient(145deg, rgba(20,42,56,0.96), rgba(9,28,39,0.98))",

          border:
            "1px solid rgba(118,153,20,0.25)",

          boxShadow:
            "0 15px 45px rgba(0,0,0,0.20)",

          transition:
            "transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",

          "&:hover": {
            transform: "translateY(-6px)",

            borderColor:
              "rgba(169,184,56,0.60)",

            boxShadow:
              "0 22px 55px rgba(0,0,0,0.30)",
          },
        }}
      >
        {/* ======================================================
            VIDEO TESTIMONIAL
        ====================================================== */}

        {isVideo && (
          <Box
            sx={{
              position: "relative",

              width: "100%",

              aspectRatio: "16 / 9",

              backgroundColor: "#000",

              overflow: "hidden",

              flexShrink: 0,
            }}
          >
            {/* VIDEO */}

            <video
              src={testimonial.video}
              controls
              playsInline
              preload="metadata"
              style={{
                width: "100%",
                height: "100%",
                display: "block",
                objectFit: "cover",
                backgroundColor: "#000",
              }}
            />

            {/* VIDEO TESTIMONIAL BADGE */}

            <Box
              sx={{
                position: "absolute",

                top: 12,

                left: 12,

                display: "flex",

                alignItems: "center",

                gap: 0.6,

                px: 1.3,

                py: 0.7,

                borderRadius: "999px",

                backgroundColor:
                  "rgba(7,21,31,0.88)",

                backdropFilter:
                  "blur(8px)",

                color: "#ffffff",

                fontSize: "9px",

                fontWeight: 800,

                letterSpacing: 0.8,

                pointerEvents: "none",
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
        )}

        {/* ======================================================
            TEXT TESTIMONIAL TOP
        ====================================================== */}

        {!isVideo && (
          <Box
            sx={{
              position: "relative",

              px: {
                xs: 2.5,
                md: 3,
              },

              pt: {
                xs: 2.5,
                md: 3,
              },

              pb: 2,

              minHeight: {
                xs: 70,
                md: 75,
              },

              display: "flex",

              alignItems: "flex-start",

              background:
                "linear-gradient(135deg, rgba(17,30,44,0.98), rgba(27,51,66,0.98))",

              overflow: "hidden",
            }}
          >
            {/* SMALL LABEL */}

            <Typography
              sx={{
                position: "relative",

                zIndex: 2,

                color: "#BBBF19",

                fontSize: "10px",

                fontWeight: 800,

                letterSpacing: 1.2,

                textTransform: "uppercase",
              }}
            >
              Client Feedback
            </Typography>

            {/* DECORATIVE QUOTE */}

            <FormatQuoteRoundedIcon
              sx={{
                position: "absolute",

                right: -8,

                bottom: -25,

                fontSize: 105,

                color:
                  "rgba(118,153,20,0.08)",

                transform:
                  "rotate(180deg)",
              }}
            />
          </Box>
        )}

        {/* ======================================================
            CARD CONTENT
        ====================================================== */}

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
          {/* ====================================================
              TEXT FEEDBACK
          ==================================================== */}

          {!isVideo && (
            <>
              {/* QUOTE */}

              <Box
                sx={{
                  position: "relative",
                  mb: 1.5,
                }}
              >
                <FormatQuoteRoundedIcon
                  sx={{
                    position: "absolute",

                    left: -8,

                    top: -10,

                    fontSize: 34,

                    color:
                      "rgba(118,153,20,0.40)",
                  }}
                />

                <Typography
                  sx={{
                    position: "relative",

                    color:
                      "rgba(255,255,255,0.82)",

                    fontSize: {
                      xs: "13.5px",
                      md: "14px",
                    },

                    lineHeight: 1.75,

                    pl: 1.5,

                    display:
                      "-webkit-box",

                    WebkitLineClamp: 3,

                    WebkitBoxOrient:
                      "vertical",

                    overflow: "hidden",
                  }}
                >
                  “{testimonial.text}”
                </Typography>
              </Box>

              {/* ==================================================
                  RATING
              ================================================== */}

              {testimonial.rating > 0 && (
                <Box
                  sx={{
                    display: "flex",

                    alignItems: "center",

                    gap: 1,

                    mb: 1.5,
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

                      "& .MuiRating-iconEmpty":
                        {
                          color:
                            "rgba(255,255,255,0.20)",
                        },
                    }}
                  />

                  <Typography
                    sx={{
                      color:
                        "rgba(255,255,255,0.45)",

                      fontSize: "10px",

                      fontWeight: 700,
                    }}
                  >
                    {testimonial.rating}/5
                  </Typography>
                </Box>
              )}

              {/* ==================================================
                  READ FULL FEEDBACK
              ================================================== */}

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

                  fontFamily: "inherit",

                  fontSize: "12px",

                  fontWeight: 800,

                  cursor: "pointer",

                  mb: 2.5,

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
            </>
          )}

          {/* ====================================================
              VIDEO LABEL
          ==================================================== */}

          {isVideo && (
            <Box
              sx={{
                display: "flex",

                alignItems: "center",

                gap: 0.7,

                mb: 2.5,
              }}
            >
              <PlayCircleOutlineRoundedIcon
                sx={{
                  fontSize: 18,
                  color: "#A9B838",
                }}
              />

              <Typography
                sx={{
                  color: "#A9B838",

                  fontSize: "10px",

                  fontWeight: 800,

                  letterSpacing: 0.8,

                  textTransform:
                    "uppercase",
                }}
              >
                Video Testimonial
              </Typography>
            </Box>
          )}

          {/* ====================================================
              CLIENT INFORMATION
          ==================================================== */}

          <Box
            sx={{
              mt: "auto",
            }}
          >
            <ClientInfo
              testimonial={testimonial}
            />
          </Box>
        </Box>
      </Box>
    );
  };

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

        /* ======================================================
           TOP DECORATION
        ====================================================== */

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
            "linear-gradient(135deg, rgba(118,153,20,0.30), rgba(187,191,25,0.03))",

          transform: "rotate(45deg)",

          borderRadius: "28%",

          pointerEvents: "none",
        },

        /* ======================================================
           BOTTOM DECORATION
        ====================================================== */

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
            SECTION HEADER
        ====================================================== */}

        <Box
          sx={{
            maxWidth: 700,

            mb: {
              xs: 5,
              md: 6,
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

                backgroundColor:
                  "#BBBF19",

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

                textTransform:
                  "uppercase",
              }}
            >
              Client Feedback
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
            What Our Clients
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
            Say About Us.
          </Typography>

          <Typography
            sx={{
              mt: 2.5,

              color:
                "rgba(255,255,255,0.65)",

              fontSize: {
                xs: "14px",
                sm: "15px",
                md: "17px",
              },

              lineHeight: 1.7,

              maxWidth: 580,
            }}
          >
            Hear directly from the people
            and businesses we've worked
            with.
          </Typography>
        </Box>

        {/* ======================================================
            TESTIMONIAL GRID
        ====================================================== */}

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
          }}
        >
          {homepageTestimonials.map(
            (testimonial) => (
              <TestimonialCard
                key={testimonial._id}
                testimonial={testimonial}
              />
            )
          )}
        </Box>

        {/* ======================================================
            VIEW ALL BUTTON
        ====================================================== */}

        {hasMoreTestimonials && (
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
              onClick={
                handleOpenAllStories
              }
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
          FULL FEEDBACK DIALOG
      ======================================================== */}

      <Dialog
        open={Boolean(
          selectedTestimonial
        )}
        onClose={
          handleCloseFeedback
        }
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
                position: "relative",

                backgroundColor:
                  "#111E2C",

                color: "#ffffff",

                pr: 7,

                fontWeight: 800,
              }}
            >
              Client Feedback

              <IconButton
                onClick={
                  handleCloseFeedback
                }
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
              {/* CLIENT */}

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

                    backgroundColor:
                      "#769914",

                    fontWeight: 800,
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

                      fontSize: "16px",
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
                      sx={{
                        mt: 0.3,
                      }}
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

              {/* RATING */}

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
                        color:
                          "#BBBF19",
                      },
                  }}
                />
              )}

              {/* QUOTE ICON */}

              <FormatQuoteRoundedIcon
                sx={{
                  fontSize: 48,

                  color: "#769914",

                  mb: -1,
                }}
              />

              {/* FULL FEEDBACK */}

              <Typography
                sx={{
                  color: "#444",

                  lineHeight: 1.9,

                  fontSize: "15px",

                  whiteSpace:
                    "pre-line",
                }}
              >
                “
                {
                  selectedTestimonial.text
                }
                ”
              </Typography>
            </DialogContent>
          </>
        )}
      </Dialog>

      {/* ========================================================
          ALL TESTIMONIALS DIALOG
      ======================================================== */}

      <Dialog
        open={allStoriesOpen}
        onClose={
          handleCloseAllStories
        }
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

            backgroundColor:
              "#07151f",

            color: "#ffffff",

            overflow: "hidden",
          },
        }}
      >
        {/* ======================================================
            ALL STORIES HEADER
        ====================================================== */}

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

              textTransform:
                "uppercase",

              mb: 0.7,
            }}
          >
            Client Feedback
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
            All Client Stories
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
            Explore all of our published
            client feedback and video
            testimonials.
          </Typography>

          <IconButton
            onClick={
              handleCloseAllStories
            }
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

        {/* ======================================================
            ALL STORIES CONTENT
        ====================================================== */}

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

            "&::-webkit-scrollbar-track":
              {
                background:
                  "rgba(255,255,255,0.04)",
              },

            "&::-webkit-scrollbar-thumb":
              {
                backgroundColor:
                  "#769914",

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
                <TestimonialCard
                  key={testimonial._id}
                  testimonial={
                    testimonial
                  }
                />
              )
            )}
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Testimonials;