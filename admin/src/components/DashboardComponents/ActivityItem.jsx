
import React from "react";
import { Avatar, Box, Stack, Typography } from "@mui/material";

const ActivityItem = ({
    icon,
    iconBg,
    title,
    subtitle,
    time,
}) => {
    return (
        <Stack
            direction="row"
            alignItems="center"
            spacing={1.5}
            sx={{
                py: 1.5,
                borderBottom: "1px solid #E6EBEF",

                "&:last-child": {
                    borderBottom: "none",
                },
            }}
        >
            <Avatar
                sx={{
                    width: 38,
                    height: 38,
                    borderRadius: "11px",
                    backgroundColor: iconBg,
                    color: "#2C3E50",
                }}
            >
                {icon}
            </Avatar>

            <Box
                sx={{
                    minWidth: 0,
                    flex: 1,
                }}
            >
                <Typography
                    sx={{
                        fontSize: "13px",
                        fontWeight: 700,
                        color: "#263238",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                    }}
                >
                    {title}
                </Typography>

                <Typography
                    sx={{
                        fontSize: "11px",
                        color: "#7A8793",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        mt: 0.3,
                    }}
                >
                    {subtitle}
                </Typography>
            </Box>

            <Typography
                sx={{
                    fontSize: "10px",
                    color: "#7A8793",
                    whiteSpace: "nowrap",
                }}
            >
                {time}
            </Typography>
        </Stack>
    );
};

export default ActivityItem;



