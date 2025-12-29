import { Box, Button, MenuItem, TextField } from "@mui/material";

export default function UploadWebsiteForm({
  form,
  setForm,
  handleUpload,
  loading,
}) {
  return (
    <Box sx={{ maxWidth: 500, mx: "auto", mb: 4 }}>
      <TextField
        label="Title"
        fullWidth
        sx={{ mb: 2 }}
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      <TextField
        label="Link"
        fullWidth
        sx={{ mb: 2 }}
        value={form.link}
        onChange={(e) => setForm({ ...form, link: e.target.value })}
      />
      <TextField
        select
        label="Category"
        fullWidth
        sx={{ mb: 2 }}
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
      >
        <MenuItem value="static">Static</MenuItem>
        <MenuItem value="ecommerce">E-commerce</MenuItem>
      </TextField>

      <input
        type="file"
        onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
      />

      <Button
        fullWidth
        sx={{ mt: 2 }}
        variant="contained"
        onClick={handleUpload}
        disabled={loading}
      >
        Add Website
      </Button>
    </Box>
  );
}
