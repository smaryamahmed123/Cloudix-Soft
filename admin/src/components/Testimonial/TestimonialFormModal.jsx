import React, { useEffect, useState } from "react";
import {
    Backdrop,
    Box,
    Button,
    Divider,
    Fade,
    FormControlLabel,
    MenuItem,
    Modal,
    Rating,
    Switch,
    TextField,
    Typography,
} from "@mui/material";
import { CloudUploadOutlined } from "@mui/icons-material";

import PrimaryButton from "../PrimaryButton";
import { dash } from "../Dashboard/dashboardPalette";

const MAX_VIDEO_SIZE = 100 * 1024 * 1024;
const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

const switchSx = {
    "& .MuiSwitch-switchBase.Mui-checked": { color: dash.green },
    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": { backgroundColor: dash.green },
};

const UploadButton = ({ children, accept, onChange }) => (
    <Button
        component="label"
        variant="outlined"
        startIcon={<CloudUploadOutlined />}
        sx={{
            textTransform: "none",
            borderRadius: "8px",
            fontWeight: 700,
            color: dash.green,
            borderColor: dash.green,
            "&:hover": { backgroundColor: dash.greenLight, borderColor: dash.green },
        }}
    >
        {children}
        <input hidden type="file" accept={accept} onChange={onChange} />
    </Button>
);

