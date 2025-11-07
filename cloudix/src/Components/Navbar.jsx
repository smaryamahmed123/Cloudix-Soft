import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";
import { NavLink, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import GradientButton from "./GradientButton";
import Logo from "./Logo";
import WhiteLogo from "../../public/logo_white-removebg-preview-removebg-preview.png";
import BlackLogo from "../../public/logo.png";
import SocialIcons from "./SocialIcons";

const navItems = ["Home", "Services", "Portfolio", "About", "Contact"];
const MotionAppBar = motion.create(AppBar);
const MotionButton = motion.create(Button);

const Navbar = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  // ✅ Simplified breakpoints
  const isMobile = useMediaQuery("(max-width:900px)");
  const isDesktop = useMediaQuery("(min-width:901px)");

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);


  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100); // 👈 trigger after 100px scroll
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  return (
    <>
      <MotionAppBar
        position="fixed"
        sx={{
          backgroundColor: scrolled
            ? "rgba(255, 255, 255, 0.98)" // white (slightly transparent)
            : "rgba(255, 255, 255, 0)",   // fully transparent
          color: scrolled ? "#111E2C" : "#ffffff",
          boxShadow: scrolled ? "0 4px 20px rgba(0,0,0,0.1)" : "none",
          backdropFilter: scrolled ? "blur(8px)" : "none",
          transition: "background-color 1s ease, color 1s ease, box-shadow 1s ease",
        }}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
            py: 2,
            px: { xs: 2, sm: 3, md: 4, lg: 6 },
          }}
        >
          {/* ✅ Logo */}
          <Box sx={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
            <Logo
              src={scrolled ? BlackLogo : WhiteLogo}
              size={{ sx: 30, sm: 40, md: 50, lg: 60 }}
            />
          </Box>

          {/* ✅ Desktop Navigation */}
          {isDesktop && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                // gap: 1.5, // 🔸 reduced gap between nav and button
                gap: {
                  sm: 0.3, // tablets
                  md: 0.5,   // medium screens
                  lg: 1.5,   // large screens
                },
                flexWrap: "nowrap",
                flexGrow: 1,
              }}
            >
              {/* Nav Items */}
              <Box
                sx={{
                  display: "flex",
                  // gap: 1.5, // 🔸 reduced gap between nav links
                  gap: {
                    sm: 0.3, // tablets
                    md: 0.5,   // medium screens
                    lg: 1.5,   // large screens
                  },
                  letterSpacing: 2,
                  flexGrow: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  minWidth: 0,
                }}
              >
                {navItems.map((item) => (
                  <MotionButton
                    key={item}
                    component={NavLink}
                    to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                    variant="nav"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    sx={{
                      fontSize: 18,
                      color: scrolled ? "#111E2C" : "#ffffff",
                      transition: "color 0.4s ease",
                      "&.active": {
                        color: theme.palette.primary.main,
                        fontWeight: "bold",
                        position: "relative",
                        "&::after": {
                          content: '""',
                          position: "absolute",
                          bottom: -4,
                          left: "50%",
                          transform: "translateX(-50%)",
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          backgroundColor: theme.palette.primary.main,
                        },
                      },
                    }}
                  >
                    {item}
                  </MotionButton>
                ))}
              </Box>
              {/* ✅ Fixed Button */}
              <Box sx={{ flexShrink: 0 }}>
                <GradientButton
                  text="Let’s Talk"
                  size="small"
                  onClick={() => navigate("/contact")}
                />
              </Box>
            </Box>
          )}

          {/* ✅ Mobile Menu Icon */}
          {isMobile && (
            <IconButton onClick={() => setDrawerOpen(!drawerOpen)}>
              {drawerOpen ? (
                <CloseIcon sx={{ color: scrolled ? "#111E2C" : "#ffffff" }} />
              ) : (
                <MenuIcon sx={{ color: scrolled ? "#111E2C" : "#ffffff" }} />
              )}
            </IconButton>
          )}
        </Toolbar>
      </MotionAppBar>

      {/* ✅ Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ width: 250, p: 2, height: "100%" }}>
          {/* <Typography
            variant="h6"
            sx={{ mb: 2, color: theme.palette.primary.main }}
          >
            {WhiteLogo}
          </Typography> */}
          <Logo
            src={WhiteLogo}
            size={{ sx: 30, sm: 40, md: 50, lg: 60 }}
            mb='500px'
          />
          <List>
            {navItems.map((item) => (
              <ListItem key={item} disablePadding>
                <ListItemButton
                  component={NavLink}
                  to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  onClick={() => setDrawerOpen(false)}
                >
                  <ListItemText primary={item} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <Box sx={{ display: "flex" }}>
            <SocialIcons circle={false} size='small ' />
          </Box>
          <Box sx={{ mt: 2 }}>
            <GradientButton
              text="Let’s Talk"
              size="small"
              onClick={() => {
                setDrawerOpen(false);
                navigate("/contact");
              }}
            />
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
