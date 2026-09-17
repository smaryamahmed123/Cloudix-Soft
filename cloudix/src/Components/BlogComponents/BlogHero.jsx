import React from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { motion } from "framer-motion";
import blogBg from "../../assets/blog-bg.webp";

const BlogHero = ({ search, setSearch }) => {
  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        py: { xs: 9, md: 13 },
        color: "#fff",

        // Background image + dark overlay
        backgroundImage: `
          linear-gradient(
            135deg,
            rgba(17, 30, 44, 0.94) 0%,
            rgba(17, 30, 44, 0.82) 55%,
            rgba(17, 30, 44, 0.72) 100%
          ),
          url(${blogBg})
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Decorative green circle */}
      <Box
        sx={{
          position: "absolute",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "rgba(118,153,20,0.12)",
          top: -150,
          right: -80,
          pointerEvents: "none",
        }}
      />

      {/* Decorative square */}
      <Box
        sx={{
          position: "absolute",
          width: 220,
          height: 220,
          transform: "rotate(35deg)",
          border: "1px solid rgba(187,191,25,0.18)",
          bottom: -100,
          left: -80,
          pointerEvents: "none",
        }}
      />

      <Container
        maxWidth="lg"
        sx={{
          position: "relative",
          zIndex: 1,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Typography
            variant="overline"
            sx={{
              color: "#BBBF19",
              fontWeight: 700,
              letterSpacing: 2,
            }}
          >
            CLOUDIX SOFT INSIGHTS
          </Typography>

          <Typography
            component="h1"
            sx={{
              mt: 1,
              fontSize: {
                xs: "2.5rem",
                sm: "3.5rem",
                md: "4.5rem",
              },
              lineHeight: 1.05,
              fontWeight: 800,
              maxWidth: 850,
            }}
          >
            Ideas That Help Your{" "}
            <Box
              component="span"
              sx={{
                color: "#A9B838",
              }}
            >
              Business Grow.
            </Box>
          </Typography>

          <Typography
            sx={{
              mt: 3,
              maxWidth: 700,
              fontSize: {
                xs: "1rem",
                md: "1.15rem",
              },
              lineHeight: 1.8,
              color: "rgba(255,255,255,0.8)",
            }}
          >
            Practical insights about digital marketing, websites, branding,
            e-commerce, technology, and building better digital experiences.
          </Typography>

          <TextField
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search articles..."
            fullWidth
            sx={{
              mt: 4,
              maxWidth: 600,

              "& .MuiOutlinedInput-root": {
                backgroundColor: "#fff",
                borderRadius: "12px",
                color: "#111E2C",

                "& fieldset": {
                  borderColor: "transparent",
                },

                "&:hover fieldset": {
                  borderColor: "#769914",
                },

                "&.Mui-focused fieldset": {
                  borderColor: "#769914",
                },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </motion.div>
      </Container>
    </Box>
  );
};

export default BlogHero;