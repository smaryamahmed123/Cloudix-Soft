// // import React, { memo } from "react";
// // import { Box, Typography } from "@mui/material";
// // import { motion } from "framer-motion";
// // import PropTypes from "prop-types";
// // import useDevice from "../../hooks/useDevice";

// // const MotionDiv = motion.div;

// // function DiagonalStrip({
// //   texts,
// //   bgColor,
// //   borderColor,
// //   textColor = "#111",
// //   angle = 0,
// //   position = "0%",
// // }) {
// //   const { isLandscapeMobile } = useDevice();

// //   return (
// //     <Box
// //       aria-hidden
// //       sx={{
// //         position: "absolute",
// //         // zIndex: 1,
// //         bottom: position,
// //         left: "-10%",
// //         width: "130%",
// //         transform: `rotate(${angle}deg)`,
// //         bgcolor: bgColor,
// //         borderTop: `1px solid ${borderColor}`,
// //         borderBottom: `1px solid ${borderColor}`,
// //         py: 1,
// //         overflow: "hidden",
// //         pointerEvents: "none",
// //       }}
// //     ><MotionDiv
// //   initial={{ x: "0%" }}
// //   animate={!isLandscapeMobile ? { x: "-50%" } : undefined}
// //   transition={{
// //     repeat: Infinity,
// //     repeatType: "loop",
// //     duration: 20,
// //     ease: "linear",
// //   }}
// //   style={{
// //     display: "flex",
// //     whiteSpace: "nowrap",
// //     width: "max-content",
// //   }}
// // >
// //   {/* ✅ Two identical halves — when first half scrolls out, second is identical */}
// //   {[...Array(2)].flatMap((_, i) =>
// //     [...texts, ...texts, ...texts, ...texts].map((text, index) => (
// //       <Typography
// //         key={`${i}-${text}-${index}`}
// //         sx={{
// //           mx: 4,
// //           color: textColor,
// //           fontWeight: 500,
// //           flexShrink: 0,
// //         }}
// //       >
// //         • {text}
// //       </Typography>
// //     ))
// //   )}
// // </MotionDiv>
// //     </Box>
// //   );
// // }

// // DiagonalStrip.propTypes = {
// //   texts: PropTypes.arrayOf(PropTypes.string).isRequired,
// //   bgColor: PropTypes.string.isRequired,
// //   borderColor: PropTypes.string.isRequired,
// //   textColor: PropTypes.string,
// //   angle: PropTypes.number,
// //   position: PropTypes.string,
// // };

// // export default memo(DiagonalStrip);










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
//   reverse = false,
// }) {
//   const { isLandscapeMobile } = useDevice();

//   // Duplicate texts enough times to fill the strip seamlessly
//   const repeated = [...texts, ...texts, ...texts, ...texts, ...texts, ...texts];

//   return (
//     <Box
//       aria-hidden
//       sx={{
//         position: "absolute",
//         bottom: position,
//         left: "-25%",
//         width: "155%",
//         transform: `rotate(${angle}deg)`,
//         bgcolor: bgColor,
//         borderTop: `1px solid ${borderColor}`,
//         borderBottom: `1px solid ${borderColor}`,
//         py: { md: 0.7, lg: 1 },
//         overflow: "hidden",
//         pointerEvents: "none",
//         zIndex: 8,
//       }}
//     >
//       <MotionDiv
//         initial={{ x: reverse ? "-50%" : "0%" }}
//         animate={
//           !isLandscapeMobile
//             ? { x: reverse ? "0%" : "-50%" }
//             : undefined
//         }
//         transition={{
//           repeat: Infinity,
//           repeatType: "loop",
//           duration: 24,
//           ease: "linear",
//         }}
//         style={{
//           display: "flex",
//           whiteSpace: "nowrap",
//           width: "max-content",
//         }}
//       >
//         {/* Two identical halves for seamless infinite loop */}
//         {[0, 1].flatMap((_, i, half) =>
//           repeated.map((text, index) => (
//              <Typography
//          key={`${i}-${text}-${index}`}
//          sx={{
//            mx: { md: 3, lg: 4 },
//            color: textColor,
//            fontWeight: 400,
//            flexShrink: 0,
//          }}
//        >
//          • {text}
//        </Typography>
//           ))
//         )}
//       </MotionDiv>
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
//   reverse: PropTypes.bool,
// };

// export default memo(DiagonalStrip);














import React, { memo } from "react";
import { Box, Typography, useTheme } from "@mui/material";
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
  const theme = useTheme();
  const { isLandscapeMobile } = useDevice();

  // Repeat enough copies for a seamless infinite loop
  const repeated = [
    ...texts, ...texts, ...texts,
    ...texts, ...texts, ...texts,
  ];

  return (
    <Box
      aria-hidden
      sx={{
        position: "absolute",
        bottom: position,
        // Extend beyond viewport edges so rotation doesn't reveal gaps
        left: "-30%",
        width: "160%",
        transform: `rotate(${angle}deg)`,
        bgcolor: bgColor,
        borderTop: `1.5px solid ${borderColor}`,
        borderBottom: `1.5px solid ${borderColor}`,
        // Use theme spacing — consistent with the rest of the app
        py: theme.spacing(1),
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
          duration: 25,
          ease: "linear",
        }}
        style={{
          display: "flex",
          whiteSpace: "nowrap",
          width: "max-content",
        }}
      >
        {/* Two identical halves — second half ensures seamless loop */}
        {[0, 1].flatMap((half) =>
          repeated.map((text, index) => (
            <Typography
              key={`${half}-${index}`}
              sx={{
                // Use theme spacing for margin — no magic px values
                mx: theme.spacing(3.5),
                color: textColor,
                fontWeight: 600,
                // Tied to theme body2 size — scales with responsiveFontSizes
                fontSize: {
                  md: theme.typography.body2.fontSize ?? "0.875rem",
                  lg: theme.typography.body1.fontSize ?? "1rem",
                  xl: "1.1rem",
                },
                flexShrink: 0,
                display: "inline-flex",
                alignItems: "center",
                gap: theme.spacing(1),
              }}
            >
              {/* Bullet dot using theme color */}
              <Box
                component="span"
                sx={{
                  display: "inline-block",
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  bgcolor: textColor,
                  opacity: 0.65,
                  flexShrink: 0,
                }}
              />
              {text}
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
