import {
  Box,
  Typography,
  Tabs,
  Tab,
  Button,
} from "@mui/material";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const backendURL = import.meta.env.VITE_BACKEND_URL;

const WebsiteDesignSection = () => {
  const [websites, setWebsites] = useState([]);
  const [category, setCategory] = useState("ecommerce");

  useEffect(() => {
    fetch(`${backendURL}/api/websites`)
      .then((res) => res.json())
      .then((data) => setWebsites(data));
  }, []);

  const filteredWebsites = websites.filter(
    (site) => site.category === category
  );

  return (
    <Box
      sx={{
        py: { xs: 10, md: 16 },
        color: "#fff",
        background:
          "radial-gradient(circle at top, #12234a 0%, #060b18 50%, #030712 100%)",
      }}
    >
      {/* Heading */}
      <Motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
      >
        <Typography
          align="center"
          variant="h2"
          component="h2"
          fontWeight={800}
          mb={2}
          sx={{
            fontSize: {
              xs: "1.9rem",
              sm: "2.4rem",
              md: "3rem",
            },
          }}
        >
          Website Design & Development
        </Typography>

        <Typography
          align="center"
          maxWidth={700}
          mx="auto"
          color="rgba(255,255,255,0.65)"
          mb={{ xs: 6, md: 8 }}
          sx={{ fontSize: { xs: "0.95rem", sm: "1rem" } }}
        >
          High-impact, conversion-focused websites crafted with modern
          technologies and refined user experience.
        </Typography>
      </Motion.div>

      {/* Tabs */}
      <Box display="flex" justifyContent="center" mb={{ xs: 6, md: 8 }}>
        <Tabs
          value={category}
          onChange={(e, val) => setCategory(val)}
          textColor="inherit"
          TabIndicatorProps={{ style: { display: "none" } }}
          sx={{
            bgcolor: "rgba(255,255,255,0.06)",
            borderRadius: "999px",
            p: 0.5,
            backdropFilter: "blur(12px)",
          }}
        >
          {["ecommerce", "static"].map((val) => (
            <Tab
              key={val}
              value={val}
              label={val === "ecommerce" ? "E-Commerce" : "Business Websites"}
              sx={{
                textTransform: "none",
                fontWeight: 600,
                px: { xs: 2.5, sm: 4 },
                fontSize: { xs: "0.85rem", sm: "1rem" },
                borderRadius: "999px",
                color: "rgba(255,255,255,0.7)",
                transition: "all 0.3s ease",
                "&:hover": { bgcolor: "rgba(255,255,255,0.12)" },
                "&.Mui-selected": {
                  bgcolor: "#769914",
                  color: "#fff",
                  boxShadow: "0 6px 20px rgba(118,153,20,0.45)",
                },
              }}
            />
          ))}
        </Tabs>
      </Box>

      {/* Projects */}
      <AnimatePresence mode="wait">
        <Motion.div
          key={category}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.45 }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 4,
              px: { xs: 2, sm: 3, md: 6 },
              overflowX: "auto",
              scrollSnapType: "x mandatory",
              pb: 3,

              "&::-webkit-scrollbar": { height: 6 },
              "&::-webkit-scrollbar-thumb": {
                background: "#769914", // button color
                borderRadius: 8,
              },
            }}
          >
            {filteredWebsites.map((site, index) => (
              <Motion.div
                key={index}
                whileHover={{ y: 0 }} // no hover move
                style={{
                  scrollSnapAlign: "center",
                  flexShrink: 0,
                }}
              >
                <Box
                  sx={{
                    width: { xs: "90vw", sm: 360, md: 420, lg: 440 },
                    bgcolor: "rgba(255,255,255,0.05)",
                    backdropFilter: "blur(16px)",
                    borderRadius: 5,
                    overflow: "hidden",
                    border: "1px solid rgba(255,255,255,0.08)",
                    boxShadow: "0 30px 60px rgba(0,0,0,0.5)",
                  }}
                >
                  {/* Image */}
                  <Box
                    sx={{
                      position: "relative",
                      height: { xs: 300, sm: 320, md: 400 },
                      overflowY: "auto",
                      maxHeight: { xs: 300, sm: 320, md: 400 },
                      scrollbarWidth: "thin",
                      "&::-webkit-scrollbar": { width: 6 },
                      "&::-webkit-scrollbar-thumb": {
                        background: "#769914", // button color
                        borderRadius: 3,
                      },
                    }}
                  >
                    <Box
                      component="img"
                      src={site.image}
                      alt={site.title}
                      loading="lazy"
                      sx={{
                        width: "100%",
                        height: "auto",
                        transform: "none",
                        transition: "none",
                      }}
                    />
                  </Box>

                  {/* Content */}
                  <Box p={3}>
                    <Button
                      variant="contained"
                      fullWidth
                      sx={{
                        borderRadius: "999px",
                        textTransform: "none",
                        fontWeight: 600,
                        fontSize: { xs: "0.85rem", sm: "0.95rem" },
                        py: { xs: 1, sm: 1.2 },
                        bgcolor: "#769914",
                        "&:hover": { bgcolor: "#5f7d10" },
                      }}
                      href={site.link}
                      target="_blank"
                    >
                      View Live Website
                    </Button>
                  </Box>
                </Box>
              </Motion.div>
            ))}
          </Box>
        </Motion.div>
      </AnimatePresence>

      {/* CTA */}
      <Box textAlign="center" mt={{ xs: 8, md: 12 }}>
        <Button
          size="large"
          variant="outlined"
          sx={{
            px: { xs: 5, sm: 7 },
            py: 1.8,
            borderRadius: "999px",
            textTransform: "none",
            fontWeight: 600,
            fontSize: { xs: "0.9rem", sm: "1rem" },
            borderColor: "#769914",
            color: "#fff",
            "&:hover": { borderColor: "#5f7d10" },
          }}
          href="/projects"
        >
          View All Projects
        </Button>
      </Box>
    </Box>
  );
};

export default WebsiteDesignSection;
