// import {
//   Box,
//   Grid,
//   Card,
//   CardContent,
//   Avatar,
//   Typography,
//   Stack,
//   IconButton,
//   Divider,
// } from "@mui/material";
// import { Instagram, LinkedIn, Facebook } from "@mui/icons-material";
// import { motion as Motion } from "framer-motion";

// const OurTeam = ({ team }) => {
//   if (!team) return null;

//   return (
//     <Box
//       sx={{
//         py: 10,
//         textAlign: "center",
//         overflowX: "hidden",
//         bgcolor: "#FFFFFF",
//       }}
//     >
//       {/* ---- Title ---- */}
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
//           variant="h2"
//           sx={{
//             fontWeight: "bold",
//             color: "#A9B838",
//             mb: 8,
//             fontSize: { xs: "2rem", sm: "2.8rem", md: "3.2rem" },
//           }}
//         >
//           Meet Our Team
//         </Typography>
//       </Box>

//       {/* ---- Team Cards ---- */}
//       <Grid
//         container
//         spacing={4}
//         justifyContent="center"
//         sx={{ width: "100%", margin: 0, px: { xs: 2, sm: 4 } }}
//       >
//         {team.map((member, index) => (
//           <Grid key={index} item xs={12} sm={6} md={4}>
//             <Motion.div
//               initial={{ opacity: 0, y: 50 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{
//                 duration: 0.6,
//                 delay: index * 0.2,
//                 ease: "easeOut",
//               }}
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
//                     boxSizing: "border-box",
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
//                       border: "4px solid white",
//                     }}
//                   />

//                   {/* Content */}
//                   <CardContent sx={{ mt: { xs: 4, sm: 6 } }}>
//                     <Typography
//                       variant="h6"
//                       sx={{ fontWeight: "bold", color: "#000", mb: 0.5 }}
//                     >
//                       {member.name}
//                     </Typography>
//                     <Typography
//                       sx={{
//                         color: "#8DA133",
//                         fontWeight: 500,
//                         fontSize: 14,
//                         mb: 2,
//                       }}
//                     >
//                       {member.position}
//                     </Typography>

//                     <Divider sx={{ my: 1, bgcolor: "black", borderBottomWidth: 1 }} />

//                     <Typography
//                       sx={{
//                         color: "#555",
//                         fontSize: 13.5,
//                         lineHeight: 1.6,
//                         textAlign: "justify",
//                         px: 1,
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
//                         sx={iconBtnStyle}
//                       >
//                         <Instagram fontSize="small" />
//                       </IconButton>
//                     )}
//                     {member.socials?.linkedin && (
//                       <IconButton
//                         href={member.socials.linkedin}
//                         target="_blank"
//                         sx={iconBtnStyle}
//                       >
//                         <LinkedIn fontSize="small" />
//                       </IconButton>
//                     )}
//                     {member.socials?.facebook && (
//                       <IconButton
//                         href={member.socials.facebook}
//                         target="_blank"
//                         sx={iconBtnStyle}
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

// // Reusable icon button style
// const iconBtnStyle = {
//   color: "#111E2C",
//   backgroundColor: "#D9D9D9",
//   width: 40,
//   height: 40,
//   borderRadius: "50%",
//   boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
//   transition: "all 0.3s ease",
//   "&:hover": {
//     backgroundColor: "#111E2C",
//     color: "#fff",
//     transform: "scale(1.1)",
//   },
// };

// export default OurTeam;



import {
  Box,
  Grid,
  Card,
  CardContent,
  Avatar,
  Typography,
  Stack,
  IconButton,
  Divider,
  Container,
} from "@mui/material";
import { Instagram, LinkedIn, Facebook } from "@mui/icons-material";
import { motion as Motion } from "framer-motion";

const OurTeam = ({ team }) => {
  if (!team) return null;

  return (
    <Box
      sx={{
        py: 10,
        bgcolor: "background.default",
      }}
    >
      <Container>
        {/* ---- Title ---- */}
        <Box textAlign="center" mb={8}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: "bold",
              color: "accent.light",
              fontSize: { xs: "2rem", sm: "2.8rem", md: "3.2rem" },
            }}
          >
            Meet Our Team
          </Typography>
        </Box>

        {/* ---- Team Cards ---- */}
        <Grid container spacing={4} justifyContent="center">
          {team.map((member, index) => (
            <Grid key={index} item xs={12} sm={6} md={4}>
              <Motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.2,
                }}
                viewport={{ once: true }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    pt: { xs: 10, md: 10 },
                  }}
                >
                  <Card
                    sx={{
                      borderRadius: 4,
                      textAlign: "center",
                      bgcolor: "grey.100",
                      boxShadow: 3,
                      pt: 8,
                      pb: 4,
                      px: 2,
                      width: "100%",
                      maxWidth: 320,
                      height: 460,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    {/* Avatar */}
                    <Avatar
                      src={member.image}
                      alt={member.name}
                      sx={{
                        width: 160,
                        height: 160,
                        position: "absolute",
                        top: -30,
                        left: "50%",
                        transform: "translateX(-50%)",
                        boxShadow: 3,
                        border: "4px solid white",
                      }}
                    />

                    {/* Content */}
                    <CardContent sx={{ mt: 6 }}>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: "bold", color: "text.primary" }}
                      >
                        {member.name}
                      </Typography>

                      <Typography
                        sx={{
                          color: "primary.main",
                          fontWeight: 500,
                          fontSize: 14,
                          mb: 2,
                        }}
                      >
                        {member.position}
                      </Typography>

                      <Divider sx={{ my: 1 }} />

                      <Typography
                        variant="body2"
                        sx={{
                          lineHeight: 1.6,
                          textAlign: "justify",
                        }}
                      >
                        {member.description}
                      </Typography>
                    </CardContent>

                    {/* Social Icons */}
                    <Stack direction="row" spacing={1.5} mt="auto">
                      {member.socials?.instagram && (
                        <IconButton
                          href={member.socials.instagram}
                          target="_blank"
                          sx={iconBtnStyle}
                        >
                          <Instagram fontSize="small" />
                        </IconButton>
                      )}

                      {member.socials?.linkedin && (
                        <IconButton
                          href={member.socials.linkedin}
                          target="_blank"
                          sx={iconBtnStyle}
                        >
                          <LinkedIn fontSize="small" />
                        </IconButton>
                      )}

                      {member.socials?.facebook && (
                        <IconButton
                          href={member.socials.facebook}
                          target="_blank"
                          sx={iconBtnStyle}
                        >
                          <Facebook fontSize="small" />
                        </IconButton>
                      )}
                    </Stack>
                  </Card>
                </Box>
              </Motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

// ✅ Theme-based reusable style
const iconBtnStyle = {
  color: "primary.dark",
  bgcolor: "grey.200",
  width: 40,
  height: 40,
  borderRadius: "50%",
  boxShadow: 2,
  transition: "all 0.3s ease",
  "&:hover": {
    bgcolor: "primary.dark",
    color: "#fff",
    transform: "scale(1.1)",
  },
};

export default OurTeam;
