import React, { useState, useEffect, memo } from "react";
import {
  AppBar, Toolbar, Box, IconButton, Button, Container,  // ✅ add Container
  Drawer, List, ListItem, ListItemButton,
  ListItemText, useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";
import { NavLink, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import GradientButton from "./GradientButton";
import Logo from "./Logo";
import WhiteLogo from "../../public/logo_white-removebg-preview-removebg-preview.webp";
import BlackLogo from "../../public/logo.webp";
import SocialIcons from "./SocialIcons";

const navItems = ["Home", "Services", "Portfolio", "About", "Contact"];
const MotionAppBar = motion.create(AppBar);
const MotionButton = motion.create(Button);

const Navbar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:900px)");
  const isDesktop = useMediaQuery("(min-width:901px)");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <MotionAppBar
        position="fixed"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        sx={{
          backgroundColor: scrolled ? "rgba(255,255,255,0.85)" : "rgba(17,30,44,0.0)",
          backdropFilter: scrolled ? "saturate(180%) blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "saturate(180%) blur(20px)" : "none",
          borderBottom: scrolled ? `0.5px solid rgba(0,0,0,0.12)` : "none",
          boxShadow: "none",
          transition: "background-color 0.4s ease, border-bottom 0.4s ease",
        }}
      >
        {/* ✅ Toolbar with no padding — Container handles spacing */}
        <Toolbar sx={{ p: "0 !important", minHeight: { xs: 52, md: 60 } }}>
          <Container
            maxWidth="lg"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              py: 1.5,
            }}
          >
            {/* Logo */}
            <Box sx={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
              <Logo
                src={scrolled ? BlackLogo : WhiteLogo}
                size={{ xs: 30, sm: 40, md: 50, lg: 60 }}
              />
            </Box>

            {/* Desktop Nav */}
            {isDesktop && (
              <Box sx={{ display: "flex", alignItems: "center", gap: { sm: 0.3, md: 0.5, lg: 1.5 }, flexGrow: 1, justifyContent: "flex-end" }}>
                <Box sx={{ display: "flex", gap: { sm: 0.3, md: 0.5, lg: 1.5 }, flexGrow: 1, justifyContent: "center", alignItems: "center" }}>
                  {navItems.map((item) => (
                    <MotionButton
                      key={item}
                      component={NavLink}
                      to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                      variant="nav"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      sx={{
                        fontSize: { md: 15, lg: 17 },
                        fontWeight: 400,
                        letterSpacing: "-0.01em",
                        color: scrolled ? theme.palette.primary.dark : "rgba(255,255,255,0.92)",
                        transition: "color 0.3s ease",
                        textTransform: "none",
                        px: 1.5,
                        "&.active": {
                          fontWeight: 500,
                          color: theme.palette.primary.main,
                          position: "relative",
                          "&::after": {
                            content: '""',
                            position: "absolute",
                            bottom: 2,
                            left: "50%",
                            transform: "translateX(-50%)",
                            width: 4,
                            height: 4,
                            borderRadius: "50%",
                            backgroundColor: theme.palette.primary.main,
                          },
                        },
                        "&:hover": {
                          background: "transparent",
                          color: theme.palette.primary.main,
                        },
                      }}
                    >
                      {item}
                    </MotionButton>
                  ))}
                </Box>

                <Box sx={{ flexShrink: 0, ml: 1 }}>
                  <GradientButton
                    text="Let's Talk"
                    size="small"
                    onClick={() => navigate("/contact")}
                  />
                </Box>
              </Box>
            )}

            {/* Mobile hamburger */}
            {isMobile && (
              <IconButton
                onClick={() => setDrawerOpen(!drawerOpen)}
                sx={{ color: scrolled ? theme.palette.primary.dark : "#fff" }}
              >
                {drawerOpen ? <CloseIcon /> : <MenuIcon />}
              </IconButton>
            )}
          </Container>
        </Toolbar>
      </MotionAppBar>

      {/* Mobile Drawer — unchanged */}
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box
          sx={{
            width: 260,
            p: 2.5,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 1,
            backgroundColor: "rgba(255,255,255,0.95)",
            backdropFilter: "saturate(180%) blur(20px)",
          }}
        >
          <Logo src={BlackLogo} size={{ xs: 30, sm: 40 }} />

          <List sx={{ mt: 2, flexGrow: 1 }}>
            {navItems.map((item, i) => (
              <ListItem key={item} disablePadding>
                <ListItemButton
                  component={NavLink}
                  to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  onClick={() => setDrawerOpen(false)}
                  sx={{
                    mb: 0.5,
                    fontSize: 16,
                    fontWeight: 400,
                    letterSpacing: "-0.01em",
                    color: theme.palette.primary.dark,
                    borderRadius: 0,
                    borderBottom: i < navItems.length - 1
                      ? `0.5px solid rgba(0,0,0,0.08)`
                      : "none",
                    "&.active": {
                      backgroundColor: `${theme.palette.secondary.main}22`,
                      color: theme.palette.primary.main,
                      fontWeight: 500,
                    },
                    "&:hover": {
                      backgroundColor: `${theme.palette.primary.dark}08`,
                    },
                  }}
                >
                  <ListItemText
                    primary={item}
                    primaryTypographyProps={{ fontSize: 16, fontWeight: "inherit", letterSpacing: "-0.01em" }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
            <SocialIcons circle={false} size="small" />
          </Box>

          <GradientButton
            text="Let's Talk"
            size="small"
            onClick={() => { setDrawerOpen(false); navigate("/contact"); }}
          />
        </Box>
      </Drawer>
    </>
  );
};

export default memo(Navbar);
