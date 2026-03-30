// import { Box, Typography } from "@mui/material";
// import { motion as Motion } from "framer-motion";
// import useDevice from "../../hooks/useDevice";

// export default function DiagonalStrip({
//   texts,
//   bgColor,
//   borderColor,
//   textColor = "#111",
//   angle,
//   position,
// }) {
//   const { isLandscapeMobile } = useDevice();

//   return (
//     <Box
//       sx={{
//         position: "absolute",
//         bottom: position,
//         left: "-10%",
//         width: "130%",
//         transform: `rotate(${angle}deg)`,
//         bgcolor: bgColor,
//         borderTop: `1px solid ${borderColor}`,
//         borderBottom: `1px solid ${borderColor}`,
//         py: 1,
//         overflow: "hidden",
//       }}
//     >
//       <Motion.div
//         initial={{ x: "0%" }}
//         animate={!isLandscapeMobile ? { x: "-50%" } : false}
//         transition={{
//           repeat: Infinity,
//           repeatType: "loop",
//           duration: 20,
//           ease: "linear",
//         }}
//         style={{
//           display: "flex",
//           whiteSpace: "nowrap",
//           width: "max-content",
//         }}
//       >
//         {/* Duplicate content 3 times to avoid gaps */}
//         {[...texts, ...texts, ...texts].map((t, i) => (
//           <Typography
//             key={i}
//             sx={{
//               mx: 4,
//               color: textColor,
//               fontWeight: 500,
//               flexShrink: 0,
//             }}
//           >
//             • {t}
//           </Typography>
//         ))}
//       </Motion.div>
//     </Box>
//   );
// }



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
}) {
  const { isLandscapeMobile } = useDevice();

  return (
    <Box
      aria-hidden
      sx={{
        position: "absolute",
        zIndex: 2,
        bottom: position,
        left: "-10%",
        width: "130%",
        transform: `rotate(${angle}deg)`,
        bgcolor: bgColor,
        borderTop: `1px solid ${borderColor}`,
        borderBottom: `1px solid ${borderColor}`,
        py: 1,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      <MotionDiv
        initial={{ x: "0%" }}
        animate={!isLandscapeMobile ? { x: "-50%" } : undefined}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: 20,
          ease: "linear",
        }}
        style={{
          display: "flex",
          whiteSpace: "nowrap",
          width: "max-content",
        }}
      >
        {[...texts, ...texts, ...texts].map((text, index) => (
          <Typography
            key={`${text}-${index}`}
            sx={{
              mx: 4,
              color: textColor,
              fontWeight: 500,
              flexShrink: 0,
            }}
          >
            • {text}
          </Typography>
        ))}
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
};

export default memo(DiagonalStrip);
