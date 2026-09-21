// import React, { useState } from "react";
// import {
//   Box, Grid, Card, CardContent, Avatar,
//   Typography, Stack, IconButton, Divider, useTheme,
// } from "@mui/material";
// import { Instagram, LinkedIn, Facebook } from "@mui/icons-material";
// import { motion as Motion } from "framer-motion";

// const OurTeam = ({ team }) => {
//   const theme = useTheme();
//   const [expanded, setExpanded] = useState(false);

//   if (!team) return null;

//   return (
//     <Box
//       sx={{
//         py: { xs: 6, md: 10 },
//         textAlign: "center",
//         overflowX: "hidden",
//         bgcolor: theme.palette.background.paper,
//       }}
//     >
//       {/* Title */}
//       <Box
//         textAlign="center"
//         sx={{
//           position: "relative",
//           display: "inline-block",
//           overflow: "visible",
//           mb: 6,
//         }}
//       >
//         <Typography
//           component="h2" 
//           variant="h3"
//           sx={{
//             fontWeight: "bold",
//             color: theme.palette.accent.light,
//             mb: 8,
//             // ✅ theme responsiveFontSizes handles size automatically
//           }}
//         >
//           Meet Our Team
//         </Typography>
//       </Box>

//       {/* Team Cards */}
//       <Grid
//         container
//         spacing={4}
//         alignItems="stretch"
//         justifyContent="center"
//         sx={{ width: "100%", margin: 0, px: { xs: 2, sm: 4 } }}
//       >
//         {team.map((member, index) => (
//           // <Grid key={index} item xs={12} sm={6} md={4}>
//           <Grid key={index} item xs={12} sm={6} md={4} sx={{ display: "flex" }}>
//             <Motion.div
//               initial={{ opacity: 0, y: 50 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: index * 0.2, ease: "easeOut" }}
//               viewport={{ once: true }}
//             >
//               <Box
//                 sx={{
//                   position: "relative",
//                   display: "flex",
//                   justifyContent: "center",
//                   pt: { xs: 10, sm: 8, md: 10 },
//                 }}
//               >
//                 <Card
//                   sx={{
//                     borderRadius: 4,
//                     textAlign: "center",
//                     bgcolor: "#D9D9D9",
//                     boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
//                     pt: { xs: 6, sm: 8 },
//                     pb: 4,
//                     px: 2,
//                     width: "100%",
//                     maxWidth: 320,
//                     height: { xs: 440, sm: 460, md: 480 },
//                     display: "flex",
//                     flexDirection: "column",
//                     alignItems: "center",
//                     justifyContent: "space-between",
//                     // boxSizing: "border-box",
//                     height: "100%",
//                   }}
//                 >
//                   {/* Avatar */}
//                   <Avatar
//                     src={member.image}
//                     alt={member.name}
//                     sx={{
//                       width: { xs: 120, sm: 150, md: 180 },
//                       height: { xs: 120, sm: 150, md: 180 },
//                       position: "absolute",
//                       top: { xs: -10, sm: -20, md: -30 },
//                       left: "50%",
//                       transform: "translateX(-50%)",
//                       boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
//                       border: `4px solid ${theme.palette.background.paper}`,
//                     }}
//                   />

//                   {/* Content */}
//                   <CardContent sx={{ mt: { xs: 4, sm: 6 } }}>
//                     <Typography
//                       variant="h6"
//                       sx={{
//                         fontWeight: "bold",
//                         color: theme.palette.text.primary,
//                         mb: 0.5,
//                         // ✅ theme handles size
//                       }}
//                     >
//                       {member.name}
//                     </Typography>

//                     <Typography
//                       variant="body2"
//                       sx={{
//                         color: theme.palette.primary.main,
//                         fontWeight: 500,
//                         mb: 2,
//                         // ✅ theme handles size
//                       }}
//                     >
//                       {member.position}
//                     </Typography>

//                     <Divider
//                       sx={{
//                         my: 1,
//                         bgcolor: theme.palette.text.primary,
//                         borderBottomWidth: 1,
//                       }}
//                     />

//                     <Typography
//                       variant="body2"
//                       sx={{
//                         color: theme.palette.text.secondary,
//                         lineHeight: 1.6,
//                         textAlign: "justify",
//                         px: 1,
//                         display: "-webkit-box",
//                         WebkitLineClamp: expanded ? "unset" : 6,
//                         WebkitBoxOrient: "vertical",
//                         overflow: "hidden",
//                       }}
//                     >
//                       {member.description}
//                     </Typography>
//                   </CardContent>

//                   {/* Social Icons */}
//                   <Stack direction="row" spacing={1.5} justifyContent="center" mt="auto">
//                     {member.socials?.instagram && (
//                       <IconButton
//                         href={member.socials.instagram}
//                         target="_blank"
//                         sx={iconBtnStyle(theme)}
//                       >
//                         <Instagram fontSize="small" />
//                       </IconButton>
//                     )}
//                     {member.socials?.linkedin && (
//                       <IconButton
//                         href={member.socials.linkedin}
//                         target="_blank"
//                         sx={iconBtnStyle(theme)}
//                       >
//                         <LinkedIn fontSize="small" />
//                       </IconButton>
//                     )}
//                     {member.socials?.facebook && (
//                       <IconButton
//                         href={member.socials.facebook}
//                         target="_blank"
//                         sx={iconBtnStyle(theme)}
//                       >
//                         <Facebook fontSize="small" />
//                       </IconButton>
//                     )}
//                   </Stack>
//                 </Card>
//               </Box>
//             </Motion.div>
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   );
// };

