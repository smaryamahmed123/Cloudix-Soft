// src/theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2C3E50", // Dark Gray-Blue
    },
    secondary: {
      main: "#18BC9C", // Mint Green
    },
    background: {
      default: "#ECF0F1", // Light Gray
      paper: "#ECF0F1",
    },
    error: {
      main: "#E74C3C", // Accent Red
    },
    text: {
      primary: "#2C3E50",
    },
  },
  typography: {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    h5: {
      fontWeight: 700,
    },
    body1: {
      fontSize: 16,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: "bold",
          borderRadius: 8,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
  },
});

export default theme;
