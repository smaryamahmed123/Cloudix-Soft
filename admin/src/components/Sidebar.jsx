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
  Divider,
} from "@mui/material";

import {
  DashboardOutlined,
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
} from "@mui/icons-material";

import {
  useNavigate,
  useLocation,
} from "react-router-dom";

import { useTheme } from "@mui/material/styles";


// ============================================================
// CONSTANTS
// ============================================================

const drawerWidth = 220;


// ============================================================
// SIDEBAR
// ============================================================

const Sidebar = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const theme = useTheme();

  const isMobile = useMediaQuery(
    theme.breakpoints.down("md")
  );

  const [open, setOpen] =
    useState(false);

  const colors = theme.dashboard || {
    navy: "#18344F",
    navyDark: "#102A40",
    teal: "#18B6A5",
    tealDark: "#0E8F82",
    tealLight: "#E7F8F5",
    pageBackground: "#F5F8FA",
    border: "#E4EBEF",
    muted: "#718398",
    red: "#E85B5B",
    redLight: "#FDEEEE",
  };


  // ==========================================================
  // NAVIGATION ITEMS
  // ==========================================================

  const items = [
    {
      text: "Dashboard",
      icon: <DashboardOutlined />,
      path: "/admin/dashboard",
    },

    {
      text: "Services",
      icon: <WorkOutline />,
      path: "/admin/services",
    },

    {
      text: "Subscribers",
      icon: <EmailOutlined />,
      path: "/admin/subscribers",
    },

    {
      text: "Blogs",
      icon: <ArticleOutlined />,
      path: "/admin/blogs",
    },

    {
      text: "Messages",
      icon: <MessageOutlined />,
      path: "/admin/messages",
    },

    {
      text: "Portfolio",
      icon: <CollectionsOutlined />,
      path: "/admin/portfolio",
    },

    {
      text: "Posts",
      icon: <ArticleOutlined />,
      path: "/admin/post-design",
    },

    {
      text: "Edit Contact",
      icon: <ContactPhoneOutlined />,
      path: "/admin/edit-contact",
    },

    {
      text: "About Us",
      icon: <InfoOutlined />,
      path: "/admin/about",
    },

    {
      text: "Add Website",
      icon: <AddToPhotosOutlined />,
      path: "/admin/addWebsite",
    },

    {
      text: "Privacy Policy",
      icon: <PolicyOutlined />,
      path: "/admin/privacy-policy",
    },

    {
      text: "Testimonials",
      icon: <RateReviewOutlined />,
      path: "/admin/testimonials",
    },
  ];


  // ==========================================================
  // HANDLE NAVIGATION
  // ==========================================================

  const handleNavigation = (path) => {
    navigate(path);

    if (isMobile) {
      setOpen(false);
    }
  };


  // ==========================================================
  // LOGOUT
  // ==========================================================

  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/login");
  };


  // ==========================================================
  // DRAWER CONTENT
  // ==========================================================

  const drawerContent = (
    <Box
      sx={{
        width: drawerWidth,

        height: "100%",

        display: "flex",

        flexDirection: "column",

        backgroundColor:
          "#ECF1F3",

        overflow: "hidden",
      }}
    >

      {/* ====================================================
          BRAND
      ==================================================== */}

      <Box
        sx={{
          height: 72,

          display: "flex",

          alignItems: "center",

          px: 2.2,

          flexShrink: 0,
        }}
      >
        <Box
          sx={{
            width: 38,
            height: 38,

            borderRadius: "11px",

            backgroundColor:
              colors.teal,

            display: "flex",

            alignItems: "center",

            justifyContent: "center",

            mr: 1.3,

            boxShadow:
              "0 6px 14px rgba(24,182,165,0.20)",
          }}
        >
          <Typography
            sx={{
              color: "#FFFFFF",

              fontWeight: 900,

              fontSize: 17,

              lineHeight: 1,
            }}
          >
            C
          </Typography>
        </Box>

        <Box
          sx={{
            minWidth: 0,
          }}
        >
          <Typography
            sx={{
              color: colors.navy,

              fontSize: 15,

              fontWeight: 800,

              lineHeight: 1.1,
            }}
          >
            Cloudix
          </Typography>

          <Typography
            sx={{
              color: colors.muted,

              fontSize: 10,

              fontWeight: 600,

              mt: 0.25,
            }}
          >
            ADMIN PANEL
          </Typography>
        </Box>
      </Box>


      <Divider
        sx={{
          borderColor:
            colors.border,
        }}
      />


      {/* ====================================================
          NAVIGATION
      ==================================================== */}

      <Box
        sx={{
          flex: 1,

          overflowY: "auto",

          overflowX: "hidden",

          px: 1.5,

          py: 1.5,

          "&::-webkit-scrollbar": {
            width: 4,
          },

          "&::-webkit-scrollbar-thumb": {
            backgroundColor:
              "#CBD5DA",

            borderRadius: 10,
          },
        }}
      >
        <List
          disablePadding
        >
          {items.map((item) => {

            const isActive =
              location.pathname ===
              item.path ||
              location.pathname.startsWith(
                `${item.path}/`
              );

            return (
              <ListItem
                key={item.text}
                disablePadding
                sx={{
                  mb: 0.45,
                }}
              >
                <ListItemButton
                  onClick={() =>
                    handleNavigation(
                      item.path
                    )
                  }
                  sx={{
                    minHeight: 42,

                    px: 1.35,

                    borderRadius: "10px",

                    color: isActive
                      ? "#FFFFFF"
                      : colors.navy,

                    backgroundColor:
                      isActive
                        ? colors.teal
                        : "transparent",

                    transition:
                      "all 0.2s ease",

                    "&:hover": {
                      backgroundColor:
                        isActive
                          ? colors.tealDark
                          : colors.tealLight,

                      color: isActive
                        ? "#FFFFFF"
                        : colors.tealDark,
                    },
                  }}
                >

                  {/* Icon */}
                  <ListItemIcon
                    sx={{
                      minWidth: 34,

                      color: "inherit",

                      display: "flex",

                      alignItems: "center",

                      "& svg": {
                        fontSize: 20,
                      },
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>


                  {/* Text */}
                  <ListItemText
                    primary={
                      item.text
                    }
                    primaryTypographyProps={{
                      fontSize: 12.5,

                      fontWeight:
                        isActive
                          ? 700
                          : 500,

                      whiteSpace:
                        "nowrap",
                    }}
                  />

                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>


      {/* ====================================================
          LOGOUT
      ==================================================== */}

      <Box
        sx={{
          px: 1.5,

          pt: 1,

          pb: 1.5,

          flexShrink: 0,

          borderTop:
            `1px solid ${colors.border}`,
        }}
      >
        <Button
          variant="outlined"

          startIcon={
            <LogoutOutlined
              sx={{
                fontSize: 19,
              }}
            />
          }

          fullWidth

          onClick={
            handleLogout
          }

          sx={{
            minHeight: 42,

            borderRadius: "10px",

            textTransform: "none",

            fontSize: 12.5,

            fontWeight: 700,

            color: colors.red,

            borderColor:
              "rgba(232,91,91,0.55)",

            backgroundColor:
              "rgba(255,255,255,0.35)",

            "&:hover": {
              color: "#D94747",

              borderColor:
                colors.red,

              backgroundColor:
                colors.redLight,
            },
          }}
        >
          Logout
        </Button>
      </Box>

    </Box>
  );


  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <>
      {/* ====================================================
          MOBILE APP BAR
      ==================================================== */}

      {isMobile && (
        <AppBar
          position="fixed"
          elevation={0}
          sx={{
            backgroundColor:
              "#FFFFFF",

            color: colors.navy,

            borderBottom:
              `1px solid ${colors.border}`,

            zIndex:
              theme.zIndex.drawer + 1,
          }}
        >
          <Toolbar
            sx={{
              minHeight:
                "62px !important",

              px: 2,
            }}
          >

            <IconButton
              edge="start"
              onClick={() =>
                setOpen(true)
              }
              sx={{
                color:
                  colors.navy,

                mr: 1,
              }}
            >
              <MenuIcon />
            </IconButton>


            <Box>
              <Typography
                sx={{
                  fontSize: 15,

                  fontWeight: 800,

                  lineHeight: 1.1,
                }}
              >
                Cloudix Admin
              </Typography>

              <Typography
                sx={{
                  fontSize: 10,

                  color:
                    colors.muted,

                  mt: 0.2,
                }}
              >
                Marketing dashboard
              </Typography>
            </Box>

          </Toolbar>
        </AppBar>
      )}


      {/* ====================================================
          DESKTOP SIDEBAR
      ==================================================== */}

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

              borderRight:
                `1px solid ${colors.border}`,

              backgroundColor:
                "#ECF1F3",

              overflow: "hidden",
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}


      {/* ====================================================
          MOBILE DRAWER
      ==================================================== */}

      {isMobile && (
        <Drawer
          variant="temporary"

          open={open}

          onClose={() =>
            setOpen(false)
          }

          ModalProps={{
            keepMounted: true,
          }}

          sx={{
            "& .MuiDrawer-paper": {
              width:
                drawerWidth,

              boxSizing:
                "border-box",

              border: "none",

              backgroundColor:
                "#ECF1F3",
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