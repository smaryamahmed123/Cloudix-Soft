import React from "react";
import {
  Box,
  Container,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Send Your Inquiry",
    description:
      "Tell us about your business, idea, or project through our contact form.",
  },
  {
    number: "02",
    title: "We Review",
    description:
      "Our team reviews your requirements and understands what you need.",
  },
  {
    number: "03",
    title: "Discuss Your Project",
    description:
      "We connect with you to discuss the project, requirements, and next steps.",
  },
  {
    number: "04",
    title: "Start Building",
    description:
      "Once everything is clear, our team begins turning your idea into reality.",
  },
];

const MotionBox = motion.create(Box);

const ContactProcess = () => {
  return (
    <Box
      sx={{
        py: {
          xs: 7,
          md: 10,
        },
        backgroundColor: "#fff",
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            textAlign: "center",
            mb: 7,
          }}
        >
          <Typography
            sx={{
              color: "#769914",
              fontWeight: 700,
              fontSize: "0.8rem",
              letterSpacing: 1.5,
              textTransform: "uppercase",
              mb: 1.5,
            }}
          >
            Simple Process
          </Typography>

          <Typography
            component="h2"
            sx={{
              color: "#111E2C",
              fontWeight: 800,
              fontSize: {
                xs: "2rem",
                md: "3rem",
              },
            }}
          >
            How It Works
          </Typography>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(4, 1fr)",
            },
            gap: 3,
          }}
        >
          {steps.map((step, index) => (
            <MotionBox
              key={step.number}
              initial={{
                opacity: 0,
                y: 25,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              sx={{
                position: "relative",
                p: 3,
                borderTop:
                  "2px solid #769914",
              }}
            >
              <Typography
                sx={{
                  color: "#BBBF19",
                  fontWeight: 900,
                  fontSize: "2.5rem",
                  lineHeight: 1,
                  mb: 2,
                }}
              >
                {step.number}
              </Typography>

              <Typography
                sx={{
                  color: "#111E2C",
                  fontWeight: 800,
                  fontSize: "1.1rem",
                  mb: 1,
                }}
              >
                {step.title}
              </Typography>

              <Typography
                sx={{
                  color: "text.secondary",
                  fontSize: "0.9rem",
                  lineHeight: 1.7,
                }}
              >
                {step.description}
              </Typography>
            </MotionBox>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default ContactProcess;