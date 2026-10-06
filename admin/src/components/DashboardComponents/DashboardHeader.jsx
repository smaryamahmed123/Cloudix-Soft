
import React from "react";
import { Box, Chip, Stack, Typography } from "@mui/material";

const DashboardHeader = () => {
    return (
        <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", sm: "center" }}
            spacing={2}
            sx={{ mb: 3.5 }}
        >
            <Box>
                <Typography
                    sx={{
                        fontSize: { xs: "24px", md: "30px" },
                        fontWeight: 800,
                        color: "#2C3E50",
                        letterSpacing: "-0.5px",
                    }}
                >
                    Dashboard
                </Typography>

                <Typography
                    sx={{
                        fontSize: "13px",
                        color: "#7A8793",
                        mt: 0.5,
                    }}
                >
                    Welcome back! Here's what's happening with your website.
                </Typography>
            </Box>

            <Chip
                icon={
                    <Box
                        sx={{
                            width: 7,
                            height: 7,
                            borderRadius: "50%",
                            backgroundColor: "#18BC9C",
                        }}
                    />
                }
                label="System Online"
                sx={{
                    height: 34,
                    borderRadius: "10px",
                    backgroundColor: "#E8F8F5",
                    color: "#2C3E50",
                    fontSize: "11px",
                    fontWeight: 700,

                    "& .MuiChip-icon": {
                        ml: 1,
                    },
                }}
            />
        </Stack>
    );
};

export default DashboardHeader;