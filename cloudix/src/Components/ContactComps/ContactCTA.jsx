import React from "react";
import {
  Box,
  Button,
  Container,
  Typography,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const ContactCTA = () => {
  const scrollToForm = () => {
    document
      .getElementById("contact-form")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };

  return (
    <Box
      sx={{
        py: {
          xs: 8,
          md: 11,
        },
        backgroundColor: "#111E2C",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative diagonal */}
      <Box
        sx={{
          position: "absolute",
          width: 300,
          height: 300,
          left: -180,
          top: -100,
          border:
            "40px solid rgba(118,153,20,0.08)",
          transform: "rotate(45deg)",
        }}
      />

      <Container
        maxWidth="md"
        sx={{
          position: "relative",
          zIndex: 1,
          textAlign: "center",
        }}
      >
        <Typography
          sx={{
            color: "#BBBF19",
            fontWeight: 700,
            fontSize: "0.8rem",
            textTransform: "uppercase",
            letterSpacing: 1.5,
            mb: 2,
          }}
        >
          Ready To Get Started?
        </Typography>

        <Typography
          component="h2"
          sx={{
            color: "#fff",
            fontWeight: 800,
            fontSize: {
              xs: "2.2rem",
              md: "3.5rem",
            },
            lineHeight: 1.15,
            mb: 2,
          }}
        >
          Your Idea Could Be
          <Box
            component="span"
            sx={{
              display: "block",
              color: "#BBBF19",
            }}
          >
            Our Next Project.
          </Box>
        </Typography>

        <Typography
          sx={{
            color:
              "rgba(255,255,255,0.65)",
            maxWidth: 600,
            mx: "auto",
            lineHeight: 1.8,
            mb: 4,
          }}
        >
          Let's discuss your goals and find the right
          digital solution for your business.
        </Typography>

        <Button
          onClick={scrollToForm}
          variant="contained"
          endIcon={<ArrowForwardIcon />}
          sx={{
            px: 4,
            py: 1.5,
            borderRadius: 2,
            backgroundColor: "#769914",
            color: "#fff",
            fontWeight: 700,
            textTransform: "none",
            fontSize: "1rem",
            "&:hover": {
              backgroundColor: "#8aa91b",
              transform: "translateY(-2px)",
            },
            transition: "all 0.25s ease",
          }}
        >
          Let's Work Together
        </Button>
      </Container>
    </Box>
  );
};

export default ContactCTA;