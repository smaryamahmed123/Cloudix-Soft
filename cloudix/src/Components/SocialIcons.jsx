// import React, { useEffect, useState } from "react";
// import { Box, IconButton, useMediaQuery, useTheme } from "@mui/material";
// import { Instagram, Facebook, Twitter, YouTube, LinkedIn } from "@mui/icons-material";
// import axios from "axios";
// const backendURL = import.meta.env.VITE_BACKEND_URL;
// const SocialIcons = ({ color = "#769914", size = "large", circle = true }) => {
//   const [socialLinks, setSocialLinks] = useState({});
//   const theme = useTheme();

//   // ✅ map sizes for icons & buttons
//   const iconSizes = { small: 20, medium: 32, large: 45 };
//   const buttonSizes = { small: 36, medium: 50, large: 64 };

//   // ✅ media queries at top level
//   const isXs = useMediaQuery(theme.breakpoints.down("sm"));
//   const isSm = useMediaQuery(theme.breakpoints.between("sm", "md"));
//   const isMd = useMediaQuery(theme.breakpoints.between("md", "lg"));
//   const isLg = useMediaQuery(theme.breakpoints.up("lg"));

//   // ✅ resolve size safely
//   let finalSize = "medium";
//   if (typeof size === "string") {
//     finalSize = size;
//   } else if (typeof size === "object") {
//     if (isXs) finalSize = size.xs || "small";
//     else if (isSm) finalSize = size.sm || "medium";
//     else if (isMd) finalSize = size.md || "medium";
//     else if (isLg) finalSize = size.lg || "large";
//   }

//   useEffect(() => {
//     const fetchLinks = async () => {
//       try {
//         const res = await axios.get(`${backendURL}/api/contact-info`);
//         if (res.data?.socialLinks) {
//           setSocialLinks(res.data.socialLinks);
//         }
//       } catch (err) {
//         console.error("Failed to fetch social links", err);
//       }
//     };
//     fetchLinks();
//   }, []);

//   const icons = [
//     { name: "instagram", icon: <Instagram sx={{ fontSize: iconSizes[finalSize] }} /> },
//     { name: "facebook", icon: <Facebook sx={{ fontSize: iconSizes[finalSize] }} /> },
//     { name: "twitter", icon: <Twitter sx={{ fontSize: iconSizes[finalSize] }} /> },
//     { name: "youtube", icon: <YouTube sx={{ fontSize: iconSizes[finalSize] }} /> },
//     { name: "linkedin", icon: <LinkedIn sx={{ fontSize: iconSizes[finalSize] }} /> },
//   ];

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         justifyContent: "center",
//         gap: circle ? 2 : 1.5,
//       }}
//     >
//       {icons.map(({ name, icon }) =>
//         socialLinks[name] ? (
//           <IconButton
//             key={name}
//             href={socialLinks[name]}
//             target="_blank"
//             rel="noopener noreferrer"
//             sx={{
//               width: buttonSizes[finalSize],
//               height: buttonSizes[finalSize],
//               borderRadius: circle ? "50%" : "8px",
//               backgroundColor: circle ? "#f9f9f9" : "transparent",
//               transition: "all 0.3s ease",
//               "&:hover": {
//                 backgroundColor: circle ? "#e0e0e0" : "transparent",
//                 transform: "scale(1.1)",
//               },
//               "& svg": {
//                 color,
//               },
//             }}
//           >
//             {icon}
//           </IconButton>
//         ) : null
//       )}
//     </Box>
//   );
// };

// export default SocialIcons;


import React, { useEffect, useState, useCallback, Suspense, lazy } from "react";
import PropTypes from "prop-types";
import { Box, IconButton, useMediaQuery, useTheme, CircularProgress } from "@mui/material";
import axios from "axios";

const backendURL = import.meta.env.VITE_BACKEND_URL;

// Lazy-loaded icons
const LazyInstagram = lazy(() => import("@mui/icons-material/Instagram"));
const LazyFacebook = lazy(() => import("@mui/icons-material/Facebook"));
const LazyTwitter = lazy(() => import("@mui/icons-material/Twitter"));
const LazyYouTube = lazy(() => import("@mui/icons-material/YouTube"));
const LazyLinkedIn = lazy(() => import("@mui/icons-material/LinkedIn"));

