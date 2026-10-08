import React from "react";

import {
    Box,
    Button,
    Paper,
    Stack,
    Typography,
} from "@mui/material";

import {
    ArrowForwardRounded,
    DashboardOutlined,
} from "@mui/icons-material";

import { useTheme } from "@mui/material/styles";

const RecentActivityItem = ({
    icon,
    iconBackground,
    title,
    subtitle,
    time,
}) => {
    const theme = useTheme();
    const colors = theme.dashboard;

    return (
        <Stack
            direction="row"
            alignItems="center"
            spacing={1.4}
            sx={{
                py: 1.45,
                borderBottom: `1px solid ${colors.border}`,

                "&:last-child": {
                    borderBottom: "none",
                },
            }}
        >
            <Box
                sx={{
                    width: 39,
                    height: 39,
                    minWidth: 39,
                    borderRadius: "12px",
                    display: "grid",
                    placeItems: "center",
                    backgroundColor: iconBackground,
                    color: colors.navy,
                }}
            >
                {icon}
            </Box>

            <Box
                sx={{
                    minWidth: 0,
                    flex: 1,
                }}
            >
                <Typography
                    sx={{
                        color: colors.navy,
                        fontSize: 12.5,
                        fontWeight: 700,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                    }}
                >
                    {title}
                </Typography>

                <Typography
                    sx={{
                        color: colors.muted,
                        fontSize: 10.5,
                        mt: 0.3,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                    }}
                >
                    {subtitle}
                </Typography>
            </Box>

            <Typography
                sx={{
                    color: colors.muted,
                    fontSize: 10,
                    whiteSpace: "nowrap",
                }}
            >
                {time}
            </Typography>
        </Stack>
    );
};

const RecentActivity = ({
    activities,
    onViewAll,
}) => {
    const theme = useTheme();
    const colors = theme.dashboard;

    return (
        <Paper
            elevation={0}
            sx={{
                p: {
                    xs: 2,
                    md: 2.5,
                },
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
                            color: colors.navy,
                            fontSize: 17,
                            fontWeight: 800,
                        }}
                    >
                        Recent Activity
                    </Typography>

                    <Typography
                        sx={{
                            color: colors.muted,
                            fontSize: 11,
                            mt: 0.3,
                        }}
                    >
                        Latest website updates
                    </Typography>
                </Box>

                <Button
                    size="small"
                    endIcon={<ArrowForwardRounded />}
                    onClick={onViewAll}
                    sx={{
                        color: colors.teal,
                        fontSize: 11,
                        minWidth: "auto",
                        px: 1,
                    }}
                >
                    View All
                </Button>
            </Stack>

            <Box sx={{ mt: 1 }}>
                {activities.length > 0 ? (
                    activities.map((activity, index) => (
                        <RecentActivityItem
                            key={index}
                            icon={activity.icon}
                            iconBackground={activity.iconBackground}
                            title={activity.title}
                            subtitle={activity.subtitle}
                            time={activity.time}
                        />
                    ))
                ) : (
                    <Box
                        sx={{
                            py: 7,
                            textAlign: "center",
                        }}
                    >
                        <DashboardOutlined
                            sx={{
                                fontSize: 38,
                                color: colors.border,
                            }}
                        />

                        <Typography
                            sx={{
                                mt: 1,
                                fontSize: 12,
                                color: colors.muted,
                            }}
                        >
                            No recent activity
                        </Typography>
                    </Box>
                )}
            </Box>
        </Paper>
    );
};

export default RecentActivity;