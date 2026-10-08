import React from "react";

import {
    Box,
    Paper,
    Stack,
    Typography,
} from "@mui/material";

import { TrendingUpRounded } from "@mui/icons-material";

import { useTheme } from "@mui/material/styles";

const DashboardStatCard = ({
    title,
    value,
    icon,
    iconBackground,
    iconColor,
    trend,
    onClick,
}) => {
    const theme = useTheme();
    const colors = theme.dashboard;

    return (
        <Paper
            elevation={0}
            onClick={onClick}
            sx={{
                position: "relative",
                overflow: "hidden",
                p: 2.4,
                minHeight: 145,
                cursor: onClick ? "pointer" : "default",

                transition: "all 0.25s ease",

                "&:hover": onClick
                    ? {
                        transform: "translateY(-4px)",
                        borderColor: colors.teal,
                        boxShadow: colors.cardShadowHover,
                    }
                    : {},
            }}
        >
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="flex-start"
            >
                <Box>
                    <Typography
                        sx={{
                            color: colors.muted,
                            fontSize: 12,
                            fontWeight: 600,
                            mb: 1,
                        }}
                    >
                        {title}
                    </Typography>

                    <Typography
                        sx={{
                            color: colors.navy,
                            fontSize: {
                                xs: 27,
                                md: 31,
                            },
                            fontWeight: 800,
                            lineHeight: 1,
                            letterSpacing: "-0.7px",
                        }}
                    >
                        {Number(value || 0).toLocaleString()}
                    </Typography>

                    <Stack
                        direction="row"
                        spacing={0.6}
                        alignItems="center"
                        sx={{ mt: 1.4 }}
                    >
                        <TrendingUpRounded
                            sx={{
                                fontSize: 15,
                                color: colors.teal,
                            }}
                        />

                        <Typography
                            sx={{
                                color: colors.teal,
                                fontSize: 11,
                                fontWeight: 700,
                            }}
                        >
                            {trend}
                        </Typography>
                    </Stack>
                </Box>

                <Box
                    sx={{
                        width: 48,
                        height: 48,
                        borderRadius: "14px",
                        display: "grid",
                        placeItems: "center",
                        backgroundColor: iconBackground,
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