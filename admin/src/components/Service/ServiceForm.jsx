import React from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { CloudUploadOutlined, ImageOutlined } from "@mui/icons-material";
import { dash } from "../Dashboard/dashboardPalette";

const fieldSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    backgroundColor: "#FFFFFF",
    "&:hover fieldset, &.Mui-focused fieldset": { borderColor: dash.green },
  },
  "& .MuiInputLabel-root.Mui-focused": { color: dash.green },
};

export default function ServiceForm({
  formData,
  setFormData,
  handleSubmit,
  preview,
  setPreview,
  editingId,
  saving,
}) {
  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setFormData({ ...formData, iconImage: file });
    setPreview(URL.createObjectURL(file));
    event.target.value = "";
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      {/* ---------- Icon upload ---------- */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          p: 1.5,
          mb: 2.5,
          border: `1px solid ${dash.border}`,
          borderRadius: "14px",
          backgroundColor: "#F8FAFB",
        }}
      >
        <Box
          sx={{
            width: 72,
            height: 72,
            flexShrink: 0,
            borderRadius: "14px",
            overflow: "hidden",
            display: "grid",
            placeItems: "center",
            backgroundColor: dash.greenLight,
            border: `1px solid ${dash.border}`,
          }}
        >
          {preview ? (
            <Box
              component="img"
              src={preview}
              alt="Service preview"
              sx={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <ImageOutlined sx={{ fontSize: 28, color: dash.green }} />
          )}
        </Box>

        <Box sx={{ minWidth: 0 }}>
          <Typography sx={{ color: dash.navy, fontSize: 13, fontWeight: 700, mb: 0.3 }}>
            Service Icon
          </Typography>
          <Typography sx={{ color: dash.muted, fontSize: 11.5, mb: 1 }}>
            {editingId ? "Leave unchanged to keep the current icon" : "Upload an image for this service"}
          </Typography>

          <Button
            component="label"
            variant="outlined"
            size="small"
            startIcon={<CloudUploadOutlined />}
            sx={{
              textTransform: "none",
              borderRadius: "8px",
              color: dash.green,
              borderColor: dash.green,
              fontSize: 12,
              fontWeight: 700,
              "&:hover": { backgroundColor: dash.greenLight, borderColor: dash.green },
            }}
          >
            Upload Image
            <input type="file" hidden accept="image/*" onChange={handleImageChange} />
          </Button>
        </Box>
      </Box>

      {/* ---------- Title ---------- */}
      <TextField
        label="Service Title"
        placeholder="e.g. Web Development"
        fullWidth
        required
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        sx={{ mb: 2, ...fieldSx }}
      />

      {/* ---------- Description ---------- */}
      <TextField
        label="Description"
        placeholder="Describe what this service offers..."
        fullWidth
        required
        multiline
        minRows={4}
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        sx={{ mb: 2.5, ...fieldSx }}
      />

      {/* ---------- Submit ---------- */}
      <Button
        type="submit"
        fullWidth
        variant="contained"
        disabled={saving}
        sx={{
          minHeight: 46,
          borderRadius: "10px",
          backgroundColor: dash.green,
          color: "#FFFFFF",
          fontSize: 13.5,
          fontWeight: 700,
          textTransform: "none",
          boxShadow: "none",
          "&:hover": { backgroundColor: dash.greenDark, boxShadow: "none" },
        }}
      >
        {saving ? "Saving..." : editingId ? "Update Service" : "Add Service"}
      </Button>
    </Box>
  );
}