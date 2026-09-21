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
  useTheme,
} from "@mui/material";

import {
  Instagram,
  LinkedIn,
  Facebook,
} from "@mui/icons-material";

import { motion } from "framer-motion";

const MotionBox = motion(Box);

const OurTeam = ({ team }) => {
  const theme = useTheme();

  if (!team || !team.length) return null;

  return (
    <Box
      id="meet-team"
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        background:
          "linear-gradient(180deg, #F7F9FB 0%, #FFFFFF 100%)",
      }}
    >
      <Container maxWidth="lg">
        {/* HEADER */}
        <Box
          sx={{
            textAlign: "center",
            mb: { xs: 6, md: 8 },
          }}
        >
          <Typography
            sx={{
              color: theme.palette.primary.main,
              fontWeight: 700,
              fontSize: "0.8rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              mb: 1,
            }}
          >
            Meet The People
          </Typography>

          <Typography
            component="h2"
            sx={{
              color: theme.palette.primary.dark,
              fontWeight: 800,
              fontSize: {
                xs: "2rem",
                md: "3rem",
              },
              mb: 2,
            }}
          >
            Meet Our Team
          </Typography>

          <Box
            sx={{
              width: 55,
              height: 4,
              borderRadius: 4,
              backgroundColor:
                theme.palette.secondary.main,
              mx: "auto",
              mb: 2,
            }}
          />

          <Typography
            sx={{
              maxWidth: 600,
              mx: "auto",
              color: theme.palette.text.secondary,
              lineHeight: 1.7,
            }}
          >
            Meet the people behind Cloudix Soft who bring
            creativity, technology and purpose together.
          </Typography>
        </Box>

        {/* TEAM */}
        <Grid
          container
          spacing={{ xs: 3, md: 4 }}
          justifyContent="center"
        >
          {team.map((member, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={index}
            >
              <MotionBox
                initial={{
                  opacity: 0,
                  y: 40,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.1,
                }}
                viewport={{
                  once: true,
                }}
                sx={{
                  height: "100%",
                }}
              >
                <Card
                  elevation={0}
                  sx={{
                    position: "relative",
                    height: "100%",
                    minHeight: 390,
                    borderRadius: "18px",
                    backgroundColor: "#fff",
                    border:
                      "1px solid rgba(17,30,44,0.08)",
                    boxShadow:
                      "0 12px 35px rgba(17,30,44,0.08)",
                    overflow: "visible",
                    transition:
                      "all 0.35s ease",
                    "&:hover": {
                      transform:
                        "translateY(-8px)",
                      boxShadow:
                        "0 20px 45px rgba(17,30,44,0.14)",
                    },
                  }}
                >
                  {/* Green top accent */}
                  <Box
                    sx={{
                      height: 5,
                      width: "100%",
                      borderRadius:
                        "18px 18px 0 0",
                      background:
                        "linear-gradient(90deg, #769914, #BBBF19)",
                    }}
                  />

                  {/* Avatar */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      mt: 3,
                    }}
                  >
                    <Avatar
                      src={member.image}
                      alt={member.name}
                      sx={{
                        width: {
                          xs: 110,
                          md: 125,
                        },
                        height: {
                          xs: 110,
                          md: 125,
                        },
                        border:
                          "5px solid #fff",
                        boxShadow:
                          "0 8px 25px rgba(0,0,0,0.15)",
                      }}
                    />
                  </Box>

                  <CardContent
                    sx={{
                      textAlign: "center",
                      px: 3,
                      pb: 3,
                    }}
                  >
                    {/* Name */}
                    <Typography
                      component="h3"
                      sx={{
                        color:
                          theme.palette.primary.dark,
                        fontWeight: 800,
                        fontSize: "1.05rem",
                        mt: 1,
                      }}
                    >
                      {member.name}
                    </Typography>

                    {/* Position */}
                    <Typography
                      sx={{
                        color:
                          theme.palette.primary.main,
                        fontWeight: 600,
                        fontSize: "0.78rem",
                        mt: 0.5,
                        mb: 2,
                      }}
                    >
                      {member.position}
                    </Typography>

                    {/* Description */}
                    <Typography
                      sx={{
                        color:
                          theme.palette.text.secondary,
                        fontSize: "0.78rem",
                        lineHeight: 1.7,
                        maxWidth: 270,
                        mx: "auto",
                        display:
                          "-webkit-box",
                        WebkitLineClamp: 5,
                        WebkitBoxOrient:
                          "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {member.description}
                    </Typography>

                    {/* Socials */}
                    <Stack
                      direction="row"
                      spacing={1}
                      justifyContent="center"
                      sx={{
                        mt: 3,
                      }}
                    >
                      {member.socials?.instagram && (
                        <IconButton
                          href={
                            member.socials
                              .instagram
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={iconButtonStyle(
                            theme
                          )}
                        >
                          <Instagram fontSize="small" />
                        </IconButton>
                      )}

                      {member.socials?.linkedin && (
                        <IconButton
                          href={
                            member.socials
                              .linkedin
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={iconButtonStyle(
                            theme
                          )}
                        >
                          <LinkedIn fontSize="small" />
                        </IconButton>
                      )}

                      {member.socials?.facebook && (
                        <IconButton
                          href={
                            member.socials
                              .facebook
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={iconButtonStyle(
                            theme
                          )}
                        >
                          <Facebook fontSize="small" />
                        </IconButton>
                      )}
                    </Stack>
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

const iconButtonStyle = (theme) => ({
  width: 34,
  height: 34,
  borderRadius: "50%",
  color: theme.palette.primary.dark,
  backgroundColor: "#F2F4F5",
  border: "1px solid #E5E8EB",
  transition: "all 0.25s ease",

  "&:hover": {
    backgroundColor:
      theme.palette.primary.main,
    color: "#fff",
    transform: "translateY(-2px)",
  },
});

export default OurTeam;