const SocialIcons = ({ color = "#769914", size = "large", circle = true }) => {
  const [socialLinks, setSocialLinks] = useState({});
  const theme = useTheme();

  // Media queries
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));
  const isSm = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isMd = useMediaQuery(theme.breakpoints.between("md", "lg"));
  const isLg = useMediaQuery(theme.breakpoints.up("lg"));

  // Icon & button sizes
  const iconSizes = { small: 20, medium: 32, large: 45 };
  const buttonSizes = { small: 36, medium: 50, large: 64 };

  // Resolve responsive size
  const finalSize = (() => {
    if (typeof size === "string") return size;
    if (typeof size === "object") {
      if (isXs) return size.xs || "small";
      if (isSm) return size.sm || "medium";
      if (isMd) return size.md || "medium";
      if (isLg) return size.lg || "large";
    }
    return "medium";
  })();

  // Fetch and cache social links
  const fetchLinks = useCallback(async () => {
    if (!backendURL) {
      console.warn("VITE_BACKEND_URL not defined");
      return;
    }

    // Try localStorage first
    const cached = localStorage.getItem("socialLinks");
    if (cached) {
      setSocialLinks(JSON.parse(cached));
      return;
    }

    try {
      const res = await axios.get(`${backendURL}/api/contact-info`);
      if (res.data?.socialLinks) {
        setSocialLinks(res.data.socialLinks);
        localStorage.setItem("socialLinks", JSON.stringify(res.data.socialLinks));
      }
    } catch (err) {
      console.error("Failed to fetch social links", err);
    }
  }, []);

  useEffect(() => {
    fetchLinks();
  }, [fetchLinks]);

  // Icons config
  const icons = [
    { name: "instagram", IconComponent: LazyInstagram },
    { name: "facebook", IconComponent: LazyFacebook },
    { name: "twitter", IconComponent: LazyTwitter },
    { name: "youtube", IconComponent: LazyYouTube },
    { name: "linkedin", IconComponent: LazyLinkedIn },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        gap: circle ? 2 : 1.5,
      }}
    >
      {/* {icons.map(({ name, IconComponent: Icon }) =>
        socialLinks[name] ? (
          <Suspense
            key={name}
            fallback={
              <IconButton
                sx={{
                  width: buttonSizes[finalSize],
                  height: buttonSizes[finalSize],
                  borderRadius: circle ? "50%" : "8px",
                  backgroundColor: circle ? "#f9f9f9" : "transparent",
                }}
              >
                <CircularProgress size={iconSizes[finalSize]} />
              </IconButton>
            }
          >
            <IconButton
              href={socialLinks[name]}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                width: buttonSizes[finalSize],
                height: buttonSizes[finalSize],
                borderRadius: circle ? "50%" : "8px",
                backgroundColor: circle ? "#f9f9f9" : "transparent",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: circle ? "#e0e0e0" : "transparent",
                  transform: "scale(1.1)",
                },
                "& svg": { color },
              }}
            >
              <Icon sx={{ fontSize: iconSizes[finalSize] }} />
            </IconButton>
          </Suspense>
        ) : null
      )} */}
      {icons.map((item) =>
        socialLinks[item.name] ? (
          <Suspense
            key={item.name}
            fallback={
              <IconButton
                sx={{
                  width: buttonSizes[finalSize],
                  height: buttonSizes[finalSize],
                  borderRadius: circle ? "50%" : "8px",
                  backgroundColor: circle ? "#f9f9f9" : "transparent",
                }}
              >
                <CircularProgress size={iconSizes[finalSize]} />
              </IconButton>
            }
          >
            <IconButton
              href={socialLinks[item.name]}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                width: buttonSizes[finalSize],
                height: buttonSizes[finalSize],
                borderRadius: circle ? "50%" : "8px",
                backgroundColor: circle ? "#f9f9f9" : "transparent",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: circle ? "#e0e0e0" : "transparent",
                  transform: "scale(1.1)",
                },
                "& svg": { color },
              }}
            >
              {/* Use a variable inside JSX */}
              {React.createElement(item.IconComponent, { sx: { fontSize: iconSizes[finalSize] } })}
            </IconButton>
          </Suspense>
        ) : null
      )}  
    </Box>
  );
};

SocialIcons.propTypes = {
  color: PropTypes.string,
  size: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      xs: PropTypes.string,
      sm: PropTypes.string,
      md: PropTypes.string,
      lg: PropTypes.string,
    }),
  ]),
  circle: PropTypes.bool,
};

export default SocialIcons;
