import React from "react";
import { Box, Dialog, IconButton, Rating, Typography } from "@mui/material";
import { Close, StarRounded } from "@mui/icons-material";
import { dash } from "../Dashboard/dashboardPalette";

const TestimonialPreviewDialog = ({ testimonial, onClose }) => {
    const open = Boolean(testimonial);
    const t = testimonial;
    const isVideo = t?.type === "video";
    const sub = t ? [t.position, t.companyName].filter(Boolean).join(" · ") : "";

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
            PaperProps={{ sx: { borderRadius: "16px", boxShadow: "0 25px 70px rgba(16,38,64,0.18)" } }}
        >
            {t && (
                <>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: 2,
                            px: 3,
                            py: 2,
                            borderBottom: `1px solid ${dash.border}`,
                        }}
                    >
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.6, minWidth: 0 }}>
                            {t.clientImage && (
                                <Box
                                    component="img"
                                    src={t.clientImage}
                                    alt=""
                                    sx={{ width: 48, height: 48, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }}
                                />
                            )}
                            <Box sx={{ minWidth: 0 }}>
                                <Typography sx={{ color: dash.navy, fontSize: 18, fontWeight: 800 }}>{t.clientName}</Typography>
                                {sub && <Typography sx={{ color: dash.muted, fontSize: 12.5, mt: 0.2 }}>{sub}</Typography>}
                            </Box>
                        </Box>

                        <IconButton
                            onClick={onClose}
                            sx={{ color: dash.muted, backgroundColor: "#F3F6F8", "&:hover": { backgroundColor: "#E8EDF0" } }}
                        >
                            <Close />
                        </IconButton>
                    </Box>

                    <Box sx={{ p: 3 }}>
                        {isVideo ? (
                            t.video ? (
                                <Box sx={{ borderRadius: "12px", overflow: "hidden", backgroundColor: "#0F2236" }}>
                                    <video
                                        src={t.video}
                                        controls
                                        preload="metadata"
                                        style={{ width: "100%", display: "block", maxHeight: 380 }}
                                    />
                                </Box>
                            ) : (
                                <Typography sx={{ color: dash.muted, fontSize: 13 }}>No video file found.</Typography>
                            )
                        ) : (
                            <>
                                {t.rating ? (
                                    <Rating
                                        value={Number(t.rating) || 0}
                                        readOnly
                                        precision={0.5}
                                        sx={{ color: "#E3A81C", mb: 1.5 }}
                                    />
                                ) : null}
                                <Box
                                    sx={{
                                        p: 2.2,
                                        borderRadius: "12px",
                                        backgroundColor: "#F8FAFB",
                                        border: `1px solid ${dash.border}`,
                                        color: dash.navy,
                                        fontSize: 14,
                                        lineHeight: 1.75,
                                        whiteSpace: "pre-wrap",
                                        wordBreak: "break-word",
                                        maxHeight: 320,
                                        overflowY: "auto",
                                    }}
                                >
                                    “{t.text}”
                                </Box>
                            </>
                        )}

                        <Box sx={{ display: "flex", gap: 1, mt: 2.5, flexWrap: "wrap" }}>
                            <Box
                                sx={{
                                    px: 1.3,
                                    py: 0.4,
                                    borderRadius: "8px",
                                    fontSize: 11.5,
                                    fontWeight: 600,
                                    backgroundColor: t.isPublished ? "#EAF5E3" : "#F1F3F5",
                                    color: t.isPublished ? "#3E7A1E" : dash.muted,
                                }}
                            >
                                {t.isPublished ? "Published" : "Hidden"}
                            </Box>
                            {t.isFeatured && (
                                <Box
                                    sx={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: 0.5,
                                        px: 1.3,
                                        py: 0.4,
                                        borderRadius: "8px",
                                        fontSize: 11.5,
                                        fontWeight: 600,
                                        backgroundColor: "#FDF3D6",
                                        color: "#8A6200",
                                    }}
                                >
                                    <StarRounded sx={{ fontSize: 14 }} />
                                    Featured
                                </Box>
                            )}
                        </Box>
                    </Box>
                </>
            )}
        </Dialog>
    );
};

export default TestimonialPreviewDialog;