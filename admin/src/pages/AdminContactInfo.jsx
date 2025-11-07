// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Box, TextField, Button, useMediaQuery, Paper, Typography } from '@mui/material';
// import { motion } from 'framer-motion';

// const ADMIN_CONTACT_INFO_URL = `${import.meta.env.VITE_ADMIN_CONTACT_INFO_URL}`;
// const MotionPaper = motion.create(Paper);
// const AdminContactInfoForm = () => {
//   const isMobile = useMediaQuery('(max-width:600px)');

//   const [info, setInfo] = useState({
//     email: '',
//     phone: '',
//     address: '',
//     description: '',
//     workingHours: {
//       monday: '',
//       tuesday: '',
//       wednesday: '',
//       thursday: '',
//       friday: '',
//       saturday: '',
//       sunday: '',
//     },
//     socialLinks: {
//       facebook: '',
//       twitter: '',
//       linkedin: '',
//       instagram: '',
//     },
//   });

//   useEffect(() => {
//     axios.get(ADMIN_CONTACT_INFO_URL).then((res) =>
//       setInfo({
//         email: res.data?.email || '',
//         phone: res.data?.phone || '',
//         address: res.data?.address || '',
//         description: res.data?.description || '',
//         workingHours: res.data?.workingHours || {
//           monday: '', tuesday: '', wednesday: '', thursday: '', friday: '', saturday: '', sunday: ''
//         },
//         socialLinks: {
//           facebook: res.data?.socialLinks?.facebook || '',
//           twitter: res.data?.socialLinks?.twitter || '',
//           linkedin: res.data?.socialLinks?.linkedin || '',
//           instagram: res.data?.socialLinks?.instagram || '',
//         },
//       })
//     );
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name in info.socialLinks) {
//       setInfo({
//         ...info,
//         socialLinks: { ...info.socialLinks, [name]: value },
//       });
//     } else {
//       setInfo({ ...info, [name]: value });
//     }
//   };

//   const handleSubmit = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       await axios.put(ADMIN_CONTACT_INFO_URL, info, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       alert('Contact Info Updated');
//     } catch (err) {
//       console.error(err);
//       alert('Unauthorized or error updating contact info');
//     }
//   };

//   return (
//     <MotionPaper
//       initial={{ opacity: 0, y: 40 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.6, ease: 'easeOut' }}
//       elevation={4}
//       sx={{
//         p: isMobile ? 3 : 5,
//         maxWidth: 600,
//         mx: 'auto',
//         mt: 4,
//       }}
//     >
//       <Typography
//         variant="h5"
//         sx={{
//           mb: 3,
//           textAlign: 'center',
//           color: 'primary.main',
//         }}
//       >
//         Update Contact Info
//       </Typography>

//       <Box component="form" noValidate autoComplete="off">
//         <TextField label="Email" name="email" fullWidth value={info.email} onChange={handleChange} sx={{ mb: 2 }} />
//         <TextField label="Phone" name="phone" fullWidth value={info.phone} onChange={handleChange} sx={{ mb: 2 }} />
//         {/* <TextField label="Working Hours" name="Working Hours" fullWidth value={info.workingHours} onChange={handleChange} sx={{ mb: 2 }} /> */}
//         <Box sx={{ mb: 2 }}>
//   <Typography variant="subtitle1" sx={{ mb: 1 }}>
//     Working Hours
//   </Typography>
//   {Object.entries(info.workingHours).map(([day, value]) => (
//     <TextField
//       key={day}
//       label={day.charAt(0).toUpperCase() + day.slice(1)} // Monday, Tuesday, ...
//       name={day}
//       fullWidth
//       value={value}
//       onChange={(e) => {
//         const { name, value } = e.target;
//         setInfo({
//           ...info,
//           workingHours: {
//             ...info.workingHours,
//             [name]: value,
//           },
//         });
//       }}
//       sx={{ mb: 1 }}
//       placeholder="e.g., 09:00-17:00 or Closed"
//     />
//   ))}
// </Box>

//         <TextField label="Address" name="address" fullWidth value={info.address} onChange={handleChange} sx={{ mb: 2 }} />
//         <TextField label="Description" name="description" fullWidth value={info.description} onChange={handleChange} sx={{ mb: 2 }} />
//         <TextField label="Facebook" name="facebook" fullWidth value={info.socialLinks.facebook} onChange={handleChange} sx={{ mb: 2 }} />
//         <TextField label="Twitter" name="twitter" fullWidth value={info.socialLinks.twitter} onChange={handleChange} sx={{ mb: 2 }} />
//         <TextField label="LinkedIn" name="linkedin" fullWidth value={info.socialLinks.linkedin} onChange={handleChange} sx={{ mb: 2 }} />
//         <TextField label="Instagram" name="instagram" fullWidth value={info.socialLinks.instagram} onChange={handleChange} sx={{ mb: 2 }} />

//         <Button
//           fullWidth
//           variant="contained"
//           onClick={handleSubmit}
//           sx={{
//             background: `linear-gradient(90deg, ${'#18BC9C'}, ${'#E74C3C'})`,
//             color: '#fff',
//             mt: 1,
//             '&:hover': {
//               background: `linear-gradient(90deg, ${'#E74C3C'}, ${'#18BC9C'})`,
//             },
//           }}
//         >
//           Update Info
//         </Button>
//       </Box>
//     </MotionPaper>
//   );
// };

// export default AdminContactInfoForm;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, TextField, Button, useMediaQuery, Paper, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const ADMIN_CONTACT_INFO_URL = `${import.meta.env.VITE_ADMIN_CONTACT_INFO_URL}`;
const MotionPaper = motion.create(Paper);

const AdminContactInfoForm = () => {
  const isMobile = useMediaQuery('(max-width:600px)');

  const [info, setInfo] = useState({
    email: '',
    phone: '',
    address: '',
    description: '',
    workingHours: {
      monday: { open: '', close: '' },
      tuesday: { open: '', close: '' },
      wednesday: { open: '', close: '' },
      thursday: { open: '', close: '' },
      friday: { open: '', close: '' },
      saturday: { open: '', close: '' },
      sunday: { open: '', close: '' },
    },
    socialLinks: {
      facebook: '',
      twitter: '',
      linkedin: '',
      instagram: '',
    },
  });

  // 🟩 Fetch existing contact info
  useEffect(() => {
    axios.get(ADMIN_CONTACT_INFO_URL).then((res) => {
      const data = res.data;
      setInfo({
        email: data?.email || '',
        phone: data?.phone || '',
        address: data?.address || '',
        description: data?.description || '',
        workingHours: data?.workingHours || info.workingHours,
        socialLinks: {
          facebook: data?.socialLinks?.facebook || '',
          twitter: data?.socialLinks?.twitter || '',
          linkedin: data?.socialLinks?.linkedin || '',
          instagram: data?.socialLinks?.instagram || '',
        },
      });
    });
  }, []);

  // 🟩 Handle general and social link changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in info.socialLinks) {
      setInfo({
        ...info,
        socialLinks: { ...info.socialLinks, [name]: value },
      });
    } else {
      setInfo({ ...info, [name]: value });
    }
  };

  // 🟩 Handle working hours change
  const handleWorkingHoursChange = (day, field, value) => {
    setInfo({
      ...info,
      workingHours: {
        ...info.workingHours,
        [day]: {
          ...info.workingHours[day],
          [field]: value,
        },
      },
    });
  };

  // 🟩 Submit to backend
  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(ADMIN_CONTACT_INFO_URL, info, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Contact Info Updated Successfully!');
    } catch (err) {
      console.error(err);
      alert('Error updating contact info or unauthorized.');
    }
  };

  return (
    <MotionPaper
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      elevation={4}
      sx={{
        p: isMobile ? 3 : 5,
        maxWidth: 600,
        mx: 'auto',
        mt: 4,
      }}
    >
      <Typography
        variant="h5"
        sx={{
          mb: 3,
          textAlign: 'center',
          color: 'primary.main',
        }}
      >
        Update Contact Info
      </Typography>

      <Box component="form" noValidate autoComplete="off">
        <TextField label="Email" name="email" fullWidth value={info.email} onChange={handleChange} sx={{ mb: 2 }} />
        <TextField label="Phone" name="phone" fullWidth value={info.phone} onChange={handleChange} sx={{ mb: 2 }} />

        {/* 🕒 Working Hours Section */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Working Hours
          </Typography>

          {Object.entries(info.workingHours).map(([day, time]) => (
            <Box key={day} sx={{ display: 'flex', gap: 2, mb: 1 }}>
              <TextField
                label={`${day.charAt(0).toUpperCase() + day.slice(1)} (Open)`}
                fullWidth
                value={time.open}
                onChange={(e) => handleWorkingHoursChange(day, 'open', e.target.value)}
                placeholder="e.g., 09:00 AM"
              />
              <TextField
                label="Close"
                fullWidth
                value={time.close}
                onChange={(e) => handleWorkingHoursChange(day, 'close', e.target.value)}
                placeholder="e.g., 05:00 PM"
              />
            </Box>
          ))}
        </Box>

        <TextField label="Address" name="address" fullWidth value={info.address} onChange={handleChange} sx={{ mb: 2 }} />
        <TextField label="Description" name="description" fullWidth value={info.description} onChange={handleChange} sx={{ mb: 2 }} />
        <TextField label="Facebook" name="facebook" fullWidth value={info.socialLinks.facebook} onChange={handleChange} sx={{ mb: 2 }} />
        <TextField label="Twitter" name="twitter" fullWidth value={info.socialLinks.twitter} onChange={handleChange} sx={{ mb: 2 }} />
        <TextField label="LinkedIn" name="linkedin" fullWidth value={info.socialLinks.linkedin} onChange={handleChange} sx={{ mb: 2 }} />
        <TextField label="Instagram" name="instagram" fullWidth value={info.socialLinks.instagram} onChange={handleChange} sx={{ mb: 2 }} />

        <Button
          fullWidth
          variant="contained"
          onClick={handleSubmit}
          sx={{
            background: `linear-gradient(90deg, #18BC9C, #E74C3C)`,
            color: '#fff',
            mt: 1,
            '&:hover': {
              background: `linear-gradient(90deg, #E74C3C, #18BC9C)`,
            },
          }}
        >
          Update Info
        </Button>
      </Box>
    </MotionPaper>
  );
};

export default AdminContactInfoForm;
