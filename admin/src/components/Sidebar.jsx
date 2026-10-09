import React, { useState } from "react";

import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  AppBar,
  Toolbar,
  Typography,
  useMediaQuery,
  Divider,
} from "@mui/material";

import {
  HomeRounded,
  DescriptionOutlined,
  WorkOutlineOutlined,
  GridViewOutlined,
  StarBorderOutlined,
  ImageOutlined,
  PersonOutlineOutlined,
  ShieldOutlined,
  EmailOutlined,
  SettingsOutlined,
  GroupOutlined,
  CollectionsOutlined,
  ContactPhoneOutlined,
  AddToPhotosOutlined,
  LogoutOutlined,
  Menu as MenuIcon,
} from "@mui/icons-material";

import { useNavigate, useLocation } from "react-router-dom";

import { useTheme } from "@mui/material/styles";

// ============================================================
// CONSTANTS
// ============================================================

const drawerWidth = 240;

// TODO: set this to the real route of your Logo Manager page
const LOGOS_PATH = "/admin/logos";

const palette = {
  bgTop: "#102640",
  bgBottom: "#0A1A2C",
  text: "#D5DEE8",
  muted: "#8FA1B5",
  lime: "#A6C23A",
  olive: "#5F7D22",
  oliveDark: "#3E5618",
  border: "rgba(255,255,255,0.16)",
  hover: "rgba(255,255,255,0.06)",
  red: "#FF8A8A",
};

// ------------------------------------------------------------
// Items in the same order and wording as the design
// ------------------------------------------------------------
const mainItems = [
  { text: "Dashboard", icon: <HomeRounded />, path: "/admin/dashboard" },
  { text: "Blog", icon: <DescriptionOutlined />, path: "/admin/blogs" },
  { text: "Portfolio / Websites", icon: <WorkOutlineOutlined />, path: "/admin/portfolio" },
  { text: "Services", icon: <GridViewOutlined />, path: "/admin/services" },
  { text: "Testimonials", icon: <StarBorderOutlined />, path: "/admin/testimonials" },
  { text: "Logos", icon: <ImageOutlined />, path: LOGOS_PATH },
  { text: "About", icon: <PersonOutlineOutlined />, path: "/admin/about" },
  { text: "Privacy Policy", icon: <ShieldOutlined />, path: "/admin/privacy-policy" },
  { text: "Contact Messages", icon: <EmailOutlined />, path: "/admin/messages" },
];

// ------------------------------------------------------------
// Existing routes that are NOT in the design. Kept so no link is
// lost – delete any you don't want in the menu.
// ------------------------------------------------------------
const extraItems = [
  { text: "Subscribers", icon: <GroupOutlined />, path: "/admin/subscribers" },
  { text: "Posts", icon: <CollectionsOutlined />, path: "/admin/post-design" },
  { text: "Edit Contact", icon: <ContactPhoneOutlined />, path: "/admin/edit-contact" },
  { text: "Add Website", icon: <AddToPhotosOutlined />, path: "/admin/addWebsite" },
];

const settingsItem = {
  text: "Settings",
  icon: <SettingsOutlined />,
  path: "/admin/settings",
};

// ============================================================
// BRAND MARK (placeholder – swap for your real logo image)
// ============================================================

const BrandMark = () => (
  <Box sx={{ width: 42, height: 42, mr: 1.3, flexShrink: 0 }}>
    <svg viewBox="0 0 48 48" width="42" height="42" aria-hidden>
      <defs>
        <linearGradient id="brandMarkGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#C4DB55" />
          <stop offset="100%" stopColor="#5F7D22" />
        </linearGradient>
      </defs>
      <path
        d="M37 13.5 A17 17 0 1 0 37 34.5"
        fill="none"
        stroke="url(#brandMarkGrad)"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <path
        d="M13 31 L35 19"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  </Box>
);

