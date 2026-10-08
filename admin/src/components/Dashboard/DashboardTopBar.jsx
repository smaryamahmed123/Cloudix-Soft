import React from "react";
import { Avatar, Box, IconButton, InputBase, Typography } from "@mui/material";
import {
    SearchRounded,
    NotificationsNoneRounded,
    KeyboardArrowDownRounded,
} from "@mui/icons-material";
import { dash } from "./dashboardPalette";

const DashboardTopBar = () => (
    <Box
        sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
            px: { xs: 2, md: 4 },
            py: 1.5,
            backgroundColor: "#FFFFFF",
            borderBottom: `1px solid ${dash.border}`,
        }}
    >
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                width: { xs: "100%", sm: 416 },
                maxWidth: "100%",
                px: 1.5,
                height: 42,
                borderRadius: "10px",
                backgroundColor: "#F3F6F8",
                border: `1px solid ${dash.border}`,
            }}
        >
            <SearchRounded sx={{ color: dash.muted, fontSize: 20 }} />
            <InputBase
                placeholder="Search anything..."
                fullWidth
                sx={{ fontSize: 13, color: dash.navy }}
            />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2.5 }}>
            <IconButton size="small" sx={{ position: "relative" }}>
                <NotificationsNoneRounded sx={{ color: dash.navy }} />
                <Box
                    sx={{
                        position: "absolute",
                        top: 6,
                        right: 7,
                        width: 7,
                        height: 7,
                        borderRadius: "50%",
                        backgroundColor: dash.red,
                    }}
                />
            </IconButton>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
                <Avatar
                    sx={{
                        width: 36,
                        height: 36,
                        fontSize: 15,
                        fontWeight: 700,
                        backgroundColor: dash.green,
                    }}
                >
                    A
                </Avatar>
                <Box sx={{ display: { xs: "none", sm: "block" } }}>
                    <Typography sx={{ fontSize: 13, fontWeight: 700, color: dash.navy, lineHeight: 1.2 }}>
                        Admin
                    </Typography>
                    <Typography sx={{ fontSize: 10.5, color: dash.muted }}>Super Admin</Typography>
                </Box>
                <KeyboardArrowDownRounded sx={{ color: dash.muted, fontSize: 20 }} />
            </Box>
        </Box>
    </Box>
);

export default DashboardTopBar;