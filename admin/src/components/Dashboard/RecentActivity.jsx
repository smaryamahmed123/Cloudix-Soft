import React from "react";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import { DashboardOutlined } from "@mui/icons-material";
import { dash, cardSx } from "./dashboardPalette";

const RecentActivityItem = ({ icon, iconBackground, title, subtitle, time }) => (
    <Stack
        direction="row"
        alignItems="flex-start"
        spacing={1.4}
        sx={{
            py: 1.4,
            borderBottom: `1px solid ${dash.border}`,
            "&:last-child": { borderBottom: "none" },
        }}
    >
        <Box
            sx={{
                width: 40,
                height: 40,
                minWidth: 40,
                borderRadius: "50%",
                display: "grid",
                placeItems: "center",
                backgroundColor: iconBackground,
                color: dash.navy,
            }}
        >
            {icon}
        </Box>

        <Box sx={{ minWidth: 0, flex: 1 }}>
            <Typography sx={{ color: dash.navy, fontSize: 13, fontWeight: 700 }}>{title}</Typography>
            <Typography
                sx={{
                    color: dash.muted,
                    fontSize: 11.5,
                    mt: 0.2,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                }}
            >
                {subtitle}
            </Typography>
            <Typography sx={{ color: dash.muted, fontSize: 11, mt: 0.4, opacity: 0.85 }}>
                {time}
            </Typography>
        </Box>

        <Box
            sx={{
                width: 7,
                height: 7,
                mt: 1,
                borderRadius: "50%",
                backgroundColor: dash.green,
                flexShrink: 0,
            }}
        />
    </Stack>
);

const RecentActivity = ({ activities = [], onViewAll }) => (
    <Paper elevation={0} sx={{ ...cardSx, p: { xs: 2, md: 2.5 }, height: "100%" }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 0.5 }}>
            <Typography sx={{ color: dash.navy, fontSize: 18, fontWeight: 800 }}>
                Recent Activity
            </Typography>

            <Button
                size="small"
                onClick={onViewAll}
                sx={{ color: dash.muted, fontSize: 11.5, textTransform: "none", minWidth: "auto" }}
            >
                View All
            </Button>
        </Stack>

        {activities.length > 0 ? (
            activities.map((a, i) => <RecentActivityItem key={i} {...a} />)
        ) : (
            <Box sx={{ py: 7, textAlign: "center" }}>
                <DashboardOutlined sx={{ fontSize: 38, color: dash.border }} />
                <Typography sx={{ mt: 1, fontSize: 12, color: dash.muted }}>No recent activity</Typography>
            </Box>
        )}
    </Paper>
);

export default RecentActivity;