// ============================================================
// SIDEBAR
// ============================================================

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [open, setOpen] = useState(false);

  // ==========================================================
  // HANDLERS
  // ==========================================================

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) setOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const isActivePath = (path) =>
    location.pathname === path || location.pathname.startsWith(`${path}/`);

  // ==========================================================
  // SHARED ITEM STYLES
  // ==========================================================

  const activeBg = `linear-gradient(90deg, ${palette.olive} 0%, ${palette.oliveDark} 100%)`;

  const itemSx = (isActive) => ({
    minHeight: 44,
    px: 1.6,
    borderRadius: "10px",
    color: isActive ? "#FFFFFF" : palette.text,
    background: isActive ? activeBg : "transparent",
    border: isActive ? "1px solid rgba(166,194,58,0.55)" : "1px solid transparent",
    boxShadow: isActive ? "0 4px 14px rgba(95,125,34,0.30)" : "none",
    transition: "background 0.2s ease, color 0.2s ease",
    "&:hover": {
      background: isActive ? activeBg : palette.hover,
      color: "#FFFFFF",
    },
  });

  const iconSx = (isActive) => ({
    minWidth: 36,
    color: isActive ? palette.lime : palette.muted,
    "& svg": { fontSize: 20 },
    ".MuiListItemButton-root:hover &": { color: palette.lime },
  });

  const renderItem = (item) => {
    const isActive = isActivePath(item.path);

    return (
      <ListItem key={item.text} disablePadding sx={{ mb: 0.6 }}>
        <ListItemButton onClick={() => handleNavigation(item.path)} sx={itemSx(isActive)}>
          <ListItemIcon sx={iconSx(isActive)}>{item.icon}</ListItemIcon>
          <ListItemText
            primary={item.text}
            primaryTypographyProps={{
              fontSize: 13,
              fontWeight: isActive ? 700 : 500,
              whiteSpace: "nowrap",
            }}
          />
        </ListItemButton>
      </ListItem>
    );
  };

  // ==========================================================
  // DRAWER CONTENT
  // ==========================================================

  const drawerContent = (
    <Box
      sx={{
        position: "relative",
        width: drawerWidth,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: `linear-gradient(180deg, ${palette.bgTop} 0%, ${palette.bgBottom} 100%)`,
        overflow: "hidden",
      }}
    >
      {/* ---------- Diagonal bands (bottom-left → up-right) ---------- */}
      {[
        { left: -34, width: 78, height: 380, opacity: 0.85 },
        { left: 66, width: 30, height: 300, opacity: 0.55 },
        { left: 118, width: 14, height: 240, opacity: 0.35 },
      ].map((band, i) => (
        <Box
          key={i}
          aria-hidden
          sx={{
            position: "absolute",
            left: band.left,
            bottom: -70,
            width: band.width,
            height: band.height,
            transform: "rotate(36deg)",
            transformOrigin: "bottom left",
            background: `linear-gradient(to top, ${palette.olive} 0%, ${palette.lime} 55%, rgba(166,194,58,0) 100%)`,
            opacity: band.opacity,
            pointerEvents: "none",
          }}
        />
      ))}

      {/* ---------- Brand ---------- */}
      <Box
        sx={{
          height: 84,
          display: "flex",
          alignItems: "center",
          px: 2.4,
          flexShrink: 0,
          position: "relative",
        }}
      >
        <BrandMark />

        <Box sx={{ minWidth: 0 }}>
          <Typography
            sx={{
              color: "#FFFFFF",
              fontSize: 19,
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.2px",
            }}
          >
            Cloudix{" "}
            <Box component="span" sx={{ color: palette.lime }}>
              Soft
            </Box>
          </Typography>

          <Typography sx={{ color: palette.muted, fontSize: 10.5, fontWeight: 500, mt: 0.3 }}>
            Ideas to Impact
          </Typography>
        </Box>
      </Box>

      {/* ---------- Navigation ---------- */}
      <Box
        sx={{
          flex: 1,
          position: "relative",
          overflowY: "auto",
          overflowX: "hidden",
          px: 1.6,
          py: 1,
          "&::-webkit-scrollbar": { width: 4 },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(255,255,255,0.18)",
            borderRadius: 10,
          },
        }}
      >
        <List disablePadding>
          {mainItems.map(renderItem)}
          {extraItems.map(renderItem)}
        </List>

        <Divider sx={{ borderColor: palette.border, my: 1.4, mx: 0.6 }} />

        <List disablePadding>
          {renderItem(settingsItem)}

          {/* Logout (not in the design, but needed) */}
          <ListItem disablePadding>
            <ListItemButton
              onClick={handleLogout}
              sx={{
                ...itemSx(false),
                "&:hover": { background: "rgba(255,138,138,0.10)", color: palette.red },
              }}
            >
              <ListItemIcon
                sx={{
                  ...iconSx(false),
                  ".MuiListItemButton-root:hover &": { color: palette.red },
                }}
              >
                <LogoutOutlined />
              </ListItemIcon>
              <ListItemText
                primary="Logout"
                primaryTypographyProps={{ fontSize: 13, fontWeight: 500 }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  );

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <>
      {/* ---------- Mobile app bar ---------- */}
      {isMobile && (
        <AppBar
          position="fixed"
          elevation={0}
          sx={{
            backgroundColor: palette.bgTop,
            color: "#FFFFFF",
            borderBottom: `1px solid ${palette.border}`,
            zIndex: theme.zIndex.drawer + 1,
          }}
        >
          <Toolbar sx={{ minHeight: "62px !important", px: 2 }}>
            <IconButton edge="start" onClick={() => setOpen(true)} sx={{ color: "#FFFFFF", mr: 1 }}>
              <MenuIcon />
            </IconButton>

            <Box>
              <Typography sx={{ fontSize: 15, fontWeight: 800, lineHeight: 1.1 }}>
                Cloudix{" "}
                <Box component="span" sx={{ color: palette.lime }}>
                  Soft
                </Box>
              </Typography>
              <Typography sx={{ fontSize: 10, color: palette.muted, mt: 0.2 }}>
                Ideas to Impact
              </Typography>
            </Box>
          </Toolbar>
        </AppBar>
      )}

      {/* ---------- Desktop sidebar ---------- */}
      {!isMobile && (
        <Drawer
          variant="permanent"
          open
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              border: "none",
              background: palette.bgBottom,
              overflow: "hidden",
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}

      {/* ---------- Mobile drawer ---------- */}
      {isMobile && (
        <Drawer
          variant="temporary"
          open={open}
          onClose={() => setOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              border: "none",
              background: palette.bgBottom,
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}
    </>
  );
};

export default Sidebar;