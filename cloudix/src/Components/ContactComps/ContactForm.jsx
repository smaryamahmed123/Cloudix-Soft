import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  useTheme,
  Snackbar,
  Alert,
  Grid,
  Container,
  CircularProgress,
} from "@mui/material";
import { motion } from "framer-motion";
import GradientButton from "../GradientButton";
import axios from "axios";

const MotionBox = motion.create(Box);

const ContactForm = () => {
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const theme = useTheme();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNo: "",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const validateForm = () => {
    if (!formData.name.trim()) return "Please enter your name.";
    if (!formData.email.trim()) return "Please enter your email address.";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) return "Please enter a valid email address.";
    if (!formData.message.trim()) return "Please enter your message.";
    return null;
  };

  const handleSubmit = async () => {
    const errorMsg = validateForm();
    if (errorMsg) {
      setSnackbar({ open: true, message: errorMsg, severity: "warning" });
      return;
    }

    setSubmitting(true);
    try {
      await axios.post(`${backendURL}/api/contact`, formData);
      setSnackbar({
        open: true,
        message: "Message sent successfully!",
        severity: "success",
      });
      setFormData({ name: "", email: "", phoneNo: "", message: "" });
    } catch (err) {
      console.error(err);
      setSnackbar({
        open: true,
        message: "Failed to send message. Please try again later.",
        severity: "error",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          py: { xs: 6, md: 10 },
        }}
      >
        <MotionBox
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          sx={{
            bgcolor: theme.palette.background.paper,
            py: { xs: 2, sm: 4, md: 6 },
            px: { xs: 2, sm: 4, md: 6 },
            borderRadius: 2,
            boxShadow: 3,
            width: "100%",
            maxWidth: { xs: "95%", sm: "100%" },
            mx: "auto",
          }}
        >
          <Typography
            component="h2" // Changed to h2 for semantic structure
            variant="h3"
            align="center"
            sx={{
              mb: 4,
              fontWeight: "bold",
              color: theme.palette.primary.main,
            }}
          >
            Send Us a Message
          </Typography>

          <Grid container spacing={3}>
            {/* Inputs */}
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                <TextField
                  label="Full Name"
                  name="name"
                  variant="outlined"
                  fullWidth
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
                <TextField
                  label="Email Address"
                  name="email"
                  type="email"
                  variant="outlined"
                  fullWidth
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
                <TextField
                  label="Phone Number"
                  name="phoneNo"
                  variant="outlined"
                  fullWidth
                  value={formData.phoneNo}
                  onChange={handleChange}
                />
              </Box>
            </Grid>

            {/* Message Area */}
            <Grid item xs={12} md={6}>
              <TextField
                label="Message"
                name="message"
                multiline
                required
                variant="outlined"
                fullWidth
                rows={7}
                value={formData.message}
                onChange={handleChange}
                sx={{
                  height: "100%",
                  "& .MuiOutlinedInput-root": {
                    height: "100%",
                    alignItems: "flex-start",
                  },
                }}
              />
            </Grid>
          </Grid>

          <Box sx={{ textAlign: "center", mt: 4 }}>
            <GradientButton
              text={submitting ? "Sending..." : "Send via Email"}
              onClick={handleSubmit}
              disabled={submitting}
            />
            {submitting && (
              <Box sx={{ mt: 2 }}>
                <CircularProgress size={24} sx={{ color: theme.palette.primary.main }} />
              </Box>
            )}
          </Box>
        </MotionBox>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
};

export default ContactForm;