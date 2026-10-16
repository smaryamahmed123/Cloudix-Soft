import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Container, Typography, Skeleton } from "@mui/material";
import { motion } from "framer-motion";

import LanguageIcon from "@mui/icons-material/Language";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CampaignIcon from "@mui/icons-material/Campaign";
import PaletteIcon from "@mui/icons-material/Palette";
import CodeIcon from "@mui/icons-material/Code";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";

import { fetchServices, selectVisibleServices } from "../../redux/servicesSlice";

const MotionBox = motion.create(Box);

const LIMIT = 6;

// Ordered: first match wins. Matched against the service title.
const ICON_RULES = [
  [/web/i, LanguageIcon],
  [/mobile|app/i, SmartphoneIcon],
  [/commerce|shop|store/i, ShoppingCartIcon],
  [/marketing|seo|social/i, CampaignIcon],
  [/brand|design|ui|ux|creative/i, PaletteIcon],
  [/software|custom|development/i, CodeIcon],
];

const getIcon = (service) => {
  const text = service.title || service.name || "";
  const match = ICON_RULES.find(([re]) => re.test(text));
  return match ? match[1] : MiscellaneousServicesIcon;
};

const ContactServices = () => {
  const dispatch = useDispatch();
  const { loading, fetched, error } = useSelector((s) => s.services);
  const services = useSelector(selectVisibleServices).slice(0, LIMIT);

  useEffect(() => {
    if (!fetched && !loading) dispatch(fetchServices());
  }, [dispatch, fetched, loading]);

  return (
    <Box
      sx={{
        py: { xs: 7, md: 10 },
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
              fontSize: { xs: "2rem", md: "3rem" },
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
          {loading &&
            [...Array(LIMIT)].map((_, i) => (
              <Skeleton key={i} variant="rounded" height={190} />
            ))}

          {!loading && error && (
            <Typography
              sx={{
                gridColumn: "1 / -1",
                textAlign: "center",
                color: "text.secondary",
              }}
            >
              Services couldn't be loaded. You can still reach us through the form.
            </Typography>
          )}

          {!loading &&
            services.map((service, index) => {
              const Icon = getIcon(service);

              return (
                <MotionBox
                  key={service._id || service.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.07 }}
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    border: "1px solid rgba(17,30,44,0.08)",
                    backgroundColor: "#fff",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-6px)",
                      borderColor: "#769914",
                      boxShadow: "0 15px 40px rgba(17,30,44,0.09)",
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
                      backgroundColor: "rgba(118,153,20,0.1)",
                      "& svg": { fontSize: 27 },
                    }}
                  >
                    <Icon />
                  </Box>

                  <Typography
                    sx={{
                      fontWeight: 700,
                      color: "#111E2C",
                      fontSize: "1.1rem",
                      mb: 1,
                    }}
                  >
                    {service.title || service.name}
                  </Typography>

                  <Typography
                    sx={{
                      color: "text.secondary",
                      lineHeight: 1.6,
                      fontSize: "0.92rem",
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {service.shortDescription || service.description}
                  </Typography>
                </MotionBox>
              );
            })}
        </Box>
      </Container>
    </Box>
  );
};

export default ContactServices;