
import React from "react";
import {
    Box,
    Grid,
    IconButton,
    Paper,
    Stack,
    Typography,
} from "@mui/material";

import {
    BarChart,
    LineChart,
} from "@mui/x-charts";

import {
    Message as MessageIcon,
    MoreHoriz as MoreHorizIcon,
} from "@mui/icons-material";

const DashboardCharts = ({
    chartData,
    isMobile,
}) => {
    return (
        <Grid container spacing={2.5} sx={{ mb: 3 }}>
            {/* ================= BLOG CHART ================= */}

            <Grid item xs={12} lg={8}>
                <Paper
                    elevation={0}
                    sx={{
                        p: { xs: 2, md: 3 },
                        borderRadius: "18px",
                        border: "1px solid #E6EBEF",
                        backgroundColor: "#FFFFFF",
                    }}
                >
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{ mb: 1 }}
                    >
                        <Box>
                            <Typography
                                sx={{
                                    fontSize: "16px",
                                    fontWeight: 800,
                                    color: "#2C3E50",
                                }}
                            >
                                Content Overview
                            </Typography>

                            <Typography
                                sx={{
                                    fontSize: "11px",
                                    color: "#7A8793",
                                    mt: 0.4,
                                }}
                            >
                                Monthly blog publishing activity
                            </Typography>
                        </Box>

                        <IconButton size="small">
                            <MoreHorizIcon
                                sx={{
                                    fontSize: 20,
                                    color: "#7A8793",
                                }}
                            />
                        </IconButton>
                    </Stack>

                    <Box
                        sx={{
                            width: "100%",
                            overflow: "hidden",
                            mt: 2,
                        }}
                    >
                        <LineChart
                            xAxis={[
                                {
                                    data: chartData.months,
                                    scaleType: "point",
                                },
                            ]}
                            series={[
                                {
                                    data: chartData.lineData,
                                    label: "Blogs",
                                    color: "#18BC9C",
                                    curve: "monotoneX",
                                },
                            ]}
                            height={isMobile ? 250 : 310}
                            grid={{
                                vertical: false,
                                horizontal: true,
                            }}
                            margin={{
                                left: 45,
                                right: 15,
                                top: 15,
                                bottom: 35,
                            }}
                            sx={{
                                width: "100%",

                                "& .MuiChartsAxis-line": {
                                    stroke: "#E6EBEF",
                                },

                                "& .MuiChartsAxis-tick": {
                                    stroke: "#E6EBEF",
                                },

                                "& .MuiChartsGrid-line": {
                                    stroke: "#EEF1F3",
                                },
                            }}
                        />
                    </Box>
                </Paper>
            </Grid>

            {/* ================= MESSAGE CHART ================= */}

            <Grid item xs={12} lg={4}>
                <Paper
                    elevation={0}
                    sx={{
                        p: { xs: 2, md: 3 },
                        borderRadius: "18px",
                        border: "1px solid #E6EBEF",
                        backgroundColor: "#FFFFFF",
                        height: "100%",
                    }}
                >
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{ mb: 1 }}
                    >
                        <Box>
                            <Typography
                                sx={{
                                    fontSize: "16px",
                                    fontWeight: 800,
                                    color: "#2C3E50",
                                }}
                            >
                                Messages
                            </Typography>

                            <Typography
                                sx={{
                                    fontSize: "11px",
                                    color: "#7A8793",
                                    mt: 0.4,
                                }}
                            >
                                Monthly inquiries
                            </Typography>
                        </Box>

                        <MessageIcon
                            sx={{
                                fontSize: 20,
                                color: "#E74C3C",
                            }}
                        />
                    </Stack>

                    <BarChart
                        xAxis={[
                            {
                                data: chartData.months,
                                scaleType: "band",
                            },
                        ]}
                        series={[
                            {
                                data: chartData.barData,
                                label: "Messages",
                                color: "#E74C3C",
                            },
                        ]}
                        height={isMobile ? 250 : 310}
                        margin={{
                            left: 45,
                            right: 10,
                            top: 15,
                            bottom: 35,
                        }}
                        grid={{
                            vertical: false,
                            horizontal: true,
                        }}
                        sx={{
                            width: "100%",

                            "& .MuiChartsGrid-line": {
                                stroke: "#EEF1F3",
                            },
                        }}
                    />
                </Paper>
            </Grid>
        </Grid>
    );
};

export default DashboardCharts;



