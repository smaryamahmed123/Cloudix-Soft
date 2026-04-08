import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 414,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },

  shape: {
  borderRadius: 10, // Apple softness
},

custom: {
  sectionSpacing: {
    xs: 8,
    md: 14,
  },
},

  palette: {
    primary: {
      main: "#769914",
      dark: "#111E2C",
    },
    secondary: {
      main: "#BBBF19",
    },
    accent: {
      main: "#D4E157",
      light: "#A9B838",
    },
    background: {
      default: "#FFFFFF",
      paper: "#FFFFFF",
      subtle: "#F7F9FB",
    },
    text: {
      primary: "#373C3F",
      secondary: "#7A7A7A",
    },
  },

  typography: {
    fontFamily: `"Roboto","Segoe UI",Tahoma,Geneva,Verdana,sans-serif`,
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 700 },
    body1: {
      fontSize: "1rem",
      color: "#7A7A7A",
    },
    button: {
      fontWeight: 600,
      textTransform: "uppercase",
    },
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollBehavior: "smooth",
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 600,
        },
      },
      variants: [
        {
          props: { variant: "nav" },
          style: {
            textTransform: "none",
            fontSize: "1.1rem",
            color: "#7A7A7A",
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
          backdropFilter: "blur(30px)",
          backgroundColor: "rgba(255,255,255,0.9)",
        },
      },
    },

    // ✅ PROFESSIONAL LAYOUT SYSTEM
  MuiContainer: {
  styleOverrides: {
    root: ({ theme }) => ({
      paddingLeft: theme.spacing(2), // 16px
      paddingRight: theme.spacing(2),

      [theme.breakpoints.up("md")]: {
        paddingLeft: theme.spacing(6), // 48px
        paddingRight: theme.spacing(6),
      },

      [theme.breakpoints.up("lg")]: {
        paddingLeft: theme.spacing(8), // 64px
        paddingRight: theme.spacing(8),
      },
    }),
  },
},
  },
});

export default theme;
