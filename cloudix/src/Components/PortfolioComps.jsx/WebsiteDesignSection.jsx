import {
  Box, Typography, Tabs, Tab, Button,
  Container, Skeleton, useTheme,          // ✅
} from "@mui/material";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const backendURL = import.meta.env.VITE_BACKEND_URL;

// ✅ Skeleton for website cards
const WebsiteSkeleton = () => (
  <Box
    sx={{
      display: "flex",
      gap: 4,
      px: { xs: 2, sm: 3, md: 6 },
      overflowX: "hidden",
      py: { xs: 6, md: 10 },
    }}
  >
    {[...Array(3)].map((_, i) => (
      <Box
        key={i}
        sx={{
          width: { xs: "90vw", sm: 360, md: 420, lg: 440 },
          flexShrink: 0,
          borderRadius: 5,
          overflow: "hidden",
        }}
      >
        <Skeleton variant="rectangular" height={400} sx={{ bgcolor: "rgba(255,255,255,0.08)" }} />
        <Box sx={{ p: 3 }}>
          <Skeleton variant="rounded" height={44} sx={{ borderRadius: "999px", bgcolor: "rgba(255,255,255,0.08)" }} />
        </Box>
      </Box>
    ))}
  </Box>
);

const WebsiteDesignSection = () => {
  const theme = useTheme();                               // ✅
  const [websites, setWebsites] = useState([]);
  const [category, setCategory] = useState("ecommerce");
  const [loading, setLoading] = useState(true);           // ✅
  const [error, setError] = useState(false);              // ✅

  useEffect(() => {
    fetch(`${backendURL}/api/websites`)
      .then((res) => res.json())
      .then((data) => { setWebsites(data); setLoading(false); })
      .catch(() => { setError(true); setLoading(false); });
  }, []);

  const filteredWebsites = websites.filter((site) => site.category === category);

  return (
    <Box
      sx={{
        py: { xs: 10, md: 16 },
        color: "#fff",
        background: "radial-gradient(circle at top, #12234a 0%, #060b18 50%, #030712 100%)",
      }}
    >
      <Container maxWidth="lg">                           {/* ✅ heading + tabs inside container */}
        {/* Heading */}
        <Motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          <Typography
            align="center"
            component="h3"
            fontWeight={800}
            mb={2}
            sx={{ fontSize: { xs: "1.9rem", sm: "2.4rem", md: "3rem" } }}
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
                    bgcolor: theme.palette.primary.main,              // ✅
                    color: "#fff",
                    boxShadow: `0 6px 20px ${theme.palette.primary.main}73`,
                  },
                }}
              />
            ))}
          </Tabs>
        </Box>
      </Container>

      {/* ✅ Skeleton */}
      {loading && <WebsiteSkeleton />}

      {/* Error */}
      {!loading && error && (
        <Typography align="center" color="error" mt={4}>
          Failed to load websites. Please try again later.
        </Typography>
      )}

      {/* Projects — full width scroll, outside Container */}
      {!loading && !error && (
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
                justifyContent: "flex-start",
                gap: 4,
                px: { xs: 2, sm: 3, md: 6 },
                overflowX: "auto",
                scrollSnapType: "x mandatory",
                pb: 3,
                maxWidth: "1200px",   // ✅ ADD THIS
                mx: "auto",           // ✅ ADD THIS
                "&::-webkit-scrollbar": { height: 6 },
                "&::-webkit-scrollbar-thumb": {
                  background: theme.palette.primary.main,             // ✅
                  borderRadius: 8,
                },
              }}
            >
              {filteredWebsites.map((site, index) => (
                <Motion.div
                  key={index}
                  style={{ scrollSnapAlign: "start", flexShrink: 0 }}
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
                    <Box
                      sx={{
                        position: "relative",
                        height: { xs: 300, sm: 320, md: 400 },
                        overflowY: "auto",
                        maxHeight: { xs: 300, sm: 320, md: 400 },
                        scrollbarWidth: "thin",
                        "&::-webkit-scrollbar": { width: 6 },
                        "&::-webkit-scrollbar-thumb": {
                          background: theme.palette.primary.main,     // ✅
                          borderRadius: 3,
                        },
                      }}
                    >
                      <Box
                        component="img"
                        src={site.image}
                        alt={site.title}
                        loading="lazy"
                        sx={{ width: "100%", height: "auto" }}
                      />
                    </Box>

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
                          bgcolor: theme.palette.primary.main,        // ✅
                          "&:hover": { bgcolor: theme.palette.primary.dark },
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
      )}
    </Box>
  );
};

export default WebsiteDesignSection;
