import React from "react";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import { CheckCircleOutline, DeleteOutline, VisibilityOutlined } from "@mui/icons-material";
import { dash } from "../Dashboard/dashboardPalette";

// Shared by header + rows so columns always line up
const GRID = "minmax(220px, 1.1fr) 150px minmax(200px, 1.4fr) 120px 140px 132px";

const cellSx = { minWidth: 0, display: "flex", alignItems: "center" };

const initials = (name = "") =>
    name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((p) => p.charAt(0).toUpperCase())
        .join("") || "?";

const iconBtn = (bg, color) => ({
    width: 36,
    height: 36,
    borderRadius: "10px",
    backgroundColor: bg,
    color,
});

const ContactMessagesTable = ({ messages, hasAnyMessages, onView, onVerify, onDelete }) => (
    <Box sx={{ overflowX: "auto" }}>
        <Box sx={{ minWidth: 980 }}>
            {/* ---------- Header ---------- */}
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: GRID,
                    columnGap: 2,
                    alignItems: "center",
                    px: 2,
                    height: 48,
                    borderRadius: "10px",
                    backgroundColor: "#F3F6F8",
                    border: `1px solid ${dash.border}`,
                }}
            >
                {["Sender", "Service", "Message", "Status", "Received", "Actions"].map((h) => (
                    <Typography key={h} sx={{ fontSize: 12.5, fontWeight: 600, color: dash.navy }}>
                        {h}
                    </Typography>
                ))}
            </Box>

            {/* ---------- Rows ---------- */}
            {messages.length === 0 ? (
                <Box sx={{ py: 8, textAlign: "center" }}>
                    <Typography sx={{ color: dash.navy, fontWeight: 700, fontSize: 14 }}>
                        {hasAnyMessages ? "No messages match your filters" : "No messages yet"}
                    </Typography>
                    <Typography sx={{ color: dash.muted, fontSize: 12.5, mt: 0.5 }}>
                        {hasAnyMessages
                            ? "Try a different keyword, status or service."
                            : "Messages sent through your contact form will appear here."}
                    </Typography>
                </Box>
            ) : (
                messages.map((msg) => {
                    const verified = msg.status === "verified";
                    const date = msg.createdAt ? new Date(msg.createdAt) : null;
                    const validDate = date && !Number.isNaN(date.getTime());

                    return (
                        <Box
                            key={msg._id}
                            onClick={() => onView(msg)}
                            sx={{
                                display: "grid",
                                gridTemplateColumns: GRID,
                                columnGap: 2,
                                alignItems: "center",
                                px: 2,
                                py: 1.5,
                                cursor: "pointer",
                                borderBottom: `1px solid ${dash.border}`,
                                "&:hover": { backgroundColor: "#FAFBFC" },
                            }}
                        >
                            {/* Sender */}
                            <Box sx={{ ...cellSx, gap: 1.4 }}>
                                <Box
                                    sx={{
                                        width: 40,
                                        height: 40,
                                        flexShrink: 0,
                                        borderRadius: "50%",
                                        display: "grid",
                                        placeItems: "center",
                                        backgroundColor: dash.greenLight,
                                        color: dash.green,
                                        fontSize: 14,
                                        fontWeight: 800,
                                    }}
                                >
                                    {initials(msg.name)}
                                </Box>
                                <Box sx={{ minWidth: 0 }}>
                                    <Typography
                                        sx={{
                                            color: dash.navy,
                                            fontSize: 13.5,
                                            fontWeight: 700,
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            whiteSpace: "nowrap",
                                        }}
                                    >
                                        {msg.name}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            color: dash.muted,
                                            fontSize: 12,
                                            mt: 0.2,
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            whiteSpace: "nowrap",
                                        }}
                                    >
                                        {msg.email}
                                    </Typography>
                                </Box>
                            </Box>

                            {/* Service */}
                            <Box sx={cellSx}>
                                {msg.service ? (
                                    <Box
                                        sx={{
                                            px: 1.3,
                                            py: 0.5,
                                            borderRadius: "8px",
                                            fontSize: 11.5,
                                            fontWeight: 600,
                                            backgroundColor: "#E9F0FB",
                                            color: "#3B6AB5",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            whiteSpace: "nowrap",
                                        }}
                                    >
                                        {msg.service}
                                    </Box>
                                ) : (
                                    <Typography sx={{ color: dash.muted, fontSize: 12.5 }}>Not selected</Typography>
                                )}
                            </Box>

                            {/* Message preview */}
                            <Typography
                                sx={{
                                    color: dash.muted,
                                    fontSize: 12.5,
                                    lineHeight: 1.55,
                                    display: "-webkit-box",
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: "vertical",
                                    overflow: "hidden",
                                }}
                            >
                                {msg.message}
                            </Typography>

                            {/* Status */}
                            <Box sx={cellSx}>
                                <Box
                                    sx={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: 0.8,
                                        px: 1.3,
                                        py: 0.5,
                                        borderRadius: "8px",
                                        fontSize: 11.5,
                                        fontWeight: 600,
                                        backgroundColor: verified ? "#EAF5E3" : "#FDF3D6",
                                        color: verified ? "#3E7A1E" : "#8A6200",
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: 7,
                                            height: 7,
                                            borderRadius: "50%",
                                            backgroundColor: verified ? "#4CAF50" : "#E3A81C",
                                        }}
                                    />
                                    {verified ? "Verified" : "Pending"}
                                </Box>
                            </Box>

                            {/* Date */}
                            <Box>
                                {validDate ? (
                                    <>
                                        <Typography sx={{ color: dash.navy, fontSize: 12.5 }}>
                                            {date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                                        </Typography>
                                        <Typography sx={{ color: dash.muted, fontSize: 11.5, mt: 0.2 }}>
                                            {date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
                                        </Typography>
                                    </>
                                ) : (
                                    <Typography sx={{ color: dash.muted, fontSize: 12.5 }}>—</Typography>
                                )}
                            </Box>

                            {/* Actions (clicks here shouldn't open the detail dialog) */}
                            <Box sx={{ ...cellSx, gap: 1 }} onClick={(e) => e.stopPropagation()}>
                                <Tooltip title="View message">
                                    <IconButton size="small" onClick={() => onView(msg)} sx={iconBtn("#EEF1F4", dash.navy)}>
                                        <VisibilityOutlined sx={{ fontSize: 18 }} />
                                    </IconButton>
                                </Tooltip>

                                <Tooltip title={verified ? "Already verified" : "Mark as verified"}>
                                    <span>
                                        <IconButton
                                            size="small"
                                            disabled={verified}
                                            onClick={() => onVerify(msg)}
                                            sx={iconBtn(dash.greenLight, dash.green)}
                                        >
                                            <CheckCircleOutline sx={{ fontSize: 18 }} />
                                        </IconButton>
                                    </span>
                                </Tooltip>

                                <Tooltip title="Delete">
                                    <IconButton size="small" onClick={() => onDelete(msg)} sx={iconBtn("#FDEEEE", dash.red)}>
                                        <DeleteOutline sx={{ fontSize: 18 }} />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                        </Box>
                    );
                })
            )}
        </Box>
    </Box>
);

export default ContactMessagesTable;