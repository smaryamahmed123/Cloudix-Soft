import React from "react";
import { Box, Paper, Stack, Typography } from "@mui/material";
import { ArrowUpwardRounded, ArrowDownwardRounded } from "@mui/icons-material";
import { dash, cardSx } from "../Dashboard/dashboardPalette";

const Sparkline = ({ data = [], color, id }) => {
    const values = data.length > 1 ? data : [0, 0];
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min || 1;

    const points = values.map((v, i) => [
        (i / (values.length - 1)) * 100,
        max === min ? 36 : 36 - ((v - min) / range) * 32,
    ]);
    const line = points.map(([x, y]) => `${x},${y}`).join(" ");

    return (
        <svg viewBox="0 0 100 40" preserveAspectRatio="none" style={{ width: "100%", height: "100%", display: "block" }}>
            <defs>
                <linearGradient id={`bspark-${id}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={color} stopOpacity="0.2" />
                    <stop offset="100%" stopColor={color} stopOpacity="0" />
                </linearGradient>
            </defs>
            <polygon points={`0,40 ${line} 100,40`} fill={`url(#bspark-${id})`} />
            <polyline
                points={line}
                fill="none"
                stroke={color}
                strokeWidth="1.6"
                vectorEffect="non-scaling-stroke"
                strokeLinejoin="round"
            />
        </svg>
    );
};

// trend = { label: "12%", dir: "up" | "down" }
const BlogStatCard = ({ id, title, value, icon, color, tint, trend, sparkData }) => {
    const down = trend?.dir === "down";
    const trendColor = down ? "#D9822B" : dash.green;
    const Arrow = down ? ArrowDownwardRounded : ArrowUpwardRounded;

    return (
        <Paper
            elevation={0}
            sx={{
                ...cardSx,
                position: "relative",
                overflow: "hidden",
                p: 2.4,
                minHeight: 136,
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
                        {Number(value || 0).toLocaleString()}
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing={0.3} sx={{ mt: 0.6 }}>
                        <Arrow sx={{ fontSize: 14, color: trendColor }} />
                        <Typography sx={{ color: trendColor, fontSize: 11.5, fontWeight: 700 }}>
                            {trend?.label}
                        </Typography>
                    </Stack>
                </Box>
            </Stack>

            <Box sx={{ position: "absolute", right: 16, bottom: 14, width: "48%", height: 58, pointerEvents: "none" }}>
                <Sparkline id={id} data={sparkData} color={color} />
            </Box>
        </Paper>
    );
};

export default BlogStatCard;