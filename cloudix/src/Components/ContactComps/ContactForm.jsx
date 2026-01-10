// // import React, { useState } from 'react';
// // import {
// //   Box,
// //   TextField,
// //   Typography,
// //   useMediaQuery,
// //   useTheme,
// //   Snackbar,
// //   Alert,
// //   Grid,
// // } from '@mui/material';
// // import { motion } from 'framer-motion';
// // import GradientButton from '../GradientButton';
// // import axios from 'axios';

// // const MotionBox = motion.create(Box);

// // const ContactForm = () => {
// //   const backendURL = import.meta.env.VITE_BACKEND_URL;
// //   const theme = useTheme();
// //   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

// //   const [formData, setFormData] = useState({
// //     name: '',
// //     email: '',
// //     phoneNo: '',
// //     message: '',
// //   });

// //   const [snackbar, setSnackbar] = useState({
// //     open: false,
// //     message: '',
// //     severity: 'success',
// //   });

// //   const handleChange = (e) => {
// //     setFormData({ ...formData, [e.target.name]: e.target.value });
// //   };

// //   const handleCloseSnackbar = () => {
// //     setSnackbar({ ...snackbar, open: false });
// //   };

// //   const handleSubmit = async () => {
// //     try {
// //       await axios.post(`${backendURL}/api/contact`, formData);
// //       setSnackbar({
// //         open: true,
// //         message: 'Message sent successfully!',
// //         severity: 'success',
// //       });
// //       setFormData({ name: '', email: '', phoneNo: '', message: '' });
// //     } catch (err) {
// //       console.error(err);
// //       setSnackbar({
// //         open: true,
// //         message: 'Failed to send message.',
// //         severity: 'error',
// //       });
// //     }
// //   };

// //   return (
// //     <Box
// //       sx={{
// //         display: 'flex',
// //         justifyContent: 'center',
// //         alignItems: 'center',
// //         width: '100%',
// //         py: 6,
// //         px: 2,
// //       }}
// //     >
// //       <MotionBox
// //         initial={{ opacity: 0, y: 30, scale: 0.95 }}
// //         animate={{ opacity: 1, y: 0, scale: 1 }}
// //         transition={{ duration: 0.8, ease: 'easeOut' }}
// //         sx={{
// //           bgcolor: 'background.paper',
// //           p: isMobile ? 2 : 4,
// //           borderRadius: 2,
// //           boxShadow: 3,
// //           width: '100%',
// //           // maxWidth: 900,
// //           mx: 'auto',
// //         }}
// //       >
// //         <Typography
// //           variant="h5"
// //           align="center"
// //           sx={{
// //             mb: 4,
// //             fontWeight: 'bold',
// //             color: 'primary.main',
// //             fontSize: isMobile ? '1.2rem' : '1.5rem',
// //           }}
// //         >
// //           Send us a message
// //         </Typography>

// //         <Grid container spacing={3}>
// //           {/* Left Side — Inputs */}
// //           <Grid size={{md: 6, sm: 12}}>
// //             <Box
// //               sx={{
// //                 display: 'flex',
// //                 flexDirection: 'column',
// //                 height: '100%',
// //                 gap: 2,
// //               }}
// //             >
// //               <TextField
// //                 label="Full Name"
// //                 name="name"
// //                 variant="outlined"
// //                 fullWidth
// //                 value={formData.name}
// //                 onChange={handleChange}
// //               />
// //               <TextField
// //                 label="Email Address"
// //                 name="email"
// //                 variant="outlined"
// //                 fullWidth
// //                 value={formData.email}
// //                 onChange={handleChange}
// //               />
// //               <TextField
// //                 label="Phone Number"
// //                 name="phoneNo"
// //                 variant="outlined"
// //                 fullWidth
// //                 value={formData.phoneNo}
// //                 onChange={handleChange}
// //               />
// //             </Box>
// //           </Grid>

// //           {/* Right Side — Message */}
// //           <Grid size={{md: 6, sm: 12}}>
// //             <TextField
// //               label="Message"
// //               name="message"
// //               multiline
// //               variant="outlined"
// //               fullWidth
// //               rows={7}
// //               value={formData.message}
// //               onChange={handleChange}
// //               sx={{
// //                 height: '100%',
// //                 '& .MuiOutlinedInput-root': {
// //                   height: '100%',
// //                   alignItems: 'flex-start',
// //                 },
// //               }}
// //             />
// //           </Grid>
// //         </Grid>

