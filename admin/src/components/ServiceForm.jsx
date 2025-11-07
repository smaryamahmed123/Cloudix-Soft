import React from "react";
import { Grid, Button, TextField, Box } from "@mui/material";

export default function ServiceForm({
  formData,
  setFormData,
  handleSubmit,
  preview,
  setPreview,
  editingId,
}) {
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, iconImage: file });
    setPreview(URL.createObjectURL(file));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3} justifyContent="center" mb={5}>
        <Grid item xs={12} sm={3}>
          <Button
            variant="contained"
            component="label"
            fullWidth
            sx={{
              mt: 1,
              backgroundColor: "#18BC9C",
              color: "#fff",
              fontWeight: "bold",
              "&:hover": { backgroundColor: "#2C3E50" },
            }}
          >
            Upload Image
            <input type="file" hidden accept="image/*" onChange={handleImageChange} />
          </Button>
          {preview && (
            <Box mt={2} textAlign="center">
              <img
                src={preview}
                alt="preview"
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 12,
                  objectFit: "cover",
                  border: "2px solid #18BC9C",
                }}
              />
            </Box>
          )}
        </Grid>

        <Grid item xs={12} sm={3}>
          <TextField
            label="Title"
            fullWidth
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
            sx={{ backgroundColor: "#fff", borderRadius: 2 }}
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <TextField
            label="Description"
            fullWidth
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
            sx={{ backgroundColor: "#fff", borderRadius: 2 }}
          />
        </Grid>

        <Grid item xs={12} sm={3} display="flex" alignItems="center" justifyContent="center">
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "#2C3E50",
              color: "#fff",
              fontWeight: "bold",
              px: 4,
              py: 1.2,
              "&:hover": { backgroundColor: "#18BC9C" },
              width: "100%",
            }}
          >
            {editingId ? "Update Service" : "Add Service"}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
