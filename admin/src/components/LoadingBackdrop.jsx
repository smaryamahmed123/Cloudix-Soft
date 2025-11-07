import React from "react";
import { Backdrop, CircularProgress } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function LoadingBackdrop({ open }) {
  const theme = useTheme();

  return (
    <Backdrop
      sx={{
        color: theme.palette.secondary.main,
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backdropFilter: "blur(3px)", // ✨ adds a nice blur effect behind the loader
      }}
      open={open}
    >
      <CircularProgress color="inherit" thickness={5} />
    </Backdrop>
  );
}
