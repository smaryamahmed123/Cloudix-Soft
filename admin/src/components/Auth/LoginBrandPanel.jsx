import React from "react";
import { Box, Typography } from "@mui/material";
import {
    ArticleOutlined,
    EmailOutlined,
    GridViewOutlined,
} from "@mui/icons-material";
import { dash } from "../Dashboard/dashboardPalette";

// Placeholder mark (swap for your real logo image)
export const BrandMark = ({ size = 44 }) => (
    <svg viewBox="0 0 48 48" width={size} height={size} aria-hidden>
        <defs>
            <linearGradient id="loginBrandGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#C4DB55" />
                <stop offset="100%" stopColor="#5F7D22" />
            </linearGradient>
        </defs>
        <path
            d="M37 13.5 A17 17 0 1 0 37 34.5"
            fill="none"
            stroke="url(#loginBrandGrad)"
            strokeWidth="7"
            strokeLinecap="round"
        />
        <path d="M13 31 L35 19" fill="none" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
    </svg>
);

const POINTS = [
    { icon: <ArticleOutlined />, text: "Publish blogs, portfolio work and testimonials" },
    { icon: <EmailOutlined />, text: "Review contact messages and newsletter subscribers" },
    { icon: <GridViewOutlined />, text: "Keep services, about and contact details up to date" },
];

const LIME = "#A6C23A";
const OLIVE = "#5F7D22";

const LoginBrandPanel = () => (
    <Box
        sx={{
            position: "relative",
            overflow: "hidden",
            display: { xs: "none", md: "flex" },
            flexDirection: "column",
            justifyContent: "space-between",
            p: { md: 5, lg: 7 },
            color: "#FFFFFF",
            background: "linear-gradient(180deg, #102640 0%, #0A1A2C 100%)",
        }}
    >
        {/* Diagonal bands */}
        {[
            { left: -60, width: 140, height: 640, opacity: 0.8 },
            { left: 150, width: 52, height: 520, opacity: 0.5 },
            { left: 250, width: 22, height: 420, opacity: 0.32 },
        ].map((band, i) => (
            <Box
                key={i}
                aria-hidden
                sx={{
                    position: "absolute",
                    left: band.left,
                    bottom: -120,
                    width: band.width,
                    height: band.height,
                    transform: "rotate(36deg)",
                    transformOrigin: "bottom left",
                    background: `linear-gradient(to top, ${OLIVE} 0%, ${LIME} 55%, rgba(166,194,58,0) 100%)`,
                    opacity: band.opacity,
                    pointerEvents: "none",
                }}
            />
        ))}

        {/* Brand */}
        <Box sx={{ position: "relative", display: "flex", alignItems: "center", gap: 1.4 }}>
            <BrandMark />
            <Box>
                <Typography sx={{ fontSize: 22, fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.2px" }}>
                    Cloudix <Box component="span" sx={{ color: LIME }}>Soft</Box>
                </Typography>
                <Typography sx={{ color: "#8FA1B5", fontSize: 11.5, fontWeight: 500, mt: 0.3 }}>Ideas to Impact</Typography>
            </Box>
        </Box>

        {/* Message */}
        <Box sx={{ position: "relative", maxWidth: 440 }}>
            <Typography
                sx={{
                    fontSize: { md: 32, lg: 40 },
                    fontWeight: 800,
                    lineHeight: 1.15,
                    letterSpacing: "-1px",
                }}
            >
                Manage your <Box component="span" sx={{ color: LIME }}>agency website</Box> in one place.
            </Typography>

            <Box sx={{ display: "grid", gap: 1.6, mt: 4 }}>
                {POINTS.map((point) => (
                    <Box key={point.text} sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                        <Box
                            sx={{
                                width: 36,
                                height: 36,
                                flexShrink: 0,
                                borderRadius: "10px",
                                display: "grid",
                                placeItems: "center",
                                backgroundColor: "rgba(255,255,255,0.08)",
                                color: LIME,
                                "& svg": { fontSize: 19 },
                            }}
                        >
                            {point.icon}
                        </Box>
                        <Typography sx={{ color: "#D5DEE8", fontSize: 14 }}>{point.text}</Typography>
                    </Box>
                ))}
            </Box>
        </Box>

        <Typography sx={{ position: "relative", color: "#8FA1B5", fontSize: 12 }}>
            © {new Date().getFullYear()} Cloudix Soft
        </Typography>
    </Box>
);

export default LoginBrandPanel;