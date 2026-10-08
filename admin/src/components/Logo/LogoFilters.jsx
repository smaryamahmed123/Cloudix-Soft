import React from "react";
import {
    Box,
    Button,
    MenuItem,
    Paper,
    Stack,
    TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

export default function LogoFilters({
    search,
    setSearch,
    status,
    setStatus,
    dateRange,
    setDateRange,
    onReset,
}) {
    return (
        <Paper
            sx={{
                p: 2,
                borderRadius: 3,
                border: "1px solid",
                borderColor: "dash.border",
            }}
        >
            <Stack
                direction={{ xs: "column", md: "row" }}
                spacing={1.5}
            >
                <TextField
                    fullWidth
                    size="small"
                    placeholder="Search logos..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <SearchIcon
                                sx={{
                                    mr: 1,
                                    color: "dash.muted",
                                }}
                            />
                        ),
                    }}
                />

                <TextField
                    select
                    size="small"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    sx={{
                        minWidth: { md: 170 },
                    }}
                >
                    <MenuItem value="all">All Status</MenuItem>
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="hidden">Hidden</MenuItem>
                </TextField>

                <TextField
                    select
                    size="small"
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                    sx={{
                        minWidth: { md: 180 },
                    }}
                    displayEmpty
                >
                    <MenuItem value="">All Dates</MenuItem>
                    <MenuItem value="today">Today</MenuItem>
                    <MenuItem value="7days">Last 7 Days</MenuItem>
                    <MenuItem value="30days">Last 30 Days</MenuItem>
                </TextField>

                <Button
                    variant="outlined"
                    startIcon={<RestartAltIcon />}
                    onClick={onReset}
                    sx={{
                        minWidth: 110,
                        borderColor: "dash.border",
                        color: "dash.navy",
                    }}
                >
                    Reset
                </Button>
            </Stack>
        </Paper>
    );
}