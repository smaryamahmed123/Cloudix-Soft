import { createTheme, responsiveFontSizes } from "@mui/material/styles";

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
    text: { primary: "#373C3F", secondary: "#7A7A7A" },
  },
  typography: {
    fontFamily: `"Roboto","Segoe UI",Tahoma,Geneva,Verdana,sans-serif`,

    h1: {
      fontWeight: 700,
      fontSize: "3.5rem",        // xl default
      "@media (max-width:1200px)": { fontSize: "3rem" },
      "@media (max-width:900px)":  { fontSize: "2.5rem" },
      "@media (max-width:414px)":  { fontSize: "2rem" },
    },
    h2: {
      fontWeight: 650,
      fontSize: "3rem",
      "@media (max-width:1200px)": { fontSize: "2.5rem" },
      "@media (max-width:900px)":  { fontSize: "2rem" },
      "@media (max-width:414px)":  { fontSize: "1.75rem" },
    },
    h3: {
      fontWeight: 600,
      letterSpacing: "-0.02em",
      fontSize: "2.4rem",
      "@media (max-width:1200px)": { fontSize: "2rem" },
      "@media (max-width:900px)":  { fontSize: "1.75rem" },
      "@media (max-width:414px)":  { fontSize: "1.5rem" },
    },
    h4: {
      fontWeight: 600,
      fontSize: "1.9rem",
      "@media (max-width:900px)":  { fontSize: "1.5rem" },
      "@media (max-width:414px)":  { fontSize: "1.25rem" },
    },
    h5: {
      fontWeight: 600,
      fontSize: "1.5rem",
      "@media (max-width:900px)":  { fontSize: "1.25rem" },
      "@media (max-width:414px)":  { fontSize: "1.1rem" },
    },
    h6: {
      fontWeight: 600,
      fontSize: "1.25rem",
      "@media (max-width:900px)":  { fontSize: "1.1rem" },
      "@media (max-width:414px)":  { fontSize: "0.95rem" },
    },
    body1: {
      fontSize: "1rem",
      color: "#7A7A7A",
      "@media (max-width:900px)":  { fontSize: "0.95rem" },
      "@media (max-width:414px)":  { fontSize: "0.85rem" },
    },
    body2: {
      fontSize: "0.875rem",
      "@media (max-width:414px)":  { fontSize: "0.8rem" },
    },
    button: {
      fontWeight: 600,
      textTransform: "uppercase",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: { body: { scrollBehavior: "smooth" } },
    },
    MuiButton: {
      styleOverrides: { root: { fontWeight: 600 } },
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

// ✅ This automatically scales ALL typography — use as extra safety net
theme = responsiveFontSizes(theme, { factor: 3 });

export default theme;