// //         <Box sx={{ textAlign: 'center', mt: 4 }}>
// //           <GradientButton text="Send via Email" onClick={handleSubmit} />
// //         </Box>
// //       </MotionBox>

// //       <Snackbar
// //         open={snackbar.open}
// //         autoHideDuration={4000}
// //         onClose={handleCloseSnackbar}
// //         anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
// //       >
// //         <Alert
// //           onClose={handleCloseSnackbar}
// //           severity={snackbar.severity}
// //           sx={{ width: '100%' }}
// //         >
// //           {snackbar.message}
// //         </Alert>
// //       </Snackbar>
// //     </Box>
// //   );
// // };

// // export default ContactForm;


// import React, { useState } from 'react';
// import {
//   Box,
//   TextField,
//   Typography,
//   useMediaQuery,
//   useTheme,
//   Snackbar,
//   Alert,
//   Grid,
//   CircularProgress,
// } from '@mui/material';
// import { motion } from 'framer-motion';
// import GradientButton from '../GradientButton';
// import axios from 'axios';

// const MotionBox = motion.create(Box);

// const ContactForm = () => {
//   const backendURL = import.meta.env.VITE_BACKEND_URL || ''; // fallback
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phoneNo: '',
//     message: '',
//   });

//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);

//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: '',
//     severity: 'success',
//   });

//   // Input change
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     setErrors({ ...errors, [e.target.name]: '' });
//   };

//   // Snackbar close
//   const handleCloseSnackbar = () => {
//     setSnackbar({ ...snackbar, open: false });
//   };

//   // Basic validation
//   const validate = () => {
//     const tempErrors = {};
//     if (!formData.name.trim()) tempErrors.name = 'Name is required';
//     if (!formData.email.trim()) tempErrors.email = 'Email is required';
//     else if (!/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = 'Invalid email';
//     if (!formData.phoneNo.trim()) tempErrors.phoneNo = 'Phone number is required';
//     if (!formData.message.trim()) tempErrors.message = 'Message cannot be empty';
//     setErrors(tempErrors);
//     return Object.keys(tempErrors).length === 0;
//   };

//   // Submit
//   const handleSubmit = async () => {
//     if (!validate()) return;

//     setLoading(true);
//     try {
//       await axios.post(`${backendURL}/api/contact`, formData);
//       setSnackbar({
//         open: true,
//         message: 'Message sent successfully!',
//         severity: 'success',
//       });
//       setFormData({ name: '', email: '', phoneNo: '', message: '' });
//     } catch (err) {
//       console.error(err);
//       setSnackbar({
//         open: true,
//         message: 'Failed to send message.',
//         severity: 'error',
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         width: '100%',
//         py: 6,
//         px: 2,
//       }}
//     >
//       <MotionBox
//         initial={{ opacity: 0, y: 30, scale: 0.95 }}
//         animate={{ opacity: 1, y: 0, scale: 1 }}
//         transition={{ duration: 0.8, ease: 'easeOut' }}
//         sx={{
//           bgcolor: 'background.paper',
//           p: isMobile ? 2 : 4,
//           borderRadius: 2,
//           boxShadow: 3,
//           width: '100%',
//           maxWidth: 900,
//           mx: 'auto',
//         }}
//       >
//         <Typography
//           variant="h5"
//           align="center"
//           sx={{
//             mb: 4,
//             fontWeight: 'bold',
//             color: 'primary.main',
//             fontSize: isMobile ? '1.2rem' : '1.5rem',
//           }}
//         >
//           Send us a message
//         </Typography>

//         <Grid container spacing={3}>
//           {/* Left Side */}
//           <Grid item xs={12} md={6}>
//             <Box
//               sx={{
//                 display: 'flex',
//                 flexDirection: 'column',
//                 gap: 2,
//               }}
//             >
//               <TextField
//                 label="Full Name"
//                 name="name"
//                 variant="outlined"
//                 fullWidth
//                 value={formData.name}
//                 onChange={handleChange}
//                 error={!!errors.name}
//                 helperText={errors.name}
//               />
//               <TextField
//                 label="Email Address"
//                 name="email"
//                 variant="outlined"
//                 fullWidth
//                 value={formData.email}
//                 onChange={handleChange}
//                 error={!!errors.email}
//                 helperText={errors.email}
//               />
//               <TextField
//                 label="Phone Number"
//                 name="phoneNo"
//                 variant="outlined"
//                 fullWidth
//                 value={formData.phoneNo}
//                 onChange={handleChange}
//                 error={!!errors.phoneNo}
//                 helperText={errors.phoneNo}
//               />
//             </Box>
//           </Grid>

