import React, { forwardRef, memo } from "react";
import { Button, Box } from "@mui/material";
import { alpha } from "@mui/material/styles";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

// rem-based sizes; minHeight keeps touch targets >= 44px.
const SIZES = {
  small: { fontSize: "0.8125rem", py: 0.5, pl: 2, pr: 0.75, chip: 28, minHeight: 44 },
  medium: { fontSize: "0.875rem", py: 0.75, pl: 2.5, pr: 1, chip: 34, minHeight: 48 },
  large: { fontSize: "1rem", py: 1, pl: 3, pr: 1.25, chip: 40, minHeight: 56 },
};

const GradientButton = forwardRef(function GradientButton(
  { text = "Read more", size = "medium", sx: sxProp, ...props },
  ref
) {
  const s = SIZES[size] ?? SIZES.medium;

  return (
    <Button
      ref={ref}
      disableElevation
      {...props}
      // IMPORTANT: the array is the outer layer and the function sits inside it.
      // MUI ignores an sx function that returns an array.
      sx={[
        (theme) => {
          const base = theme.palette.secondary.main; // #BBBF19
          const top = theme.palette.accent?.main ?? theme.palette.secondary.light; // #D4E157
          const ink = theme.palette.primary.dark; // #111E2C
          const fill = `linear-gradient(135deg, ${top} 0%, ${base} 75%)`;
          const ease = (props) =>
            theme.transitions.create(props, { duration: 200 });

          return {
            minHeight: s.minHeight,
            py: s.py,
            pl: s.pl,
            pr: s.pr,
            gap: 1.5,
            borderRadius: 999,
            whiteSpace: "nowrap",
            textTransform: "none",
            fontFamily: theme.typography.fontFamily,
            fontWeight: theme.typography.button.fontWeight,
            fontSize: s.fontSize,
            lineHeight: 1.2,
            letterSpacing: "0.02em",
            color: ink,
            background: fill,
            boxShadow: `0 6px 18px -8px ${alpha(base, 0.9)}`,
            transition: ease(["transform", "box-shadow"]),

            "& .gb-chip": { transition: ease("transform") },
            "& .gb-arrow": { transition: ease("transform") },

            "&:hover": {
              background: fill,
              transform: "translateY(-1px)",
              boxShadow: `0 10px 22px -8px ${base}`,
            },
            "&:hover .gb-arrow": { transform: "translateX(2px)" },
            "&:active": {
              transform: "translateY(0)",
              boxShadow: `0 3px 10px -6px ${alpha(base, 0.9)}`,
            },
            "&:active .gb-chip": { transform: "scale(0.92)" },

            "&.Mui-focusVisible": {
              outline: `3px solid ${ink}`,
              outlineOffset: 3,
            },
            "&.Mui-disabled": {
              background: theme.palette.action.disabledBackground,
              color: theme.palette.action.disabled,
              boxShadow: "none",
            },
            "&.Mui-disabled .gb-chip": {
              background: theme.palette.action.disabled,
            },

            "@media (prefers-reduced-motion: reduce)": {
              "&, & .gb-chip, & .gb-arrow": { transition: "none" },
              "&:hover, &:active": { transform: "none" },
              "&:hover .gb-arrow": { transform: "none" },
            },
          };
        },
        ...(Array.isArray(sxProp) ? sxProp : [sxProp]),
      ]}
    >
      {text}
      <Box
        className="gb-chip"
        aria-hidden
        sx={(theme) => ({
          width: s.chip,
          height: s.chip,
          borderRadius: "50%",
          flexShrink: 0,
          display: "grid",
          placeItems: "center",
          background: theme.palette.primary.dark,
          color: theme.palette.accent?.main ?? theme.palette.secondary.main,
        })}
      >
        <ArrowForwardRoundedIcon
          className="gb-arrow"
          sx={{ fontSize: s.chip * 0.55 }}
        />
      </Box>
    </Button>
  );
});

export default memo(GradientButton);