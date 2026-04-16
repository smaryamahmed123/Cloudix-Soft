import React, { useState } from 'react';
import {
  Box, TextField, Typography, useTheme,
  Snackbar, Alert, Grid, Container,
} from '@mui/material';
import { motion } from 'framer-motion';
import GradientButton from '../GradientButton';
import axios from 'axios';

const MotionBox = motion.create(Box);

const ContactForm = () => {
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const theme = useTheme();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNo: '',
    message: '',
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleSubmit = async () => {
    try {
      await axios.post(`${backendURL}/api/contact`, formData);
      setSnackbar({ open: true, message: 'Message sent successfully!', severity: 'success' });
      setFormData({ name: '', email: '', phoneNo: '', message: '' });
    } catch (err) {
      console.error(err);
      setSnackbar({ open: true, message: 'Failed to send message.', severity: 'error' });
    }
  };

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          py: { xs: 6, md: 10 }, 
        }}
      >
        <MotionBox
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          sx={{
            bgcolor: theme.palette.background.paper,
            py: { xs: 6, md: 10 },     // ✅ replaces isMobile ternary
            px: { xs: 2, sm: 4, md: 6 }, 
            borderRadius: 2,
            boxShadow: 3,
            width: '100%',
            maxWidth: { xs: '95%', sm: '100%' }, 
            mx: 'auto',
          }}
        >
          <Typography
            variant="h3"
            align="center"
            sx={{
              mb: 4,
              fontWeight: 'bold',
              color: theme.palette.primary.main,
              // ✅ theme responsiveFontSizes handles size automatically
            }}
          >
            Send us a message
          </Typography>

<Grid container spacing={3}>
          {/* Left Side — Inputs */}
          <Grid size={{md: 6, sm: 12, xs: 12}}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                gap: 2,
              }}
            >
              <TextField
                label="Full Name"
                name="name"
                variant="outlined"
                fullWidth
                value={formData.name}
                onChange={handleChange}
              />
              <TextField
                label="Email Address"
                name="email"
                variant="outlined"
                fullWidth
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

          {/* Right Side — Message */}
          <Grid size={{md: 6, sm: 12, xs: 12}}>
            <TextField
              label="Message"
              name="message"
              multiline
              variant="outlined"
              fullWidth
              rows={7}
              value={formData.message}
              onChange={handleChange}
              sx={{
                height: '100%',
                '& .MuiOutlinedInput-root': {
                  height: '100%',
                  alignItems: 'flex-start',
                },
              }}
            />
          </Grid>
        </Grid>

          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <GradientButton text="Send via Email" onClick={handleSubmit} />
          </Box>
        </MotionBox>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
};

export default ContactForm;
