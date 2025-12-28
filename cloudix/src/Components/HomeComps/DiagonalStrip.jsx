import { Box, Typography } from "@mui/material";
import { motion as Motion } from "framer-motion";
import useDevice from "../../hooks/useDevice";

export default function DiagonalStrip({
  texts,
  bgColor,
  borderColor,
  textColor = "#111",
  angle,
  position,
}) {
  const { isLandscapeMobile } = useDevice();

  return (
    <Box
      sx={{
        position: "absolute",
        bottom: position,
        left: "-10%",
        width: "130%",
        transform: `rotate(${angle}deg)`,
        bgcolor: bgColor,
        borderColor: borderColor,
        py: 1,
        overflow: "hidden",
      }}
    >
      <Motion.div
        animate={!isLandscapeMobile ? { x: ["0%", "-50%"] } : false}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        style={{ display: "flex", whiteSpace: "nowrap" }}
      >
        {texts.concat(texts).map((t, i) => (
          <Typography key={i} sx={{ mx: 4, color: textColor }}>
            • {t}
          </Typography>
        ))}
      </Motion.div>
    </Box>
  );
}
