import React from "react";
import { Snackbar, Alert } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function SnackbarAlert({ open, onClose, severity, message }) {
  const theme = useTheme();

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        sx={{
          width: "100%",
          fontSize: 15,
          fontWeight: 500,
          borderRadius: 2,
          boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
          backgroundColor:
            severity === "success"
              ? theme.palette.success.light
              : severity === "error"
              ? theme.palette.error.light
              : severity === "warning"
              ? theme.palette.warning.light
              : theme.palette.info.light,
          color:
            severity === "success"
              ? theme.palette.success.contrastText
              : severity === "error"
              ? theme.palette.error.contrastText
              : severity === "warning"
              ? theme.palette.warning.contrastText
              : theme.palette.info.contrastText,
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
