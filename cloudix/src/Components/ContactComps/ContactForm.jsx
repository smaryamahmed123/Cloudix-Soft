import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Snackbar,
  Alert,
  CircularProgress,
  MenuItem,
} from "@mui/material";
import { motion } from "framer-motion";
import axios from "axios";

import SendIcon from "@mui/icons-material/Send";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

import GradientButton from "../GradientButton";

const MotionBox = motion.create(Box);

const services = [
  "Web Development",
  "Mobile App Development",
  "E-Commerce",
  "Digital Marketing",
  "Branding & Graphic Design",
  "Custom Software",
  "Other",
];

const ContactForm = () => {
  const backendURL = import.meta.env.VITE_BACKEND_URL || "";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNo: "",
    service: "",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const showMessage = (message, severity) => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({
      ...prev,
      open: false,
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      return "Please enter your name.";
    }

    if (!formData.email.trim()) {
      return "Please enter your email address.";
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email)) {
      return "Please enter a valid email address.";
    }

    if (!formData.message.trim()) {
      return "Please enter your message.";
    }

    return null;
  };

  const handleSubmit = async () => {
    const error = validateForm();

    if (error) {
      showMessage(error, "warning");
      return;
    }

    setSubmitting(true);

    try {
      await axios.post(
        `${backendURL}/api/contact`,
        formData
      );

      showMessage(
        "Thank you! Your message has been sent successfully.",
        "success"
      );

      setFormData({
        name: "",
        email: "",
        phoneNo: "",
        service: "",
        message: "",
      });
    } catch (err) {
      console.error(
        "Contact form error:",
        err
      );

      showMessage(
        "Failed to send your message. Please try again later.",
        "error"
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box
      id="contact-form"
      sx={{
        backgroundColor: "#f7f8f5",
        py: {
          xs: 7,
          md: 11,
        },
      }}
    >
      <Box
        sx={{
          maxWidth: 1050,
          mx: "auto",
          px: {
            xs: 2,
            sm: 3,
          },
        }}
      >
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
            backgroundColor: "#fff",
            borderRadius: {
              xs: 3,
              md: 4,
            },
            overflow: "hidden",
            boxShadow:
              "0 25px 70px rgba(17,30,44,0.10)",
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "0.65fr 1.35fr",
            },
          }}
        >
          {/* Left information panel */}
          <Box
            sx={{
              backgroundColor: "#111E2C",
              p: {
                xs: 3,
                sm: 4,
                md: 5,
              },
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Decorative shape */}
            <Box
              sx={{
                position: "absolute",
                width: 180,
                height: 180,
                right: -100,
                bottom: -70,
                border:
                  "25px solid rgba(118,153,20,0.15)",
                transform: "rotate(45deg)",
              }}
            />

            <Typography
              sx={{
                color: "#BBBF19",
                fontSize: "0.8rem",
                fontWeight: 700,
                letterSpacing: 1.5,
                textTransform: "uppercase",
                mb: 2,
              }}
            >
              Start a Conversation
            </Typography>

            <Typography
              component="h2"
              sx={{
                color: "#fff",
                fontWeight: 800,
                fontSize: {
                  xs: "2rem",
                  md: "2.5rem",
                },
                lineHeight: 1.15,
                mb: 2,
              }}
            >
              Tell Us About
              <Box
                component="span"
                sx={{
                  display: "block",
                  color: "#BBBF19",
                }}
              >
                Your Project.
              </Box>
            </Typography>

            <Typography
              sx={{
                color:
                  "rgba(255,255,255,0.68)",
                lineHeight: 1.8,
                fontSize: "0.95rem",
                mb: 4,
              }}
            >
              Fill out the form and share your
              requirements with us. Our team will
              review your inquiry and get back to
              you.
            </Typography>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                color: "#fff",
              }}
            >
              <CheckCircleOutlineIcon
                sx={{
                  color: "#BBBF19",
                }}
              />

              <Typography
                sx={{
                  fontSize: "0.85rem",
                }}
              >
                Your information stays private.
              </Typography>
            </Box>
          </Box>

          {/* Form */}
          <Box
            sx={{
              p: {
                xs: 3,
                sm: 4,
                md: 5,
              },
            }}
          >
            <Typography
              sx={{
                color: "#111E2C",
                fontWeight: 800,
                fontSize: "1.5rem",
                mb: 3,
              }}
            >
              Send Us a Message
            </Typography>

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
              <TextField
                label="Full Name"
                name="name"
                required
                fullWidth
                value={formData.name}
                onChange={handleChange}
              />

              <TextField
                label="Email Address"
                name="email"
                type="email"
                required
                fullWidth
                value={formData.email}
                onChange={handleChange}
              />

              <TextField
                label="Phone Number"
                name="phoneNo"
                fullWidth
                value={formData.phoneNo}
                onChange={handleChange}
              />

              <TextField
                select
                label="What do you need?"
                name="service"
                fullWidth
                value={formData.service}
                onChange={handleChange}
              >
                <MenuItem value="">
                  Select a service
                </MenuItem>

                {services.map((service) => (
                  <MenuItem
                    key={service}
                    value={service}
                  >
                    {service}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                label="Message"
                name="message"
                required
                multiline
                minRows={6}
                fullWidth
                value={formData.message}
                onChange={handleChange}
                sx={{
                  gridColumn: {
                    xs: "auto",
                    sm: "1 / -1",
                  },
                }}
              />
            </Box>

            <Box
              sx={{
                mt: 3,
                display: "flex",
                flexDirection: {
                  xs: "column",
                  sm: "row",
                },
                alignItems: {
                  xs: "stretch",
                  sm: "center",
                },
                justifyContent: "space-between",
                gap: 2,
              }}
            >
              <Typography
                sx={{
                  fontSize: "0.78rem",
                  color: "text.secondary",
                }}
              >
                Required fields are marked with *
              </Typography>

              <GradientButton
                text={
                  submitting
                    ? "Sending..."
                    : "Send Message"
                }
                onClick={handleSubmit}
                disabled={submitting}
                icon={
                  submitting ? (
                    <CircularProgress
                      size={18}
                      sx={{
                        color: "inherit",
                      }}
                    />
                  ) : (
                    <SendIcon />
                  )
                }
              />
            </Box>
          </Box>
        </MotionBox>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4500}
        onClose={handleCloseSnackbar}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{
            width: "100%",
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ContactForm;