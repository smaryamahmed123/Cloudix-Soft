import React from "react";

import {
    Box,
    IconButton,
    Paper,
    Stack,
    Typography,
} from "@mui/material";

import {
    AddRounded,
    ArrowForwardRounded,
    ArticleOutlined,
    LanguageOutlined,
    MailOutlineRounded,
    SettingsOutlined,
    WorkOutlineRounded,
} from "@mui/icons-material";

import { useTheme } from "@mui/material/styles";

const QuickAction = ({
    title,
    icon,
    background,
    color,
    onClick,
}) => {
    const theme = useTheme();
    const colors = theme.dashboard;

    return (
        <Box
            onClick={onClick}
            sx={{
                flex: 1,
                minWidth: {
                    xs: "calc(50% - 6px)",
                    sm: 120,
                },
                p: 1.8,
                borderRadius: 2.5,
                backgroundColor: background,
                border: "1px solid transparent",
                cursor: "pointer",
                textAlign: "center",
                transition: "all 0.2s ease",

                "&:hover": {
                    transform: "translateY(-3px)",
                    borderColor: color,
                    backgroundColor: "#FFFFFF",
                    boxShadow: colors.cardShadow,
                },
            }}
        >
            <Box
                sx={{
                    width: 40,
                    height: 40,
                    mx: "auto",
                    mb: 1,
                    borderRadius: "50%",
                    display: "grid",
                    placeItems: "center",
                    backgroundColor: "#FFFFFF",
                    color,
                }}
            >
                {icon}
            </Box>

            <Typography
                sx={{
                    color: colors.navy,
                    fontSize: 11,
                    fontWeight: 700,
                }}
            >
                {title}
            </Typography>
        </Box>
    );
};

const QuickActions = ({
    onAddBlog,
    onAddWebsite,
    onMessages,
    onServices,
    onSettings,
}) => {
    const theme = useTheme();
    const colors = theme.dashboard;

    return (
        <Paper
            elevation={0}
            sx={{
                p: {
                    xs: 2,
                    md: 2.5,
                },
            }}
        >
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ mb: 1.8 }}
            >
                <Box>
                    <Typography
                        sx={{
                            color: colors.navy,
                            fontSize: 17,
                            fontWeight: 800,
                        }}
                    >
                        Quick Actions
                    </Typography>

                    <Typography
                        sx={{
                            color: colors.muted,
                            fontSize: 11,
                            mt: 0.3,
                        }}
                    >
                        Manage your website content
                    </Typography>
                </Box>

                <IconButton size="small">
                    <ArrowForwardRounded
                        sx={{
                            color: colors.teal,
                            fontSize: 18,
                        }}
                    />
                </IconButton>
            </Stack>

            <Stack
                direction="row"
                spacing={1.5}
                flexWrap="wrap"
                useFlexGap
            >
                <QuickAction
                    title="Add Blog"
                    icon={<ArticleOutlined />}
                    background={colors.tealLight}
                    color={colors.teal}
                    onClick={onAddBlog}
                />

                <QuickAction
                    title="Add Website"
                    icon={<LanguageOutlined />}
                    background={colors.blueLight}
                    color={colors.blue}
                    onClick={onAddWebsite}
                />

                <QuickAction
                    title="Messages"
                    icon={<MailOutlineRounded />}
                    background={colors.redLight}
                    color={colors.red}
                    onClick={onMessages}
                />

                <QuickAction
                    title="Services"
                    icon={<WorkOutlineRounded />}
                    background={colors.yellowLight}
                    color={colors.yellow}
                    onClick={onServices}
                />

                <QuickAction
                    title="Settings"
                    icon={<SettingsOutlined />}
                    background={colors.purpleLight}
                    color={colors.purple}
                    onClick={onSettings}
                />
            </Stack>
        </Paper>
    );
};

export default QuickActions;