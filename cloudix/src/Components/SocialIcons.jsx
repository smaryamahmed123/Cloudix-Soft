import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Box, IconButton, useMediaQuery, useTheme } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { getContactInfo } from "../utils/contactInfo";

const ICONS = [
  { name: "instagram", label: "Instagram", Icon: InstagramIcon },
  { name: "facebook", label: "Facebook", Icon: FacebookIcon },
  { name: "twitter", label: "X (Twitter)", Icon: TwitterIcon },
  { name: "youtube", label: "YouTube", Icon: YouTubeIcon },
  { name: "linkedin", label: "LinkedIn", Icon: LinkedInIcon },
];

const iconSizes = { small: 20, medium: 32, large: 45 };
const buttonSizes = { small: 36, medium: 50, large: 64 };

const SocialIcons = ({ color = "#769914", size = "large", circle = true }) => {
  const [socialLinks, setSocialLinks] = useState({});
  const theme = useTheme();

  const isXs = useMediaQuery(theme.breakpoints.down("sm"));
  const isSm = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isMd = useMediaQuery(theme.breakpoints.between("md", "lg"));
  const isLg = useMediaQuery(theme.breakpoints.up("lg"));

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

  useEffect(() => {
    let active = true;
    getContactInfo()
      .then((info) => {
        if (active) setSocialLinks(info?.socialLinks || {});
      })
      .catch((err) => console.error("Failed to fetch social links", err));
    return () => {
      active = false;
    };
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        gap: circle ? 2 : 1.5,
      }}
    >
      {ICONS.map(({ name, label, Icon }) =>
        socialLinks[name] ? (
          <IconButton
            key={name}
            href={socialLinks[name]}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Cloudix Soft on ${label}`}
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