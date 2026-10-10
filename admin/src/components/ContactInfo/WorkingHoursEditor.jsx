import React from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { ContentCopyRounded, DeleteSweepOutlined } from "@mui/icons-material";
import { dash } from "../Dashboard/dashboardPalette";
import { SectionCard, fieldSx } from "./contactShared";

const DAYS = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

const WorkingHoursEditor = ({ workingHours, onChange, onCopyMonday, onClearAll }) => (
    <SectionCard
        title="Working Hours"
        hint="Free text, e.g. 09:00 AM – 05:00 PM. Leave both empty for a closed day."
        action={
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                <Button
                    type="button"
                    size="small"
                    startIcon={<ContentCopyRounded sx={{ fontSize: 16 }} />}
                    onClick={onCopyMonday}
                    sx={{
                        textTransform: "none",
                        fontWeight: 600,
                        borderRadius: "8px",
                        color: dash.green,
                        backgroundColor: dash.greenLight,
                        "&:hover": { backgroundColor: "#E2EBC8" },
                    }}
                >
                    Copy Monday to weekdays
                </Button>
                <Button
                    type="button"
                    size="small"
                    startIcon={<DeleteSweepOutlined sx={{ fontSize: 17 }} />}
                    onClick={onClearAll}
                    sx={{
                        textTransform: "none",
                        fontWeight: 600,
                        borderRadius: "8px",
                        color: dash.muted,
                        backgroundColor: "#F3F6F8",
                        "&:hover": { backgroundColor: "#E8EDF0" },
                    }}
                >
                    Clear all
                </Button>
            </Box>
        }
    >
        {/* Column headings */}
        <Box
            sx={{
                display: { xs: "none", sm: "grid" },
                gridTemplateColumns: "110px 1fr 1fr",
                columnGap: 2,
                px: 0.5,
                mb: 1,
            }}
        >
            {["Day", "Opens", "Closes"].map((h) => (
                <Typography key={h} sx={{ color: dash.muted, fontSize: 12, fontWeight: 700 }}>
                    {h}
                </Typography>
            ))}
        </Box>

        <Box sx={{ display: "grid", gap: 1.4 }}>
            {DAYS.map((day) => {
                const time = workingHours?.[day] || { open: "", close: "" };

                return (
                    <Box
                        key={day}
                        sx={{
                            display: "grid",
                            gridTemplateColumns: { xs: "1fr 1fr", sm: "110px 1fr 1fr" },
                            columnGap: 2,
                            rowGap: 1,
                            alignItems: "center",
                        }}
                    >
                        <Typography
                            sx={{
                                color: dash.navy,
                                fontSize: 13.5,
                                fontWeight: 700,
                                textTransform: "capitalize",
                                gridColumn: { xs: "1 / -1", sm: "auto" },
                            }}
                        >
                            {day}
                        </Typography>

                        <TextField
                            size="small"
                            fullWidth
                            placeholder="e.g., 09:00 AM"
                            value={time.open}
                            onChange={(e) => onChange(day, "open", e.target.value)}
                            inputProps={{ "aria-label": `${day} opens` }}
                            sx={fieldSx}
                        />
                        <TextField
                            size="small"
                            fullWidth
                            placeholder="e.g., 05:00 PM"
                            value={time.close}
                            onChange={(e) => onChange(day, "close", e.target.value)}
                            inputProps={{ "aria-label": `${day} closes` }}
                            sx={fieldSx}
                        />
                    </Box>
                );
            })}
        </Box>
    </SectionCard>
);

export default WorkingHoursEditor;