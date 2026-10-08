import React from "react";
import {
    Box,
    Card,
    CardContent,
    Chip,
    Typography,
    useTheme,
} from "@mui/material";
import {
    LineChart,
} from "@mui/x-charts/LineChart";

const DashboardOverview = ({ chartData = [], isMobile }) => {
    const theme = useTheme();

    const months = chartData.map((item) => item.month);

    const blogs = chartData.map((item) => item.blogs);
    const portfolio = chartData.map((item) => item.portfolio);
    const messages = chartData.map((item) => item.messages);

    return (
        <Card
            sx={{
                height: "100%",
                minWidth: 0,
            }}
        >
            <CardContent
                sx={{
                    p: { xs: 2, sm: 2.5 },
                    "&:last-child": {
                        pb: { xs: 2, sm: 2.5 },
                    },
                }}
            >
                {/* Header */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        mb: 2,
                        gap: 2,
                    }}
                >
                    <Box>
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 800,
                                color: theme.dashboard.navy,
                            }}
                        >
                            Website Overview
                        </Typography>

                        <Typography
                            variant="body2"
                            sx={{
                                color: theme.dashboard.muted,
                                mt: 0.3,
                            }}
                        >
                            Your website content activity
                        </Typography>
                    </Box>

                    <Chip
                        label="Last 12 months"
                        size="small"
                        variant="outlined"
                        sx={{
                            borderColor: theme.dashboard.border,
                            color: theme.dashboard.muted,
                            flexShrink: 0,
                        }}
                    />
                </Box>

                {/* Legend */}
                <Box
                    sx={{
                        display: "flex",
                        gap: 2,
                        flexWrap: "wrap",
                        mb: 1,
                    }}
                >
                    <Legend
                        color={theme.dashboard.teal}
                        label="Blogs"
                    />

                    <Legend
                        color={theme.dashboard.blue}
                        label="Portfolio"
                    />

                    <Legend
                        color={theme.dashboard.purple}
                        label="Messages"
                    />
                </Box>

                {/* IMPORTANT: chart wrapper */}
                <Box
                    sx={{
                        width: "100%",
                        minWidth: 0,
                        height: {
                            xs: 260,
                            sm: 290,
                            md: 310,
                        },
                        position: "relative",
                    }}
                >
                    <LineChart
                        xAxis={[
                            {
                                scaleType: "point",
                                data: months,
                            },
                        ]}
                        series={[
                            {
                                data: blogs,
                                label: "Blogs",
                                color: theme.dashboard.teal,
                            },
                            {
                                data: portfolio,
                                label: "Portfolio",
                                color: theme.dashboard.blue,
                            },
                            {
                                data: messages,
                                label: "Messages",
                                color: theme.dashboard.purple,
                            },
                        ]}
                        height={300}
                        margin={{
                            left: 35,
                            right: 10,
                            top: 10,
                            bottom: 30,
                        }}
                        grid={{
                            horizontal: true,
                        }}
                        sx={{
                            width: "100% !important",
                            "& .MuiChartsAxis-line": {
                                stroke: theme.dashboard.border,
                            },
                            "& .MuiChartsAxis-tick": {
                                stroke: theme.dashboard.border,
                            },
                            "& .MuiChartsAxis-tickLabel": {
                                fill: theme.dashboard.muted,
                                fontSize: 11,
                            },
                        }}
                    />
                </Box>
            </CardContent>
        </Card>
    );
};

const Legend = ({ color, label }) => (
    <Box
        sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.7,
        }}
    >
        <Box
            sx={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                backgroundColor: color,
            }}
        />

        <Typography
            variant="caption"
            sx={{
                color: "#718398",
                fontSize: 11,
            }}
        >
            {label}
        </Typography>
    </Box>
);

export default DashboardOverview;