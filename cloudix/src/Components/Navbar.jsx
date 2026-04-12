// import React, { useEffect, useState } from "react";
// import {
//   AppBar,
//   Toolbar,
//   Box,
//   IconButton,
//   Button,
//   Drawer,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemText,
//   Typography,
//   useMediaQuery,
// } from "@mui/material";
// import { useTheme } from "@mui/material/styles";
// import { motion } from "framer-motion";
// import { NavLink, useNavigate } from "react-router-dom";
// import MenuIcon from "@mui/icons-material/Menu";
// import CloseIcon from "@mui/icons-material/Close";
// import GradientButton from "./GradientButton";
// import Logo from "./Logo";
// import WhiteLogo from "../../public/logo_white-removebg-preview-removebg-preview.webp";
// import BlackLogo from "../../public/logo.webp";
// import SocialIcons from "./SocialIcons";

// const navItems = ["Home", "Services", "Portfolio", "About", "Contact"];
// const MotionAppBar = motion.create(AppBar);
// const MotionButton = motion.create(Button);

// const Navbar = () => {
//   const theme = useTheme();
//   const navigate = useNavigate();

//   // ✅ Simplified breakpoints
//   const isMobile = useMediaQuery("(max-width:900px)");
//   const isDesktop = useMediaQuery("(min-width:901px)");

//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);


//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 100); // 👈 trigger after 100px scroll
//     };

//     handleScroll();

//     window.addEventListener("scroll", handleScroll);
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);


//   return (
//     <>
//       <MotionAppBar
//         position="fixed"
//         sx={{
//           backgroundColor: scrolled
//             ? "rgba(255, 255, 255, 0.98)" // white (slightly transparent)
//             : "rgba(255, 255, 255, 0)",   // fully transparent
//           color: scrolled ? "#111E2C" : "#ffffff",
//           boxShadow: scrolled ? "0 4px 20px rgba(0,0,0,0.1)" : "none",
//           backdropFilter: scrolled ? "blur(8px)" : "none",
//           transition: "background-color 1s ease, color 1s ease, box-shadow 1s ease",
//         }}
//         initial={{ y: -100, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.6, ease: "easeOut" }}
//       >
//         <Toolbar
//           sx={{
//             justifyContent: "space-between",
//             py: 2,
//             px: { xs: 2, sm: 3, md: 4, lg: 6 },
//           }}
//         >
//           {/* ✅ Logo */}
//           <Box sx={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
//             <Logo
//               src={scrolled ? BlackLogo : WhiteLogo}
//               size={{ sx: 30, sm: 40, md: 50, lg: 60 }}
//             />
//           </Box>

//           {/* ✅ Desktop Navigation */}
//           {isDesktop && (
//             <Box
//               sx={{
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "flex-end",
//                 // gap: 1.5, // 🔸 reduced gap between nav and button
//                 gap: {
//                   sm: 0.3, // tablets
//                   md: 0.5,   // medium screens
//                   lg: 1.5,   // large screens
//                 },
//                 flexWrap: "nowrap",
//                 flexGrow: 1,
//               }}
//             >
//               {/* Nav Items */}
//               <Box
//                 sx={{
//                   display: "flex",
//                   // gap: 1.5, // 🔸 reduced gap between nav links
//                   gap: {
//                     sm: 0.3, // tablets
//                     md: 0.5,   // medium screens
//                     lg: 1.5,   // large screens
//                   },
//                   letterSpacing: 2,
//                   flexGrow: 1,
//                   justifyContent: "center",
//                   alignItems: "center",
//                   minWidth: 0,
//                 }}
//               >
//                 {navItems.map((item) => (
//                   <MotionButton
//                     key={item}
//                     component={NavLink}
//                     to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
//                     variant="nav"
//                     whileHover={{ scale: 1.1 }}
//                     whileTap={{ scale: 0.95 }}
//                     sx={{
//                       fontSize: 18,
//                       color: scrolled ? "#111E2C" : "#ffffff",
//                       fontWeight: 500,
//                       transition: "color 0.4s ease",
//                       "&.active": {
//                         transform: "scale(1.05)",
//                         color: theme.palette.primary.main,
//                         fontWeight: 700,
//                         position: "relative",
//                         "&::after": {
//                           content: '""',
//                           position: "absolute",
//                           bottom: -4,
//                           left: "50%",
//                           transform: "translateX(-50%)",
//                           width: 6,
//                           height: 6,
//                           borderRadius: "50%",
//                           backgroundColor: theme.palette.primary.main,
//                         },
//                       },
//                     }}
//                   >
//                     {item}
//                   </MotionButton>
//                 ))}
//               </Box>
//               {/* ✅ Fixed Button */}
//               <Box sx={{ flexShrink: 0 }}>
//                 <GradientButton
//                   text="Let’s Talk"
//                   size="small"
//                   onClick={() => navigate("/contact")}
//                 />
//               </Box>
//             </Box>
//           )}

