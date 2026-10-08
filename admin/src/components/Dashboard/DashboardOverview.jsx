import React from "react";

import {
    Box,
    Paper,
    Stack,
    Typography,
} from "@mui/material";

import { LineChart } from "@mui/x-charts";

import { useTheme } from "@mui/material/styles";

const DashboardOverview = ({
    chartData,
    isMobile,
}) => {
    const theme = useTheme();
    const colors = theme.dashboard;

    return (
        <Paper
            elevation={0}
            sx={{
                p: {
                    xs: 2,
                    md: 3,
                },
                height: "100%",
            }}
        >
            <Stack
                direction={{
                    xs: "column",
                    sm: "row",
                }}
                justifyContent="space-between"
                alignItems={{
                    xs: "flex-start",
                    sm: "center",
                }}
                spacing={1}
            >
                <Box>
                    <Typography
                        sx={{
                            color: colors.navy,
                            fontSize: 17,
                            fontWeight: 800,
                        }}
                    >
                        Website Overview
                    </Typography>

                    <Typography
                        sx={{
                            color: colors.muted,
                            fontSize: 11,
                            mt: 0.4,
                        }}
                    >
                        Your website content activity
                    </Typography>
                </Box>

                <Box
                    sx={{
                        px: 1.5,
                        py: 0.8,
                        borderRadius: 2,
                        border: `1px solid ${colors.border}`,
                        color: colors.muted,
                        fontSize: 11,
                        fontWeight: 600,
                    }}
                >
                    Last 12 months
                </Box>
            </Stack>

            {/* Legend */}
            <Stack
                direction="row"
                spacing={2.5}
                sx={{
                    mt: 2,
                    mb: 1,
                    flexWrap: "wrap",
                }}
            >
                {[
                    {
                        label: "Blogs",
                        color: colors.teal,
                    },
                    {
                        label: "Portfolio",
                        color: colors.blue,
                    },
                    {
                        label: "Messages",
                        color: colors.purple,
                    },
                ].map((item) => (
                    <Stack
                        key={item.label}
                        direction="row"
                        spacing={0.7}
                        alignItems="center"
                    >
                        <Box
                            sx={{
                                width: 8,
                                height: 8,
                                borderRadius: "50%",
                                backgroundColor: item.color,
                            }}
                        />

                        <Typography
                            sx={{
                                fontSize: 10,
                                color: colors.muted,
                            }}
                        >
                            {item.label}
                        </Typography>
                    </Stack>
                ))}
            </Stack>

            <Box
                sx={{
                    width: "100%",
                    overflow: "hidden",
                    mt: 1,
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
                            data: chartData.blogs,
                            label: "Blogs",
                            color: colors.teal,
                            curve: "monotoneX",
                        },
                        {
                            data: chartData.portfolio,
                            label: "Portfolio",
                            color: colors.blue,
                            curve: "monotoneX",
                        },
                        {
                            data: chartData.messages,
                            label: "Messages",
                            color: colors.purple,
                            curve: "monotoneX",
                        },
                    ]}
                    height={isMobile ? 250 : 320}
                    grid={{
                        vertical: false,
                        horizontal: true,
                    }}
                    margin={{
                        left: 40,
                        right: 15,
                        top: 15,
                        bottom: 35,
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
                            stroke: "#EEF2F4",
                        },

                        "& .MuiChartsAxis-tickLabel": {
                            fill: colors.muted,
                            fontSize: 10,
                        },
                    }}
                />
            </Box>
        </Paper>
    );
};

export default DashboardOverview;