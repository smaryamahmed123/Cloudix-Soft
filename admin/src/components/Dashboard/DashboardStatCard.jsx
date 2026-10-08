import React from "react";
import { Box, Paper, Stack, Typography } from "@mui/material";
import { ArrowUpwardRounded } from "@mui/icons-material";
import { dash, cardSx } from "./dashboardPalette";

// ------------------------------------------------------------
// Sparkline (inline SVG, no extra dependency)
// ------------------------------------------------------------
const Sparkline = ({ data = [], color, id }) => {
    const values = data.length > 1 ? data : [0, 0];
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min || 1;

    const points = values.map((v, i) => {
        const x = (i / (values.length - 1)) * 100;
        const y = max === min ? 36 : 36 - ((v - min) / range) * 32;
        return [x, y];
    });

    const line = points.map(([x, y]) => `${x},${y}`).join(" ");
    const area = `0,40 ${line} 100,40`;

    return (
        <svg
            viewBox="0 0 100 40"
            preserveAspectRatio="none"
            style={{ width: "100%", height: "100%", display: "block" }}
        >
            <defs>
                <linearGradient id={`spark-${id}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={color} stopOpacity="0.18" />
                    <stop offset="100%" stopColor={color} stopOpacity="0" />
                </linearGradient>
            </defs>
            <polygon points={area} fill={`url(#spark-${id})`} />
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

// ------------------------------------------------------------
// Card
// ------------------------------------------------------------
const DashboardStatCard = ({
    id,
    title,
    value,
    icon,
    iconBackground,
    trend,
    sparkData,
    sparkColor,
    onClick,
}) => (
    <Paper
        elevation={0}
        onClick={onClick}
        sx={{
            ...cardSx,
            position: "relative",
            overflow: "hidden",
            p: 2.4,
            minHeight: 150,
            cursor: onClick ? "pointer" : "default",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
            "&:hover": onClick
                ? { transform: "translateY(-3px)", boxShadow: "0 8px 22px rgba(16,38,64,0.09)" }
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
                    backgroundColor: iconBackground,
                    color: "#FFFFFF",
                    flexShrink: 0,
                    "& svg": { fontSize: 22 },
                }}
            >
                {icon}
            </Box>

            <Box sx={{ minWidth: 0 }}>
                <Typography sx={{ color: dash.navy, fontSize: 13, fontWeight: 600 }}>{title}</Typography>

                <Typography
                    sx={{
                        color: dash.navy,
                        fontSize: 30,
                        fontWeight: 800,
                        lineHeight: 1.15,
                        mt: 0.4,
                    }}
                >
                    {Number(value || 0).toLocaleString()}
                </Typography>

                <Stack direction="row" alignItems="center" spacing={0.3} sx={{ mt: 0.6 }}>
                    <ArrowUpwardRounded sx={{ fontSize: 14, color: dash.green }} />
                    <Typography sx={{ color: dash.green, fontSize: 11.5, fontWeight: 700 }}>
                        {trend}
                    </Typography>
                </Stack>
            </Box>
        </Stack>

        <Box
            sx={{
                position: "absolute",
                right: 16,
                bottom: 14,
                width: "52%",
                height: 64,
                pointerEvents: "none",
            }}
        >
            <Sparkline id={id} data={sparkData} color={sparkColor} />
        </Box>
    </Paper>
);

export default DashboardStatCard;