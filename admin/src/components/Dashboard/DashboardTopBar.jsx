// import React from "react";
// import { Avatar, Box, IconButton, InputBase, Typography } from "@mui/material";
// import {
//     SearchRounded,
//     NotificationsNoneRounded,
//     KeyboardArrowDownRounded,
// } from "@mui/icons-material";
// import { dash } from "./dashboardPalette";

// const DashboardTopBar = () => (
//     <Box
//         sx={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//             gap: 2,
//             px: { xs: 2, md: 4 },
//             py: 1.5,
//             backgroundColor: "#FFFFFF",
//             borderBottom: `1px solid ${dash.border}`,
//         }}
//     >
//         <Box
//             sx={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 1,
//                 width: { xs: "100%", sm: 416 },
//                 maxWidth: "100%",
//                 px: 1.5,
//                 height: 42,
//                 borderRadius: "10px",
//                 backgroundColor: "#F3F6F8",
//                 border: `1px solid ${dash.border}`,
//             }}
//         >
//             <SearchRounded sx={{ color: dash.muted, fontSize: 20 }} />
//             <InputBase
//                 placeholder="Search anything..."
//                 fullWidth
//                 sx={{ fontSize: 13, color: dash.navy }}
//             />
//         </Box>

//         <Box sx={{ display: "flex", alignItems: "center", gap: 2.5 }}>
//             <IconButton size="small" sx={{ position: "relative" }}>
//                 <NotificationsNoneRounded sx={{ color: dash.navy }} />
//                 <Box
//                     sx={{
//                         position: "absolute",
//                         top: 6,
//                         right: 7,
//                         width: 7,
//                         height: 7,
//                         borderRadius: "50%",
//                         backgroundColor: dash.red,
//                     }}
//                 />
//             </IconButton>

//             <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
//                 <Avatar
//                     sx={{
//                         width: 36,
//                         height: 36,
//                         fontSize: 15,
//                         fontWeight: 700,
//                         backgroundColor: dash.green,
//                     }}
//                 >
//                     A
//                 </Avatar>
//                 <Box sx={{ display: { xs: "none", sm: "block" } }}>
//                     <Typography sx={{ fontSize: 13, fontWeight: 700, color: dash.navy, lineHeight: 1.2 }}>
//                         Admin
//                     </Typography>
//                     <Typography sx={{ fontSize: 10.5, color: dash.muted }}>Super Admin</Typography>
//                 </Box>
//                 <KeyboardArrowDownRounded sx={{ color: dash.muted, fontSize: 20 }} />
//             </Box>
//         </Box>
//     </Box>
// );

// export default DashboardTopBar;




import React, { useState } from "react";
import {
    Avatar,
    Badge,
    Box,
    Divider,
    IconButton,
    InputBase,
    Menu,
    MenuItem,
    Tooltip,
    Typography,
} from "@mui/material";

