// Shared design tokens for the dashboard (replaces theme.dashboard for these components)
export const dash = {
    navy: "#12263D",
    muted: "#566879",
    border: "#E5EAEE",
    page: "#F6F8F9",
    green: "#587318",
    greenDark: "#587318",
    greenLight: "#EEF3DC",
    lime: "#B5CC45",
    limeLight: "#FAFBE8",
    indigo: "#7C86C9",
    indigoLight: "#EEF0FA",
    blueLight: "#EEF3F8",
    lavenderLight: "#F2EFFA",
    purple: "#8A7CC9",
    red: "#E85B5B",
    shadow: "0 1px 2px rgba(16,38,64,0.04), 0 4px 14px rgba(16,38,64,0.04)",
};

export const cardSx = {
    backgroundColor: "#FFFFFF",
    border: `1px solid ${dash.border}`,
    borderRadius: "14px",
    boxShadow: dash.shadow,
};