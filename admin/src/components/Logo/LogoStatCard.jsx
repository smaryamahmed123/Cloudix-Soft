import React from "react";
import { Box, Paper, Stack, Typography } from "@mui/material";

const tintStyles = {
    green: {
        bg: "#EAF4D8",
        color: "#769914",
    },
    blue: {
        bg: "#E6F0F8",
        color: "#39739D",
    },
    orange: {
        bg: "#FFF0DD",
        color: "#D98928",
    },
    purple: {
        bg: "#EEE8F8",
        color: "#7655A6",
    },
};

export default function LogoStatCard({
    title,
    value,
    icon,
    tint = "green",
}) {
    const style = tintStyles[tint] || tintStyles.green;

    return (
        <Paper
            sx={{
                p: 2.5,
                borderRadius: 3,
                border: "1px solid",
                borderColor: "dash.border",
                boxShadow: "0 4px 18px rgba(0,0,0,0.04)",
            }}
        >
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="flex-start"
            >
                <Box>
                    <Typography
                        sx={{
                            color: "dash.muted",
                            fontSize: 13,
                            fontWeight: 600,
                        }}
                    >
                        {title}
                    </Typography>

                    <Typography
                        sx={{
                            mt: 1,
                            fontSize: 30,
                            fontWeight: 800,
                            color: "dash.navy",
                        }}
                    >
                        {value}
                    </Typography>
                </Box>

                <Box
                    sx={{
                        width: 46,
                        height: 46,
                        borderRadius: 2,
                        bgcolor: style.bg,
                        color: style.color,
                        display: "grid",
                        placeItems: "center",
                    }}
                >
                    {icon}
                </Box>
            </Stack>
        </Paper>
    );
}