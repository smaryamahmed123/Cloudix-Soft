import React, { useEffect, useState } from "react";
import {
    Backdrop,
    Box,
    Button,
    Divider,
    Fade,
    MenuItem,
    Modal,
    TextField,
    Typography,
} from "@mui/material";

import ImageUploadButton from "../ImageUploadButton";
import PrimaryButton from "../PrimaryButton";
import { dash } from "../Dashboard/dashboardPalette";

const WebsiteUploadModal = ({ open, onClose, form, setForm, onSubmit, loading }) => {
    const [preview, setPreview] = useState("");

    // Local preview of the selected image
    useEffect(() => {
        if (!form.image) {
            setPreview("");
            return undefined;
        }
        const url = URL.createObjectURL(form.image);
        setPreview(url);
        return () => URL.revokeObjectURL(url);
    }, [form.image]);

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
                    onSubmit={(e) => {
                        e.preventDefault();
                        onSubmit();
                    }}
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: { xs: "92%", sm: 520 },
                        maxHeight: "92vh",
                        overflowY: "auto",
                        backgroundColor: "#fff",
                        p: { xs: 2.5, sm: 3.5 },
                        borderRadius: "16px",
                        boxShadow: 24,
                    }}
                >
                    <Typography sx={{ color: dash.navy, fontSize: 22, fontWeight: 800 }}>Add New Website</Typography>
                    <Typography sx={{ color: dash.muted, fontSize: 13, mt: 0.5, mb: 2.5 }}>
                        Add a website to your portfolio.
                    </Typography>
                    <Divider sx={{ mb: 3 }} />

                    <TextField
                        fullWidth
                        required
                        label="Title"
                        value={form.title}
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                        sx={{ mb: 2 }}
                    />

                    <TextField
                        fullWidth
                        required
                        label="Link"
                        placeholder="https://example.com"
                        value={form.link}
                        onChange={(e) => setForm({ ...form, link: e.target.value })}
                        sx={{ mb: 2 }}
                    />

                    <TextField
                        select
                        fullWidth
                        required
                        label="Category"
                        value={form.category}
                        onChange={(e) => setForm({ ...form, category: e.target.value })}
                        sx={{ mb: 3 }}
                    >
                        <MenuItem value="static">Static</MenuItem>
                        <MenuItem value="ecommerce">E-commerce</MenuItem>
                    </TextField>

                    <Typography sx={{ color: dash.navy, fontSize: 14, fontWeight: 700, mb: 1 }}>Website Image</Typography>
                    <ImageUploadButton file={form.image} setFile={(file) => setForm({ ...form, image: file })} />

                    {form.image && (
                        <Box sx={{ mt: 2 }}>
                            <Box
                                sx={{
                                    height: 150,
                                    borderRadius: "12px",
                                    border: `1px solid ${dash.border}`,
                                    backgroundColor: "#F6F8F9",
                                    overflow: "hidden",
                                }}
                            >
                                {preview && (
                                    <Box
                                        component="img"
                                        src={preview}
                                        alt="Preview"
                                        sx={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                                    />
                                )}
                            </Box>
                            <Typography sx={{ color: dash.muted, fontSize: 12.5, mt: 1 }}>Selected: {form.image.name}</Typography>
                        </Box>
                    )}

                    <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 4 }}>
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
                            {loading ? "Uploading..." : "Add Website"}
                        </PrimaryButton>
                    </Box>
                </Box>
            </Fade>
        </Modal>
    );
};

export default WebsiteUploadModal;