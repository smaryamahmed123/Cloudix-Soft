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
  WorkOutline,
  EmailOutlined,
  ArticleOutlined,
  MessageOutlined,
  CollectionsOutlined,
  ContactPhoneOutlined,
  InfoOutlined,
  PolicyOutlined,
  Menu as MenuIcon,
  LogoutOutlined,
  AddToPhotosOutlined,
  RateReviewOutlined,
  ImageOutlined,
  WorkOutlineOutlined,
  GridViewOutlined,
  StarBorderOutlined,
  PersonOutlineOutlined,
  ShieldOutlined,
} from "@mui/icons-material";

import { useNavigate, useLocation } from "react-router-dom";

import { useTheme } from "@mui/material/styles";

// ============================================================
// CONSTANTS
// ============================================================

const drawerWidth = 240;

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
  // NAVIGATION ITEMS  (paths are unchanged)
  // ==========================================================

  const items = [
    { text: "Dashboard", icon: <HomeRounded />, path: "/admin/dashboard" },
    { text: "Services", icon: <GridViewOutlined />, path: "/admin/services" },
    { text: "Subscribers", icon: <EmailOutlined />, path: "/admin/subscribers" },
    { text: "Blog", icon: <ArticleOutlined />, path: "/admin/blogs" },
    { text: "Contact Messages", icon: <MessageOutlined />, path: "/admin/messages" },
    { text: "Portfolio", icon: <WorkOutlineOutlined />, path: "/admin/portfolio" },
    { text: "Posts", icon: <ImageOutlined />, path: "/admin/post-design" },
    { text: "Edit Contact", icon: <ContactPhoneOutlined />, path: "/admin/edit-contact" },
    { text: "About", icon: <PersonOutlineOutlined />, path: "/admin/about" },
    { text: "Add Website", icon: <AddToPhotosOutlined />, path: "/admin/addWebsite" },
    { text: "Privacy Policy", icon: <ShieldOutlined />, path: "/admin/privacy-policy" },
    { text: "Testimonials", icon: <StarBorderOutlined />, path: "/admin/testimonials" },
  ];

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

  // ==========================================================
  // SHARED ITEM STYLES
  // ==========================================================

  const itemSx = (isActive) => ({
    minHeight: 44,
    px: 1.6,
    borderRadius: "10px",
    color: isActive ? "#FFFFFF" : palette.text,
    background: isActive
      ? `linear-gradient(90deg, ${palette.olive} 0%, ${palette.oliveDark} 100%)`
      : "transparent",
    border: isActive
      ? "1px solid rgba(166,194,58,0.55)"
      : "1px solid transparent",
    boxShadow: isActive ? "0 4px 14px rgba(95,125,34,0.30)" : "none",
    transition: "background 0.2s ease, color 0.2s ease",
    "&:hover": {
      background: isActive
        ? `linear-gradient(90deg, ${palette.olive} 0%, ${palette.oliveDark} 100%)`
        : palette.hover,
      color: "#FFFFFF",
    },
  });

  const iconSx = (isActive) => ({
    minWidth: 36,
    color: isActive ? palette.lime : palette.muted,
    "& svg": { fontSize: 20 },
    ".MuiListItemButton-root:hover &": { color: palette.lime },
  });

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
      {/* ---------- Decorative diagonal stripes (bottom) ---------- */}
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          left: -40,
          bottom: -30,
          width: 190,
          height: 230,
          background: `linear-gradient(160deg, ${palette.lime} 0%, ${palette.olive} 45%, transparent 100%)`,
          opacity: 0.55,
          clipPath: "polygon(0 100%, 55% 0, 85% 0, 30% 100%)",
          pointerEvents: "none",
        }}
      />
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          left: 60,
          bottom: -30,
          width: 150,
          height: 170,
          background: `linear-gradient(160deg, ${palette.lime} 0%, ${palette.olive} 50%, transparent 100%)`,
          opacity: 0.35,
          clipPath: "polygon(0 100%, 50% 0, 70% 0, 20% 100%)",
          pointerEvents: "none",
        }}
      />

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
        <Box
          sx={{
            width: 40,
            height: 40,
            mr: 1.4,
            // borderRadius: "50%", r;el;fvl,gv0
            background: `linear-gradient(135deg, ${palette.lime}, ${palette.olive})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Typography
            sx={{
              color: palette.bgBottom,
              fontWeight: 900,
              fontSize: 22,
              lineHeight: 1,
            }}
          >
            C
          </Typography>
        </Box>

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

          <Typography
            sx={{
              color: palette.muted,
              fontSize: 10.5,
              fontWeight: 500,
              mt: 0.3,
            }}
          >
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
          {items.map((item) => {
            const isActive =
              location.pathname === item.path ||
              location.pathname.startsWith(`${item.path}/`);

            return (
              <ListItem key={item.text} disablePadding sx={{ mb: 0.6 }}>
                <ListItemButton
                  onClick={() => handleNavigation(item.path)}
                  sx={itemSx(isActive)}
                >
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
          })}
        </List>

        <Divider sx={{ borderColor: palette.border, my: 1.4 }} />

        {/* Bottom slot (Settings position in the reference) – Logout */}
        <List disablePadding>
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
            <IconButton
              edge="start"
              onClick={() => setOpen(true)}
              sx={{ color: "#FFFFFF", mr: 1 }}
            >
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