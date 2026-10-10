import React from "react";
import { Avatar, Box, Button, IconButton, TextField, Tooltip, Typography } from "@mui/material";
import { CloudUploadOutlined, DeleteOutline } from "@mui/icons-material";
import { dash } from "../Dashboard/dashboardPalette";
import { fieldSx, useFilePreview } from "./AboutShared";

const PLATFORMS = ["instagram", "linkedin", "facebook"];

const TeamMemberCard = ({ member, index, onChange, onSocialChange, onRemove }) => {
    const preview = useFilePreview(member.image);

    return (
        <Box
            sx={{
                p: 2.5,
                borderRadius: "14px",
                border: `1px solid ${dash.border}`,
                backgroundColor: "#FFFFFF",
            }}
        >
            {/* Header row */}
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
                <Typography sx={{ color: dash.muted, fontSize: 12, fontWeight: 700, letterSpacing: 0.4 }}>
                    MEMBER {index + 1}
                </Typography>

                <Tooltip title="Remove member">
                    <IconButton
                        size="small"
                        onClick={() => onRemove(index)}
                        sx={{ width: 34, height: 34, borderRadius: "10px", backgroundColor: "#FDEEEE", color: dash.red }}
                    >
                        <DeleteOutline sx={{ fontSize: 18 }} />
                    </IconButton>
                </Tooltip>
            </Box>

            {/* Photo */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2.5 }}>
                <Avatar
                    src={preview}
                    sx={{
                        width: 72,
                        height: 72,
                        border: `3px solid ${dash.greenLight}`,
                        backgroundColor: dash.greenLight,
                        color: dash.green,
                        fontWeight: 800,
                    }}
                >
                    {(member.name || "?").charAt(0).toUpperCase()}
                </Avatar>

                <Box sx={{ minWidth: 0 }}>
                    <Typography sx={{ color: dash.navy, fontSize: 13, fontWeight: 700 }}>Photo</Typography>
                    <Typography sx={{ color: dash.muted, fontSize: 11.5, mb: 0.8, wordBreak: "break-word" }}>
                        {member.image instanceof File ? member.image.name : "Upload a square photo"}
                    </Typography>
                    <Button
                        component="label"
                        size="small"
                        variant="outlined"
                        startIcon={<CloudUploadOutlined />}
                        sx={{
                            textTransform: "none",
                            borderRadius: "8px",
                            fontWeight: 700,
                            fontSize: 12,
                            color: dash.green,
                            borderColor: dash.green,
                            "&:hover": { backgroundColor: dash.greenLight, borderColor: dash.green },
                        }}
                    >
                        {preview ? "Replace" : "Upload"}
                        <input
                            type="file"
                            hidden
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) onChange(index, "image", file);
                                e.target.value = "";
                            }}
                        />
                    </Button>
                </Box>
            </Box>

            {/* Details */}
            <Box sx={{ display: "grid", gap: 2, gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, mb: 2 }}>
                <TextField
                    label="Name"
                    fullWidth
                    value={member.name || ""}
                    onChange={(e) => onChange(index, "name", e.target.value)}
                    sx={fieldSx}
                />
                <TextField
                    label="Position"
                    fullWidth
                    value={member.position || ""}
                    onChange={(e) => onChange(index, "position", e.target.value)}
                    sx={fieldSx}
                />
            </Box>

            <TextField
                label="Description"
                fullWidth
                multiline
                minRows={3}
                value={member.description || ""}
                onChange={(e) => onChange(index, "description", e.target.value)}
                sx={{ mb: 2, ...fieldSx }}
            />

            <Typography sx={{ color: dash.navy, fontSize: 13, fontWeight: 700, mb: 1.2 }}>Social links</Typography>
            <Box sx={{ display: "grid", gap: 1.5 }}>
                {PLATFORMS.map((platform) => (
                    <TextField
                        key={platform}
                        fullWidth
                        size="small"
                        label={platform.charAt(0).toUpperCase() + platform.slice(1)}
                        placeholder="https://"
                        value={member?.socials?.[platform] || ""}
                        onChange={(e) => onSocialChange(index, platform, e.target.value)}
                        sx={fieldSx}
                    />
                ))}
            </Box>
        </Box>
    );
};

export default TeamMemberCard;