// // ✅ Theme-aware icon button style
// const iconBtnStyle = (theme) => ({
//   color: theme.palette.primary.dark,
//   backgroundColor: "#D9D9D9",
//   width: 40,
//   height: 40,
//   borderRadius: "50%",
//   boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
//   transition: "all 0.3s ease",
//   "&:hover": {
//     backgroundColor: theme.palette.primary.dark,
//     color: theme.palette.common.white,
//     transform: "scale(1.1)",
//   },
// });

// export default OurTeam;


import React from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Avatar,
  Typography,
  Stack,
  IconButton,
  Container,
} from "@mui/material";
import { LinkedIn, GitHub, Twitter, Instagram, Facebook } from "@mui/icons-material";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const OurTeam = ({ team }) => {
  if (!team || !team.length) return null;

  const renderSocialIcon = (platform, url) => {
    switch (platform) {
      case "linkedin":
        return (
          <IconButton key={platform} href={url} target="_blank" size="small" sx={socialStyle}>
            <LinkedIn fontSize="inherit" />
          </IconButton>
        );
      case "github":
        return (
          <IconButton key={platform} href={url} target="_blank" size="small" sx={socialStyle}>
            <GitHub fontSize="inherit" />
          </IconButton>
        );
      case "twitter":
        return (
          <IconButton key={platform} href={url} target="_blank" size="small" sx={socialStyle}>
            <Twitter fontSize="inherit" />
          </IconButton>
        );
      case "instagram":
        return (
          <IconButton key={platform} href={url} target="_blank" size="small" sx={socialStyle}>
            <Instagram fontSize="inherit" />
          </IconButton>
        );
      case "facebook":
        return (
          <IconButton key={platform} href={url} target="_blank" size="small" sx={socialStyle}>
            <Facebook fontSize="inherit" />
          </IconButton>
        );
      default:
        return null;
    }
  };

  return (
    <Box
      id="meet-team"
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: "#f8fafc",
      }}
    >
      <Container maxWidth="lg">
        {/* Section Header */}
        <Box sx={{ mb: { xs: 5, md: 7 } }}>
          <Typography
            sx={{
              color: "#829b1b",
              fontWeight: 700,
              fontSize: "0.78rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              mb: 1,
            }}
          >
            MEET OUR TEAM
          </Typography>

          <Typography
            component="h2"
            sx={{
              color: "#08111D",
              fontWeight: 800,
              fontSize: { xs: "2rem", md: "2.8rem" },
              mb: 1,
            }}
          >
            Meet Our Team
          </Typography>

          <Box
            sx={{
              width: 45,
              height: 3,
              backgroundColor: "#829b1b",
              borderRadius: 2,
            }}
          />
        </Box>

        {/* Team Grid */}
        <Grid container spacing={4} justifyContent="center">
          {team.map((member, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <MotionBox
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                sx={{ height: "100%" }}
              >
                <Card
                  elevation={0}
                  sx={{
                    height: "100%",
                    borderRadius: "16px",
                    backgroundColor: "#ffffff",
                    p: 3,
                    boxShadow: "0 10px 30px rgba(0,0,0,0.04)",
                    border: "1px solid #edf2f7",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-6px)",
                      boxShadow: "0 18px 40px rgba(0,0,0,0.08)",
                    },
                  }}
                >
                  {/* Round Avatar with Green Border Ring */}
                  <Avatar
                    src={member.image}
                    alt={member.name}
                    sx={{
                      width: 100,
                      height: 100,
                      mb: 2,
                      border: "3px solid #829b1b",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                    }}
                  />

                  <CardContent sx={{ p: 0, width: "100%", flexGrow: 1 }}>
                    <Typography
                      component="h3"
                      sx={{
                        color: "#08111D",
                        fontWeight: 800,
                        fontSize: "1.1rem",
                        mb: 0.3,
                      }}
                    >
                      {member.name}
                    </Typography>

                    <Typography
                      sx={{
                        color: "#829b1b",
                        fontWeight: 600,
                        fontSize: "0.8rem",
                        mb: 2,
                      }}
                    >
                      {member.position}
                    </Typography>

                    <Typography
                      sx={{
                        color: "#718096",
                        fontSize: "0.78rem",
                        lineHeight: 1.6,
                        mb: 3,
                      }}
                    >
                      {member.description}
                    </Typography>

                    {/* Social Links */}
                    {member.socials && (
                      <Stack direction="row" spacing={1} justifyContent="center">
                        {Object.entries(member.socials).map(([platform, url]) =>
                          renderSocialIcon(platform, url)
                        )}
                      </Stack>
                    )}
                  </CardContent>
                </Card>
              </MotionBox>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

const socialStyle = {
  color: "#4A5568",
  fontSize: "1.1rem",
  transition: "color 0.2s ease",
  "&:hover": {
    color: "#829b1b",
    backgroundColor: "transparent",
  },
};

export default OurTeam;