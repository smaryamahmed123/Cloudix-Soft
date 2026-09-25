// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Helmet } from "react-helmet-async";
// import { Container, Typography, Box, useTheme, Skeleton } from "@mui/material";
// import bgImg from "../assets/Privicy-bg.webp";
// import HeroSection from "../Components/HeroSection";
// import { parseRichText } from "../utils/parseRichText";

// const backendURL = import.meta.env.VITE_BACKEND_URL;

// const PrivacyPolicyUser = () => {
//   const theme = useTheme();
//   const [sections, setSections] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchPolicy = async () => {
//       try {
//         const { data } = await axios.get(`${backendURL}/api/privacy-policy`);
//         setSections(data.sections || []);
//       } catch (error) {
//         console.error("Error fetching policy:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchPolicy();
//   }, []);

//   return (
//     <Box sx={{ backgroundColor: theme.palette.background.subtle, minHeight: "100vh" }}>
//       {/* 1. Page SEO Metadata */}
//       <Helmet>
//         <title>Privacy Policy | Cloudix Soft</title>
//         <meta
//           name="description"
//           content="Read Cloudix Soft's Privacy Policy to understand how we collect, use, and protect your personal data and privacy."
//         />
//         <meta property="og:title" content="Privacy Policy | Cloudix Soft" />
//         <meta
//           property="og:description"
//           content="Learn about Cloudix Soft's data privacy practices and commitment to user security."
//         />
//         <link rel="canonical" href="https://cloudixsoft.com/privacy-policy" />
//       </Helmet>

//       {/* 2. Hero Banner */}
//       <HeroSection
//         image={bgImg}
//         title="Privacy Policy"
//         subtitle="Learn how we collect, use, and protect your personal information."
//       />

//       {/* 3. Policy Content */}
//       <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
//         {loading ? (
//           <Box sx={{ py: 4 }}>
//             <Skeleton variant="text" width="40%" height={40} sx={{ mb: 2 }} />
//             <Skeleton variant="rectangular" width="100%" height={120} sx={{ mb: 4, borderRadius: 2 }} />
//             <Skeleton variant="text" width="30%" height={40} sx={{ mb: 2 }} />
//             <Skeleton variant="rectangular" width="100%" height={120} sx={{ borderRadius: 2 }} />
//           </Box>
//         ) : sections.length === 0 ? (
//           <Typography variant="body1" align="center" color="text.secondary">
//             No privacy policy sections available at this time.
//           </Typography>
//         ) : (
//           sections.map((section, index) => (
//             <Box key={section._id || index} sx={{ mb: 5 }}>
//               {/* Semantic H2 Section Title */}
//               <Typography
//                 component="h2"
//                 variant="h6"
//                 gutterBottom
//                 sx={{
//                   fontWeight: 600,
//                   color: theme.palette.primary.dark,
//                   fontSize: { xs: "1.1rem", md: "1.25rem" },
//                 }}
//               >
//                 {parseRichText(section.title)}
//               </Typography>

//               {/* Rich Paragraph Text */}
//               <Typography
//                 variant="body1"
//                 component="div"
//                 sx={{
//                   textAlign: "justify",
//                   color: theme.palette.text.secondary,
//                   lineHeight: 1.8,
//                 }}
//               >
//                 {section.content.split("\n").map((line, i, arr) => (
//                   <React.Fragment key={i}>
//                     {parseRichText(line)}
//                     {i < arr.length - 1 && <br />}
//                   </React.Fragment>
//                 ))}
//               </Typography>
//             </Box>
//           ))
//         )}
//       </Container>
//     </Box>
//   );
// };

// export default PrivacyPolicyUser;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet-async";

import {
  Container,
  Typography,
  Box,
  useTheme,
  Skeleton,
  Paper,
  Stack,
  Chip,
  Divider,
  Button,
} from "@mui/material";

import {
  SecurityRounded,
  PersonRounded,
  SettingsRounded,
  GavelRounded,
  ShareRounded,
  CookieRounded,
  StorageRounded,
  ShieldRounded,
  MailRounded,
  ArrowForwardRounded,
  VerifiedUserRounded,
} from "@mui/icons-material";

import bgImg from "../assets/Privicy-bg.webp";
import HeroSection from "../Components/HeroSection";
import { parseRichText } from "../utils/parseRichText";

const backendURL = import.meta.env.VITE_BACKEND_URL;

