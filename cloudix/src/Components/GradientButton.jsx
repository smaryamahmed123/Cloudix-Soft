import React, { forwardRef, memo } from "react";
import { Button, Box } from "@mui/material";
import { alpha } from "@mui/material/styles";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

// Sizes are rem-based (respects user font settings) and step up with real
// breakpoints instead of vw. minHeight keeps the touch target >= 44px on mobile.
const SIZES = {
  small: { fontSize: "0.875rem", py: 0.5, pl: 2, pr: 0.75, chip: 28, minHeight: 44 },
  medium: { fontSize: "1rem", py: 0.75, pl: 2.5, pr: 1, chip: 34, minHeight: 48 },
  large: { fontSize: "1.125rem", py: 1, pl: 3, pr: 1.25, chip: 40, minHeight: 56 },
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
      sx={(theme) => {
        const { main, light } = theme.palette.secondary;
        const ink = theme.palette.primary.dark;

        return [
          {
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
            color: ink,
            background: `linear-gradient(135deg, ${light} 0%, ${main} 70%)`,
            boxShadow: `0 6px 18px -8px ${alpha(main, 0.9)}`,
            transition: theme.transitions.create(["transform", "box-shadow"], {
              duration: 200,
            }),

            // The chip is the one moving part: it answers the hover.
            "& .gb-chip": {
              transition: theme.transitions.create("transform", { duration: 200 }),
            },
            "& .gb-arrow": {
              transition: theme.transitions.create("transform", { duration: 200 }),
            },
            "&:hover": {
              background: `linear-gradient(135deg, ${light} 0%, ${main} 70%)`,
              transform: "translateY(-1px)",
              boxShadow: `0 10px 22px -8px ${alpha(main, 1)}`,
            },
            "&:hover .gb-arrow": { transform: "translateX(2px)" },
            "&:active": {
              transform: "translateY(0)",
              boxShadow: `0 3px 10px -6px ${alpha(main, 0.9)}`,
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
          },
          ...(Array.isArray(sxProp) ? sxProp : [sxProp]),
        ];
      }}
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
          color: theme.palette.secondary.main,
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