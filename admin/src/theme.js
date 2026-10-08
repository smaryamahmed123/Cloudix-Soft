import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#18B6A5",
      light: "#55D4C7",
      dark: "#0E8F82",
      contrastText: "#FFFFFF",
    },

    secondary: {
      main: "#18344F",
      light: "#34566F",
      dark: "#102A40",
      contrastText: "#FFFFFF",
    },

    background: {
      default: "#F5F8FA",
      paper: "#FFFFFF",
    },

    text: {
      primary: "#18344F",
      secondary: "#718398",
    },

    success: {
      main: "#18B6A5",
      light: "#E7F8F5",
      dark: "#0E8F82",
    },

    error: {
      main: "#E85B5B",
      light: "#FDEEEE",
      dark: "#C94444",
    },

    warning: {
      main: "#E9B949",
      light: "#FFF8E5",
      dark: "#C28F17",
    },

    info: {
      main: "#4B91D1",
      light: "#EAF3FB",
      dark: "#3473AA",
    },

    divider: "#E4EBEF",
  },

  /*
   * Custom design tokens used throughout
   * the Cloudix Soft admin dashboard.
   */
  dashboard: {
    navy: "#18344F",
    navyDark: "#102A40",

    teal: "#18B6A5",
    tealDark: "#0E8F82",
    tealLight: "#E7F8F5",

    blue: "#4B91D1",
    blueLight: "#EAF3FB",

    purple: "#8974D8",
    purpleLight: "#F1EEFC",

    yellow: "#E9B949",
    yellowLight: "#FFF8E5",

    red: "#E85B5B",
    redLight: "#FDEEEE",

    pageBackground: "#F5F8FA",
    border: "#E4EBEF",

    muted: "#718398",

    cardShadow:
      "0 10px 30px rgba(24, 52, 79, 0.06)",

    cardShadowHover:
      "0 16px 38px rgba(24, 52, 79, 0.10)",
  },

  typography: {
    fontFamily:
      "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",

    h1: {
      fontWeight: 800,
      letterSpacing: "-1px",
    },

    h2: {
      fontWeight: 800,
      letterSpacing: "-0.8px",
    },

    h3: {
      fontWeight: 800,
      letterSpacing: "-0.6px",
    },

    h4: {
      fontWeight: 800,
      letterSpacing: "-0.5px",
    },

    h5: {
      fontWeight: 800,
      letterSpacing: "-0.3px",
    },

    h6: {
      fontWeight: 700,
    },

    body1: {
      fontSize: 14,
      lineHeight: 1.6,
    },

    body2: {
      fontSize: 13,
      lineHeight: 1.5,
    },

    button: {
      fontWeight: 700,
      textTransform: "none",
    },
  },

  shape: {
    borderRadius: 16,
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          margin: 0,
          backgroundColor: "#F5F8FA",
          color: "#18344F",
        },

        "*": {
          boxSizing: "border-box",
        },

        "::selection": {
          backgroundColor: "#BDEDE7",
          color: "#18344F",
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 700,
          borderRadius: 11,
          padding: "9px 18px",
          boxShadow: "none",
        },

        containedPrimary: {
          "&:hover": {
            backgroundColor: "#0E8F82",
            boxShadow:
              "0 8px 20px rgba(24, 182, 165, 0.22)",
          },
        },
      },
    },

    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 11,

          "&:hover": {
            backgroundColor: "#EEF7F6",
          },
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 18,
          backgroundImage: "none",
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 18,
          backgroundImage: "none",
          border: "1px solid #E4EBEF",
          boxShadow: "none",
        },
      },
    },

    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 700,
          borderRadius: 9,
        },
      },
    },

    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 11,
          marginBottom: 4,
          transition: "all 0.2s ease",

          "&:hover": {
            backgroundColor:
              "rgba(24, 182, 165, 0.08)",
          },
        },
      },
    },

    MuiTextField: {
      defaultProps: {
        size: "small",
      },

      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 11,
          },
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 11,

          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#18B6A5",
          },

          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#18B6A5",
            borderWidth: 1,
          },
        },
      },
    },

    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: "#E4EBEF",
        },
      },
    },
  },
});

export default theme;