import React from "react";
import { Box, Typography } from "@mui/material";
import { dash, cardSx } from "../Dashboard/dashboardPalette";

// Shared text-field styling (green focus ring, rounded corners)
export const fieldSx = {
    "& .MuiOutlinedInput-root": {
        borderRadius: "10px",
        backgroundColor: "#FFFFFF",
        "& fieldset": { borderColor: dash.border },
        "&:hover fieldset, &.Mui-focused fieldset": { borderColor: dash.green },
    },
    "& .MuiInputLabel-root.Mui-focused": { color: dash.green },
};

// Titled card wrapper used by every block on the page
export const SectionCard = ({ title, hint, action, children }) => (
    <Box sx={{ ...cardSx, p: { xs: 2, md: 3 } }}>
        <Box
            sx={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: 1.5,
                mb: 2.5,
            }}
        >
            <Box>
                <Typography sx={{ color: dash.navy, fontSize: 18, fontWeight: 800 }}>{title}</Typography>
                {hint && <Typography sx={{ color: dash.muted, fontSize: 12.5, mt: 0.4 }}>{hint}</Typography>}
            </Box>
            {action}
        </Box>
        {children}
    </Box>
);