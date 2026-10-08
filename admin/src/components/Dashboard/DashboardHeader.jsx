import React from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { CalendarMonthOutlined } from "@mui/icons-material";
import { dash, cardSx } from "./dashboardPalette";

const DashboardHeader = () => {
    const now = new Date();
    const hour = now.getHours();
    const greeting = hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";

    const date = now.toLocaleDateString("en-GB", {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
    });

    const time = now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });

    return (
        <Grid container spacing={2.5} sx={{ mb: 2.5 }}>
            {/* ---------- Greeting banner ---------- */}
            <Grid item xs={12} lg={9}>
                <Paper
                    elevation={0}
                    sx={{
                        ...cardSx,
                        position: "relative",
                        overflow: "hidden",
                        minHeight: 160,
                        display: "flex",
                        alignItems: "center",
                        px: { xs: 2.5, md: 3 },
                        py: 2.5,
                        background: "linear-gradient(90deg, #F3F8E9 0%, #EAF2DA 100%)",
                    }}
                >
                    {/* Diagonal stripes */}
                    <Box
                        aria-hidden
                        sx={{
                            display: { xs: "none", md: "block" },
                            position: "absolute",
                            right: 0,
                            top: 0,
                            bottom: 0,
                            width: 260,
                            background: `linear-gradient(135deg, ${dash.lime} 0%, ${dash.green} 70%)`,
                            clipPath: "polygon(55% 0, 100% 0, 100% 100%, 0 100%)",
                            opacity: 0.9,
                            pointerEvents: "none",
                        }}
                    />
                    <Box
                        aria-hidden
                        sx={{
                            display: { xs: "none", md: "block" },
                            position: "absolute",
                            right: 210,
                            top: 0,
                            bottom: 0,
                            width: 120,
                            background: "rgba(255,255,255,0.55)",
                            clipPath: "polygon(60% 0, 100% 0, 40% 100%, 0 100%)",
                            pointerEvents: "none",
                        }}
                    />

                    {/* Laptop mockup */}
                    <Box
                        aria-hidden
                        sx={{
                            display: { xs: "none", md: "block" },
                            position: "absolute",
                            right: 70,
                            bottom: 16,
                            width: 190,
                        }}
                    >
                        <Box
                            sx={{
                                height: 112,
                                p: 1.6,
                                borderRadius: "8px 8px 0 0",
                                backgroundColor: "#0F2236",
                                border: "4px solid #1E2F42",
                                borderBottom: "none",
                            }}
                        >
                            <Typography sx={{ color: "#fff", fontSize: 11, fontWeight: 700, lineHeight: 1.35 }}>
                                Your Vision
                                <br />
                                Our Strategy
                                <br />
                                <Box component="span" sx={{ color: dash.lime }}>
                                    Real Growth
                                </Box>
                            </Typography>
                        </Box>
                        <Box sx={{ height: 8, borderRadius: "0 0 10px 10px", backgroundColor: "#C9D1D8" }} />
                    </Box>

                    <Box sx={{ position: "relative", zIndex: 2 }}>
                        <Typography sx={{ color: dash.navy, fontSize: { xs: 22, md: 26 }, fontWeight: 400 }}>
                            {greeting},
                        </Typography>
                        <Typography
                            sx={{
                                color: dash.navy,
                                fontSize: { xs: 30, md: 38 },
                                fontWeight: 800,
                                lineHeight: 1.1,
                                letterSpacing: "-0.8px",
                            }}
                        >
                            Admin <Box component="span">👋</Box>
                        </Typography>
                        <Typography sx={{ color: dash.green, fontSize: 13, mt: 1, maxWidth: 360 }}>
                            Here's what's happening with your marketing agency website today.
                        </Typography>
                    </Box>
                </Paper>
            </Grid>

            {/* ---------- Date card ---------- */}
            <Grid item xs={12} lg={3}>
                <Paper
                    elevation={0}
                    sx={{
                        ...cardSx,
                        p: 2.4,
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 1.6,
                    }}
                >
                    <Box
                        sx={{
                            width: 44,
                            height: 44,
                            borderRadius: "12px",
                            display: "grid",
                            placeItems: "center",
                            backgroundColor: dash.greenLight,
                            color: dash.green,
                            flexShrink: 0,
                        }}
                    >
                        <CalendarMonthOutlined />
                    </Box>

                    <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography sx={{ color: dash.muted, fontSize: 12 }}>Today</Typography>
                        <Typography sx={{ color: dash.muted, fontSize: 12.5, mt: 0.4 }}>{date}</Typography>
                    </Box>

                    <Typography sx={{ color: dash.navy, fontSize: 12, fontWeight: 600 }}>{time}</Typography>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default DashboardHeader;