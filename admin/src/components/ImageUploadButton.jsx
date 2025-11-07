import React from "react";
import { Button, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useTheme } from "@mui/material/styles";

export default function ImageUploadButton({ file, setFile }) {
  const theme = useTheme();
  return (
    <>
      <Button
        variant="contained"
        component="label"
        startIcon={<CloudUploadIcon />}
        sx={{
          backgroundColor: theme.palette.secondary.main,
          color: "#fff",
          mt: 2,
          "&:hover": { backgroundColor: "#14997f" },
        }}
      >
        Upload Image
        <input
          type="file"
          hidden
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
      </Button>
      {file && (
        <Typography variant="body2" sx={{ mt: 1 }}>
          📎 Selected: {file.name}
        </Typography>
      )}
    </>
  );
}
