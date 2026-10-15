import React from "react";
import { Box, Paper, Stack, Typography } from "@mui/material";
import { dash, cardSx } from "../Dashboard/dashboardPalette";

// Simple stat card (no sparkline – the subscribers API is paginated,
// so there's no full history to chart)
const SubscriberStatCard = ({ title, value, caption, icon, color, tint, onClick }) => (
    <Paper
        elevation={0}
        onClick={onClick}
        sx={{
            ...cardSx,
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
            position: "relative",
            overflow: "hidden",
            p: 2.4,
            minHeight: 150,
            cursor: onClick ? "pointer" : "default",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
            "&:hover": onClick
                ? {
                    transform: "translateY(-3px)",
                    boxShadow: "0 8px 22px rgba(16,38,64,0.09)",
                }
                : {},
        }}
    >
        <Stack direction="row" spacing={1.6} alignItems="flex-start">
            <Box
                sx={{
                    width: 44,
                    height: 44,
                    borderRadius: "12px",
                    display: "grid",
                    placeItems: "center",
                    backgroundColor: color,
                    color: "#FFFFFF",
                    flexShrink: 0,
                    "& svg": { fontSize: 22 },
                }}
            >
                {icon}
            </Box>

            <Box sx={{ minWidth: 0 }}>
                <Typography sx={{ color: dash.navy, fontSize: 13, fontWeight: 600 }}>{title}</Typography>
                <Typography sx={{ color: dash.navy, fontSize: 30, fontWeight: 800, lineHeight: 1.15, mt: 0.4 }}>
                    {value}
                </Typography>
                {caption && (
                    <Typography sx={{ color: dash.muted, fontSize: 11.5, mt: 0.6 }}>{caption}</Typography>
                )}
            </Box>
        </Stack>
    </Paper>
);

export default SubscriberStatCard;