//           {/* ✅ Mobile Menu Icon */}
//           {isMobile && (
//             <IconButton onClick={() => setDrawerOpen(!drawerOpen)}>
//               {drawerOpen ? (
//                 <CloseIcon sx={{ color: scrolled ? "#111E2C" : "#ffffff" }} />
//               ) : (
//                 <MenuIcon sx={{ color: scrolled ? "#111E2C" : "#ffffff" }} />
//               )}
//             </IconButton>
//           )}
//         </Toolbar>
//       </MotionAppBar>

//       {/* ✅ Mobile Drawer */}
//       <Drawer
//         anchor="right"
//         open={drawerOpen}
//         onClose={() => setDrawerOpen(false)}
//       >
//         <Box sx={{ width: 250, p: 2, height: "100%" }}>
//           <Logo
//             src={WhiteLogo}
//             size={{ sx: 30, sm: 40, md: 50, lg: 60 }}
//             mb='500px'
//           />
//           <List>
//             {navItems.map((item) => (
//               <ListItem key={item} disablePadding>
//                 <ListItemButton
//                   component={NavLink}
//                   to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
//                   onClick={() => setDrawerOpen(false)}
//                 >
//                   <ListItemText primary={item} />
//                 </ListItemButton>
//               </ListItem>
//             ))}
//           </List>

//           <Box sx={{ display: "flex" }}>
//             <SocialIcons circle={false} size='small ' />
//           </Box>
//           <Box sx={{ mt: 2 }}>
//             <GradientButton
//               text="Let’s Talk"
//               size="small"
//               onClick={() => {
//                 setDrawerOpen(false);
//                 navigate("/contact");
//               }}
//             />
//           </Box>
//         </Box>
//       </Drawer>
//     </>
//   );
// };

// export default Navbar;












import React, { useState, useEffect, memo } from "react";
import {
  AppBar, Toolbar, Box, IconButton, Button,
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
          backgroundColor: scrolled
            ? "rgba(255,255,255,0.85)"
            : "rgba(17,30,44,0.0)",
          backdropFilter: scrolled ? "saturate(180%) blur(20px)" : "none",  // ✅ Apple-style blur
          WebkitBackdropFilter: scrolled ? "saturate(180%) blur(20px)" : "none",
          borderBottom: scrolled
            ? `0.5px solid rgba(0,0,0,0.12)`                               // ✅ Apple thin separator
            : "none",
          boxShadow: "none",                                                 // ✅ no shadow — Apple style
          transition: "background-color 0.4s ease, border-bottom 0.4s ease",
        }}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
            py: 1.5,
            px: { xs: 2, sm: 3, md: 4, lg: 6 },
            minHeight: { xs: 52, md: 60 },                                   // ✅ Apple navbar height
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
                      fontWeight: 400,                                        // ✅ Apple uses regular weight
                      letterSpacing: "-0.01em",                              // ✅ Apple tight tracking
                      color: scrolled
                        ? theme.palette.primary.dark
                        : "rgba(255,255,255,0.92)",
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

              {/* CTA Button */}
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
        </Toolbar>
      </MotionAppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box
          sx={{
            width: 260,
            p: 2.5,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 1,
            backgroundColor: "rgba(255,255,255,0.95)",                       // ✅ frosted drawer
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
                    borderRadius: "10px",
                    mb: 0.5,
                    fontSize: 16,
                    fontWeight: 400,
                    letterSpacing: "-0.01em",
                    color: theme.palette.primary.dark,
                    "&.active": {
                      backgroundColor: `${theme.palette.secondary.main}22`,
                      color: theme.palette.primary.main,
                      fontWeight: 500,
                    },
                    "&:hover": {
                      backgroundColor: `${theme.palette.primary.dark}08`,
                    },
                    // ✅ Apple-style thin divider between items
                    borderBottom: i < navItems.length - 1
                      ? `0.5px solid rgba(0,0,0,0.08)`
                      : "none",
                    borderRadius: 0,
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

          <Box sx={{ display: "flex", mb: 1 }}>
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
