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

import React, { useState } from "react";
import {
  Box, Grid, Card, CardContent, Avatar,
  Typography, Stack, IconButton, Divider, useTheme,
} from "@mui/material";
import { Instagram, LinkedIn, Facebook } from "@mui/icons-material";
import { motion as Motion } from "framer-motion";

const OurTeam = ({ team }) => {
  const theme = useTheme();
  const [expandedIndex, setExpandedIndex] = useState(null);

  if (!team) return null;

  return (
    <Box
      sx={{
        py: { xs: 6, md: 10 },
        textAlign: "center",
        overflowX: "hidden",
        bgcolor: theme.palette.background.default,
      }}
    >
      {/* Title */}
      <Box
        textAlign="center"
        sx={{
          position: "relative",
          display: "inline-block",
          overflow: "visible",
          mb: 6,
        }}
      >
        <Typography
          variant="overline"
          sx={{
            display: "block",
            letterSpacing: 2,
            fontWeight: 600,
            color: theme.palette.text.secondary,
            mb: 1,
          }}
        >
          The People Behind Every Step
        </Typography>

        <Typography
          component="h2"
          variant="h3"
          sx={{ fontWeight: "bold" }}
        >
          <Box component="span" sx={{ color: theme.palette.text.primary }}>
            Meet{" "}
          </Box>
          <Box component="span" sx={{ color: theme.palette.primary.main }}>
            Our Team
          </Box>
        </Typography>
      </Box>

      {/* Team Cards */}
      <Grid
        container
        spacing={4}
        alignItems="stretch"
        justifyContent="center"
        sx={{ width: "100%", margin: 0, px: { xs: 2, sm: 4 } }}
      >
        {team.map((member, index) => {
          const isExpanded = expandedIndex === index;
          return (
            <Grid key={index} item xs={12} sm={6} md={3} sx={{ display: "flex" }}>
              <Motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
                viewport={{ once: true }}
                style={{ width: "100%" }}
              >
                <Box
                  sx={{
                    position: "relative",
                    display: "flex",
                    justifyContent: "center",
                    pt: { xs: 8, sm: 7, md: 8 },
                    height: "100%",
                  }}
                >
                  <Card
                    sx={{
                      borderRadius: 4,
                      textAlign: "center",
                      bgcolor: theme.palette.background.paper,
                      boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                      pt: { xs: 5, sm: 6 },
                      pb: 3,
                      px: 2,
                      width: "100%",
                      maxWidth: 280,
                      minHeight: { xs: 320, sm: 340 },
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    {/* Avatar */}
                    <Avatar
                      src={member.image}
                      alt={member.name}
                      sx={{
                        width: { xs: 100, sm: 120, md: 130 },
                        height: { xs: 100, sm: 120, md: 130 },
                        position: "absolute",
                        top: { xs: -8, sm: -16, md: -22 },
                        left: "50%",
                        transform: "translateX(-50%)",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                        border: `4px solid ${theme.palette.background.paper}`,
                      }}
                    />

                    {/* Content */}
                    <CardContent sx={{ mt: { xs: 3, sm: 4 }, px: 1 }}>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: "bold",
                          color: theme.palette.text.primary,
                          mb: 0.5,
                        }}
                      >
                        {member.name}
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{
                          color: theme.palette.primary.main,
                          fontWeight: 600,
                          mb: 1.5,
                        }}
                      >
                        {member.position}
                      </Typography>

                      <Divider
                        sx={{
                          my: 1,
                          borderColor: theme.palette.divider,
                        }}
                      />

                      <Typography
                        variant="body2"
                        onClick={() =>
                          setExpandedIndex(isExpanded ? null : index)
                        }
                        sx={{
                          color: theme.palette.text.secondary,
                          lineHeight: 1.6,
                          textAlign: "center",
                          px: 0.5,
                          cursor: "pointer",
                          display: "-webkit-box",
                          WebkitLineClamp: isExpanded ? "unset" : 4,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {member.description}
                      </Typography>
                    </CardContent>

                    {/* Social Icons */}
                    <Stack direction="row" spacing={1.5} justifyContent="center" mt="auto" pt={2}>
                      {member.socials?.instagram && (
                        <IconButton
                          href={member.socials.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={iconBtnStyle(theme)}
                        >
                          <Instagram fontSize="small" />
                        </IconButton>
                      )}
                      {member.socials?.linkedin && (
                        <IconButton
                          href={member.socials.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={iconBtnStyle(theme)}
                        >
                          <LinkedIn fontSize="small" />
                        </IconButton>
                      )}
                      {member.socials?.facebook && (
                        <IconButton
                          href={member.socials.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={iconBtnStyle(theme)}
                        >
                          <Facebook fontSize="small" />
                        </IconButton>
                      )}
                    </Stack>
                  </Card>
                </Box>
              </Motion.div>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

// Olive-green icon buttons, matching the screenshot
const iconBtnStyle = (theme) => ({
  color: theme.palette.primary.contrastText || "#fff",
  backgroundColor: theme.palette.primary.main,
  width: 32,
  height: 32,
  borderRadius: "50%",
  boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
    transform: "scale(1.1)",
  },
});

export default OurTeam;