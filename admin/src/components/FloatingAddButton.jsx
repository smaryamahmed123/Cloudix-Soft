import React from "react";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useTheme } from "@mui/material/styles";

export default function FloatingAddButton({ onClick, disabled }) {
  const theme = useTheme();

  return (
    <Fab
      onClick={onClick}
      disabled={disabled}
      sx={{
        position: "fixed",
        bottom: 20,
        right: 20,
        backgroundColor: theme.palette.secondary.main,
        color: "#fff",
        "&:hover": {
          backgroundColor: theme.palette.secondary.dark || "#14997f",
        },
        boxShadow: "0px 4px 10px rgba(0,0,0,0.15)",
      }}
    >
      <AddIcon />
    </Fab>
  );
}
