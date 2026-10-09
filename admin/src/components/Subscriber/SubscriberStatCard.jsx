import React from "react";
import { Box, Paper, Stack, Typography } from "@mui/material";
import { dash, cardSx } from "../Dashboard/dashboardPalette";

// Simple stat card (no sparkline – the subscribers API is paginated,
// so there's no full history to chart)
const SubscriberStatCard = ({ title, value, caption, icon, color, tint }) => (
    <Paper
        elevation={0}
        sx={{
            ...cardSx,
            p: 2.4,
            minHeight: 116,
            background: `linear-gradient(135deg, ${tint} 0%, #FFFFFF 100%)`,
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