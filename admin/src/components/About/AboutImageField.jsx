import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { CloudUploadOutlined, ImageOutlined } from "@mui/icons-material";
import { dash } from "../Dashboard/dashboardPalette";
import { useFilePreview } from "./aboutShared";

const AboutImageField = ({ value, onChange }) => {
    const preview = useFilePreview(value);
    const isNewFile = value instanceof File;

    return (
        <Box
            sx={{
                p: 1.5,
                borderRadius: "14px",
                border: `1px solid ${dash.border}`,
                backgroundColor: "#F8FAFB",
            }}
        >
            <Typography sx={{ color: dash.navy, fontSize: 13, fontWeight: 700, mb: 1.2 }}>Section Image</Typography>

            <Box
                sx={{
                    height: 220,
                    borderRadius: "12px",
                    overflow: "hidden",
                    display: "grid",
                    placeItems: "center",
                    backgroundColor: "#EEF1F4",
                    border: `1px solid ${dash.border}`,
                    color: dash.muted,
                }}
            >
                {preview ? (
                    <Box
                        component="img"
                        src={preview}
                        alt=""
                        sx={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    />
                ) : (
                    <Box sx={{ textAlign: "center" }}>
                        <ImageOutlined sx={{ fontSize: 34 }} />
                        <Typography sx={{ fontSize: 12.5, mt: 0.5 }}>No image yet</Typography>
                    </Box>
                )}
            </Box>

            <Typography sx={{ color: dash.muted, fontSize: 12, mt: 1.2, mb: 1.2, wordBreak: "break-word" }}>
                {isNewFile ? `New: ${value.name} (saved when you press Save)` : preview ? "Current image" : "Upload an image"}
            </Typography>

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
                {preview ? "Replace Image" : "Upload Image"}
                <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) onChange(file);
                        e.target.value = "";
                    }}
                />
            </Button>
        </Box>
    );
};

export default AboutImageField;