import React, { memo, useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";

import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

import axios from "axios";

const MotionBox = motion.create(Box);

const backendURL = import.meta.env.VITE_BACKEND_URL || "";

const ContactInfo = () => {
  const theme = useTheme();

  const prefersReducedMotion = useMediaQuery(
    "(prefers-reduced-motion: reduce)"
  );

  const [info, setInfo] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const fetchContactInfo = async () => {
      try {
        const res = await axios.get(
          `${backendURL}/api/contact-info`,
          {
            signal: controller.signal,
            timeout: 8000,
          }
        );

        setInfo(res.data || {});
      } catch (err) {
        if (!axios.isCancel(err)) {
          console.error(
            "Failed to load contact information:",
            err
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchContactInfo();

    return () => controller.abort();
  }, []);

  const phone = info.phone || "Not available";
  const email = info.email || "Not available";

  const whatsappNumber = info.whatsapp || info.phone || "";

  const whatsappLink = whatsappNumber
    ? `https://wa.me/${whatsappNumber.replace(/\D/g, "")}`
    : null;

  const workingHours =
    info.workingHours?.monday?.open &&
    info.workingHours?.monday?.close
      ? `${info.workingHours.monday.open} – ${info.workingHours.monday.close}`
      : "Not available";

  const contactItems = [
    {
      title: "Call Us",
      value: phone,
      icon: <PhoneIcon />,
      href:
        phone !== "Not available"
          ? `tel:${phone}`
          : undefined,
    },
    {
      title: "Email Us",
      value: email,
      icon: <EmailIcon />,
      href:
        email !== "Not available"
          ? `mailto:${email}`
          : undefined,
    },
    {
      title: "Working Hours",
      value: (
        <>
          <Box component="span" sx={{ display: "block" }}>
            Monday – Saturday
          </Box>

          <Box
            component="span"
            sx={{
              display: "block",
              color: "#BBBF19",
              fontWeight: 700,
              mt: 0.4,
            }}
          >
            {workingHours}
          </Box>

          <Box
            component="span"
            sx={{
              display: "block",
              mt: 0.4,
            }}
          >
            Sunday: Closed
          </Box>
        </>
      ),
      icon: <AccessTimeIcon />,
    },
  ];

  if (whatsappLink) {
    contactItems.push({
      title: "WhatsApp",
      value: "Chat with our team",
      icon: <WhatsAppIcon />,
      href: whatsappLink,
    });
  }

  return (
    <Box
      sx={{
        backgroundColor: "#111E2C",
        py: {
          xs: 7,
          md: 10,
        },
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "0.8fr 1.2fr",
            },
            gap: {
              xs: 5,
              md: 8,
            },
            alignItems: "center",
          }}
        >
          {/* Left */}
          <MotionBox
            initial={
              prefersReducedMotion
                ? false
                : {
                    opacity: 0,
                    x: -40,
                  }
            }
            whileInView={
              prefersReducedMotion
                ? false
                : {
                    opacity: 1,
                    x: 0,
                  }
            }
            viewport={{ once: true }}
            transition={{
              duration: 0.7,
            }}
          >
            <Typography
              sx={{
                color: "#BBBF19",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: 1.5,
                fontSize: "0.8rem",
                mb: 2,
              }}
            >
              Get In Touch
            </Typography>

            <Typography
              component="h2"
              sx={{
                color: "#fff",
                fontWeight: 800,
                fontSize: {
                  xs: "2rem",
                  md: "3rem",
                },
                lineHeight: 1.15,
                mb: 2,
              }}
            >
              We Would Love
              <Box
                component="span"
                sx={{
                  display: "block",
                  color: "#BBBF19",
                }}
              >
                To Hear From You.
              </Box>
            </Typography>

            <Typography
              sx={{
                color: "rgba(255,255,255,0.68)",
                lineHeight: 1.8,
                maxWidth: 480,
              }}
            >
              Have questions about a project, our services, or
              how we can help your business? Reach out to us
              through any of the options below.
            </Typography>
          </MotionBox>

          {/* Right */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
              },
              gap: 2,
            }}
          >
            {loading
              ? [1, 2, 3].map((item) => (
                  <Box
                    key={item}
                    sx={{
                      height: 150,
                      borderRadius: 3,
                      backgroundColor:
                        "rgba(255,255,255,0.06)",
                    }}
                  />
                ))
              : contactItems.map((item, index) => (
                  <MotionBox
                    key={item.title}
                    initial={
                      prefersReducedMotion
                        ? false
                        : {
                            opacity: 0,
                            y: 20,
                          }
                    }
                    whileInView={
                      prefersReducedMotion
                        ? false
                        : {
                            opacity: 1,
                            y: 0,
                          }
                    }
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.08,
                    }}
                    component={
                      item.href ? "a" : "div"
                    }
                    href={item.href}
                    target={
                      item.href?.startsWith(
                        "https://wa.me"
                      )
                        ? "_blank"
                        : undefined
                    }
                    rel={
                      item.href?.startsWith(
                        "https://wa.me"
                      )
                        ? "noopener noreferrer"
                        : undefined
                    }
                    sx={{
                      textDecoration: "none",
                      color: "inherit",
                      p: 3,
                      minHeight: 150,
                      borderRadius: 3,
                      border:
                        "1px solid rgba(255,255,255,0.08)",
                      backgroundColor:
                        "rgba(255,255,255,0.04)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        borderColor:
                          "rgba(187,191,25,0.45)",
                        backgroundColor:
                          "rgba(118,153,20,0.08)",
                        transform:
                          "translateY(-4px)",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 46,
                        height: 46,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 2,
                        mb: 2,
                        color: "#BBBF19",
                        backgroundColor:
                          "rgba(187,191,25,0.1)",
                      }}
                    >
                      {item.icon}
                    </Box>

                    <Typography
                      sx={{
                        color:
                          "rgba(255,255,255,0.6)",
                        fontSize: "0.75rem",
                        textTransform: "uppercase",
                        letterSpacing: 1,
                        fontWeight: 700,
                        mb: 0.7,
                      }}
                    >
                      {item.title}
                    </Typography>

                    <Typography
                      sx={{
                        color: "#fff",
                        fontSize: "0.9rem",
                        lineHeight: 1.6,
                      }}
                    >
                      {item.value}
                    </Typography>
                  </MotionBox>
                ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default memo(ContactInfo);