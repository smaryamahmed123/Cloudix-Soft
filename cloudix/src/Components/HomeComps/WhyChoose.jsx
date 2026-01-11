// // src/components/WhyChooseUs.jsx
// import React from "react";
// import { Box, Grid, Typography } from "@mui/material";
// import { motion as Motion } from "framer-motion";
// import Check from "../../assets/Mask group.png";
// import Light from "../../assets/Mask group (1).png";
// import HandIcon from "../../assets/partnership.png";
// import Intigrity from "../../assets/Intigrity.png";
// import Rocket from "../../assets/Together.png";

// // Features array
// const features = [
//   {
//     icon: <Box component="img" src={Check} alt="check" sx={{ width: 90, height: 90 }} />,
//     title: "Smart Discovery",
//     description:
//       "We take time to understand your goals and challenges so every solution is tailored to your needs — not just off-the-shelf software",
//   },
//   {
//     icon: <Box component="img" src={Light} alt="Light" sx={{ width: 90, height: 90 }} />,
//     title: "Smart Solutions",
//     description:
//       "Our focus is on solving problems, not just writing code. Every project is designed to create measurable value for your business",
//   },
//   {
//     icon: <Box component="img" src={HandIcon} alt="Strong Partnership" sx={{ width: 70, height: 50 }} />,
//     title: "Strong Partnership",
//     description:
//       "We don’t disappear after delivery. Our team stays by your side with ongoing support and improvements whenever you need us",
//   },
//   {
//     icon: <Box component="img" src={Intigrity} alt="Strong Integrity" sx={{ width: 80, height: 80 }} />,
//     title: "Strong Integrity",
//     description:
//       "As a Shariah-compliant company, we believe in honesty, transparency, and fairness. Trust is the foundation of every project we deliver",
//   },
//   {
//     icon: <Box component="img" src={Rocket} alt="Growing Together" sx={{ width: 65, height: 65 }} />,
//     title: "Growing Together",
//     description:
//       "Your success is our success. We aim to build lasting relationships that help your business grow — today and in the future",
//   },
// ];

// // Animation Variants
// const containerVariants = {
//   hidden: {},
//   show: {
//     transition: {
//       staggerChildren: 0.2, // delay between each card animation
//     },
//   },
// };

// const cardVariants = {
//   hidden: { opacity: 0, scale: 0.8, y: 50 },
//   show: {
//     opacity: 1,
//     scale: 1,
//     y: 0,
//     transition: { duration: 0.6, ease: "easeOut" },
//   },
// };

// export default function WhyChooseUs() {
//   return (
//     <Box sx={{ py: 8, textAlign: "center", backgroundColor: "transparent" }}>
//       {/* Heading */}
//       <Motion.div
//         initial={{ opacity: 0, y: -30 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//         viewport={{ once: true }}
//       >
//         <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2, color: "#111E2C" }}>
//           Why You Choose Us?
//         </Typography>
//         <Typography variant="body1" sx={{ maxWidth: 700, mx: "auto", mb: 6 }}>
//           Choosing the right IT partner is crucial to the success of your business, and we believe
//           that Cloudix Soft is the best choice for businesses that are looking for innovative,
//           reliable, and ethical IT solutions.
//         </Typography>
//       </Motion.div>

//       {/* Features with staggered animation */}
//       <Motion.div
//         variants={containerVariants}
//         initial="hidden"
//         whileInView="show"
//         viewport={{ once: true }}
//       >
//         <Grid container spacing={4} justifyContent="center">
//           {features.map((feature, index) => (
//             <Grid
//               key={index}
//               sx={{
//                 gridColumn: { xs: "span 12", sm: "span 6", md: "span 4" },
//                 display: "flex",
//                 justifyContent: "center",
//               }}
//             >
//               <Motion.div
//                 variants={cardVariants}
//                 whileHover={{ scale: 1.05 }}
//                 transition={{ type: "spring", stiffness: 200 }}
//               >
//                 <Box
//                   sx={{
//                     display: "flex",
//                     flexDirection: "column",
//                     alignItems: "center",
//                     textAlign: "center",
//                     p: 3,
//                     maxWidth: 250,
//                   }}
//                 >
//                   {/* Icon Circle */}
//                   <Box
//                     sx={{
//                       width: 100,
//                       height: 100,
//                       borderRadius: "50%",
//                       backgroundColor: "#BBBF19",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       mb: 2,
//                       position: "relative",
//                       "&::after": {
//                         content: '""',
//                         position: "absolute",
//                         top: -2,
//                         left: -2,
//                         right: -2,
//                         bottom: -2,
//                         borderRadius: "50%",
//                         background: "linear-gradient(135deg, #A9B838, #111E2C)",
//                         zIndex: -1,
//                       },
//                       background:
//                         "linear-gradient(#BBBF19, #BBBF19) padding-box, linear-gradient(to bottom, #111E2C, #A9B838) border-box",
//                       border: "4px solid transparent",
//                     }}
//                   >
//                     {feature.icon}
//                   </Box>

