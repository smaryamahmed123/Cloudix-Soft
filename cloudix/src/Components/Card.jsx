// import React, { useState, memo } from "react";
// import PropTypes from "prop-types";
// import { Typography, Box, useMediaQuery } from "@mui/material";
// import { styled } from "@mui/material/styles";
// import { motion } from "framer-motion";

// const MotionBox = motion.create(Box);

// /* ================== CONSTANTS ================== */
// const COLORS = {
//   primary: "#769914",
//   secondary: "#BBBF19",
//   text: "#111E2C",
//   white: "#FFFFFF",
// };

// const CARD = {
//   width: 220,
//   height: 370,
// };

// /* ================== STYLES ================== */
// const CardWrapper = styled(Box)(({ theme }) => ({
//   perspective: 1000,
//   width: CARD.width,
//   height: CARD.height,
//   margin: theme.spacing(4, 2),
//   position: "relative",
// }));

// const FlipBox = styled(MotionBox)({
//   width: "100%",
//   height: "100%",
//   transformStyle: "preserve-3d",
// });

// const CardSide = styled(Box)(({ theme }) => ({
//   position: "absolute",
//   inset: 0,
//   borderRadius: theme.spacing(3),
//   padding: theme.spacing(3, 2, 6),
//   textAlign: "center",
//   display: "flex",
//   flexDirection: "column",
//   alignItems: "center",
//   justifyContent: "center",
//   boxShadow: theme.shadows[6],
//   backfaceVisibility: "hidden",
// }));

// const FrontSide = styled(CardSide)({
//   backgroundColor: COLORS.white,
//   color: COLORS.text,
// });

// const BackSide = styled(CardSide)({
//   transform: "rotateY(180deg)",
//   background: `linear-gradient(to right, ${COLORS.primary}, ${COLORS.secondary})`,
//   color: COLORS.white,
// });

// const IconCircle = styled(Box)({
//   width: 110,
//   height: 110,
//   borderRadius: "50%",
//   background: `linear-gradient(${COLORS.secondary}, ${COLORS.secondary}) padding-box,
//                linear-gradient(to bottom, ${COLORS.text}, ${COLORS.secondary}) border-box`,
//   border: "4px solid transparent",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   fontSize: 40,
//   position: "absolute",
//   top: -50,
//   left: "50%",
//   transform: "translateX(-50%)",
// });

// /* ================== COMPONENT ================== */
// const ModernCard = memo(function ModernCard({
//   icon,
//   iconImage,
//   title,
//   description,
// }) {
//   const isMobile = useMediaQuery("(max-width:768px)");
//   const [flipped, setFlipped] = useState(false);

//   const toggleFlip = () => setFlipped((p) => !p);

//   const renderIcon = () =>
//     icon || (
//       <img
//         src={iconImage}
//         alt={title}
//         width={50}
//         height={50}
//         style={{ objectFit: "cover" }}
//         loading="lazy"
//       />
//     );

//   return (
//     <CardWrapper
//       tabIndex={0}
//       role="button"
//       aria-pressed={flipped}
//       onKeyDown={(e) => e.key === "Enter" && toggleFlip()}
//     >
//       <FlipBox
//         animate={flipped ? "hover" : "rest"}
//         whileHover={!isMobile ? "hover" : undefined}
//         onClick={isMobile ? toggleFlip : undefined}
//         onMouseLeave={() => !isMobile && setFlipped(false)}
//         variants={{
//           rest: { rotateY: 0 },
//           hover: { rotateY: 180 },
//         }}
//         transition={{ duration: 0.6, ease: "easeInOut" }}
//       >
//         {/* FRONT */}
//         <FrontSide>
//           <IconCircle>{renderIcon()}</IconCircle>

//           <Typography
//             variant="h6"
//             sx={{
//               mt: 3,
//               fontWeight: "bold",
//               borderBottom: `1px solid ${COLORS.text}`,
//               pb: 0.5,
//             }}
//           >
//             {title}
//           </Typography>

//           <Typography sx={{ mt: 5, fontSize: "0.95rem" }}>
//             {description}
//           </Typography>
//         </FrontSide>

//         {/* BACK */}
//         <BackSide>
//           <IconCircle>{renderIcon()}</IconCircle>

//           <Typography
//             variant="h6"
//             sx={{
//               mt: 3,
//               fontWeight: "bold",
//               borderBottom: `1px solid ${COLORS.text}`,
//               pb: 0.5,
//               color: COLORS.text,
//             }}
//           >
//             {title}
//           </Typography>

