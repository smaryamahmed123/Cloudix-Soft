import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import GradientButton from "../GradientButton";
import { useNavigate } from "react-router-dom";

const features = [
  { icon: AutoAwesomeOutlinedIcon, title: "Creative Solutions", text: "Designs that make an impact" },
  { icon: GroupsOutlinedIcon, title: "Expert Team", text: "Skilled, passionate, reliable" },
  { icon: ScheduleOutlinedIcon, title: "On-Time Delivery", text: "Because your time matters" },
  { icon: ThumbUpAltOutlinedIcon, title: "Client Satisfaction", text: "Your success is our success" },
];

const BlogCTA = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ mt: { xs: 8, md: 10 }, bgcolor: "primary.dark", color: "#fff" }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            py: { xs: 6, md: 7 },
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: { xs: 5, md: 8 },
            alignItems: "center",
          }}
        >
          <Box>
            <Typography sx={{ color: "secondary.main", fontSize: "0.72rem", fontWeight: 700, letterSpacing: 1.2 }}>
              LET'S WORK TOGETHER
            </Typography>
            <Typography component="h2" sx={{ mt: 1, fontWeight: 700, lineHeight: 1.15, fontSize: { xs: "2rem", md: "2.6rem" } }}>
              Let's turn your ideas into{" "}
              <Box component="span" sx={{ color: "secondary.main" }}>reality.</Box>
            </Typography>
            <Typography sx={{ mt: 2, maxWidth: 460, color: "rgba(255,255,255,0.75)", lineHeight: 1.7, fontSize: "0.92rem" }}>
              Whether you need a website, a brand, or a complete digital strategy, we're here to help you grow.
            </Typography>
            
                        <GradientButton
                          text="Get Started"
                          onClick={() => navigate("/contact")}
                        />
          </Box>

          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3 }}>
            {features.map(({ icon: Icon, title, text }) => (
              <Box key={title} sx={{ display: "flex", gap: 1.5, alignItems: "flex-start" }}>
                <Icon sx={{ color: "primary.main", fontSize: 30 }} />
                <Box>
                  <Typography sx={{ fontWeight: 700, fontSize: "0.9rem" }}>{title}</Typography>
                  <Typography sx={{ mt: 0.3, fontSize: "0.75rem", color: "rgba(255,255,255,0.65)" }}>{text}</Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default BlogCTA;