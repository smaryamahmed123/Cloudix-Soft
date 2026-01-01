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
        borderTop: `1px solid ${borderColor}`,
        borderBottom: `1px solid ${borderColor}`,
        py: 1,
        overflow: "hidden",
      }}
    >
      <Box sx={{ display: "flex", width: "fit-content" }}>
        {[0, 1].map((_, loopIndex) => (
          <Motion.div
            key={loopIndex}
            initial={{ x: "0%" }}
            animate={!isLandscapeMobile ? { x: "-100%" } : false}
            transition={{
              duration: 20,
              ease: "linear",
              repeat: Infinity,
            }}
            style={{
              display: "flex",
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            {texts.map((t, i) => (
              <Typography
                key={`${loopIndex}-${i}`}
                sx={{
                  mx: 4,
                  color: textColor,
                  fontWeight: 500,
                  flexShrink: 0,
                }}
              >
                • {t}
              </Typography>
            ))}
          </Motion.div>
        ))}
      </Box>
    </Box>
  );
}
