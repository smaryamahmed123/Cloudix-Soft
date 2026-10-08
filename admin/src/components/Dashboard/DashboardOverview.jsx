import React from "react";

import {
    Box,
    Card,
    CardContent,
    Chip,
    Typography,
    useTheme,
} from "@mui/material";

import { LineChart } from "@mui/x-charts/LineChart";


// ============================================================
// COMPONENT
// ============================================================

const DashboardOverview = ({ chartData = [], isMobile }) => {
    const theme = useTheme();

    const colors = theme.dashboard;

    // ----------------------------------------------------------
    // Make absolutely sure chartData is an array
    // ----------------------------------------------------------

    const safeChartData = Array.isArray(chartData)
        ? chartData
        : [];

    // ----------------------------------------------------------
    // Chart values
    // ----------------------------------------------------------

    const months = safeChartData.map(
        (item) => item?.month || ""
    );

    const blogs = safeChartData.map(
        (item) => Number(item?.blogs) || 0
    );

    const portfolio = safeChartData.map(
        (item) => Number(item?.portfolio) || 0
    );

    const messages = safeChartData.map(
        (item) => Number(item?.messages) || 0
    );


    // ==========================================================
    // RENDER
    // ==========================================================

    return (
        <Card
            sx={{
                height: "100%",
                minWidth: 0,
                overflow: "hidden",
            }}
        >
            <CardContent
                sx={{
                    p: {
                        xs: 2,
                        sm: 2.5,
                        md: 2.75,
                    },

                    "&:last-child": {
                        pb: {
                            xs: 2,
                            sm: 2.5,
                            md: 2.75,
                        },
                    },
                }}
            >

                {/* ==================================================
            HEADER
        ================================================== */}

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        gap: 2,
                        mb: 2,
                    }}
                >
                    <Box sx={{ minWidth: 0 }}>
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 800,
                                color: colors.navy,
                                lineHeight: 1.2,
                            }}
                        >
                            Website Overview
                        </Typography>

                        <Typography
                            variant="body2"
                            sx={{
                                color: colors.muted,
                                mt: 0.5,
                                fontSize: 12,
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
                            flexShrink: 0,

                            height: 30,

                            borderColor:
                                colors.border,

                            color: colors.muted,

                            fontSize: 11,

                            fontWeight: 600,

                            backgroundColor:
                                "#FFFFFF",

                            "& .MuiChip-label": {
                                px: 1.25,
                            },
                        }}
                    />
                </Box>


                {/* ==================================================
            LEGEND
        ================================================== */}

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: {
                            xs: 1.5,
                            sm: 2,
                        },

                        flexWrap: "wrap",

                        mb: 1,
                    }}
                >
                    <Legend
                        color={colors.teal}
                        label="Blogs"
                    />

                    <Legend
                        color={colors.blue}
                        label="Portfolio"
                    />

                    <Legend
                        color={colors.purple}
                        label="Messages"
                    />
                </Box>


                {/* ==================================================
            CHART
        ================================================== */}

                <Box
                    sx={{
                        width: "100%",
                        minWidth: 0,

                        height: {
                            xs: 250,
                            sm: 280,
                            md: 300,
                        },

                        position: "relative",

                        overflow: "hidden",
                    }}
                >
                    <LineChart
                        xAxis={[
                            {
                                scaleType: "point",

                                data: months,

                                tickLabelStyle: {
                                    fontSize: 10,
                                    fill: colors.muted,
                                },
                            },
                        ]}

                        yAxis={[
                            {
                                min: 0,

                                tickLabelStyle: {
                                    fontSize: 10,
                                    fill: colors.muted,
                                },
                            },
                        ]}

                        series={[
                            {
                                data: blogs,

                                label: "Blogs",

                                color: colors.teal,

                                curve: "linear",

                                showMark: true,
                            },

                            {
                                data: portfolio,

                                label: "Portfolio",

                                color: colors.blue,

                                curve: "linear",

                                showMark: true,
                            },

                            {
                                data: messages,

                                label: "Messages",

                                color: colors.purple,

                                curve: "linear",

                                showMark: true,
                            },
                        ]}

                        height={
                            isMobile
                                ? 245
                                : 285
                        }

                        margin={{
                            left: 35,
                            right: 10,
                            top: 10,
                            bottom: 30,
                        }}

                        grid={{
                            horizontal: true,
                        }}

                        slotProps={{
                            legend: {
                                hidden: true,
                            },
                        }}

                        sx={{
                            width: "100%",

                            "& .MuiChartsAxis-line": {
                                stroke: colors.border,
                            },

                            "& .MuiChartsAxis-tick": {
                                stroke: colors.border,
                            },

                            "& .MuiChartsGrid-line": {
                                stroke: colors.border,
                                strokeDasharray: "3 3",
                            },

                            "& .MuiChartsAxis-tickLabel": {
                                fill: colors.muted,
                                fontSize: 10,
                            },

                            "& .MuiLineElement-root": {
                                strokeWidth: 2,
                            },

                            "& .MuiMarkElement-root": {
                                strokeWidth: 2,
                            },
                        }}
                    />
                </Box>

            </CardContent>
        </Card>
    );
};


// ============================================================
// LEGEND
// ============================================================

const Legend = ({
    color,
    label,
}) => {
    return (
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

                    flexShrink: 0,
                }}
            />

            <Typography
                variant="caption"
                sx={{
                    color: "#718398",
                    fontSize: 10.5,
                    fontWeight: 500,
                }}
            >
                {label}
            </Typography>
        </Box>
    );
};


export default DashboardOverview;