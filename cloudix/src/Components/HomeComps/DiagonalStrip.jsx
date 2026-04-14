// import React, { memo } from "react";
// import { Box, Typography } from "@mui/material";
// import { motion } from "framer-motion";
// import PropTypes from "prop-types";
// import useDevice from "../../hooks/useDevice";

// const MotionDiv = motion.div;

// function DiagonalStrip({
//   texts,
//   bgColor,
//   borderColor,
//   textColor = "#111",
//   angle = 0,
//   position = "0%",
// }) {
//   const { isLandscapeMobile } = useDevice();

//   return (
//     <Box
//       aria-hidden
//       sx={{
//         position: "absolute",
//         // zIndex: 1,
//         bottom: position,
//         left: "-10%",
//         width: "130%",
//         transform: `rotate(${angle}deg)`,
//         bgcolor: bgColor,
//         borderTop: `1px solid ${borderColor}`,
//         borderBottom: `1px solid ${borderColor}`,
//         py: 1,
//         overflow: "hidden",
//         pointerEvents: "none",
//       }}
//     ><MotionDiv
//   initial={{ x: "0%" }}
//   animate={!isLandscapeMobile ? { x: "-50%" } : undefined}
//   transition={{
//     repeat: Infinity,
//     repeatType: "loop",
//     duration: 20,
//     ease: "linear",
//   }}
//   style={{
//     display: "flex",
//     whiteSpace: "nowrap",
//     width: "max-content",
//   }}
// >
//   {/* ✅ Two identical halves — when first half scrolls out, second is identical */}
//   {[...Array(2)].flatMap((_, i) =>
//     [...texts, ...texts, ...texts, ...texts].map((text, index) => (
//       <Typography
//         key={`${i}-${text}-${index}`}
//         sx={{
//           mx: 4,
//           color: textColor,
//           fontWeight: 500,
//           flexShrink: 0,
//         }}
//       >
//         • {text}
//       </Typography>
//     ))
//   )}
// </MotionDiv>
//     </Box>
//   );
// }

// DiagonalStrip.propTypes = {
//   texts: PropTypes.arrayOf(PropTypes.string).isRequired,
//   bgColor: PropTypes.string.isRequired,
//   borderColor: PropTypes.string.isRequired,
//   textColor: PropTypes.string,
//   angle: PropTypes.number,
//   position: PropTypes.string,
// };

// export default memo(DiagonalStrip);










import React, { memo } from "react";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import useDevice from "../../hooks/useDevice";

const MotionDiv = motion.div;

function DiagonalStrip({
  texts,
  bgColor,
  borderColor,
  textColor = "#111",
  angle = 0,
  position = "0%",
  reverse = false,
}) {
  const { isLandscapeMobile } = useDevice();

  // Duplicate texts enough times to fill the strip seamlessly
  const repeated = [...texts, ...texts, ...texts, ...texts, ...texts, ...texts];

  return (
    <Box
      aria-hidden
      sx={{
        position: "absolute",
        bottom: position,
        left: "-25%",
        width: "155%",
        transform: `rotate(${angle}deg)`,
        bgcolor: bgColor,
        borderTop: `1px solid ${borderColor}`,
        borderBottom: `1px solid ${borderColor}`,
        py: { md: 0.7, lg: 1 },
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 8,
      }}
    >
      <MotionDiv
        initial={{ x: reverse ? "-50%" : "0%" }}
        animate={
          !isLandscapeMobile
            ? { x: reverse ? "0%" : "-50%" }
            : undefined
        }
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: 24,
          ease: "linear",
        }}
        style={{
          display: "flex",
          whiteSpace: "nowrap",
          width: "max-content",
        }}
      >
        {/* Two identical halves for seamless infinite loop */}
        {[0, 1].flatMap((_, i, half) =>
          repeated.map((text, index) => (
             <Typography
         key={`${i}-${text}-${index}`}
         sx={{
           mx: { md: 3, lg: 4 },
           color: textColor,
           fontWeight: 400,
           flexShrink: 0,
         }}
       >
         • {text}
       </Typography>
          ))
        )}
      </MotionDiv>
    </Box>
  );
}

DiagonalStrip.propTypes = {
  texts: PropTypes.arrayOf(PropTypes.string).isRequired,
  bgColor: PropTypes.string.isRequired,
  borderColor: PropTypes.string.isRequired,
  textColor: PropTypes.string,
  angle: PropTypes.number,
  position: PropTypes.string,
  reverse: PropTypes.bool,
};

export default memo(DiagonalStrip);
