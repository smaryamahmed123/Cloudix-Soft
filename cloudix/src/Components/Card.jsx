// ModernCard.jsx
import React from 'react';
import { Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { useMediaQuery } from '@mui/material';

// Motion wrapper
// const MotionBox = motion(Box);
const MotionBox = motion.create(Box);

// Styled Components
const CardWrapper = styled(Box)(({ theme }) => ({
  perspective: 1000,
  width: 220,
  height: 370,
  margin: theme.spacing(4, 2),
  position: 'relative',
}));

const FlipBox = styled(MotionBox)({
  width: '100%',
  height: '100%',
  position: 'relative',
  transformStyle: 'preserve-3d',
  transformOrigin: 'center',
});

const CardSide = styled(Box)(({ theme }) => ({
  position: 'absolute',
  width: '100%',
  height: '100%',
  borderRadius: theme.spacing(3),
  padding: theme.spacing(3, 2, 6, 2),
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  boxShadow: theme.shadows[6],
}));

const FrontSide = styled(CardSide)(({ color1, }) => ({
  backfaceVisibility: 'hidden',
  backgroundColor: '#fff',
  color: color1
}));

const BackSide = styled(CardSide)(({ color1, color2 }) => ({
  backfaceVisibility: 'hidden',
  transform: 'rotateY(180deg)',
  background: `linear-gradient(to right, ${color1}, ${color2})`,
  color: '#fff',
}));


// Icon Circle on top
const IconCircle = styled(Box)(() => ({
  width: 110,
  height: 110,
  borderRadius: '50%',
  backgroundColor: '#BBBF19',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#111E2C',
  fontSize: 40,
  position: 'absolute',
  top: -50, // ✅ half outside top
  left: '50%',
  transform: 'translateX(-50%)',
  background: 'linear-gradient(#BBBF19, #BBBF19) padding-box, linear-gradient(to bottom, #111E2C, #A9B838) border-box',
  border: '4px solid transparent',


}));


const ModernCard = ({ icon, iconImage, title, description,}) => {
  const color1 = '#769914'; // left color
  const color2 = '#BBBF19'; // right color
  const textColorNormal = '#111e2c';
  const [flipped, setFlipped] = React.useState(false);
  const isMobile = useMediaQuery('(max-width:768px)');

  return (
    <CardWrapper>
      <FlipBox
        onTouchStart={() => setFlipped(true)}  // Flip on touch
        onMouseLeave={() => setFlipped(false)} // Optional: revert on mouse out
        onClick={() => {
          if (isMobile) setFlipped(prev => !prev); // toggle on tap for mobile
        }}
        animate={flipped ? 'hover' : 'rest'}
        whileHover={!isMobile ? 'hover' : undefined}
        variants={{
          rest: {
            rotateY: 0,
            transition: { duration: 0.6, ease: 'easeInOut' },
          },
          hover: {
            rotateY: 180,
            transition: { duration: 0.6, ease: 'easeInOut' },
          },
        }}
      >

        {/* FRONT SIDE */}
        <FrontSide color1={color1} sx={{ textAlign: "center" }}>
          <IconCircle>
            {icon ? (
              icon
            ) : (
              <img
                src={`${iconImage}`}
                alt={title}
                style={{
                  width: "50px",
                  height: "50px",
                  // borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            )}</IconCircle>

          {/* Title */}
          <Typography
            variant="h6"
            sx={{
              mt: 3, // push below circle
              fontWeight: "bold",
              color: textColorNormal,
              fontSize: 20,
              borderBottom: "1px solid #111E2C",
              display: "inline-block", // keeps underline tight to text
              pb: 0.5, // space between text and border
            }}
          >
            {title}
          </Typography>

          {/* Description */}
          <Typography
            variant="body2"
            sx={{
              mt: 5,
              color: textColorNormal,
              textAlign: "center",
            }}
          >
            {description}
          </Typography>
        </FrontSide>

        {/* BACK SIDE */}
        <BackSide color1={color1} color2={color2}>
          <IconCircle>{icon}</IconCircle>
          <>
            <IconCircle>
              {icon ? (
                icon
              ) : (
                <img
                  src={`${iconImage}`}
                  alt={title}
                  style={{
                    width: "50px",
                    height: "50px",
                    // borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              )}</IconCircle>
            <Typography
              variant="h6"
              sx={{
                mt: 3, // push below circle
                fontWeight: "bold",
                color: textColorNormal,
                fontSize: 15,
                borderBottom: "1px solid #111E2C",
                display: "inline-block", // keeps underline tight to text
                pb: 0.5, // space between text and border
              }}
            >
              {title}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                mt: 5,
                color: '#FFFFFF',
                textAlign: "center",
              }}
            >{description}</Typography>
          </>

        </BackSide>
      </FlipBox>
    </CardWrapper >
  );
};

export default ModernCard;
