import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  // ✅ Custom breakpoints (sm starts at 414px)
  breakpoints: {
    values: {
      xs: 0,     // phones
      sm: 414,   // small devices start from 414px
      md: 900,   // tablets
      lg: 1200,  // desktops
      xl: 1536,
    },
  },

  typography: {
    fontFamily: `"Roboto", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif`,
    h1: {
      fontWeight: "bold",
      color: "#769914",
    },
    h2: {
      fontWeight: "bold",
      color: "#769914",
    },
    h3: {
      fontWeight: "bold",
      color: "#769914",
    },
    body1: {
      color: "#7A7A7A",
      fontSize: "1rem",
    },
    button: {
      fontWeight: "bold",
      textTransform: "uppercase",
      fontFamily: `"Roboto", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif`,
    },
    navLink: {
      textTransform: "none",
      color: "#7A7A7A",
      "&:hover": {
        color: "#769914",
      },
      fontFamily: `"Roboto", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif`,
    },
  },

  palette: {
    primary: {
      main: "#769914",
    },
    secondary: {
      main: "#BBBF19",
    },
    background: {
      default: "#FFFFFF",
      paper: "white",
    },
    text: {
      primary: "#7A7A7A",
    },
  },

  spacing: 8,

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: `"Roboto", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif`,
          fontWeight: "bold",
          textTransform: "uppercase",
        },
      },
      variants: [
        {
          props: { variant: "nav" },
          style: {
            fontSize: "1.5rem",
            fontWeight: 300,
            textTransform: "none",
            color: "#7A7A7A",
            fontFamily: `"Roboto", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif`,
            "&.active": {
              color: "#769914",
            },
            "&:hover": {
              color: "#769914",
            },
          },
        },
      ],
    },

    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "rgba(255, 255, 255, 0)",
          color: "#373c3f",
          backdropFilter: "blur(50px)",
        },
      },
    },

    MuiListItemText: {
      styleOverrides: {
        root: {
          color: "#7A7A7A",
          transition: "color 0.3s",
          fontFamily: `"Roboto", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif`,
          "&:hover": {
            color: "#769914",
          },
        },
      },
    },
  },
});

export default theme;
