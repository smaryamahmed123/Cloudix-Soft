import React from "react";
import {
  Box,
  Container,
  Typography,
  Button,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";

const BlogCTA = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        mt: { xs: 8, md: 12 },
        backgroundColor: "#111E2C",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          width: 400,
          height: 400,
          borderRadius: "50%",
          border: "1px solid rgba(187,191,25,0.15)",
          right: -180,
          top: -200,
        }}
      />

      <Container maxWidth="md">
        <Box
          sx={{
            py: { xs: 7, md: 9 },
            textAlign: "center",
            position: "relative",
          }}
        >
          <Typography
            variant="overline"
            sx={{
              color: "#BBBF19",
              fontWeight: 700,
              letterSpacing: 2,
            }}
          >
            READY TO GROW?
          </Typography>

          <Typography
            component="h2"
            sx={{
              mt: 1,
              color: "#fff",
              fontWeight: 800,
              fontSize: { xs: "2rem", md: "3rem" },
            }}
          >
            Let's turn your digital ideas into reality.
          </Typography>

          <Typography
            sx={{
              mt: 2,
              color: "rgba(255,255,255,0.7)",
              lineHeight: 1.7,
              maxWidth: 650,
              mx: "auto",
            }}
          >
            From websites and e-commerce to branding and
            digital marketing, Cloudix Soft can help build
            your digital presence.
          </Typography>

          <Button
            onClick={() => navigate("/contact")}
            endIcon={<ArrowForwardIcon />}
            sx={{
              mt: 3,
              px: 3.5,
              py: 1.2,
              borderRadius: "999px",
              backgroundColor: "#769914",
              color: "#fff",
              textTransform: "none",
              fontWeight: 700,
              "&:hover": {
                backgroundColor: "#5f7d10",
              },
            }}
          >
            Start a Project
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default BlogCTA;