//           <Typography sx={{ mt: 5, fontSize: "0.95rem", color: COLORS.white, }}>
//             {description}
//           </Typography>
//         </BackSide>
//       </FlipBox>
//     </CardWrapper>
//   );
// });

// /* ================== PROPS ================== */
// ModernCard.propTypes = {
//   icon: PropTypes.node,
//   iconImage: PropTypes.string,
//   title: PropTypes.string.isRequired,
//   description: PropTypes.string.isRequired,
// };

// export default ModernCard;









import React, { useState, memo } from "react";
import PropTypes from "prop-types";
import { Typography, Box, useMediaQuery, useTheme } from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";

const MotionBox = motion.create(Box);

const CARD = { width: 220, height: 370 };

const CardWrapper = styled(Box)(({ theme }) => ({
  perspective: 1000,
  width: CARD.width,
  height: CARD.height,
  margin: theme.spacing(4, 2),
  position: "relative",
}));

const FlipBox = styled(MotionBox)({ width: "100%", height: "100%", transformStyle: "preserve-3d" });

const CardSide = styled(Box)(({ theme }) => ({
  position: "absolute",
  inset: 0,
  borderRadius: theme.shape.borderRadius,   // ✅ from theme
  padding: theme.spacing(3, 2, 6),
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: theme.shadows[6],
  backfaceVisibility: "hidden",
}));

const FrontSide = styled(CardSide)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,  // ✅
  color: theme.palette.text.primary,                // ✅
}));

const BackSide = styled(CardSide)(({ theme }) => ({
  transform: "rotateY(180deg)",
  background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`, // ✅
  color: theme.palette.common.white,
}));

const IconCircle = styled(Box)(({ theme }) => ({
  width: 110,
  height: 110,
  borderRadius: "50%",
  background: `linear-gradient(${theme.palette.secondary.main}, ${theme.palette.secondary.main}) padding-box,
               linear-gradient(to bottom, ${theme.palette.primary.dark}, ${theme.palette.secondary.main}) border-box`, // ✅
  border: "4px solid transparent",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 40,
  position: "absolute",
  top: -50,
  left: "50%",
  transform: "translateX(-50%)",
}));

const ModernCard = memo(function ModernCard({ icon, iconImage, title, description }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [flipped, setFlipped] = useState(false);

  const toggleFlip = () => setFlipped((p) => !p);

  const renderIcon = () =>
    icon || (
      <img src={iconImage} alt={title} width={50} height={50}
        style={{ objectFit: "cover" }} loading="lazy" />
    );

  return (
    <CardWrapper tabIndex={0} role="button" aria-pressed={flipped}
      onKeyDown={(e) => e.key === "Enter" && toggleFlip()}>
      <FlipBox
        animate={flipped ? "hover" : "rest"}
        whileHover={!isMobile ? "hover" : undefined}
        onClick={isMobile ? toggleFlip : undefined}
        onMouseLeave={() => !isMobile && setFlipped(false)}
        variants={{ rest: { rotateY: 0 }, hover: { rotateY: 180 } }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        {/* FRONT */}
        <FrontSide>
          <IconCircle>{renderIcon()}</IconCircle>
          <Typography variant="h6" sx={{
            mt: 3, fontWeight: "bold",
            borderBottom: `1px solid ${theme.palette.text.primary}`, pb: 0.5,
          }}>
            {title}
          </Typography>
          <Typography sx={{ mt: 5, fontSize: "0.95rem" }}>{description}</Typography>
        </FrontSide>

        {/* BACK */}
        <BackSide>
          <IconCircle>{renderIcon()}</IconCircle>
          <Typography variant="h6" sx={{
            mt: 3, fontWeight: "bold",
            borderBottom: `1px solid ${theme.palette.primary.dark}`, pb: 0.5,
            color: theme.palette.primary.dark,
          }}>
            {title}
          </Typography>
          <Typography sx={{ mt: 5, fontSize: "0.95rem", color: theme.palette.common.white }}>
            {description}
          </Typography>
        </BackSide>
      </FlipBox>
    </CardWrapper>
  );
});

ModernCard.propTypes = {
  icon: PropTypes.node,
  iconImage: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.node.isRequired,  // ✅ changed from string to node
};

export default ModernCard;
