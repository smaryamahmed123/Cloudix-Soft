import React from "react";
import {
    Box,
    Button,
    Grid,
    Paper,
    Stack,
    Typography,
} from "@mui/material";

import {
    ArrowForwardRounded,
    CalendarMonthOutlined,
    TrendingUpRounded,
} from "@mui/icons-material";

import { useTheme } from "@mui/material/styles";

const DashboardHeader = () => {
    const theme = useTheme();
    const colors = theme.dashboard;

    const now = new Date();

    const greeting = (() => {
        const hour = now.getHours();

        if (hour < 12) return "Good Morning";
        if (hour < 17) return "Good Afternoon";

        return "Good Evening";
    })();

    const date = now.toLocaleDateString("en-US", {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
    });

    const time = now.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
    });

    return (
        <Grid container spacing={2.5} sx={{ mb: 3 }}>
            {/* Greeting */}
            <Grid item xs={12} md={5}>
                <Box sx={{ pt: 0.5 }}>
                    <Typography
                        sx={{
                            color: colors.navy,
                            fontSize: {
                                xs: 23,
                                md: 28,
                            },
                            fontWeight: 800,
                            letterSpacing: "-0.7px",
                        }}
                    >
                        {greeting},
                    </Typography>

                    <Typography
                        sx={{
                            color: colors.navy,
                            fontSize: {
                                xs: 30,
                                md: 38,
                            },
                            fontWeight: 800,
                            lineHeight: 1.05,
                            letterSpacing: "-1.2px",
                        }}
                    >
                        Admin{" "}
                        <Box
                            component="span"
                            sx={{
                                fontSize: {
                                    xs: 25,
                                    md: 31,
                                },
                            }}
                        >
                            👋
                        </Box>
                    </Typography>

                    <Typography
                        sx={{
                            color: colors.muted,
                            fontSize: 13,
                            mt: 1,
                            maxWidth: 430,
                        }}
                    >
                        Here's what's happening with your
                        marketing agency website today.
                    </Typography>
                </Box>
            </Grid>

            {/* Marketing Banner */}
            <Grid item xs={12} md={5}>
                <Paper
                    elevation={0}
                    sx={{
                        height: "100%",
                        minHeight: 145,
                        p: {
                            xs: 2.5,
                            md: 3,
                        },
                        position: "relative",
                        overflow: "hidden",
                        background:
                            "linear-gradient(135deg, #EAF9F6 0%, #D9F3EF 100%)",
                        border: "1px solid #CFECE7",
                    }}
                >
                    <Box
                        sx={{
                            position: "absolute",
                            width: 180,
                            height: 180,
                            borderRadius: "50%",
                            backgroundColor: "#BDEDE7",
                            right: -70,
                            top: -100,
                        }}
                    />

                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        sx={{
                            position: "relative",
                            zIndex: 2,
                            height: "100%",
                        }}
                    >
                        <Box>
                            <Typography
                                sx={{
                                    color: colors.navy,
                                    fontSize: {
                                        xs: 18,
                                        md: 21,
                                    },
                                    fontWeight: 800,
                                    lineHeight: 1.15,
                                }}
                            >
                                Better Marketing
                                <br />
                                Bigger Results
                            </Typography>

                            <Typography
                                sx={{
                                    color: colors.muted,
                                    fontSize: 11,
                                    mt: 0.7,
                                }}
                            >
                                Strategic. Creative.
                                Results-driven.
                            </Typography>

                            <Button
                                size="small"
                                variant="contained"
                                endIcon={<ArrowForwardRounded />}
                                onClick={() =>
                                    window.open(
                                        "https://cloudixsoft.com",
                                        "_blank"
                                    )
                                }
                                sx={{
                                    mt: 1.6,
                                }}
                            >
                                View Website
                            </Button>
                        </Box>

                        <Box
                            sx={{
                                display: {
                                    xs: "none",
                                    sm: "grid",
                                },
                                width: 95,
                                height: 70,
                                borderRadius: 2,
                                backgroundColor: colors.navy,
                                transform: "rotate(-4deg)",
                                placeItems: "center",
                                boxShadow:
                                    "0 12px 25px rgba(24,52,79,.15)",
                            }}
                        >
                            <TrendingUpRounded
                                sx={{
                                    color: colors.teal,
                                    fontSize: 45,
                                }}
                            />
                        </Box>
                    </Stack>
                </Paper>
            </Grid>

            {/* Date */}
            <Grid item xs={12} md={2}>
                <Paper
                    elevation={0}
                    sx={{
                        minHeight: 145,
                        p: 2.5,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                    }}
                >
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="flex-start"
                    >
                        <Box
                            sx={{
                                width: 42,
                                height: 42,
                                borderRadius: 2,
                                display: "grid",
                                placeItems: "center",
                                backgroundColor: colors.tealLight,
                                color: colors.teal,
                            }}
                        >
                            <CalendarMonthOutlined />
                        </Box>

                        <Typography
                            sx={{
                                color: colors.navy,
                                fontSize: 11,
                                fontWeight: 700,
                            }}
                        >
                            Today
                        </Typography>
                    </Stack>

                    <Typography
                        sx={{
                            color: colors.navy,
                            fontSize: 13,
                            fontWeight: 700,
                            mt: 1.5,
                        }}
                    >
                        {date}
                    </Typography>

                    <Typography
                        sx={{
                            color: colors.muted,
                            fontSize: 12,
                            mt: 0.3,
                        }}
                    >
                        {time}
                    </Typography>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default DashboardHeader;