import React from "react";
import {
    Box,
    Divider,
    IconButton,
    Paper,
    Stack,
    Typography,
} from "@mui/material";

import {
    Article as ArticleIcon,
    ArrowForward as ArrowForwardIcon,
    Message as MessageIcon,
} from "@mui/icons-material";

import ActivityItem from "./ActivityItem";

const RecentActivity = ({
    recentBlogs,
    recentMessages,
    navigate,
}) => {
    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: {
                    xs: "1fr",
                    md: "1fr 1fr",
                },
                gap: 2.5,
            }}
        >
            {/* ================= BLOGS ================= */}

            <Paper
                elevation={0}
                sx={{
                    p: { xs: 2, md: 2.8 },
                    borderRadius: "18px",
                    border: "1px solid #E6EBEF",
                    backgroundColor: "#FFFFFF",
                }}
            >
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ mb: 1 }}
                >
                    <Box>
                        <Typography
                            sx={{
                                fontSize: "16px",
                                fontWeight: 800,
                                color: "#2C3E50",
                            }}
                        >
                            Latest Blogs
                        </Typography>

                        <Typography
                            sx={{
                                fontSize: "11px",
                                color: "#7A8793",
                                mt: 0.4,
                            }}
                        >
                            Recently published content
                        </Typography>
                    </Box>

                    <IconButton
                        size="small"
                        onClick={() => navigate("/admin/blogs")}
                        sx={{
                            backgroundColor: "#E8F8F5",

                            "&:hover": {
                                backgroundColor: "#E8F8F5",
                            },
                        }}
                    >
                        <ArrowForwardIcon
                            sx={{
                                fontSize: 17,
                                color: "#18BC9C",
                            }}
                        />
                    </IconButton>
                </Stack>

                <Divider sx={{ borderColor: "#E6EBEF", my: 1 }} />

                {recentBlogs.length > 0 ? (
                    recentBlogs.map((blog, index) => (
                        <ActivityItem
                            key={blog._id || blog.id || index}
                            icon={<ArticleIcon sx={{ fontSize: 18 }} />}
                            iconBg="#F2ECFA"
                            title={blog.title || "Untitled Blog"}
                            subtitle="Blog post published"
                            time={
                                blog.createdAt
                                    ? new Date(blog.createdAt).toLocaleDateString()
                                    : "Recently"
                            }
                        />
                    ))
                ) : (
                    <Box
                        sx={{
                            py: 5,
                            textAlign: "center",
                        }}
                    >
                        <ArticleIcon
                            sx={{
                                fontSize: 35,
                                color: "#DDE3E7",
                                mb: 1,
                            }}
                        />

                        <Typography
                            sx={{
                                fontSize: "13px",
                                color: "#7A8793",
                            }}
                        >
                            No blogs yet
                        </Typography>
                    </Box>
                )}

                {recentBlogs.length > 0 && (
                    <Box
                        onClick={() => navigate("/admin/blogs")}
                        sx={{
                            mt: 1.5,
                            pt: 1.5,
                            borderTop: "1px solid #E6EBEF",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 0.7,
                            color: "#18BC9C",
                            fontSize: "12px",
                            fontWeight: 700,

                            "&:hover": {
                                color: "#2C3E50",
                            },
                        }}
                    >
                        View all blogs
                        <ArrowForwardIcon sx={{ fontSize: 14 }} />
                    </Box>
                )}
            </Paper>

            {/* ================= MESSAGES ================= */}

            <Paper
                elevation={0}
                sx={{
                    p: { xs: 2, md: 2.8 },
                    borderRadius: "18px",
                    border: "1px solid #E6EBEF",
                    backgroundColor: "#FFFFFF",
                }}
            >
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ mb: 1 }}
                >
                    <Box>
                        <Typography
                            sx={{
                                fontSize: "16px",
                                fontWeight: 800,
                                color: "#2C3E50",
                            }}
                        >
                            Latest Messages
                        </Typography>

                        <Typography
                            sx={{
                                fontSize: "11px",
                                color: "#7A8793",
                                mt: 0.4,
                            }}
                        >
                            Recent client inquiries
                        </Typography>
                    </Box>

                    <IconButton
                        size="small"
                        onClick={() => navigate("/admin/messages")}
                        sx={{
                            backgroundColor: "#FDECEA",

                            "&:hover": {
                                backgroundColor: "#FDECEA",
                            },
                        }}
                    >
                        <ArrowForwardIcon
                            sx={{
                                fontSize: 17,
                                color: "#E74C3C",
                            }}
                        />
                    </IconButton>
                </Stack>

                <Divider sx={{ borderColor: "#E6EBEF", my: 1 }} />

                {recentMessages.length > 0 ? (
                    recentMessages.map((message, index) => (
                        <ActivityItem
                            key={message._id || message.id || index}
                            icon={<MessageIcon sx={{ fontSize: 18 }} />}
                            iconBg="#FDECEA"
                            title={
                                message.name ||
                                message.email ||
                                "New Message"
                            }
                            subtitle={
                                message.message
                                    ? message.message.slice(0, 55) +
                                    (message.message.length > 55 ? "..." : "")
                                    : "Contact inquiry"
                            }
                            time={
                                message.createdAt
                                    ? new Date(
                                        message.createdAt
                                    ).toLocaleDateString()
                                    : "Recently"
                            }
                        />
                    ))
                ) : (
                    <Box
                        sx={{
                            py: 5,
                            textAlign: "center",
                        }}
                    >
                        <MessageIcon
                            sx={{
                                fontSize: 35,
                                color: "#DDE3E7",
                                mb: 1,
                            }}
                        />

                        <Typography
                            sx={{
                                fontSize: "13px",
                                color: "#7A8793",
                            }}
                        >
                            No messages yet
                        </Typography>
                    </Box>
                )}

                {recentMessages.length > 0 && (
                    <Box
                        onClick={() => navigate("/admin/messages")}
                        sx={{
                            mt: 1.5,
                            pt: 1.5,
                            borderTop: "1px solid #E6EBEF",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 0.7,
                            color: "#E74C3C",
                            fontSize: "12px",
                            fontWeight: 700,

                            "&:hover": {
                                color: "#2C3E50",
                            },
                        }}
                    >
                        View all messages
                        <ArrowForwardIcon sx={{ fontSize: 14 }} />
                    </Box>
                )}
            </Paper>
        </Box>
    );
};

export default RecentActivity;


