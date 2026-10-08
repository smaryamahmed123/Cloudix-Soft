import React from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import { OpenInNewRounded } from "@mui/icons-material";
import { dash } from "./dashboardPalette";

const GrowthCard = ({ url = "https://cloudixsoft.com" }) => (
    <Paper
        elevation={0}
        sx={{
            position: "relative",
            overflow: "hidden",
            p: 2.5,
            borderRadius: "14px",
            color: "#FFFFFF",
            background: "linear-gradient(135deg, #0F2236 0%, #16324D 100%)",
        }}
    >
        <Box sx={{ position: "relative", zIndex: 2, maxWidth: { xs: "100%", sm: "62%" } }}>
            <Typography sx={{ fontSize: 16, fontWeight: 800 }}>Keep Growing</Typography>
            <Typography sx={{ fontSize: 12.5, fontWeight: 600, mt: 0.3 }}>
                Your Marketing Agency
            </Typography>
            <Typography sx={{ fontSize: 11, mt: 1, color: "rgba(255,255,255,0.75)", lineHeight: 1.5 }}>
                Great content builds trust. Keep managing your website and make your brand bigger with{" "}
                <Box component="span" sx={{ color: dash.lime }}>
                    Cloudix Soft.
                </Box>
            </Typography>

            <Button
                size="small"
                variant="contained"
                endIcon={<OpenInNewRounded sx={{ fontSize: 14 }} />}
                onClick={() => window.open(url, "_blank")}
                sx={{
                    mt: 1.6,
                    textTransform: "none",
                    fontSize: 11,
                    fontWeight: 600,
                    boxShadow: "none",
                    backgroundColor: dash.green,
                    "&:hover": { backgroundColor: dash.greenDark, boxShadow: "none" },
                }}
            >
                Visit Website
            </Button>
        </Box>

        {/* Laptop with bars */}
        <Box
            aria-hidden
            sx={{
                display: { xs: "none", sm: "block" },
                position: "absolute",
                right: 18,
                bottom: 14,
                width: 118,
            }}
        >
            <Box
                sx={{
                    height: 76,
                    p: 1,
                    display: "flex",
                    alignItems: "flex-end",
                    gap: 0.7,
                    borderRadius: "6px 6px 0 0",
                    backgroundColor: "#1B3550",
                    border: "3px solid #2B4660",
                    borderBottom: "none",
                }}
            >
                {[30, 45, 38, 62, 80].map((h, i) => (
                    <Box
                        key={i}
                        sx={{
                            flex: 1,
                            height: `${h}%`,
                            borderRadius: "2px 2px 0 0",
                            backgroundColor: i > 2 ? dash.lime : "#7C8FA3",
                        }}
                    />
                ))}
            </Box>
            <Box sx={{ height: 6, borderRadius: "0 0 8px 8px", backgroundColor: "#AEB9C4" }} />
        </Box>
    </Paper>
);

export default GrowthCard;