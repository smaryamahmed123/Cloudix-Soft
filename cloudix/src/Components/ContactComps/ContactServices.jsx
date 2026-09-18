import React from "react";
import {
  Box,
  Container,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";

import LanguageIcon from "@mui/icons-material/Language";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CampaignIcon from "@mui/icons-material/Campaign";
import PaletteIcon from "@mui/icons-material/Palette";
import CodeIcon from "@mui/icons-material/Code";

const services = [
  {
    title: "Web Development",
    description:
      "Modern, responsive websites designed for your business.",
    icon: <LanguageIcon />,
  },
  {
    title: "Mobile Apps",
    description:
      "User-friendly mobile applications for Android and iOS.",
    icon: <SmartphoneIcon />,
  },
  {
    title: "E-Commerce",
    description:
      "Powerful online stores built to grow your business.",
    icon: <ShoppingCartIcon />,
  },
  {
    title: "Digital Marketing",
    description:
      "Digital strategies that help your business reach customers.",
    icon: <CampaignIcon />,
  },
  {
    title: "Branding & Design",
    description:
      "Professional visual identities that represent your brand.",
    icon: <PaletteIcon />,
  },
  {
    title: "Custom Software",
    description:
      "Tailored software solutions for unique business needs.",
    icon: <CodeIcon />,
  },
];

const MotionBox = motion.create(Box);

const ContactServices = () => {
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
            maxWidth: 750,
            mx: "auto",
            mb: 6,
          }}
        >
          <Typography
            component="h2"
            sx={{
              color: "#111E2C",
              fontWeight: 800,
              fontSize: {
                xs: "2rem",
                md: "3rem",
              },
              mb: 2,
            }}
          >
            What Can We Help With?
          </Typography>

          <Typography
            sx={{
              color: "text.secondary",
              fontSize: "1.05rem",
              lineHeight: 1.7,
            }}
          >
            Whether you are starting a new business or improving an
            existing one, our team can help bring your digital ideas
            to life.
          </Typography>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            },
            gap: 2,
          }}
        >
          {services.map((service, index) => (
            <MotionBox
              key={service.title}
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
                delay: index * 0.07,
              }}
              sx={{
                p: 3,
                borderRadius: 3,
                border:
                  "1px solid rgba(17,30,44,0.08)",
                backgroundColor: "#fff",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-6px)",
                  borderColor: "#769914",
                  boxShadow:
                    "0 15px 40px rgba(17,30,44,0.09)",
                },
              }}
            >
              <Box
                sx={{
                  width: 52,
                  height: 52,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 2,
                  mb: 2,
                  color: "#769914",
                  backgroundColor:
                    "rgba(118,153,20,0.1)",
                  "& svg": {
                    fontSize: 27,
                  },
                }}
              >
                {service.icon}
              </Box>

              <Typography
                sx={{
                  fontWeight: 700,
                  color: "#111E2C",
                  fontSize: "1.1rem",
                  mb: 1,
                }}
              >
                {service.title}
              </Typography>

              <Typography
                sx={{
                  color: "text.secondary",
                  lineHeight: 1.6,
                  fontSize: "0.92rem",
                }}
              >
                {service.description}
              </Typography>
            </MotionBox>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default ContactServices;