import React, { useEffect, useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import {
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Paper,
  Skeleton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import {
  ArrowForwardRounded,
  CookieRounded,
  GavelRounded,
  MailRounded,
  PersonRounded,
  SecurityRounded,
  SettingsRounded,
  ShareRounded,
  ShieldRounded,
  StorageRounded,
  VerifiedUserRounded,
} from "@mui/icons-material";

import bgImg from "../assets/Privicy-bg.webp";
import HeroSection from "../Components/HeroSection";
import { parseRichText } from "../utils/parseRichText";

const backendURL = import.meta.env.VITE_BACKEND_URL;

const sectionIcons = [
  PersonRounded,
  SettingsRounded,
  GavelRounded,
  ShareRounded,
  CookieRounded,
  StorageRounded,
  ShieldRounded,
  SecurityRounded,
  MailRounded,
];

const renderContent = (content = "") => {
  const blocks = [];
  let listItems = [];

  const flushList = () => {
    if (listItems.length) {
      blocks.push({ type: "ul", items: listItems });
      listItems = [];
    }
  };

  content
    .split(/\r?\n/)
    .map((line) => line.trim())
    .forEach((line) => {
      if (!line) {
        flushList();
        return;
      }

      if (line.startsWith("- ") || line.startsWith("• ")) {
        listItems.push(line.slice(2).trim());
      } else {
        flushList();
        blocks.push({ type: "p", text: line });
      }
    });

  flushList();

  return blocks.map((block, index) =>
    block.type === "ul" ? (
      <Box
        component="ul"
        key={`list-${index}`}
        sx={{
          mt: 0.5,
          mb: 1.5,
          pl: 2.5,
          "& li": { mb: 0.6, pl: 0.3 },
        }}
      >
        {block.items.map((item, itemIndex) => (
          <li key={itemIndex}>{parseRichText(item)}</li>
        ))}
      </Box>
    ) : (
      <Typography component="p" key={`paragraph-${index}`} sx={{ m: 0, mb: 1.4 }}>
        {parseRichText(block.text)}
      </Typography>
    )
  );
};

const PrivacyPolicy = () => {
  const theme = useTheme();
  const [policy, setPolicy] = useState({
    intro: "",
    closing: { title: "", text: "" },
    sections: [],
    updatedAt: null,
  });
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    const fetchPolicy = async () => {
      try {
        const { data } = await axios.get(`${backendURL}/api/privacy-policy`);
        setPolicy({
          intro: data.intro || "",
          closing: {
            title: data.closing?.title || "",
            text: data.closing?.text || "",
          },
          sections: Array.isArray(data.sections) ? data.sections : [],
          updatedAt: data.updatedAt || null,
        });
      } catch (error) {
        console.error("Error fetching policy:", error);
        setLoadError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPolicy();
  }, []);

  const hasContent = Boolean(
    policy.intro || policy.sections.length || policy.closing.title || policy.closing.text
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #F7F9FB 0%, #FFFFFF 45%, #F7F9FB 100%)",
      }}
    >
      <Helmet>
        <title>Privacy Policy | Cloudix Soft</title>
        <meta
          name="description"
          content="Read Cloudix Soft's Privacy Policy to understand how we collect, use, and protect your personal information."
        />
        <meta property="og:title" content="Privacy Policy | Cloudix Soft" />
        <meta
          property="og:description"
          content="Learn about Cloudix Soft's data privacy practices and commitment to user security."
        />
        <link rel="canonical" href="https://cloudixsoft.com/privacy-policy" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Privacy Policy | Cloudix Soft",
            url: "https://cloudixsoft.com/privacy-policy",
          })}
        </script>
      </Helmet>

      <HeroSection
        image={bgImg}
        title="Privacy Policy"
        subtitle="Learn how we collect, use, and protect your personal information."
      />

      <Container maxWidth="lg" sx={{ py: { xs: 5, sm: 7, md: 10 } }}>
        {!loading && policy.intro && (
          <Paper
            elevation={0}
            sx={{
              position: "relative",
              overflow: "hidden",
              mb: { xs: 5, md: 7 },
              p: { xs: 3, sm: 4, md: 5 },
              borderRadius: { xs: 3, md: 4 },
              border: "1px solid rgba(118,153,20,0.15)",
              background: "linear-gradient(135deg, #FFFFFF 0%, #F7FBF0 100%)",
              boxShadow: "0 15px 45px rgba(7,21,31,0.06)",
            }}
          >
            <Box
              aria-hidden
              sx={{
                position: "absolute",
                right: -50,
                top: -70,
                width: 180,
                height: 180,
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(187,191,25,0.20), transparent 68%)",
                pointerEvents: "none",
              }}
            />
            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={{ xs: 3, md: 4 }}
              alignItems={{ xs: "flex-start", md: "center" }}
            >
              <Box
                sx={{
                  width: { xs: 62, md: 76 },
                  height: { xs: 62, md: 76 },
                  minWidth: { xs: 62, md: 76 },
                  borderRadius: 3,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "linear-gradient(135deg, #769914, #BBBF19)",
                  color: "#FFFFFF",
                  boxShadow: "0 12px 25px rgba(118,153,20,0.25)",
                }}
              >
                <SecurityRounded sx={{ fontSize: { xs: 32, md: 38 } }} />
              </Box>
              <Box sx={{ flex: 1, position: "relative" }}>
                <Chip
                  icon={<VerifiedUserRounded sx={{ fontSize: "16px !important" }} />}
                  label="Your Privacy Matters"
                  size="small"
                  sx={{
                    mb: 1.5,
                    fontWeight: 700,
                    color: theme.palette.primary.dark,
                    backgroundColor: "rgba(118,153,20,0.10)",
                    border: "1px solid rgba(118,153,20,0.16)",
                  }}
                />
                <Box
                  sx={{
                    color: theme.palette.text.secondary,
                    lineHeight: 1.8,
                    fontSize: { xs: "0.9rem", md: "0.98rem" },
                    "& p": { m: 0, mb: 1.2 },
                    "& p:last-child": { mb: 0 },
                    "& a": { color: theme.palette.primary.main, fontWeight: 700 },
                  }}
                >
                  {renderContent(policy.intro)}
                </Box>
              </Box>
            </Stack>
          </Paper>
        )}

        {loading ? (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" },
              gap: 3,
            }}
          >
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Paper key={item} elevation={0} sx={{ p: 3, borderRadius: 3, border: "1px solid #E8EDF0" }}>
                <Skeleton variant="rounded" width={46} height={46} sx={{ mb: 2 }} />
                <Skeleton variant="text" width="60%" height={32} />
                <Skeleton variant="text" width="95%" />
                <Skeleton variant="text" width="85%" />
                <Skeleton variant="text" width="70%" />
              </Paper>
            ))}
          </Box>
        ) : loadError ? (
          <Paper elevation={0} sx={{ textAlign: "center", p: 5, borderRadius: 4, border: "1px solid #E8EDF0" }}>
            <SecurityRounded sx={{ fontSize: 50, color: theme.palette.primary.main, mb: 2 }} />
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
              Privacy Policy Temporarily Unavailable
            </Typography>
            <Typography color="text.secondary">
              Please try again later or contact us if you need assistance.
            </Typography>
          </Paper>
        ) : !hasContent ? (
          <Paper elevation={0} sx={{ textAlign: "center", p: 6, borderRadius: 4, border: "1px solid #E8EDF0" }}>
            <SecurityRounded sx={{ fontSize: 50, color: theme.palette.primary.main, mb: 2 }} />
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
              Privacy Policy Unavailable
            </Typography>
            <Typography color="text.secondary">
              No privacy policy content is available at this time.
            </Typography>
          </Paper>
        ) : (
          <>
            <Box sx={{ textAlign: "center", maxWidth: 720, mx: "auto", mb: { xs: 4, md: 6 } }}>
              <Typography
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 1,
                  color: theme.palette.primary.main,
                  fontWeight: 800,
                  fontSize: "0.78rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  mb: 1.5,
                }}
              >
                <Box sx={{ width: 28, height: 2, backgroundColor: theme.palette.primary.main }} />
                Privacy &amp; Security
                <Box sx={{ width: 28, height: 2, backgroundColor: theme.palette.primary.main }} />
              </Typography>
              <Typography
                component="h2"
                sx={{
                  fontWeight: 800,
                  color: theme.palette.primary.dark,
                  fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.7rem" },
                  lineHeight: 1.15,
                  mb: 1.5,
                }}
              >
                How We Protect Your Information
              </Typography>
              <Typography sx={{ color: theme.palette.text.secondary, lineHeight: 1.8, fontSize: { xs: "0.9rem", md: "1rem" } }}>
                We believe privacy should be simple and transparent. Explore the sections below to understand how your information is handled.
              </Typography>
            </Box>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" },
                gap: { xs: 2.5, md: 3 },
              }}
            >
              {policy.sections.map((section, index) => {
                const Icon = sectionIcons[index % sectionIcons.length];

                return (
                  <Paper
                    key={section._id || index}
                    component="article"
                    elevation={0}
                    sx={{
                      position: "relative",
                      overflow: "hidden",
                      p: { xs: 2.5, sm: 3, md: 3.5 },
                      borderRadius: 3,
                      border: "1px solid rgba(118,153,20,0.13)",
                      backgroundColor: "#FFFFFF",
                      transition: "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        borderColor: "rgba(118,153,20,0.35)",
                        boxShadow: "0 18px 45px rgba(7,21,31,0.09)",
                      },
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        right: -45,
                        bottom: -55,
                        width: 120,
                        height: 120,
                        borderRadius: "50%",
                        background: "rgba(187,191,25,0.06)",
                        pointerEvents: "none",
                      },
                    }}
                  >
                    <Stack direction="row" spacing={2} alignItems="flex-start" sx={{ mb: 2.5 }}>
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          minWidth: 48,
                          borderRadius: 2,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background: "linear-gradient(135deg, #769914, #BBBF19)",
                          color: "#FFFFFF",
                          fontWeight: 800,
                          fontSize: "0.9rem",
                          boxShadow: "0 8px 18px rgba(118,153,20,0.20)",
                        }}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </Box>
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          minWidth: 48,
                          borderRadius: 2,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: "rgba(118,153,20,0.08)",
                          color: theme.palette.primary.main,
                        }}
                      >
                        <Icon />
                      </Box>
                      <Typography
                        component="h3"
                        sx={{
                          pt: 0.4,
                          fontWeight: 800,
                          color: theme.palette.primary.dark,
                          fontSize: { xs: "1rem", md: "1.08rem" },
                          lineHeight: 1.35,
                        }}
                      >
                        {parseRichText(section.title)}
                      </Typography>
                    </Stack>

                    <Divider sx={{ mb: 2.2, borderColor: "rgba(7,21,31,0.07)" }} />
                    <Box
                      sx={{
                        position: "relative",
                        color: theme.palette.text.secondary,
                        fontSize: { xs: "0.87rem", md: "0.92rem" },
                        lineHeight: 1.85,
                        "& p": { m: 0, mb: 1.2 },
                        "& p:last-child": { mb: 0 },
                        "& strong": { color: theme.palette.text.primary },
                        "& a": { color: theme.palette.primary.main, fontWeight: 700, overflowWrap: "anywhere" },
                      }}
                    >
                      {renderContent(section.content)}
                    </Box>
                  </Paper>
                );
              })}
            </Box>

            <Paper
              elevation={0}
              sx={{
                mt: { xs: 5, md: 7 },
                position: "relative",
                overflow: "hidden",
                borderRadius: 4,
                p: { xs: 3, sm: 4, md: 5 },
                color: "#FFFFFF",
                background: "linear-gradient(110deg, #07151F 0%, #0D2734 65%, #182F18 100%)",
                boxShadow: "0 20px 50px rgba(7,21,31,0.16)",
              }}
            >
              <Box
                aria-hidden
                sx={{
                  position: "absolute",
                  right: -50,
                  top: -80,
                  width: 190,
                  height: 280,
                  background: "linear-gradient(135deg, rgba(118,153,20,0.9), rgba(187,191,25,0.3))",
                  transform: "rotate(25deg)",
                  opacity: 0.55,
                }}
              />
              <Stack
                direction={{ xs: "column", sm: "row" }}
                alignItems={{ xs: "flex-start", sm: "center" }}
                justifyContent="space-between"
                spacing={3}
                sx={{ position: "relative", zIndex: 1 }}
              >
                <Box sx={{ maxWidth: 700 }}>
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                    <ShieldRounded sx={{ color: "#BBBF19" }} />
                    <Typography sx={{ fontWeight: 800, color: "#BBBF19" }}>
                      {policy.closing.title || "Your Privacy, Our Responsibility"}
                    </Typography>
                  </Stack>
                  <Typography sx={{ color: "rgba(255,255,255,0.78)", fontSize: "0.95rem", lineHeight: 1.8 }}>
                    {policy.closing.text || "At Cloudix Soft, we are committed to protecting your data and ensuring transparency in how we use it. Thank you for trusting us with your information."}
                  </Typography>
                </Box>
                <Button
                  href="/contact"
                  variant="contained"
                  endIcon={<ArrowForwardRounded />}
                  sx={{
                    flexShrink: 0,
                    px: 3,
                    py: 1.25,
                    borderRadius: 50,
                    fontWeight: 800,
                    color: "#07151F",
                    background: "linear-gradient(135deg, #BBBF19, #D4E157)",
                    boxShadow: "0 10px 25px rgba(187,191,25,0.25)",
                    "&:hover": { background: "linear-gradient(135deg, #D4E157, #BBBF19)" },
                  }}
                >
                  Contact Us
                </Button>
              </Stack>
            </Paper>
          </>
        )}
      </Container>
    </Box>
  );
};

export default PrivacyPolicy;
