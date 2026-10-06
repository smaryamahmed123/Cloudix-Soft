import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: { main: "#2C3E50", },
    secondary: { main: "#18BC9C", },
    background: { default: "#F5F7F9", paper: "#FFFFFF", },
    error: { main: "#E74C3C", },
    text: { primary: "#263238", secondary: "#7A8793", },
    divider: "#E6EBEF",
  },
  typography: {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    h4: { fontWeight: 800, },
    h5: { fontWeight: 800, },
    h6: { fontWeight: 700, },
    body1: { fontSize: 15, },
    body2: { fontSize: 13, },
  },
  shape: { borderRadius: 14, },
  components: { MuiButton: { styleOverrides: { root: { textTransform: "none", fontWeight: 700, borderRadius: 10, }, }, }, MuiPaper: { styleOverrides: { root: { borderRadius: 18, backgroundImage: "none", }, }, }, MuiCard: { styleOverrides: { root: { borderRadius: 18, boxShadow: "none", border: "1px solid #E6EBEF", }, }, }, MuiChip: { styleOverrides: { root: { fontWeight: 600, }, }, }, MuiListItemButton: { styleOverrides: { root: { borderRadius: 10, marginBottom: 3, }, }, }, },
}); export default theme;