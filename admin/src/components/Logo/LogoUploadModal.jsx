import React, { useEffect, useState } from "react";
import {
    Backdrop,
    Box,
    Button,
    Divider,
    Fade,
    Modal,
    TextField,
    Typography,
} from "@mui/material";

import ImageUploadButton from "../ImageUploadButton";
import PrimaryButton from "../PrimaryButton";
import { dash } from "../Dashboard/dashboardPalette";

const LogoUploadModal = ({ open, onClose, title, setTitle, file, setFile, onSubmit, loading }) => {
    const [preview, setPreview] = useState("");

    // Local preview of the selected file
    useEffect(() => {
        if (!file) {
            setPreview("");
            return undefined;
        }
        const url = URL.createObjectURL(file);
        setPreview(url);
        return () => URL.revokeObjectURL(url);
    }, [file]);

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
                        width: { xs: "92%", sm: 480 },
                        maxHeight: "92vh",
                        overflowY: "auto",
                        backgroundColor: "#fff",
                        p: { xs: 2.5, sm: 3.5 },
                        borderRadius: "16px",
                        boxShadow: 24,
                    }}
                >
                    <Typography sx={{ color: dash.navy, fontSize: 22, fontWeight: 800 }}>Add New Logo</Typography>
                    <Typography sx={{ color: dash.muted, fontSize: 13, mt: 0.5, mb: 2.5 }}>
                        Upload a logo image and give it a title.
                    </Typography>
                    <Divider sx={{ mb: 3 }} />

                    <TextField
                        fullWidth
                        required
                        label="Logo Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        sx={{ mb: 3 }}
                    />

                    <Typography sx={{ color: dash.navy, fontSize: 14, fontWeight: 700, mb: 1 }}>Logo Image</Typography>
                    <ImageUploadButton file={file} setFile={setFile} />

                    {file && (
                        <Box sx={{ mt: 2 }}>
                            <Box
                                sx={{
                                    height: 120,
                                    borderRadius: "12px",
                                    border: `1px solid ${dash.border}`,
                                    backgroundColor: "#F6F8F9",
                                    display: "grid",
                                    placeItems: "center",
                                    overflow: "hidden",
                                }}
                            >
                                {preview && (
                                    <Box
                                        component="img"
                                        src={preview}
                                        alt="Preview"
                                        sx={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", p: 1 }}
                                    />
                                )}
                            </Box>
                            <Typography sx={{ color: dash.muted, fontSize: 12.5, mt: 1 }}>Selected: {file.name}</Typography>
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
                            {loading ? "Uploading..." : "Upload Logo"}
                        </PrimaryButton>
                    </Box>
                </Box>
            </Fade>
        </Modal>
    );
};

export default LogoUploadModal;