import React, { memo, useEffect, useState } from "react";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ModernCard from "../Card";
import CardSkeleton from "../CardSkeleton";
import axios from "axios";

const MotionDiv = motion.div;
const backendURL = import.meta.env.VITE_BACKEND_URL || "";

const ContactInfo = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion)");

  const [info, setInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const fetchContactInfo = async () => {
      try {
        const res = await axios.get(`${backendURL}/api/contact-info`, {
          signal: controller.signal,
          timeout: 8000, // ⏱ prevent infinite waiting
        });
        setInfo(res.data || {});
      } catch (err) {
        if (!axios.isCancel(err)) {
          console.error(err);
          setError("Failed to load contact information");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchContactInfo();
    return () => controller.abort();
  }, []);

  const formatWorkingHours = (wh) => {
    if (!wh) return "No hours available";

    const weekday =
      wh.monday?.open && wh.monday?.close
        ? `${wh.monday.open} – ${wh.monday.close}`
        : "Closed";

    const weekend =
      wh.saturday?.open && wh.saturday?.close
        ? `${wh.saturday.open} – ${wh.saturday.close}`
        : "Closed";

    return `Monday – Saturday: ${weekday}\nSunday: Closed `;
  };

  return (
    <MotionDiv
      initial={prefersReducedMotion ? false : { opacity: 0, x: -40 }}
      whileInView={prefersReducedMotion ? false : { opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <Typography
        component="h2"
        variant={isMobile ? "h3" : "h2"}
        gutterBottom
        sx={{ fontWeight: "bold", color: "#769914", textAlign: "center" }}
      >
        Get In Touch
      </Typography>

      {/* Loading */}
      {loading && (
        <Box display="flex" justifyContent="center" gap={2} mt={4}>
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </Box>
      )}

      {/* Error */}
      {!loading && error && (
        <Typography textAlign="center" color="error" mt={4}>
          {error}
        </Typography>
      )}

      {/* No data */}
      {!loading && !error && Object.keys(info).length === 0 && (
        <Typography textAlign="center" mt={4}>
          Contact information not available
        </Typography>
      )}

      {/* Data */}
      {!loading && !error && Object.keys(info).length > 0 && (
        <Box
          display="flex"
          flexWrap="wrap"
          justifyContent="center"
          gap={2}
          mt={4}
        >
          <ModernCard
            variant="contact"
            icon={<PhoneIcon fontSize="inherit" />}
            title="PHONE"
            description={
              <Typography
                component="a"
                href={`tel:${info.phone || ""}`}
                sx={{
                  color: "text.primary",
                  textDecoration: "none",
                  fontSize: "0.95rem",
                  "&:hover": { color: "white" },
                }}
              >
                {info.phone || "Not available"}
              </Typography>
            }
          />

          <ModernCard
            variant="contact"
            icon={<AccessTimeIcon fontSize="inherit" />}
            title="WORKING HOURS"
            description={
              <Typography
                sx={{
                  whiteSpace: "pre-line",
                  textAlign: "center",
                  fontSize: "0.95rem",
                }}
              >
                {formatWorkingHours(info.workingHours)}
              </Typography>
            }
          />

          <ModernCard
            variant="contact"
            icon={<EmailIcon fontSize="inherit" />}
            title="EMAIL"
            description={
              <Typography
                component="a"
                href={`mailto:${info.email || ""}`}
                sx={{
                  color: "text.primary",
                  textDecoration: "none",
                  fontSize: "0.95rem",
                  "&:hover": { color: "white" },
                }}
              >
                {info.email || "Not available"}
              </Typography>
            }
          />
        </Box>
      )}
    </MotionDiv>
  );
};

export default memo(ContactInfo);
