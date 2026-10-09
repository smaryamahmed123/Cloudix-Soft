import React from "react";
import { Box, Button, Dialog, Typography } from "@mui/material";
import { DeleteOutline } from "@mui/icons-material";
import { dash } from "../Dashboard/dashboardPalette";

const ConfirmDeleteDialog = ({ open, name, onCancel, onConfirm, loading }) => (
    <Dialog
        open={open}
        onClose={loading ? undefined : onCancel}
        maxWidth="xs"
        fullWidth
        PaperProps={{ sx: { borderRadius: "16px", p: 1, boxShadow: "0 25px 70px rgba(16,38,64,0.18)" } }}
    >
        <Box sx={{ p: 2.5, textAlign: "center" }}>
            <Box
                sx={{
                    width: 52,
                    height: 52,
                    mx: "auto",
                    mb: 1.8,
                    borderRadius: "50%",
                    display: "grid",
                    placeItems: "center",
                    backgroundColor: "#FDEEEE",
                    color: dash.red,
                }}
            >
                <DeleteOutline />
            </Box>

            <Typography sx={{ color: dash.navy, fontSize: 18, fontWeight: 800 }}>Delete message?</Typography>
            <Typography sx={{ color: dash.muted, fontSize: 13, mt: 1, lineHeight: 1.6 }}>
                You're about to delete the message from{" "}
                <Box component="span" sx={{ color: dash.navy, fontWeight: 700 }}>
                    {name}
                </Box>
                . This action cannot be undone.
            </Typography>

            <Box sx={{ display: "flex", gap: 1.5, mt: 3 }}>
                <Button
                    fullWidth
                    variant="outlined"
                    onClick={onCancel}
                    disabled={loading}
                    sx={{ textTransform: "none", borderRadius: "10px", fontWeight: 600, color: dash.navy, borderColor: dash.border }}
                >
                    Cancel
                </Button>
                <Button
                    fullWidth
                    variant="contained"
                    onClick={onConfirm}
                    disabled={loading}
                    sx={{
                        textTransform: "none",
                        borderRadius: "10px",
                        fontWeight: 700,
                        boxShadow: "none",
                        backgroundColor: dash.red,
                        "&:hover": { backgroundColor: "#D94747", boxShadow: "none" },
                    }}
                >
                    {loading ? "Deleting..." : "Delete"}
                </Button>
            </Box>
        </Box>
    </Dialog>
);

export default ConfirmDeleteDialog;