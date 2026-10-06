import React from "react";
import { Box, Paper, Stack, Typography } from "@mui/material";
import { ArrowUpward as ArrowUpwardIcon } from "@mui/icons-material";

const DashboardStatCard = ({
    title,
    value,
    icon,
    iconBg,
    iconColor,
    trendText,
    to,
    navigate,
}) => {
    return (
        <Paper
            elevation={0}
            onClick={() => to && navigate(to)}
            sx={{
                p: { xs: 2.2, md: 2.8 },
                borderRadius: "18px",
                border: "1px solid #E6EBEF",
                backgroundColor: "#FFFFFF",
                height: "100%",
                cursor: to ? "pointer" : "default",
                transition: "all 0.25s ease",
                position: "relative",
                overflow: "hidden",

                "&:hover": {
                    transform: to ? "translateY(-5px)" : "none",
                    boxShadow: to
                        ? "0 12px 30px rgba(44, 62, 80, 0.10)"
                        : "none",
                    borderColor: to ? "#18BC9C" : "#E6EBEF",
                },

                "&::after": {
                    content: '""',
                    position: "absolute",
                    width: 70,
                    height: 70,
                    borderRadius: "50%",
                    backgroundColor: iconBg,
                    opacity: 0.35,
                    right: -25,
                    bottom: -30,
                },
            }}
        >
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="flex-start"
                sx={{
                    position: "relative",
                    zIndex: 1,
                }}
            >
                <Box>
                    <Typography
                        sx={{
                            fontSize: "13px",
                            fontWeight: 600,
                            color: "#7A8793",
                            mb: 1,
                        }}
                    >
                        {title}
                    </Typography>

                    <Typography
                        sx={{
                            fontSize: { xs: "26px", md: "30px" },
                            fontWeight: 800,
                            color: "#2C3E50",
                            lineHeight: 1.1,
                        }}
                    >
                        {Number(value || 0).toLocaleString()}
                    </Typography>

                    <Stack
                        direction="row"
                        alignItems="center"
                        spacing={0.6}
                        sx={{ mt: 1.5 }}
                    >
                        <Box
                            sx={{
                                width: 20,
                                height: 20,
                                borderRadius: "50%",
                                backgroundColor: "#E8F8F5",
                                display: "grid",
                                placeItems: "center",
                            }}
                        >
                            <ArrowUpwardIcon
                                sx={{
                                    fontSize: 12,
                                    color: "#18BC9C",
                                }}
                            />
                        </Box>

                        <Typography
                            sx={{
                                fontSize: "11px",
                                fontWeight: 700,
                                color: "#18BC9C",
                            }}
                        >
                            {trendText}
                        </Typography>
                    </Stack>
                </Box>

                <Box
                    sx={{
                        width: 50,
                        height: 50,
                        borderRadius: "14px",
                        display: "grid",
                        placeItems: "center",
                        backgroundColor: iconBg,
                        color: iconColor,
                    }}
                >
                    {icon}
                </Box>
            </Stack>
        </Paper>
    );
};

export default DashboardStatCard;
