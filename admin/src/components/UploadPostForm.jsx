import React from "react";
import {
  Box,
  TextField,
  Button,
  Stack,
  InputLabel,
  Typography,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useTheme } from "@mui/material/styles";

export default function UploadPostForm({
  title,
  setTitle,
  file,
  setFile,
  handleUpload,
  loading,
  isMobile,
}) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        background: theme.palette.background.paper,
        p: 3,
        borderRadius: 2,
        boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
        width: isMobile ? "90vw" : "100%",
        maxWidth: 500,
        mx: "auto",
      }}
    >
      <Stack spacing={2}>
        {/* Title Field */}
        <TextField
          label="Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          sx={{
            "& label.Mui-focused": { color: theme.palette.secondary.main },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: theme.palette.primary.main },
              "&:hover fieldset": { borderColor: theme.palette.secondary.main },
              "&.Mui-focused fieldset": {
                borderColor: theme.palette.secondary.main,
              },
            },
          }}
        />

        {/* File Upload */}
        <Box>
          <InputLabel
            sx={{ color: theme.palette.primary.main, mb: 1, fontWeight: 500 }}
          >
            Upload Post Image
          </InputLabel>
          <Button
            component="label"
            startIcon={<CloudUploadIcon />}
            variant="outlined"
            sx={{
              borderColor: theme.palette.secondary.main,
              color: theme.palette.secondary.main,
              "&:hover": {
                backgroundColor: theme.palette.secondary.main,
                color: "#fff",
              },
            }}
          >
            Choose File
            <input
              type="file"
              hidden
              onChange={(e) => setFile(e.target.files[0])}
            />
          </Button>
          {file && (
            <Typography mt={1} sx={{ color: theme.palette.text.primary }}>
              {file.name}
            </Typography>
          )}
        </Box>

        {/* Upload Button */}
        <Button
          variant="contained"
          onClick={handleUpload}
          disabled={loading}
          sx={{
            backgroundColor: theme.palette.secondary.main,
            color: "#fff",
            "&:hover": {
              backgroundColor: theme.palette.secondary.dark || "#14997f",
            },
            fontWeight: "bold",
          }}
        >
          {loading ? "Uploading..." : "Upload"}
        </Button>
      </Stack>
    </Box>
  );
}
