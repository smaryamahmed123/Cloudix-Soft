import React, { useState } from "react";
import { Box, Button, InputBase, MenuItem, Popover, TextField, Typography } from "@mui/material";
import { SearchRounded, CalendarMonthOutlined } from "@mui/icons-material";
import { dash } from "../Dashboard/dashboardPalette";

const fieldSx = {
    "& .MuiOutlinedInput-root": {
        height: 42,
        borderRadius: "10px",
        fontSize: 13,
        color: dash.navy,
        backgroundColor: "#FFFFFF",
        "& fieldset": { borderColor: dash.border },
    },
};

const BlogFilters = ({
    search,
    onSearch,
    category,
    onCategory,
    categories,
    status,
    onStatus,
    dateFrom,
    dateTo,
    onDateChange,
    onReset,
}) => {
    const [anchor, setAnchor] = useState(null);
    const hasRange = dateFrom || dateTo;

    return (
        <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 1.5, mb: 2.5 }}>
            <Box
                sx={{
                    flex: "1 1 240px",
                    minWidth: 220,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    px: 1.5,
                    height: 42,
                    borderRadius: "10px",
                    border: `1px solid ${dash.border}`,
                    backgroundColor: "#F8FAFB",
                }}
            >
                <SearchRounded sx={{ color: dash.muted, fontSize: 20 }} />
                <InputBase
                    fullWidth
                    value={search}
                    onChange={(e) => onSearch(e.target.value)}
                    placeholder="Search blog posts..."
                    sx={{ fontSize: 13, color: dash.navy }}
                />
            </Box>

            <TextField
                select
                value={category}
                onChange={(e) => onCategory(e.target.value)}
                sx={{ ...fieldSx, width: 180 }}
            >
                <MenuItem value="all">All Categories</MenuItem>
                {categories.map((c) => (
                    <MenuItem key={c} value={c}>
                        {c}
                    </MenuItem>
                ))}
            </TextField>

            <TextField
                select
                value={status}
                onChange={(e) => onStatus(e.target.value)}
                sx={{ ...fieldSx, width: 150 }}
            >
                <MenuItem value="all">All Status</MenuItem>
                <MenuItem value="published">Published</MenuItem>
                <MenuItem value="draft">Draft</MenuItem>
            </TextField>

            <Button
                onClick={(e) => setAnchor(e.currentTarget)}
                startIcon={<CalendarMonthOutlined sx={{ fontSize: 19 }} />}
                sx={{
                    height: 42,
                    width: 230,
                    justifyContent: "flex-start",
                    textTransform: "none",
                    fontSize: 13,
                    fontWeight: 400,
                    borderRadius: "10px",
                    color: hasRange ? dash.navy : dash.muted,
                    border: `1px solid ${dash.border}`,
                    backgroundColor: "#FFFFFF",
                }}
            >
                {hasRange ? `${dateFrom || "…"} – ${dateTo || "…"}` : "Select Date Range"}
            </Button>

            <Popover
                open={Boolean(anchor)}
                anchorEl={anchor}
                onClose={() => setAnchor(null)}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            >
                <Box sx={{ p: 2, display: "grid", gap: 1.5, width: 240 }}>
                    <Typography sx={{ fontSize: 12, fontWeight: 700, color: dash.navy }}>Published between</Typography>
                    <TextField
                        size="small"
                        type="date"
                        label="From"
                        InputLabelProps={{ shrink: true }}
                        value={dateFrom}
                        onChange={(e) => onDateChange(e.target.value, dateTo)}
                    />
                    <TextField
                        size="small"
                        type="date"
                        label="To"
                        InputLabelProps={{ shrink: true }}
                        value={dateTo}
                        onChange={(e) => onDateChange(dateFrom, e.target.value)}
                    />
                    <Button size="small" onClick={() => onDateChange("", "")} sx={{ textTransform: "none", color: dash.muted }}>
                        Clear dates
                    </Button>
                </Box>
            </Popover>

            <Button
                variant="outlined"
                onClick={onReset}
                sx={{
                    height: 42,
                    px: 2.5,
                    ml: { md: "auto" },
                    textTransform: "none",
                    fontWeight: 600,
                    fontSize: 13,
                    borderRadius: "10px",
                    color: dash.navy,
                    borderColor: dash.border,
                    "&:hover": { borderColor: dash.green, backgroundColor: dash.greenLight },
                }}
            >
                Reset
            </Button>
        </Box>
    );
};

export default BlogFilters;