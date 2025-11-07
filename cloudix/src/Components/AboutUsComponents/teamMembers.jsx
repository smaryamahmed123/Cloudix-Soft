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
} from "@mui/material";
import { Instagram, LinkedIn, Facebook } from "@mui/icons-material";
import { motion as Motion } from "framer-motion";

const OurTeam = ({ team }) => {
  if (!team) return null;

  return (
    <Box sx={{ py: 10, textAlign: "center", overflowX: "hidden", bgcolor: "#FFFFFF" }}>
      {/* ---- Title with Underline ---- */}
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
          variant="h2"
          sx={{
            fontWeight: "bold",
            color: "#A9B838",
            mb: 8,
            fontSize: { xs: "2rem", sm: "2.8rem", md: "3.2rem" },
          }}
        >
          Meet Our Team
        </Typography>
      </Box>

      {/* ---- Team Cards ---- */}
      <Grid
        container
        spacing={4}
        justifyContent="center"
        sx={{
          width: "100%",
          margin: 0,
          px: { xs: 2, sm: 4 },
        }}
      >
        {team.map((member, index) => (
          <Grid
            sx={{
              gridColumn: { xs: "span 12", md: "span 6" },
            }}
            key={index}
          >
            {/* ✨ Motion Wrapper for Animation */}
            <Motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.2, // Stagger effect
                ease: "easeOut",
              }}
              viewport={{ once: true }}
            >
              <Box
                sx={{
                  position: "relative",
                  display: "flex",
                  justifyContent: "center",
                  pt: { xs: 10, sm: 8, md: 10 },
                }}
              >
                <Card
                  sx={{
                    borderRadius: 4,
                    textAlign: "center",
                    bgcolor: "#D9D9D9",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                    pt: { xs: 6, sm: 8 },
                    pb: 4,
                    px: 2,
                    width: "100%",
                    maxWidth: 320,
                    height: { xs: 440, sm: 460, md: 480 },
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Avatar
                    src={`${member.image}`}
                    alt={member.name}
                    sx={{
                      width: { xs: 130, sm: 170, md: 200 },
                      height: { xs: 130, sm: 170, md: 200 },
                      position: "absolute",
                      top: { xs: -10, sm: -20, md: -30 },
                      left: "50%",
                      transform: "translateX(-50%)",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                      border: "4px solid white",
                    }}
                  />

                  <CardContent sx={{ mt: { xs: 4, sm: 6 } }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "bold",
                        color: "#000",
                        mb: 0.5,
                      }}
                    >
                      {member.name}
                    </Typography>

                    <Typography
                      sx={{
                        color: "#8DA133",
                        fontWeight: 500,
                        fontSize: 14,
                        mb: 2,
                      }}
                    >
                      {member.position}
                    </Typography>

                    <Divider sx={{ my: 1, bgcolor: "black", borderBottomWidth: 1 }} />

                    <Typography
                      sx={{
                        color: "#555",
                        fontSize: 13.5,
                        lineHeight: 1.6,
                        textAlign: "justify",
                        px: 1,
                      }}
                    >
                      {member.description}
                    </Typography>
                  </CardContent>

                  {/* Social Icons */}
                  <Stack direction="row" spacing={1.5} justifyContent="center" mt="auto">
                    {member.socials?.instagram && (
                      <IconButton
                        href={member.socials.instagram}
                        target="_blank"
                        sx={{
                          color: "#111E2C",
                          backgroundColor: "#D9D9D9",
                          width: 40,
                          height: 40,
                          borderRadius: "50%",
                          boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            backgroundColor: "#111E2C",
                            color: "#fff",
                            transform: "scale(1.1)",
                          },
                        }}
                      >
                        <Instagram fontSize="small" />
                      </IconButton>
                    )}

                    {member.socials?.linkedin && (
                      <IconButton
                        href={member.socials.linkedin}
                        target="_blank"
                        sx={{
                          color: "#111E2C",
                          backgroundColor: "#D9D9D9",
                          width: 40,
                          height: 40,
                          borderRadius: "50%",
                          boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            backgroundColor: "#111E2C",
                            color: "#D9D9D9",
                            transform: "scale(1.1)",
                          },
                        }}
                      >
                        <LinkedIn fontSize="small" />
                      </IconButton>
                    )}

                    {member.socials?.facebook && (
                      <IconButton
                        href={member.socials.facebook}
                        target="_blank"
                        sx={{
                          color: "#111E2C",
                          backgroundColor: "#D9D9D9",
                          width: 40,
                          height: 40,
                          borderRadius: "50%",
                          boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            backgroundColor: "#111E2C",
                            color: "#D9D9D9",
                            transform: "scale(1.1)",
                          },
                        }}
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
    </Box>
  );
};

export default OurTeam;
