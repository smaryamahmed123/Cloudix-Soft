import React, { useEffect, useState } from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ModernCard from '../Card';
import CardSkeleton from '../CardSkeleton';
import axios from 'axios';

const MotionDiv = motion.div;
const backendURL = import.meta.env.VITE_BACKEND_URL;

const ContactInfo = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${backendURL}/api/contact-info`)
      .then((res) => {
        setInfo(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // 🕒 Custom formatter for working hours
  const formatWorkingHours = (wh) => {
    if (!wh) return 'No hours available';

    const weekday = wh.monday?.open && wh.monday?.close
      ? `${wh.monday.open} – ${wh.monday.close}`
      : 'Closed';
    const weekend = wh.saturday?.open && wh.saturday?.close
      ? `${wh.saturday.open} – ${wh.saturday.close}`
      : 'Closed';

    // 🟩 Final display
    return `Monday – Friday: ${weekday}\nSaturday – Sunday: ${weekend}`;
  };

  return (
    <MotionDiv
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
    >
      <Typography
        variant={isMobile ? 'h3' : 'h2'}
        gutterBottom
        sx={{ fontWeight: 'bold', color: '#769914', textAlign: 'center' }}
      >
        Get In Touch
      </Typography>

      <Box display="flex" flexWrap="wrap" justifyContent="center" gap={2} mt={4}>
        {loading ? (
          <>
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </>
        ) : (
          <>
            <ModernCard
              variant="contact"
              icon={<PhoneIcon fontSize="inherit" />}
              title="PHONE"
              description={info.phone}
            />

            <ModernCard
              variant="contact"
              icon={<AccessTimeIcon fontSize="inherit" />}
              title="WORKING HOURS"
              description={
                <Typography
                  sx={{
                    whiteSpace: 'pre-line', // Keeps line breaks
                    textAlign: 'center',
                    fontSize: '0.95rem',
                  }}
                >
                  {formatWorkingHours(info.workingHours)}
                </Typography>
              }
            />

            <ModernCard
              variant="contact"
              icon={<EmailIcon fontSize="inherit" />}
              title="EMAIL"
              description={info.email}
            />
          </>
        )}
      </Box>
    </MotionDiv>
  );
};

export default ContactInfo;
