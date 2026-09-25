import React from "react";
import { Box, Skeleton, Container, useTheme } from "@mui/material";

const AboutSkeleton = () => {
  const theme = useTheme();

  return (
    <Box>
      {/* ── AboutContent: text left, image right ── */}
      <Box sx={{ py: { xs: 6, md: 10 }, background: theme.palette.background.default }}>
        <Container maxWidth="lg">
          <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: { xs: 5, md: 10 }, alignItems: "center" }}>
            {/* Left text */}
            <Box flex={1}>
              <Skeleton variant="text" width="70%" height={50} sx={{ mb: 1 }} />
              <Skeleton variant="text" width="50%" height={50} sx={{ mb: 3 }} />
              <Skeleton variant="text" width="100%" height={20} sx={{ mb: 1 }} />
              <Skeleton variant="text" width="100%" height={20} sx={{ mb: 1 }} />
              <Skeleton variant="text" width="100%" height={20} sx={{ mb: 1 }} />
              <Skeleton variant="text" width="85%" height={20} sx={{ mb: 3 }} />
              <Skeleton variant="text" width="60%" height={24} />
            </Box>
            {/* Right image */}
            <Box flex={1}>
              <Skeleton variant="rounded" width="100%" height={350} sx={{ borderRadius: "35px" }} />
            </Box>
          </Box>
        </Container>
      </Box>

      {/* ── VisionMission: dark bg, two rows ── */}
      <Box sx={{ bgcolor: theme.palette.primary.dark, py: { xs: 10, md: 14 } }}>
        <Container maxWidth="lg">
          {/* Vision row: text left, image right */}
          <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: { xs: 5, md: 8 }, alignItems: "center", mb: { xs: 9, md: 12 } }}>
            <Box flex={1}>
              <Skeleton variant="text" width="30%" height={16} sx={{ mb: 2, bgcolor: "rgba(255,255,255,0.1)" }} />
              <Skeleton variant="text" width="65%" height={44} sx={{ mb: 1, bgcolor: "rgba(255,255,255,0.1)" }} />
              <Skeleton variant="text" width="100%" height={18} sx={{ mb: 1, bgcolor: "rgba(255,255,255,0.08)" }} />
              <Skeleton variant="text" width="100%" height={18} sx={{ mb: 1, bgcolor: "rgba(255,255,255,0.08)" }} />
              <Skeleton variant="text" width="80%" height={18} sx={{ bgcolor: "rgba(255,255,255,0.08)" }} />
            </Box>
            <Box flex={1}>
              <Skeleton variant="rounded" width="100%" height={300} sx={{ borderRadius: "16px", bgcolor: "rgba(255,255,255,0.08)" }} />
            </Box>
          </Box>

          {/* Divider */}
          <Skeleton variant="rectangular" width="100%" height={1} sx={{ mb: { xs: 9, md: 12 }, bgcolor: "rgba(255,255,255,0.07)" }} />

          {/* Mission row: image left, text right */}
          <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row-reverse" }, gap: { xs: 5, md: 8 }, alignItems: "center" }}>
            <Box flex={1}>
              <Skeleton variant="text" width="30%" height={16} sx={{ mb: 2, bgcolor: "rgba(255,255,255,0.1)" }} />
              <Skeleton variant="text" width="65%" height={44} sx={{ mb: 1, bgcolor: "rgba(255,255,255,0.1)" }} />
              <Skeleton variant="text" width="100%" height={18} sx={{ mb: 1, bgcolor: "rgba(255,255,255,0.08)" }} />
              <Skeleton variant="text" width="100%" height={18} sx={{ mb: 1, bgcolor: "rgba(255,255,255,0.08)" }} />
              <Skeleton variant="text" width="80%" height={18} sx={{ bgcolor: "rgba(255,255,255,0.08)" }} />
            </Box>
            <Box flex={1}>
              <Skeleton variant="rounded" width="100%" height={300} sx={{ borderRadius: "16px", bgcolor: "rgba(255,255,255,0.08)" }} />
            </Box>
          </Box>
        </Container>
      </Box>

      {/* ── CommitmentSection: text left, image right ── */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: theme.palette.background.default }}>
        <Container maxWidth="lg">
          <Skeleton variant="text" width="45%" height={44} sx={{ mb: 6, mx: "auto" }} />
          <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: { xs: 5, md: 8 }, alignItems: "center" }}>
            <Box flex={1}>
              <Skeleton variant="text" width="100%" height={18} sx={{ mb: 1 }} />
              <Skeleton variant="text" width="100%" height={18} sx={{ mb: 1 }} />
              <Skeleton variant="text" width="100%" height={18} sx={{ mb: 1 }} />
              <Skeleton variant="text" width="90%" height={18} />
            </Box>
            <Box flex={1}>
              <Skeleton variant="rounded" width="100%" height={300} sx={{ borderRadius: "16px" }} />
            </Box>
          </Box>
        </Container>
      </Box>

      {/* ── TeamSection: image left, text right ── */}
      <Box sx={{ bgcolor: theme.palette.primary.dark, py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: { xs: 5, md: 10 }, alignItems: "center" }}>
            <Box flex={1}>
              <Skeleton variant="rounded" width="100%" height={320} sx={{ borderRadius: "35px", bgcolor: "rgba(255,255,255,0.08)" }} />
            </Box>
            <Box flex={1}>
              <Skeleton variant="text" width="60%" height={44} sx={{ mb: 2, bgcolor: "rgba(255,255,255,0.1)" }} />
              <Skeleton variant="text" width="100%" height={18} sx={{ mb: 1, bgcolor: "rgba(255,255,255,0.08)" }} />
              <Skeleton variant="text" width="100%" height={18} sx={{ mb: 1, bgcolor: "rgba(255,255,255,0.08)" }} />
              <Skeleton variant="text" width="75%" height={18} sx={{ bgcolor: "rgba(255,255,255,0.08)" }} />
            </Box>
          </Box>
        </Container>
      </Box>

      {/* ── OurTeam: 3 cards ── */}
      <Box sx={{ bgcolor: theme.palette.background.default, py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Skeleton variant="text" width="35%" height={50} sx={{ mx: "auto", mb: 8 }} />
          <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 4, justifyContent: "center" }}>
            {[...Array(3)].map((_, i) => (
              <Box key={i} sx={{ flex: "0 1 300px", display: "flex", flexDirection: "column", alignItems: "center", pt: 8, position: "relative" }}>
                {/* Avatar */}
                <Skeleton
                  variant="circular"
                  width={120}
                  height={120}
                  sx={{ position: "absolute", top: -30, zIndex: 2 }}
                />
                {/* Card body */}
                <Skeleton
                  variant="rounded"
                  width="100%"
                  height={400}
                  sx={{ borderRadius: "16px", bgcolor: "#e0e0e0" }}
                />
              </Box>
            ))}
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default AboutSkeleton;