import {
    SearchRounded,
    NotificationsNoneRounded,
    KeyboardArrowDownRounded,
    PersonOutlineRounded,
    SettingsOutlined,
    LogoutRounded,
    DashboardRounded,
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";
import { dash } from "./dashboardPalette";

const DashboardTopBar = ({
    admin = {},
    notifications = [],
    unreadCount,
    onSearch,
    onNotificationClick,
    onProfileClick,
    onSettingsClick,
    onLogout,
}) => {
    const navigate = useNavigate();

    const [search, setSearch] = useState("");
    const [profileAnchor, setProfileAnchor] = useState(null);

    const adminName = admin.name || admin.fullName || admin.username || "Admin";
    const adminRole = admin.role || "Super Admin";
    const adminEmail = admin.email || "";
    const adminImage = admin.profileImage || admin.avatar || "";

    const initial = adminName.charAt(0).toUpperCase();

    const notificationCount =
        unreadCount ?? notifications.filter((item) => !item.read).length;

    const handleSearch = (event) => {
        event.preventDefault();

        const query = search.trim();

        if (query && onSearch) {
            onSearch(query);
        }
    };

    const handleLogout = () => {
        setProfileAnchor(null);

        if (onLogout) {
            onLogout();
        }
    };

    return (
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
                minHeight: 70,
                position: "sticky",
                top: 0,
                zIndex: 1100,
            }}
        >
            {/* Search */}
            <Box
                component="form"
                onSubmit={handleSearch}
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    width: { xs: "100%", sm: 360, md: 416 },
                    maxWidth: "100%",
                    px: 1.5,
                    height: 42,
                    borderRadius: "10px",
                    backgroundColor: "#F3F6F8",
                    border: `1px solid ${dash.border}`,
                    transition: "border-color 0.2s ease",
                    "&:focus-within": {
                        borderColor: dash.green,
                    },
                }}
            >
                <SearchRounded
                    sx={{ color: dash.muted, fontSize: 20 }}
                />

                <InputBase
                    placeholder="Search anything..."
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    fullWidth
                    inputProps={{
                        "aria-label": "Search dashboard",
                    }}
                    sx={{
                        fontSize: 13,
                        color: dash.navy,
                    }}
                />
            </Box>

            {/* Right actions */}
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: { xs: 1, sm: 2.5 },
                    flexShrink: 0,
                }}
            >
                {/* Notifications */}
                <Tooltip title="Notifications">
                    <IconButton
                        onClick={onNotificationClick}
                        aria-label={`Notifications: ${notificationCount} unread`}
                        sx={{
                            color: dash.navy,
                            "&:hover": {
                                backgroundColor: "#F3F6F8",
                            },
                        }}
                    >
                        <Badge
                            badgeContent={notificationCount}
                            color="error"
                            max={99}
                            invisible={notificationCount === 0}
                        >
                            <NotificationsNoneRounded />
                        </Badge>
                    </IconButton>
                </Tooltip>

                <Divider
                    orientation="vertical"
                    flexItem
                    sx={{
                        borderColor: dash.border,
                        display: { xs: "none", sm: "block" },
                    }}
                />

                {/* Admin profile */}
                <Box
                    onClick={(event) =>
                        setProfileAnchor(event.currentTarget)
                    }
                    role="button"
                    tabIndex={0}
                    aria-haspopup="true"
                    aria-expanded={Boolean(profileAnchor)}
                    onKeyDown={(event) => {
                        if (
                            event.key === "Enter" ||
                            event.key === " "
                        ) {
                            event.preventDefault();
                            setProfileAnchor(event.currentTarget);
                        }
                    }}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: { xs: 0.8, sm: 1.2 },
                        cursor: "pointer",
                        borderRadius: "10px",
                        p: 0.5,
                        "&:hover": {
                            backgroundColor: "#F7F9FB",
                        },
                    }}
                >
                    <Avatar
                        src={adminImage || undefined}
                        alt={adminName}
                        sx={{
                            width: 36,
                            height: 36,
                            fontSize: 15,
                            fontWeight: 700,
                            backgroundColor: dash.green,
                            color: "#FFFFFF",
                        }}
                    >
                        {initial}
                    </Avatar>

                    <Box
                        sx={{
                            display: { xs: "none", sm: "block" },
                            maxWidth: 150,
                        }}
                    >
                        <Typography
                            noWrap
                            sx={{
                                fontSize: 13,
                                fontWeight: 700,
                                color: dash.navy,
                                lineHeight: 1.5,
                            }}
                        >
                            {adminName}
                        </Typography>

                        <Typography
                            noWrap
                            sx={{
                                fontSize: 10.5,
                                color: dash.muted,
                            }}
                        >
                            {adminRole}
                        </Typography>
                    </Box>

                    <KeyboardArrowDownRounded
                        sx={{
                            color: dash.muted,
                            fontSize: 20,
                        }}
                    />
                </Box>

                {/* Profile menu */}
                <Menu
                    anchorEl={profileAnchor}
                    open={Boolean(profileAnchor)}
                    onClose={() => setProfileAnchor(null)}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                    }}
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                    }}
                    slotProps={{
                        paper: {
                            sx: {
                                mt: 1.5,
                                minWidth: 220,
                                borderRadius: "12px",
                                border: `1px solid ${dash.border}`,
                                boxShadow:
                                    "0 8px 30px rgba(20, 40, 60, 0.10)",
                            },
                        },
                    }}
                >
                    <Box sx={{ px: 2, py: 1.5 }}>
                        <Typography
                            sx={{
                                fontWeight: 700,
                                color: dash.navy,
                                fontSize: 13,
                            }}
                        >
                            {adminName}
                        </Typography>

                        {adminEmail && (
                            <Typography
                                sx={{
                                    color: dash.muted,
                                    fontSize: 11,
                                    mt: 0.3,
                                    overflowWrap: "anywhere",
                                }}
                            >
                                {adminEmail}
                            </Typography>
                        )}
                    </Box>

                    <Divider sx={{ borderColor: dash.border }} />

                    <MenuItem
                        onClick={() => {
                            setProfileAnchor(null);

                            if (onProfileClick) {
                                onProfileClick();
                            } else {
                                navigate("/admin/profile");
                            }
                        }}
                    >
                        <PersonOutlineRounded
                            sx={{ mr: 1.5, fontSize: 20 }}
                        />
                        Profile
                    </MenuItem>

                    <MenuItem
                        onClick={() => {
                            setProfileAnchor(null);

                            if (onSettingsClick) {
                                onSettingsClick();
                            } else {
                                navigate("/admin/settings");
                            }
                        }}
                    >
                        <SettingsOutlined
                            sx={{ mr: 1.5, fontSize: 20 }}
                        />
                        Settings
                    </MenuItem>

                    <MenuItem
                        onClick={() => {
                            setProfileAnchor(null);
                            navigate("/admin");
                        }}
                    >
                        <DashboardRounded
                            sx={{ mr: 1.5, fontSize: 20 }}
                        />
                        Dashboard
                    </MenuItem>

                    <Divider sx={{ borderColor: dash.border }} />

                    <MenuItem
                        onClick={handleLogout}
                        sx={{
                            color: dash.red,
                            "&:hover": {
                                backgroundColor: "#FFF1F0",
                            },
                        }}
                    >
                        <LogoutRounded
                            sx={{ mr: 1.5, fontSize: 20 }}
                        />
                        Logout
                    </MenuItem>
                </Menu>
            </Box>
        </Box>
    );
};

export default DashboardTopBar;
