import React from "react";
import { Box, Button, Dialog, IconButton, Typography } from "@mui/material";
import {
    CheckCircleOutline,
    Close,
    DeleteOutline,
    EmailOutlined,
    PhoneOutlined,
    ReplyRounded,
    WorkOutlineRounded,
} from "@mui/icons-material";
import { dash } from "../Dashboard/dashboardPalette";

const Info = ({ icon, label, children }) => (
    <Box sx={{ display: "flex", gap: 1.4, alignItems: "flex-start", minWidth: 0 }}>
        <Box
            sx={{
                width: 34,
                height: 34,
                flexShrink: 0,
                borderRadius: "10px",
                display: "grid",
                placeItems: "center",
                backgroundColor: dash.greenLight,
                color: dash.green,
                "& svg": { fontSize: 18 },
            }}
        >
            {icon}
        </Box>
        <Box sx={{ minWidth: 0 }}>
            <Typography sx={{ color: dash.muted, fontSize: 11 }}>{label}</Typography>
            <Typography sx={{ color: dash.navy, fontSize: 13.5, fontWeight: 600, wordBreak: "break-word" }}>
                {children}
            </Typography>
        </Box>
    </Box>
);

const MessageDetailDialog = ({ message, onClose, onVerify, onDelete }) => {
    const open = Boolean(message);
    const verified = message?.status === "verified";
    const date = message?.createdAt ? new Date(message.createdAt) : null;
    const validDate = date && !Number.isNaN(date.getTime());

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
            PaperProps={{ sx: { borderRadius: "16px", boxShadow: "0 25px 70px rgba(16,38,64,0.18)" } }}
        >
            {message && (
                <>
                    {/* Header */}
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: 2,
                            px: 3,
                            py: 2,
                            borderBottom: `1px solid ${dash.border}`,
                        }}
                    >
                        <Box sx={{ minWidth: 0 }}>
                            <Typography sx={{ color: dash.navy, fontSize: 18, fontWeight: 800 }}>{message.name}</Typography>
                            <Typography sx={{ color: dash.muted, fontSize: 12, mt: 0.3 }}>
                                {validDate
                                    ? `Received ${date.toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                        year: "numeric",
                                    })} at ${date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}`
                                    : "Contact message"}
                            </Typography>
                        </Box>

                        <IconButton
                            onClick={onClose}
                            sx={{ color: dash.muted, backgroundColor: "#F3F6F8", "&:hover": { backgroundColor: "#E8EDF0" } }}
                        >
                            <Close />
                        </IconButton>
                    </Box>

                    {/* Body */}
                    <Box sx={{ p: 3 }}>
                        <Box sx={{ display: "grid", gap: 2, gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, mb: 3 }}>
                            <Info icon={<EmailOutlined />} label="Email">
                                <Box
                                    component="a"
                                    href={`mailto:${message.email}`}
                                    sx={{ color: "inherit", textDecoration: "none", "&:hover": { textDecoration: "underline" } }}
                                >
                                    {message.email}
                                </Box>
                            </Info>

                            <Info icon={<PhoneOutlined />} label="Phone">
                                {message.phoneNo ? (
                                    <Box
                                        component="a"
                                        href={`tel:${message.phoneNo}`}
                                        sx={{ color: "inherit", textDecoration: "none", "&:hover": { textDecoration: "underline" } }}
                                    >
                                        {message.phoneNo}
                                    </Box>
                                ) : (
                                    "—"
                                )}
                            </Info>

                            <Info icon={<WorkOutlineRounded />} label="Service">
                                {message.service || "Not selected"}
                            </Info>

                            <Info icon={<CheckCircleOutline />} label="Status">
                                <Box
                                    component="span"
                                    sx={{
                                        display: "inline-block",
                                        px: 1.2,
                                        py: 0.2,
                                        borderRadius: "8px",
                                        fontSize: 12,
                                        fontWeight: 700,
                                        backgroundColor: verified ? "#EAF5E3" : "#FDF3D6",
                                        color: verified ? "#3E7A1E" : "#8A6200",
                                    }}
                                >
                                    {verified ? "Verified" : message.status ? message.status : "Pending"}
                                </Box>
                            </Info>
                        </Box>

                        <Typography sx={{ color: dash.navy, fontSize: 13, fontWeight: 700, mb: 1 }}>Message</Typography>
                        <Box
                            sx={{
                                p: 2,
                                borderRadius: "12px",
                                backgroundColor: "#F8FAFB",
                                border: `1px solid ${dash.border}`,
                                color: dash.navy,
                                fontSize: 13.5,
                                lineHeight: 1.7,
                                whiteSpace: "pre-wrap",
                                wordBreak: "break-word",
                                maxHeight: 260,
                                overflowY: "auto",
                            }}
                        >
                            {message.message}
                        </Box>
                    </Box>

                    {/* Actions */}
                    <Box
                        sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            justifyContent: "space-between",
                            gap: 1.5,
                            px: 3,
                            pb: 3,
                        }}
                    >
                        <Button
                            onClick={() => onDelete(message)}
                            startIcon={<DeleteOutline />}
                            sx={{ textTransform: "none", fontWeight: 700, color: dash.red }}
                        >
                            Delete
                        </Button>

                        <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
                            <Button
                                component="a"
                                href={`mailto:${message.email}`}
                                variant="outlined"
                                startIcon={<ReplyRounded />}
                                sx={{
                                    textTransform: "none",
                                    fontWeight: 600,
                                    borderRadius: "10px",
                                    color: dash.navy,
                                    borderColor: dash.border,
                                }}
                            >
                                Reply by email
                            </Button>

                            <Button
                                variant="contained"
                                disabled={verified}
                                onClick={() => onVerify(message)}
                                startIcon={<CheckCircleOutline />}
                                sx={{
                                    textTransform: "none",
                                    fontWeight: 700,
                                    borderRadius: "10px",
                                    boxShadow: "none",
                                    backgroundColor: dash.green,
                                    "&:hover": { backgroundColor: dash.greenDark, boxShadow: "none" },
                                }}
                            >
                                {verified ? "Verified" : "Mark as Verified"}
                            </Button>
                        </Box>
                    </Box>
                </>
            )}
        </Dialog>
    );
};

export default MessageDetailDialog;