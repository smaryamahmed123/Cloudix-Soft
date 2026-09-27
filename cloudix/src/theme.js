import { createTheme, responsiveFontSizes } from "@mui/material/styles";

// 1. Initial Theme Setup
let theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 414,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  custom: {
    sectionSpacing: {
      xs: 8,
      md: 14,
    },
  },
  palette: {
    primary: { main: "#769914", dark: "#111E2C" },
    secondary: { main: "#BBBF19" },
    accent: { main: "#D4E157", light: "#A9B838", sectionDivider: "#A9B838" },
    background: { default: "#FFFFFF", paper: "#FFFFFF", subtle: "#F7F9FB" },
    text: { primary: "#373C3F", secondary: "#FFFFFF" },
  },
  typography: {
    fontFamily: `"Poppins", sans-serif`,
    h1: { fontWeight: 700, fontSize: "3.5rem" },
    h2: { fontWeight: 650, fontSize: "3rem" },
    h3: { fontWeight: 600, letterSpacing: "-0.02em", fontSize: "2.4rem" },
    h4: { fontWeight: 600, fontSize: "1.9rem" },
    h5: { fontWeight: 600, fontSize: "1.5rem" },
    h6: { fontWeight: 600, fontSize: "1.25rem" },
    body1: { fontSize: "1rem", color: "#7A7A7A" },
    body2: { fontSize: "0.875rem" },
    button: { fontWeight: 600, textTransform: "uppercase" },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollBehavior: "smooth",
          fontFamily: `"Poppins", sans-serif`,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { fontWeight: 600 },
      },
      variants: [
        {
          props: { variant: "nav" },
          style: {
            textTransform: "none",
            fontSize: "1.1rem",
            color: "#7A7A7A",
            "&.active": { color: "#769914" },
            "&:hover": { color: "#769914" },
          },
        },
      ],
    },
    MuiContainer: {
      styleOverrides: {
        root: ({ theme }) => ({
          paddingLeft: theme.spacing(2),
          paddingRight: theme.spacing(2),
          [theme.breakpoints.up("md")]: {
            paddingLeft: theme.spacing(6),
            paddingRight: theme.spacing(6),
          },
          [theme.breakpoints.up("lg")]: {
            paddingLeft: theme.spacing(8),
            paddingRight: theme.spacing(8),
          },
        }),
      },
    },
  },
});

// 2. Automate Fluid Typography Scaling Across Custom Breakpoints
theme = responsiveFontSizes(theme, {
  breakpoints: ["xs", "sm", "md", "lg", "xl"],
  factor: 2.5,
});

export default theme;