import React from "react";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import {
    ArrowForwardRounded,
    ArticleOutlined,
    WorkOutlineRounded,
    StarBorderRounded,
    ImageOutlined,
    GridViewOutlined,
} from "@mui/icons-material";
import { dash, cardSx } from "./dashboardPalette";

const QuickAction = ({ title, icon, background, color, onClick }) => (
    <Box
        onClick={onClick}
        sx={{
            p: 2,
            borderRadius: "12px",
            backgroundColor: background,
            border: `1px solid ${dash.border}`,
            cursor: "pointer",
            textAlign: "center",
            transition: "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",
            "&:hover": {
                transform: "translateY(-3px)",
                borderColor: color,
                boxShadow: "0 8px 20px rgba(16,38,64,0.08)",
            },
        }}
    >
        <Box
            sx={{
                width: 46,
                height: 46,
                mx: "auto",
                mb: 1.2,
                borderRadius: "50%",
                display: "grid",
                placeItems: "center",
                backgroundColor: "rgba(255,255,255,0.7)",
                color,
            }}
        >
            {icon}
        </Box>
        <Typography sx={{ color: dash.navy, fontSize: 12, fontWeight: 600 }}>{title}</Typography>
    </Box>
);

const QuickActions = ({
    onAddBlog,
    onAddWebsite,
    onAddTestimonial,
    onAddLogo,
    onAddService,
    onViewAll,
}) => (
    <Paper elevation={0} sx={{ ...cardSx, p: { xs: 2, md: 2.5 } }}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 2 }}>
            <Box>
                <Typography sx={{ color: dash.navy, fontSize: 18, fontWeight: 800 }}>
                    Quick Actions
                </Typography>
                <Typography sx={{ color: dash.muted, fontSize: 12.5, mt: 0.4 }}>
                    Manage your website content
                </Typography>
            </Box>

            <Button
                variant="contained"
                size="small"
                endIcon={<ArrowForwardRounded />}
                onClick={onViewAll}
                sx={{
                    textTransform: "none",
                    fontWeight: 600,
                    borderRadius: "8px",
                    boxShadow: "none",
                    backgroundColor: dash.green,
                    "&:hover": { backgroundColor: dash.greenDark, boxShadow: "none" },
                }}
            >
                View All
            </Button>
        </Stack>

        <Box
            sx={{
                display: "grid",
                gap: 1.5,
                gridTemplateColumns: { xs: "repeat(2, 1fr)", sm: "repeat(5, 1fr)" },
            }}
        >
            <QuickAction
                title="Add Blog"
                icon={<ArticleOutlined />}
                background={dash.greenLight}
                color={dash.green}
                onClick={onAddBlog}
            />
            <QuickAction
                title="Add Website"
                icon={<WorkOutlineRounded />}
                background={dash.blueLight}
                color={dash.navy}
                onClick={onAddWebsite}
            />
            <QuickAction
                title="Add Testimonial"
                icon={<StarBorderRounded />}
                background={dash.limeLight}
                color={dash.green}
                onClick={onAddTestimonial}
            />
            <QuickAction
                title="Add Logo"
                icon={<ImageOutlined />}
                background={dash.lavenderLight}
                color={dash.purple}
                onClick={onAddLogo}
            />
            <QuickAction
                title="Add Service"
                icon={<GridViewOutlined />}
                background={dash.lavenderLight}
                color={dash.purple}
                onClick={onAddService}
            />
        </Box>
    </Paper>
);

export default QuickActions;