const TestimonialFormModal = ({ open, onClose, form, setForm, onSubmit, loading, onError }) => {
    const [imagePreview, setImagePreview] = useState("");

    const isVideo = form.type === "video";

    const updateForm = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

    // Local preview of the chosen client image
    useEffect(() => {
        if (!form.clientImage) {
            setImagePreview("");
            return undefined;
        }
        const url = URL.createObjectURL(form.clientImage);
        setImagePreview(url);
        return () => URL.revokeObjectURL(url);
    }, [form.clientImage]);

    const handleVideoChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith("video/")) {
            onError("Please select a valid video file.");
            e.target.value = "";
            return;
        }
        if (file.size > MAX_VIDEO_SIZE) {
            onError("Video is too large. Maximum size is 100 MB.");
            e.target.value = "";
            return;
        }
        updateForm("video", file);
    };

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            onError("Please select a valid image.");
            e.target.value = "";
            return;
        }
        if (file.size > MAX_IMAGE_SIZE) {
            onError("Image is too large. Maximum size is 5 MB.");
            e.target.value = "";
            return;
        }
        updateForm("clientImage", file);
    };

    const handleTypeChange = (e) => {
        const type = e.target.value;

        if (type === "video") {
            setForm((prev) => ({ ...prev, type: "video", clientImage: null, text: "", rating: 5 }));
        } else {
            setForm((prev) => ({ ...prev, type: "text", video: null, videoUrl: "", videoPublicId: "" }));
        }
    };

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
                        width: { xs: "95%", sm: 640 },
                        maxHeight: "92vh",
                        overflowY: "auto",
                        backgroundColor: "#fff",
                        p: { xs: 2.5, sm: 3.5 },
                        borderRadius: "16px",
                        boxShadow: 24,
                    }}
                >
                    <Typography sx={{ color: dash.navy, fontSize: 22, fontWeight: 800 }}>Add Testimonial</Typography>
                    <Typography sx={{ color: dash.muted, fontSize: 13, mt: 0.5, mb: 2.5 }}>
                        Add client feedback to your website.
                    </Typography>
                    <Divider sx={{ mb: 3 }} />

                    <TextField
                        fullWidth
                        select
                        label="Testimonial Type"
                        value={form.type}
                        onChange={handleTypeChange}
                        sx={{ mb: 2 }}
                    >
                        <MenuItem value="text">Text + Client Image</MenuItem>
                        <MenuItem value="video">Video Testimonial</MenuItem>
                    </TextField>

                    <TextField
                        fullWidth
                        required
                        label="Client Name"
                        value={form.clientName}
                        onChange={(e) => updateForm("clientName", e.target.value)}
                        sx={{ mb: 2 }}
                    />

                    <Box sx={{ display: "grid", gap: 2, gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, mb: 2 }}>
                        <TextField
                            fullWidth
                            label="Company / Business"
                            value={form.companyName}
                            onChange={(e) => updateForm("companyName", e.target.value)}
                        />
                        <TextField
                            fullWidth
                            label="Position"
                            placeholder="CEO / Founder / Customer"
                            value={form.position}
                            onChange={(e) => updateForm("position", e.target.value)}
                        />
                    </Box>

                    {/* ---------- Text testimonial ---------- */}
                    {!isVideo && (
                        <>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 2,
                                    p: 1.5,
                                    mb: 2,
                                    border: `1px solid ${dash.border}`,
                                    borderRadius: "14px",
                                    backgroundColor: "#F8FAFB",
                                }}
                            >
                                <Box
                                    sx={{
                                        width: 64,
                                        height: 64,
                                        flexShrink: 0,
                                        borderRadius: "50%",
                                        overflow: "hidden",
                                        display: "grid",
                                        placeItems: "center",
                                        backgroundColor: dash.greenLight,
                                        border: `1px solid ${dash.border}`,
                                        color: dash.green,
                                        fontWeight: 800,
                                        fontSize: 22,
                                    }}
                                >
                                    {imagePreview ? (
                                        <Box
                                            component="img"
                                            src={imagePreview}
                                            alt="Preview"
                                            sx={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                                        />
                                    ) : (
                                        (form.clientName || "C").charAt(0).toUpperCase()
                                    )}
                                </Box>

                                <Box sx={{ minWidth: 0 }}>
                                    <Typography sx={{ color: dash.navy, fontSize: 13, fontWeight: 700 }}>Client Image</Typography>
                                    <Typography sx={{ color: dash.muted, fontSize: 11.5, mb: 1 }}>Optional · max 5 MB</Typography>
                                    <UploadButton accept="image/*" onChange={handleImageChange}>
                                        Choose Image
                                    </UploadButton>
                                    {form.clientImage && (
                                        <Typography sx={{ color: dash.muted, fontSize: 12, mt: 0.8, wordBreak: "break-word" }}>
                                            {form.clientImage.name}
                                        </Typography>
                                    )}
                                </Box>
                            </Box>

                            <TextField
                                fullWidth
                                required
                                multiline
                                rows={5}
                                label="Client Feedback"
                                placeholder="What did the client say about Cloudix Soft?"
                                value={form.text}
                                onChange={(e) => updateForm("text", e.target.value)}
                                sx={{ mb: 2.5 }}
                            />

                            <Box sx={{ mb: 2.5 }}>
                                <Typography sx={{ color: dash.navy, fontSize: 14, fontWeight: 700, mb: 0.8 }}>Rating</Typography>
                                <Rating
                                    value={form.rating}
                                    onChange={(e, value) => updateForm("rating", value || 5)}
                                    sx={{ color: "#E3A81C" }}
                                />
                            </Box>
                        </>
                    )}

                    {/* ---------- Video testimonial ---------- */}
                    {isVideo && (
                        <Box sx={{ mb: 2.5 }}>
                            <Typography sx={{ color: dash.navy, fontSize: 14, fontWeight: 700, mb: 1 }}>
                                Testimonial Video
                            </Typography>
                            <UploadButton accept="video/mp4,video/webm,video/quicktime,video/*" onChange={handleVideoChange}>
                                Choose Video
                            </UploadButton>
                            <Typography sx={{ color: dash.muted, fontSize: 12, mt: 1 }}>Maximum file size: 100 MB</Typography>

                            {form.video && (
                                <Box sx={{ mt: 1.2, p: 1.5, borderRadius: "10px", backgroundColor: dash.greenLight }}>
                                    <Typography sx={{ color: dash.navy, fontSize: 13, fontWeight: 600, wordBreak: "break-word" }}>
                                        {form.video.name}
                                    </Typography>
                                    <Typography sx={{ color: dash.muted, fontSize: 12 }}>
                                        {(form.video.size / (1024 * 1024)).toFixed(2)} MB
                                    </Typography>
                                </Box>
                            )}
                        </Box>
                    )}

                    {/* ---------- Visibility ---------- */}
                    <Box
                        sx={{
                            p: 1.5,
                            px: 2,
                            backgroundColor: dash.greenLight,
                            borderRadius: "12px",
                            display: "flex",
                            flexWrap: "wrap",
                            columnGap: 3,
                        }}
                    >
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={form.isPublished}
                                    onChange={(e) => updateForm("isPublished", e.target.checked)}
                                    sx={switchSx}
                                />
                            }
                            label={form.isPublished ? "Published / Visible" : "Draft / Hidden"}
                        />
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={form.isFeatured}
                                    onChange={(e) => updateForm("isFeatured", e.target.checked)}
                                    sx={switchSx}
                                />
                            }
                            label="Featured testimonial"
                        />
                    </Box>

                    <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 3.5 }}>
                        <Button
                            type="button"
                            variant="outlined"
                            onClick={onClose}
                            disabled={loading}
                            sx={{ color: dash.navy, borderColor: dash.border, textTransform: "none" }}
                        >
                            Cancel
                        </Button>
                        <PrimaryButton type="submit" disabled={loading}>
                            {loading ? "Uploading..." : "Add Testimonial"}
                        </PrimaryButton>
                    </Box>
                </Box>
            </Fade>
        </Modal>
    );
};

export default TestimonialFormModal;