const PrivacyPolicyUser = () => {
  const theme = useTheme();

  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPolicy = async () => {
      try {
        const { data } = await axios.get(
          `${backendURL}/api/privacy-policy`
        );

        setSections(data.sections || []);
      } catch (error) {
        console.error("Error fetching policy:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPolicy();
  }, []);

  /*
   * Icons are assigned based on section order.
   * This means your admin can add/remove sections
   * without needing to manually select icons.
   */
  const sectionIcons = [
    PersonRounded,
    SettingsRounded,
    GavelRounded,
    ShareRounded,
    CookieRounded,
    StorageRounded,
    ShieldRounded,
    MailRounded,
    SecurityRounded,
  ];

  const getSectionIcon = (index) => {
    const Icon = sectionIcons[index % sectionIcons.length];
    return Icon;
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, #F7F9FB 0%, #FFFFFF 45%, #F7F9FB 100%)",
      }}
    >
      {/* =========================================================
          SEO
      ========================================================= */}

      <Helmet>
        <title>Privacy Policy | Cloudix Soft</title>

        <meta
          name="description"
          content="Read Cloudix Soft's Privacy Policy to understand how we collect, use, and protect your personal data and privacy."
        />

        <meta
          property="og:title"
          content="Privacy Policy | Cloudix Soft"
        />

        <meta
          property="og:description"
          content="Learn about Cloudix Soft's data privacy practices and commitment to user security."
        />

        <link
          rel="canonical"
          href="https://cloudixsoft.com/privacy-policy"
        />
      </Helmet>

      {/* =========================================================
          HERO
      ========================================================= */}

      <HeroSection
        image={bgImg}
        title="Privacy Policy"
        subtitle="Learn how we collect, use, and protect your personal information."
      />

      {/* =========================================================
          MAIN CONTENT
      ========================================================= */}

      <Container
        maxWidth="lg"
        sx={{
          py: {
            xs: 5,
            sm: 7,
            md: 10,
          },
        }}
      >
        {/* =====================================================
            TRUST / INTRO CARD
        ===================================================== */}

        {!loading && sections.length > 0 && (
          <Paper
            elevation={0}
            sx={{
              position: "relative",
              overflow: "hidden",
              mb: {
                xs: 5,
                md: 7,
              },
              p: {
                xs: 3,
                sm: 4,
                md: 5,
              },
              borderRadius: {
                xs: 3,
                md: 4,
              },
              border: "1px solid rgba(118, 153, 20, 0.15)",
              background:
                "linear-gradient(135deg, #FFFFFF 0%, #F7FBF0 100%)",
              boxShadow: "0 15px 45px rgba(7, 21, 31, 0.06)",
            }}
          >
            {/* Decorative green shape */}

            <Box
              sx={{
                position: "absolute",
                right: -50,
                top: -70,
                width: 180,
                height: 180,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(187,191,25,0.20), transparent 68%)",
                pointerEvents: "none",
              }}
            />

            <Stack
              direction={{
                xs: "column",
                md: "row",
              }}
              spacing={{
                xs: 3,
                md: 4,
              }}
              alignItems={{
                xs: "flex-start",
                md: "center",
              }}
            >
              {/* Icon */}

              <Box
                sx={{
                  width: {
                    xs: 62,
                    md: 76,
                  },
                  height: {
                    xs: 62,
                    md: 76,
                  },
                  minWidth: {
                    xs: 62,
                    md: 76,
                  },
                  borderRadius: 3,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background:
                    "linear-gradient(135deg, #769914, #BBBF19)",
                  color: "#fff",
                  boxShadow:
                    "0 12px 25px rgba(118,153,20,0.25)",
                }}
              >
                <SecurityRounded
                  sx={{
                    fontSize: {
                      xs: 32,
                      md: 38,
                    },
                  }}
                />
              </Box>

              {/* Content */}

              <Box sx={{ flex: 1 }}>
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1}
                  sx={{ mb: 1.2 }}
                >
                  <Chip
                    icon={
                      <VerifiedUserRounded
                        sx={{ fontSize: "16px !important" }}
                      />
                    }
                    label="Your Privacy Matters"
                    size="small"
                    sx={{
                      fontWeight: 700,
                      color: theme.palette.primary.dark,
                      backgroundColor: "rgba(118,153,20,0.10)",
                      border:
                        "1px solid rgba(118,153,20,0.16)",
                    }}
                  />
                </Stack>

                <Typography
                  sx={{
                    color: theme.palette.text.primary,
                    fontWeight: 700,
                    fontSize: {
                      xs: "1.1rem",
                      md: "1.3rem",
                    },
                    mb: 1,
                  }}
                >
                  Your privacy is important to us.
                </Typography>

                <Typography
                  sx={{
                    color: theme.palette.text.secondary,
                    lineHeight: 1.8,
                    fontSize: {
                      xs: "0.9rem",
                      md: "0.98rem",
                    },
                    maxWidth: 850,
                  }}
                >
                  This Privacy Policy explains how Cloudix Soft
                  collects, uses, stores, and protects your
                  information when you use our services or
                  interact with our website.
                </Typography>
              </Box>
            </Stack>
          </Paper>
        )}

        {/* =====================================================
            LOADING
        ===================================================== */}

        {loading ? (
          <Box>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  md: "repeat(2, 1fr)",
                },
                gap: 3,
              }}
            >
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <Paper
                  key={item}
                  elevation={0}
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    border: "1px solid #E8EDF0",
                  }}
                >
                  <Skeleton
                    variant="rounded"
                    width={46}
                    height={46}
                    sx={{ mb: 2 }}
                  />

                  <Skeleton
                    variant="text"
                    width="60%"
                    height={32}
                  />

                  <Skeleton
                    variant="text"
                    width="95%"
                  />

                  <Skeleton
                    variant="text"
                    width="85%"
                  />

                  <Skeleton
                    variant="text"
                    width="70%"
                  />
                </Paper>
              ))}
            </Box>
          </Box>
        ) : sections.length === 0 ? (
          <Paper
            elevation={0}
            sx={{
              textAlign: "center",
              p: 6,
              borderRadius: 4,
              border: "1px solid #E8EDF0",
            }}
          >
            <SecurityRounded
              sx={{
                fontSize: 50,
                color: theme.palette.primary.main,
                mb: 2,
              }}
            />

            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                mb: 1,
              }}
            >
              Privacy Policy Unavailable
            </Typography>

            <Typography color="text.secondary">
              No privacy policy sections are available at
              this time.
            </Typography>
          </Paper>
        ) : (
          <>
            {/* =================================================
                SECTION HEADER
            ================================================= */}

            <Box
              sx={{
                textAlign: "center",
                maxWidth: 720,
                mx: "auto",
                mb: {
                  xs: 4,
                  md: 6,
                },
              }}
            >
              <Typography
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 1,
                  color: theme.palette.primary.main,
                  fontWeight: 800,
                  fontSize: "0.78rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  mb: 1.5,
                }}
              >
                <Box
                  sx={{
                    width: 28,
                    height: 2,
                    backgroundColor:
                      theme.palette.primary.main,
                  }}
                />

                Privacy & Security

                <Box
                  sx={{
                    width: 28,
                    height: 2,
                    backgroundColor:
                      theme.palette.primary.main,
                  }}
                />
              </Typography>

              <Typography
                component="h1"
                sx={{
                  fontWeight: 800,
                  color: theme.palette.primary.dark,
                  fontSize: {
                    xs: "1.8rem",
                    sm: "2.2rem",
                    md: "2.7rem",
                  },
                  lineHeight: 1.15,
                  mb: 1.5,
                }}
              >
                How We Protect Your Information
              </Typography>

              <Typography
                sx={{
                  color: theme.palette.text.secondary,
                  lineHeight: 1.8,
                  fontSize: {
                    xs: "0.9rem",
                    md: "1rem",
                  },
                }}
              >
                We believe privacy should be simple and
                transparent. Explore our policies below to
                understand how your information is handled.
              </Typography>
            </Box>

            {/* =================================================
                POLICY CARDS
            ================================================= */}

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  md: "repeat(2, minmax(0, 1fr))",
                },
                gap: {
                  xs: 2.5,
                  md: 3,
                },
              }}
            >
              {sections.map((section, index) => {
                const Icon = getSectionIcon(index);

                return (
                  <Paper
                    key={section._id || index}
                    component="article"
                    elevation={0}
                    sx={{
                      position: "relative",
                      overflow: "hidden",
                      p: {
                        xs: 2.5,
                        sm: 3,
                        md: 3.5,
                      },
                      borderRadius: 3,
                      border:
                        "1px solid rgba(118,153,20,0.13)",
                      backgroundColor: "#fff",
                      transition:
                        "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",

                      "&:hover": {
                        transform: "translateY(-5px)",
                        borderColor:
                          "rgba(118,153,20,0.35)",
                        boxShadow:
                          "0 18px 45px rgba(7,21,31,0.09)",
                      },

                      "&::after": {
                        content: '""',
                        position: "absolute",
                        right: -45,
                        bottom: -55,
                        width: 120,
                        height: 120,
                        borderRadius: "50%",
                        background:
                          "rgba(187,191,25,0.06)",
                        pointerEvents: "none",
                      },
                    }}
                  >
                    {/* Header */}

                    <Stack
                      direction="row"
                      spacing={2}
                      alignItems="flex-start"
                      sx={{ mb: 2.5 }}
                    >
                      {/* Number */}

                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          minWidth: 48,
                          borderRadius: 2,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background:
                            "linear-gradient(135deg, #769914, #BBBF19)",
                          color: "#fff",
                          fontWeight: 800,
                          fontSize: "0.9rem",
                          boxShadow:
                            "0 8px 18px rgba(118,153,20,0.20)",
                        }}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </Box>

                      {/* Icon */}

                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          minWidth: 48,
                          borderRadius: 2,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor:
                            "rgba(118,153,20,0.08)",
                          color: theme.palette.primary.main,
                        }}
                      >
                        <Icon />
                      </Box>

                      <Box sx={{ pt: 0.4 }}>
                        <Typography
                          component="h2"
                          sx={{
                            fontWeight: 800,
                            color:
                              theme.palette.primary.dark,
                            fontSize: {
                              xs: "1rem",
                              md: "1.08rem",
                            },
                            lineHeight: 1.35,
                          }}
                        >
                          {parseRichText(section.title)}
                        </Typography>
                      </Box>
                    </Stack>

                    <Divider
                      sx={{
                        mb: 2.2,
                        borderColor:
                          "rgba(7,21,31,0.07)",
                      }}
                    />

                    {/* Content */}

                    <Typography
                      component="div"
                      sx={{
                        color: theme.palette.text.secondary,
                        fontSize: {
                          xs: "0.87rem",
                          md: "0.92rem",
                        },
                        lineHeight: 1.85,

                        "& ul": {
                          paddingLeft: "1.2rem",
                          marginTop: "0.5rem",
                          marginBottom: "0.8rem",
                        },

                        "& li": {
                          marginBottom: "0.35rem",
                        },

                        "& strong": {
                          color:
                            theme.palette.text.primary,
                        },
                      }}
                    >
                      {section.content
                        ?.split("\n")
                        .map((line, i, arr) => (
                          <React.Fragment key={i}>
                            {parseRichText(line)}

                            {i < arr.length - 1 && (
                              <br />
                            )}
                          </React.Fragment>
                        ))}
                    </Typography>
                  </Paper>
                );
              })}
            </Box>

            {/* =================================================
                PRIVACY CTA
            ================================================= */}

            <Paper
              elevation={0}
              sx={{
                mt: {
                  xs: 5,
                  md: 7,
                },
                position: "relative",
                overflow: "hidden",
                borderRadius: 4,
                p: {
                  xs: 3,
                  sm: 4,
                  md: 5,
                },
                color: "#fff",
                background:
                  "linear-gradient(110deg, #07151F 0%, #0D2734 65%, #182F18 100%)",
                boxShadow:
                  "0 20px 50px rgba(7,21,31,0.16)",
              }}
            >
              {/* Decorative accent */}

              <Box
                sx={{
                  position: "absolute",
                  right: -50,
                  top: -80,
                  width: 190,
                  height: 280,
                  background:
                    "linear-gradient(135deg, rgba(118,153,20,0.9), rgba(187,191,25,0.3))",
                  transform: "rotate(25deg)",
                  opacity: 0.55,
                }}
              />

              <Stack
                direction={{
                  xs: "column",
                  sm: "row",
                }}
                alignItems={{
                  xs: "flex-start",
                  sm: "center",
                }}
                justifyContent="space-between"
                spacing={3}
                sx={{
                  position: "relative",
                  zIndex: 1,
                }}
              >
                <Box>
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    sx={{ mb: 1 }}
                  >
                    <ShieldRounded
                      sx={{
                        color: "#BBBF19",
                      }}
                    />

                    <Typography
                      sx={{
                        fontWeight: 800,
                        color: "#BBBF19",
                      }}
                    >
                      Your Privacy. Our Responsibility.
                    </Typography>
                  </Stack>

                  <Typography
                    sx={{
                      fontSize: {
                        xs: "1.05rem",
                        md: "1.25rem",
                      },
                      fontWeight: 700,
                      mb: 0.6,
                    }}
                  >
                    Have questions about your privacy?
                  </Typography>

                  <Typography
                    sx={{
                      color: "rgba(255,255,255,0.72)",
                      fontSize: "0.9rem",
                    }}
                  >
                    Our team is here to help with your
                    privacy-related questions.
                  </Typography>
                </Box>

                <Button
                  href="/contact"
                  variant="contained"
                  endIcon={<ArrowForwardRounded />}
                  sx={{
                    flexShrink: 0,
                    px: 3,
                    py: 1.25,
                    borderRadius: 50,
                    fontWeight: 800,
                    color: "#07151F",
                    background:
                      "linear-gradient(135deg, #BBBF19, #D4E157)",
                    boxShadow:
                      "0 10px 25px rgba(187,191,25,0.25)",

                    "&:hover": {
                      background:
                        "linear-gradient(135deg, #D4E157, #BBBF19)",
                    },
                  }}
                >
                  Contact Us
                </Button>
              </Stack>
            </Paper>
          </>
        )}
      </Container>
    </Box>
  );
};

export default PrivacyPolicyUser;