import React from "react";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import { ContentCopyRounded, DeleteOutline } from "@mui/icons-material";
import { dash } from "../Dashboard/dashboardPalette";

// Shared by header + rows so columns always line up
const GRID = "minmax(240px, 1fr) 130px 160px 96px";

const cellSx = { minWidth: 0, display: "flex", alignItems: "center" };

const SubscribersTable = ({ subscribers, loading, hasSearch, onDelete, onCopy }) => (
    <Box sx={{ overflowX: "auto" }}>
        <Box sx={{ minWidth: 640 }}>
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
                {["Email", "Status", "Subscribed", "Actions"].map((h) => (
                    <Typography key={h} sx={{ fontSize: 12.5, fontWeight: 600, color: dash.navy }}>
                        {h}
                    </Typography>
                ))}
            </Box>

            {/* ---------- Rows ---------- */}
            <Box sx={{ opacity: loading ? 0.5 : 1, transition: "opacity 0.15s ease" }}>
                {subscribers.length === 0 ? (
                    <Box sx={{ py: 8, textAlign: "center" }}>
                        <Typography sx={{ color: dash.navy, fontWeight: 700, fontSize: 14 }}>
                            {loading
                                ? "Loading subscribers..."
                                : hasSearch
                                    ? "No subscribers match your search"
                                    : "No subscribers yet"}
                        </Typography>
                        {!loading && (
                            <Typography sx={{ color: dash.muted, fontSize: 12.5, mt: 0.5 }}>
                                {hasSearch ? "Try a different email." : "New newsletter sign-ups will appear here."}
                            </Typography>
                        )}
                    </Box>
                ) : (
                    subscribers.map((sub) => {
                        const date = sub.subscribedAt ? new Date(sub.subscribedAt) : null;
                        const validDate = date && !Number.isNaN(date.getTime());
                        const active = Boolean(sub.active);

                        return (
                            <Box
                                key={sub._id}
                                sx={{
                                    display: "grid",
                                    gridTemplateColumns: GRID,
                                    columnGap: 2,
                                    alignItems: "center",
                                    px: 2,
                                    py: 1.4,
                                    borderBottom: `1px solid ${dash.border}`,
                                    "&:hover": { backgroundColor: "#FAFBFC" },
                                }}
                            >
                                {/* Email */}
                                <Box sx={{ ...cellSx, gap: 1.4 }}>
                                    <Box
                                        sx={{
                                            width: 38,
                                            height: 38,
                                            flexShrink: 0,
                                            borderRadius: "50%",
                                            display: "grid",
                                            placeItems: "center",
                                            backgroundColor: dash.greenLight,
                                            color: dash.green,
                                            fontSize: 15,
                                            fontWeight: 800,
                                        }}
                                    >
                                        {(sub.email || "?").charAt(0).toUpperCase()}
                                    </Box>
                                    <Typography
                                        sx={{
                                            color: dash.navy,
                                            fontSize: 13.5,
                                            fontWeight: 600,
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            whiteSpace: "nowrap",
                                        }}
                                    >
                                        {sub.email}
                                    </Typography>
                                </Box>

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
                                            backgroundColor: active ? "#EAF5E3" : "#F1F3F5",
                                            color: active ? "#3E7A1E" : dash.muted,
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                width: 7,
                                                height: 7,
                                                borderRadius: "50%",
                                                backgroundColor: active ? "#4CAF50" : "#A2AFB9",
                                            }}
                                        />
                                        {active ? "Active" : "Inactive"}
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

                                {/* Actions */}
                                <Box sx={{ ...cellSx, gap: 1 }}>
                                    <Tooltip title="Copy email">
                                        <IconButton
                                            size="small"
                                            onClick={() => onCopy(sub.email)}
                                            sx={{
                                                width: 36,
                                                height: 36,
                                                borderRadius: "10px",
                                                backgroundColor: "#EEF1F4",
                                                color: dash.navy,
                                            }}
                                        >
                                            <ContentCopyRounded sx={{ fontSize: 17 }} />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Delete">
                                        <IconButton
                                            size="small"
                                            onClick={() => onDelete(sub)}
                                            sx={{
                                                width: 36,
                                                height: 36,
                                                borderRadius: "10px",
                                                backgroundColor: "#FDEEEE",
                                                color: dash.red,
                                            }}
                                        >
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
    </Box>
);

export default SubscribersTable;