import {
  Box, Typography, Tabs, Tab, Button, Chip, Stack,
  Container, Skeleton, useTheme,
} from "@mui/material";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const backendURL = import.meta.env.VITE_BACKEND_URL;

const CATEGORIES = [
  { value: "ecommerce", label: "E-Commerce" },
  { value: "static", label: "Business Websites" },
];

// Skeleton for website cards
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
          <Skeleton variant="text" width="70%" height={28} sx={{ bgcolor: "rgba(255,255,255,0.08)" }} />
          <Skeleton variant="rounded" width={140} height={28} sx={{ mt: 1.5, borderRadius: "999px", bgcolor: "rgba(255,255,255,0.08)" }} />
        </Box>
      </Box>
    ))}
  </Box>
);

const WebsiteDesignSection = () => {
  const theme = useTheme();
  const [websites, setWebsites] = useState([]);
  const [category, setCategory] = useState("ecommerce");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`${backendURL}/api/websites`)
      .then((res) => res.json())
      .then((data) => { setWebsites(data); setLoading(false); })
      .catch(() => { setError(true); setLoading(false); });
  }, []);

  const filteredWebsites = websites.filter((site) => site.category === category);

  return (
    <Box
      id="websites"
      sx={{
        py: { xs: 10, md: 16 },
        color: "#fff",
        background: "radial-gradient(circle at top, #12234a 0%, #060b18 50%, #030712 100%)",
      }}
    >
      <Container maxWidth="lg">
        {/* Header row: eyebrow + heading + subtitle on the left, filter tabs on the right */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", md: "flex-end" }}
          spacing={3}
          sx={{ mb: { xs: 6, md: 8 } }}
        >
          <Motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
          >
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1.5 }}>
              <Box sx={{ width: 24, height: 2, bgcolor: theme.palette.primary.main }} />
              <Typography
                variant="overline"
                sx={{ color: theme.palette.primary.main, fontWeight: 600, letterSpacing: "0.08em" }}
              >
                WEBSITE DESIGN & DEVELOPMENT
              </Typography>
            </Stack>

            <Typography
              component="h2"
              variant="h3"
              fontWeight={700}
              mb={1.5}
              sx={{ fontSize: { xs: "1.9rem", sm: "2.4rem", md: "3rem" } }}
            >
              Websites That Drive Results
            </Typography>

            <Typography
              maxWidth={520}
              color="rgba(255,255,255,0.65)"
              sx={{ fontSize: { xs: "0.95rem", sm: "1rem" } }}
            >
              Modern, responsive and high-performing websites built for your
              business growth.
            </Typography>
          </Motion.div>

          <Tabs
            value={category}
            onChange={(e, val) => setCategory(val)}
            textColor="inherit"
            variant="scrollable"
            scrollButtons={false}
            TabIndicatorProps={{ style: { display: "none" } }}
            sx={{
              bgcolor: "rgba(255,255,255,0.06)",
              borderRadius: "999px",
              p: 0.5,
              backdropFilter: "blur(12px)",
              minHeight: "auto",
              flexShrink: 0,
            }}
          >
            {CATEGORIES.map(({ value, label }) => (
              <Tab
                key={value}
                value={value}
                label={label}
                sx={{
                  textTransform: "none",
                  fontWeight: 600,
                  minHeight: "auto",
                  px: { xs: 2, sm: 2.5 },
                  py: 1,
                  fontSize: { xs: "0.8rem", sm: "0.9rem" },
                  borderRadius: "999px",
                  color: "rgba(255,255,255,0.7)",
                  transition: "all 0.3s ease",
                  "&:hover": { bgcolor: "rgba(255,255,255,0.12)" },
                  "&.Mui-selected": {
                    bgcolor: theme.palette.primary.main,
                    color: "#fff",
                    boxShadow: `0 6px 20px ${theme.palette.primary.main}73`,
                  },
                }}
              />
            ))}
          </Tabs>
        </Stack>
      </Container>

      {loading && <WebsiteSkeleton />}

      {!loading && error && (
        <Typography align="center" color="error" mt={4}>
          Failed to load websites. Please try again later.
        </Typography>
      )}

      {/* Projects — full width scroll, outside Container. Horizontal
          scroll-snap row kept from the old design. */}
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
                maxWidth: "1200px",
                mx: "auto",
                "&::-webkit-scrollbar": { height: 6 },
                "&::-webkit-scrollbar-thumb": {
                  background: theme.palette.primary.main,
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
                    {/* Image block — vertical scroll kept from the old design,
                        for tall screenshots that don't fit the fixed height */}
                    <Box
                      sx={{
                        position: "relative",
                        height: { xs: 300, sm: 320, md: 400 },
                        overflowY: "auto",
                        maxHeight: { xs: 300, sm: 320, md: 400 },
                        scrollbarWidth: "thin",
                        "&::-webkit-scrollbar": { width: 6 },
                        "&::-webkit-scrollbar-thumb": {
                          background: theme.palette.primary.main,
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
                      <Typography
                        fontWeight={700}
                        fontSize={{ xs: "1rem", sm: "1.05rem" }}
                        mb={1.5}
                      >
                        {site.title || "Untitled Project"}
                      </Typography>

                      {/* site.tags isn't in the current API response shape —
                          falls back to the single category so this doesn't
                          break, but won't match the mock's two-chip look
                          until the backend adds it. */}
                      <Stack direction="row" spacing={1} flexWrap="wrap" mb={2.5} useFlexGap>
                        {(site.tags?.length
                          ? site.tags
                          : [site.category === "ecommerce" ? "E-Commerce" : "Business"]
                        ).map((tag) => (
                          <Chip
                            key={tag}
                            label={tag}
                            size="small"
                            sx={{
                              bgcolor: "rgba(255,255,255,0.08)",
                              color: "rgba(255,255,255,0.75)",
                              fontWeight: 500,
                              fontSize: "0.72rem",
                            }}
                          />
                        ))}
                      </Stack>

                      <Button
                        variant="contained"
                        endIcon={<ArrowForwardIcon sx={{ fontSize: 16 }} />}
                        sx={{
                          borderRadius: "999px",
                          textTransform: "none",
                          fontWeight: 600,
                          fontSize: { xs: "0.82rem", sm: "0.88rem" },
                          px: 2.5,
                          py: 0.8,
                          bgcolor: theme.palette.primary.main,
                          "&:hover": { bgcolor: theme.palette.primary.dark },
                        }}
                        href={site.link}
                        target="_blank"
                      >
                        View Project
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