// import {
//   Box,
//   Grid,
//   useMediaQuery,
// } from '@mui/material';
// import { styled, } from '@mui/material/styles';
// import bgImage from '../assets/BGcontact.webp';
// import ContactForm from '../Components/ContactForm';
// import ContactInfo from '../Components/ContactInfo';
// import SocialIcons from '../Components/SocialIcons';
// import HeroSection from '../Components/ContactComps/HomeHero';

// const BackgroundContainer = styled(Box)(() => ({
//   position: 'relative',
//   backgroundImage: `url(${bgImage})`,
//   backgroundSize: 'cover',
//   backgroundPosition: 'center',
//   backgroundRepeat: 'no-repeat',
//   minHeight: '100vh', // ensure it covers full height
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
// }));

// const GradientOverlay = styled(Box)(({ theme }) => ({
//   background: 'linear-gradient(to right, rgba(0, 0, 0, 0.6), rgba(34, 34, 34, 0.7))',
//   color: '#fff',
//   padding: theme.spacing(6, 2),
//   width: '100%',
//   maxWidth: '1200px',
//   margin: '0 auto',
//   minHeight: '100vh', // fill screen height
//   overflowY: 'auto', // allow scrolling on small screens
//   display: 'flex',
//   alignItems: 'center',
// }));


// const Contact = () => {
//   const isMobile = useMediaQuery('(max-width:600px)');
//   return (
//     // <BackgroundContainer>
//       // <GradientOverlay>
//         <Grid container spacing={isMobile ? 4 : 6} justifyContent="center" alignItems="center" direction={isMobile ? 'column' : 'row'}>
//           <HeroSection />
//           {/* Contact Info */}
//           <Grid
//             sx={{
//               gridColumn: { xs: "span 12", md: "span 6" },
//             }}
//           >
//             <ContactInfo />
//           </Grid>

//           {/* Contact Form */}
//           <Grid
//             sx={{
//               gridColumn: { xs: "span 12", md: "span 6" },
//             }}
//           >
//             <ContactForm />
//             <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
//               <SocialIcons />
//             </Box>
//           </Grid>
//         </Grid>
//   );
// };

// export default Contact;


import React from 'react';
import { Box,  } from '@mui/material';
import ContactForm from '../Components/ContactComps/ContactForm';
import ContactInfo from '../Components/ContactComps/ContactInfo';
import SocialIcons from '../Components/SocialIcons';
import HeroSection from '../Components/ContactComps/ContactHero';



const Contact = () => {
  // const isMobile = useMediaQuery('(max-width:600px)');
  // const isTablet = useMediaQuery('(max-width:960px)');

  // ✅ Dynamic spacing depending on screen size
  // const dynamicSpacing = isMobile ? 2 : isTablet ? 4 : 6;

  return (
      <>
      <HeroSection />
      <Box sx={{ backgroundColor: "#111E2C",}}>
      <ContactInfo />
      </Box>
      <ContactForm />
      </>
  );
};

export default Contact;
