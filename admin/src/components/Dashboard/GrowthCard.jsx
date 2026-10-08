import React from "react";

import {
    Box,
    Button,
    Paper,
    Typography,
} from "@mui/material";

import { ArrowForwardRounded } from "@mui/icons-material";

import { useTheme } from "@mui/material/styles";

const GrowthCard = () => {
    const theme = useTheme();
    const colors = theme.dashboard;

    return (
        <Paper
            elevation={0}
            sx={{
                height: "100%",
                minHeight: 185,
                p: 2.5,
                position: "relative",
                overflow: "hidden",
                color: "#FFFFFF",
                background:
                    `linear-gradient(135deg, ${colors.navy} 0%, ${colors.navyDark} 100%)`,
                border: "none",
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    width: 150,
                    height: 150,
                    borderRadius: "50%",
                    backgroundColor:
                        "rgba(24,182,165,.14)",
                    right: -55,
                    bottom: -65,
                }}
            />

            <Box
                sx={{
                    position: "relative",
                    zIndex: 2,
                }}
            >
                <Typography
                    sx={{
                        fontSize: 17,
                        fontWeight: 800,
                    }}
                >
                    Keep Growing
                </Typography>

                <Typography
                    sx={{
                        fontSize: 12,
                        color: "#AFC0CE",
                        mt: 0.2,
                    }}
                >
                    Your Marketing Agency
                </Typography>

                <Typography
                    sx={{
                        fontSize: 11,
                        color: "#C9D6DF",
                        lineHeight: 1.6,
                        mt: 1.5,
                        maxWidth: 230,
                    }}
                >
                    Great content builds trust.
                    Keep managing your website
                    and make your brand bigger.
                </Typography>

                <Button
                    variant="contained"
                    size="small"
                    endIcon={<ArrowForwardRounded />}
                    onClick={() =>
                        window.open(
                            "https://cloudixsoft.com",
                            "_blank"
                        )
                    }
                    sx={{
                        mt: 1.6,
                    }}
                >
                    Visit Website
                </Button>
            </Box>
        </Paper>
    );
};

export default GrowthCard;