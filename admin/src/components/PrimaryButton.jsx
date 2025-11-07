import React from "react";
import { Button } from "@mui/material";

export default function PrimaryButton({ children, ...props }) {
  return (
    <Button
      variant="contained"
      color="primary" // Uses theme.palette.primary.main
      sx={{
        marginTop: 2,
        textTransform: "none",
        fontWeight: "bold",
        borderRadius: 2,
        px: 3,
        py: 1,
      }}
      {...props}
    >
      {children}
    </Button>
  );
}