//           {/* Right Side */}
//           <Grid item xs={12} md={6}>
//             <TextField
//               label="Message"
//               name="message"
//               multiline
//               variant="outlined"
//               fullWidth
//               rows={7}
//               value={formData.message}
//               onChange={handleChange}
//               error={!!errors.message}
//               helperText={errors.message}
//               sx={{
//                 height: '100%',
//                 '& .MuiOutlinedInput-root': {
//                   height: '100%',
//                   alignItems: 'flex-start',
//                 },
//               }}
//             />
//           </Grid>
//         </Grid>

//         <Box sx={{ textAlign: 'center', mt: 4 }}>
//           <GradientButton
//             text={loading ? <CircularProgress size={24} /> : 'Send via Email'}
//             onClick={handleSubmit}
//             disabled={loading}
//           />
//         </Box>
//       </MotionBox>

//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={4000}
//         onClose={handleCloseSnackbar}
//         anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
//       >
//         <Alert
//           onClose={handleCloseSnackbar}
//           severity={snackbar.severity}
//           sx={{ width: '100%' }}
//         >
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// };

// export default ContactForm;

import React, { useState } from 'react';
import {
  Box,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
  Snackbar,
  Alert,
  Grid,
  CircularProgress,
} from '@mui/material';
import { motion } from 'framer-motion';
import GradientButton from '../GradientButton';
import axios from 'axios';

const MotionBox = motion.create(Box);

const ContactForm = () => {
  const backendURL = import.meta.env.VITE_BACKEND_URL || ''; // fallback
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNo: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  // Input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  // Snackbar close
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Basic validation
  const validate = () => {
    const tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = 'Name is required';
    if (!formData.email.trim()) tempErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = 'Invalid email';
    if (!formData.phoneNo.trim()) tempErrors.phoneNo = 'Phone number is required';
    if (!formData.message.trim()) tempErrors.message = 'Message cannot be empty';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Submit
  const handleSubmit = async () => {
    if (!validate()) return;

    setLoading(true);
    try {
      await axios.post(`${backendURL}/api/contact`, formData);
      setSnackbar({
        open: true,
        message: 'Message sent successfully!',
        severity: 'success',
      });
      setFormData({ name: '', email: '', phoneNo: '', message: '' });
    } catch (err) {
      console.error(err);
      setSnackbar({
        open: true,
        message: 'Failed to send message.',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        py: 6,
        px: 2,
      }}
    >
      <MotionBox
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        sx={{
          bgcolor: 'background.paper',
          p: isMobile ? 2 : 4,
          borderRadius: 2,
          boxShadow: 3,
          width: '100%',
          maxWidth: 900,
          mx: 'auto',
        }}
      >
        <Typography
          variant="h5"
          align="center"
          sx={{
            mb: 4,
            fontWeight: 'bold',
            color: 'primary.main',
            fontSize: isMobile ? '1.2rem' : '1.5rem',
          }}
        >
          Send us a message
        </Typography>

        <Grid container spacing={3}>
          {/* Left Side */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
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
                error={!!errors.name}
                helperText={errors.name}
              />
              <TextField
                label="Email Address"
                name="email"
                variant="outlined"
                fullWidth
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
              />
              <TextField
                label="Phone Number"
                name="phoneNo"
                variant="outlined"
                fullWidth
                value={formData.phoneNo}
                onChange={handleChange}
                error={!!errors.phoneNo}
                helperText={errors.phoneNo}
              />
            </Box>
          </Grid>

          {/* Right Side */}
          <Grid item xs={12} md={6}>
            <TextField
              label="Message"
              name="message"
              multiline
              variant="outlined"
              fullWidth
              rows={7}
              value={formData.message}
              onChange={handleChange}
              error={!!errors.message}
              helperText={errors.message}
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
          <GradientButton
            text={loading ? <CircularProgress size={24} /> : 'Send via Email'}
            onClick={handleSubmit}
            disabled={loading}
          />
        </Box>
      </MotionBox>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ContactForm;
