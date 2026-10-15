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
import { Avatar, Box, ButtonBase, Divider, Menu, MenuItem, Typography } from "@mui/material";
import { KeyboardArrowDownRounded, LogoutRounded } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { dash } from "./dashboardPalette";

const DashboardTopBar = ({ admin = {}, title = "Dashboard", onLogout }) => {
    const navigate = useNavigate();
    const [anchor, setAnchor] = useState(null);

    const adminName = admin.name || admin.fullName || admin.username || "Admin";
    const adminRole = admin.role || "Super Admin";
    const adminEmail = admin.email || "";
    const adminImage = admin.profileImage || admin.avatar || "";

    const handleLogout = () => {
        setAnchor(null);
        if (onLogout) {
            onLogout();
            return;
        }
        localStorage.removeItem("token");
        navigate("/login", { replace: true });
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
                minHeight: 70,
                backgroundColor: "#FFFFFF",
                borderBottom: `1px solid ${dash.border}`,
                position: "sticky",
                top: { xs: 62, md: 0 }, // 62px = height of the fixed mobile app bar
                zIndex: 1100,
            }}
        >
            <Typography sx={{ color: dash.navy, fontSize: 18, fontWeight: 800 }}>
                {title}
            </Typography>

            <ButtonBase
                onClick={(e) => setAnchor(e.currentTarget)}
                aria-label="Open account menu"
                aria-haspopup="true"
                aria-expanded={Boolean(anchor)}
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: { xs: 0.8, sm: 1.2 },
                    borderRadius: "10px",
                    p: 0.5,
                    "&:hover": { backgroundColor: "#F7F9FB" },
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
                        backgroundColor: dash.greenDark,
                        color: "#FFFFFF",
                    }}
                >
                    {adminName.charAt(0).toUpperCase()}
                </Avatar>

                <Box sx={{ display: { xs: "none", sm: "block" }, maxWidth: 150, textAlign: "left" }}>
                    <Typography noWrap sx={{ fontSize: 13, fontWeight: 700, color: dash.navy, lineHeight: 1.5 }}>
                        {adminName}
                    </Typography>
                    <Typography noWrap sx={{ fontSize: 10.5, color: dash.muted }}>
                        {adminRole}
                    </Typography>
                </Box>

                <KeyboardArrowDownRounded sx={{ color: dash.muted, fontSize: 20 }} />
            </ButtonBase>

            <Menu
                anchorEl={anchor}
                open={Boolean(anchor)}
                onClose={() => setAnchor(null)}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                slotProps={{
                    paper: {
                        sx: {
                            mt: 1.5,
                            minWidth: 200,
                            borderRadius: "12px",
                            border: `1px solid ${dash.border}`,
                            boxShadow: "0 8px 30px rgba(20, 40, 60, 0.10)",
                        },
                    },
                }}
            >
                <Box sx={{ px: 2, py: 1.5 }}>
                    <Typography sx={{ fontWeight: 700, color: dash.navy, fontSize: 13 }}>
                        {adminName}
                    </Typography>
                    {adminEmail && (
                        <Typography sx={{ color: dash.muted, fontSize: 11, mt: 0.3, overflowWrap: "anywhere" }}>
                            {adminEmail}
                        </Typography>
                    )}
                </Box>

                <Divider sx={{ borderColor: dash.border }} />

                <MenuItem
                    onClick={handleLogout}
                    sx={{ color: "#C62828", "&:hover": { backgroundColor: "#FFF1F0" } }}
                >
                    <LogoutRounded sx={{ mr: 1.5, fontSize: 20 }} />
                    Logout
                </MenuItem>
            </Menu>
        </Box>
    );
};

export default DashboardTopBar;