import React from "react";
import {
    Backdrop,
    Box,
    Button,
    Divider,
    Fade,
    FormControlLabel,
    Grid,
    MenuItem,
    Modal,
    Switch,
    TextField,
    Typography,
} from "@mui/material";

import ImageUploadButton from "../ImageUploadButton";
import PrimaryButton from "../PrimaryButton";
import BlogEditor from "./BlogEditor";
import { dash } from "../Dashboard/dashboardPalette";

const Section = ({ title, hint, children, mt = 4 }) => (
    <Box sx={{ mt }}>
        <Typography sx={{ color: dash.navy, fontSize: 16, fontWeight: 800, mb: hint ? 0.5 : 2 }}>
            {title}
        </Typography>
        {hint && (
            <Typography sx={{ color: dash.muted, fontSize: 12.5, mb: 2 }}>{hint}</Typography>
        )}
        {children}
    </Box>
);

const BlogFormModal = ({
    open,
    onClose,
    form,
    updateForm,
    onSubmit,
    uploading,
    isEditing,
    categories,
    onImageUpload,
}) => {
    // Make sure the blog's current category is always selectable when editing
    const options = categories.includes(form.category) || !form.category
        ? categories
        : [form.category, ...categories];

    return (
        <Modal
            open={open}
            onClose={onClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{ timeout: 300 }}
        >
            <Fade in={open}>
                <Box
                    component="form"
                    onSubmit={onSubmit}
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: { xs: "95%", sm: "90%", md: 850 },
                        maxHeight: "92vh",
                        overflowY: "auto",
                        backgroundColor: "#fff",
                        p: { xs: 2, sm: 3, md: 4 },
                        borderRadius: "16px",
                        boxShadow: 24,
                    }}
                >
                    <Typography sx={{ color: dash.navy, fontSize: 22, fontWeight: 800 }}>
                        {isEditing ? "Edit Blog" : "Create New Blog"}
                    </Typography>
                    <Typography sx={{ color: dash.muted, fontSize: 13, mt: 0.5, mb: 2.5 }}>
                        {isEditing ? "Update this article." : "Publish a professional SEO-friendly article."}
                    </Typography>
                    <Divider />

                    <Section title="Blog Information" mt={3}>
                        <TextField
                            fullWidth
                            required
                            label="Blog Title"
                            value={form.title}
                            onChange={(e) => updateForm("title", e.target.value)}
                            placeholder="How a Professional Website Helps Your Business Grow"
                            sx={{ mb: 2 }}
                        />

                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    select
                                    required
                                    label="Category"
                                    value={form.category}
                                    onChange={(e) => updateForm("category", e.target.value)}
                                >
                                    {options.map((c) => (
                                        <MenuItem key={c} value={c}>
                                            {c}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    required
                                    label="Author"
                                    value={form.author}
                                    onChange={(e) => updateForm("author", e.target.value)}
                                />
                            </Grid>
                        </Grid>

                        <TextField
                            fullWidth
                            multiline
                            rows={3}
                            label="Short Excerpt"
                            value={form.excerpt}
                            onChange={(e) => updateForm("excerpt", e.target.value)}
                            inputProps={{ maxLength: 300 }}
                            helperText={`${form.excerpt.length}/300`}
                            sx={{ mt: 2 }}
                        />

                        <TextField
                            fullWidth
                            label="URL Slug"
                            value={form.slug}
                            onChange={(e) => updateForm("slug", e.target.value)}
                            placeholder="professional-website-benefits"
                            helperText="Leave empty to generate automatically."
                            sx={{ mt: 2 }}
                        />
                    </Section>

                    <Section title="Cover Image" mt={3}>
                        <ImageUploadButton file={form.imageFile} setFile={(file) => updateForm("imageFile", file)} />
                        {form.imageFile ? (
                            <Typography sx={{ color: dash.muted, fontSize: 12.5, mt: 1 }}>
                                Selected: {form.imageFile.name}
                            </Typography>
                        ) : (
                            isEditing && (
                                <Typography sx={{ color: dash.muted, fontSize: 12.5, mt: 1 }}>
                                    Leave empty to keep the current cover image.
                                </Typography>
                            )
                        )}
                    </Section>

                    <Section title="Article Content">
                        <BlogEditor
                            value={form.content}
                            onChange={(value) => updateForm("content", value)}
                            onImageUpload={onImageUpload}
                        />
                    </Section>

                    <Section
                        title="SEO Settings"
                        hint="These fields control how the article appears in search engines."
                    >
                        <TextField
                            fullWidth
                            label="SEO Title"
                            value={form.seoTitle}
                            onChange={(e) => updateForm("seoTitle", e.target.value)}
                            inputProps={{ maxLength: 60 }}
                            helperText={`${form.seoTitle.length}/60 characters`}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            fullWidth
                            multiline
                            rows={3}
                            label="SEO Description"
                            value={form.seoDescription}
                            onChange={(e) => updateForm("seoDescription", e.target.value)}
                            inputProps={{ maxLength: 160 }}
                            helperText={`${form.seoDescription.length}/160 characters`}
                        />
                    </Section>

                    <Box sx={{ mt: 3, p: 2, backgroundColor: dash.greenLight, borderRadius: "12px" }}>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={form.visible}
                                    onChange={(e) => updateForm("visible", e.target.checked)}
                                    sx={{
                                        "& .MuiSwitch-switchBase.Mui-checked": { color: dash.green },
                                        "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": { backgroundColor: dash.green },
                                    }}
                                />
                            }
                            label={form.visible ? "Published / Visible" : "Draft / Hidden"}
                        />
                    </Box>

                    <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 4 }}>
                        <Button
                            type="button"
                            variant="outlined"
                            onClick={onClose}
                            disabled={uploading}
                            sx={{ color: dash.navy, borderColor: dash.border, textTransform: "none" }}
                        >
                            Cancel
                        </Button>
                        <PrimaryButton type="submit" disabled={uploading}>
                            {uploading ? "Saving..." : isEditing ? "Save Changes" : "Publish Blog"}
                        </PrimaryButton>
                    </Box>
                </Box>
            </Fade>
        </Modal>
    );
};

export default BlogFormModal;