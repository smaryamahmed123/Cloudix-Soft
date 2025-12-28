// hooks/useDevice.js
import { useTheme, useMediaQuery } from "@mui/material";

export default function useDevice() {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

  const isLandscapeMobile = useMediaQuery(
    "(max-width: 900px) and (orientation: landscape)"
  );

  return {
    isMobile,
    isTablet,
    isDesktop,
    isLandscapeMobile,
  };
}