//                   {/* Title */}
//                   <Typography
//                     variant="h6"
//                     sx={{ color: "#a9b838", fontWeight: 600, mb: 1 }}
//                   >
//                     {feature.title}
//                   </Typography>

//                   {/* Description */}
//                   <Typography variant="body2" sx={{ color: "#333" }}>
//                     {feature.description}
//                   </Typography>
//                 </Box>
//               </Motion.div>
//             </Grid>
//           ))}
//         </Grid>
//       </Motion.div>
//     </Box>
//   );
// }



// src/components/WhyChooseUs.jsx
import React, { memo } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { motion as Motion, useReducedMotion } from "framer-motion";

import Check from "../../assets/Mask group.png";
import Light from "../../assets/Mask group (1).png";
import HandIcon from "../../assets/partnership.png";
import Integrity from "../../assets/Intigrity.png";
import Rocket from "../../assets/Together.png";

/* ---------------- FEATURES DATA ---------------- */

const FEATURES = [
  {
    icon: Check,
    alt: "Smart discovery icon",
    title: "Smart Discovery",
    description:
      "We take time to understand your goals and challenges so every solution is tailored to your needs — not just off-the-shelf software.",
  },
  {
    icon: Light,
    alt: "Smart solutions icon",
    title: "Smart Solutions",
    description:
      "Our focus is on solving problems, not just writing code. Every project is designed to create measurable value for your business.",
  },
  {
    icon: HandIcon,
    alt: "Strong partnership icon",
    title: "Strong Partnership",
    description:
      "We don’t disappear after delivery. Our team stays by your side with ongoing support and improvements whenever you need us.",
  },
  {
    icon: Integrity,
    alt: "Integrity icon",
    title: "Strong Integrity",
    description:
      "As a Shariah-compliant company, we believe in honesty, transparency, and fairness. Trust is the foundation of every project we deliver.",
  },
  {
    icon: Rocket,
    alt: "Growing together icon",
    title: "Growing Together",
    description:
      "Your success is our success. We aim to build lasting relationships that help your business grow — today and in the future.",
  },
];

/* ---------------- ANIMATIONS ---------------- */

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

/* ---------------- COMPONENT ---------------- */

function WhyChooseUs() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Box
      component="section"
      aria-labelledby="why-choose-us-heading"
      sx={{ py: { xs: 8, md: 10 }, textAlign: "center" }}
    >
      {/* Heading */}
      <Motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <Typography
          id="why-choose-us-heading"
          component="h2"
          sx={{  mb: 2, color: "#111E2C" }}
        >
          {/* fontWeight: 800, */}
          Why Choose Us?
        </Typography>

        <Typography
          sx={{
            maxWidth: 720,
            mx: "auto",
            mb: 6,
            color: "text.secondary",
          }}
        >
          Choosing the right IT partner is crucial to your business success.
          Cloudix Soft delivers innovative, reliable, and ethical digital
          solutions tailored to your growth.
        </Typography>
      </Motion.div>

      {/* Features */}
      <Motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <Grid container spacing={4} justifyContent="center">
          {FEATURES.map((feature) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={feature.title}
              display="flex"
              justifyContent="center"
            >
              <Motion.div
                variants={cardVariants}
                whileHover={!prefersReducedMotion ? { scale: 1.05 } : undefined}
                transition={{ type: "spring", stiffness: 180 }}
              >
                <Box
                  sx={{
                    p: 3,
                    maxWidth: 260,
                    textAlign: "center",
                  }}
                >
                  {/* Icon */}
                  <Box
                    sx={{
                      width: 100,
                      height: 100,
                      borderRadius: "50%",
                      mb: 2,
                      mx: "auto",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background:
                        "linear-gradient(#BBBF19, #BBBF19) padding-box, linear-gradient(to bottom, #111E2C, #A9B838) border-box",
                      border: "4px solid transparent",
                    }}
                  >
                    <Box
                      component="img"
                      src={feature.icon}
                      alt={feature.alt}
                      loading="lazy"
                      decoding="async"
                      width={70}
                      height={70}
                      sx={{ objectFit: "contain" }}
                    />
                  </Box>

                  {/* Title */}
                  <Typography
                    component="h3"
                    sx={{
                      fontWeight: 600,
                      color: "#A9B838",
                      mb: 1,
                      fontSize: "1.1rem",
                    }}
                  >
                    {feature.title}
                  </Typography>

                  {/* Description */}
                  <Typography
                    variant="body2"
                    sx={{ color: "#333", lineHeight: 1.6 }}
                  >
                    {feature.description}
                  </Typography>
                </Box>
              </Motion.div>
            </Grid>
          ))}
        </Grid>
      </Motion.div>
    </Box>
  );
}

export default memo(WhyChooseUs);

