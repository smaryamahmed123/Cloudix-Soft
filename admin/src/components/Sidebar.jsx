import React, { useState } from "react";
import {
  Box,
  Button,
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
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  Work as WorkIcon,
  Article as ArticleIcon,
  Message as MessageIcon,
  Collections as CollectionsIcon,
  ContactPhone as ContactPhoneIcon,
  Info as InfoIcon,
  Policy as PolicyIcon,
  Menu as MenuIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

const drawerWidth = 220;

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = useState(false);

  const items = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
    { text: "Services", icon: <WorkIcon />, path: "/admin/services" },
    { text: "Blogs", icon: <ArticleIcon />, path: "/admin/blogs" },
    { text: "Messages", icon: <MessageIcon />, path: "/admin/messages" },
    { text: "Portfolio", icon: <CollectionsIcon />, path: "/admin-portfolio" },
    { text: "Posts", icon: <ArticleIcon />, path: "/admin-post-design" },
    { text: "Edit Contact", icon: <ContactPhoneIcon />, path: "/edit-contact" },
    { text: "About Us", icon: <InfoIcon />, path: "/admin-about" },
    { text: "Privacy Policy", icon: <PolicyIcon />, path: "/admin-privacy-policy" },
  ];

  const drawerContent = (
    <Box sx={{ width: drawerWidth,}}>
      <List sx={{ mt: 2 }}>
        {items.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                onClick={() => {
                  navigate(item.path);
                  if (isMobile) setOpen(false);
                }}
                sx={{
                  backgroundColor: isActive ? "#18BC9C" : "transparent",
                  color: isActive ? "#fff" : "#2C3E50",
                  "&:hover": { backgroundColor: "#18BC9C", color: "#fff" },
                }}
              >
                <ListItemIcon
                  sx={{ color: isActive ? "#fff" : "#2C3E50", minWidth: 40 }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      {/* Logout button */}
      <Box sx={{ px: 2, mt: 2 }}>
        <Button
          variant="outlined"
          startIcon={<LogoutIcon />}
          fullWidth
          sx={{
            color: "#E74C3C",
            borderColor: "#E74C3C",
            fontWeight: 600,
            "&:hover": { backgroundColor: "rgba(231,76,60,0.1)" },
          }}
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );

  return (
    <>
      {/* Mobile AppBar */}
      {isMobile && (
        <AppBar position="fixed" sx={{ backgroundColor: "#2C3E50", mb: 200 }}>
          <Toolbar>
            <IconButton
              color="inherit"
              edge="start"
              onClick={() => setOpen(true)}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Admin Panel
            </Typography>
          </Toolbar>
        </AppBar>
      )}

      {/* Desktop permanent drawer */}
      {!isMobile && (
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
              backgroundColor: "#ECF0F1",
              borderRight: "1px solid #ccc",
            },
          }}
          open
        >
          {drawerContent}
        </Drawer>
      )}

      {/* Mobile temporary drawer */}
      {isMobile && (
        <Drawer
          variant="temporary"
          open={open}
          onClose={() => setOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
              backgroundColor: "#ECF0F1",
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
