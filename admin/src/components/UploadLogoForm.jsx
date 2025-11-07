import React from "react";
import { Box, Button, TextField, InputLabel, Stack, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import PrimaryButton from "./PrimaryButton"; // ✅ Import your custom button

export default function UploadLogoForm({ title, setTitle, file, setFile, handleUpload, loading }) {
  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        p: 3,
        borderRadius: 3,
        boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
        maxWidth: 600,
        mx: "auto",
        mb: 5,
      }}
    >
      <Stack spacing={2}>
        <TextField
          label="Logo Title"
          variant="outlined"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <Box>
          <InputLabel htmlFor="file-upload">Upload Logo</InputLabel>
          <Button component="label" variant="outlined" startIcon={<CloudUploadIcon />}>
            Choose File
            <input
              id="file-upload"
              type="file"
              hidden
              onChange={(e) => setFile(e.target.files[0])}
            />
          </Button>
          {file && (
            <Typography sx={{ mt: 1, fontSize: 14 }}>
              📎 {file.name}
            </Typography>
          )}
        </Box>

        {/* ✅ Use the reusable PrimaryButton */}
        <PrimaryButton onClick={handleUpload} disabled={loading}>
          {loading ? "Uploading..." : "Upload"}
        </PrimaryButton>
      </Stack>
    </Box>
  );
}
