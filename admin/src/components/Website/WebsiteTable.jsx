import React, { useState } from "react";
import { Box, Button, IconButton, Tooltip, Typography } from "@mui/material";
import {
    AddRounded,
    DeleteOutline,
    DragIndicatorRounded,
    ImageOutlined,
    OpenInNewRounded,
} from "@mui/icons-material";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { dash } from "../Dashboard/dashboardPalette";

// Shared by header + rows so columns always line up
const GRID = "48px 40px 128px minmax(240px, 1fr) 130px 140px 96px";

const cellSx = { minWidth: 0, display: "flex", alignItems: "center" };

export const CATEGORY_LABELS = { static: "Static", ecommerce: "E-commerce" };

const CATEGORY_TONES = {
    static: { bg: "#E9F0FB", fg: "#3B6AB5" },
    ecommerce: { bg: "#EEF3DC", fg: "#587318" },
};

const labelFor = (c = "") => CATEGORY_LABELS[c] || (c ? c.charAt(0).toUpperCase() + c.slice(1) : "Uncategorised");

const Thumb = ({ src }) => {
    const [failed, setFailed] = useState(false);

    if (!src || failed) {
        return (
            <Box
                sx={{
                    width: 112,
                    height: 64,
                    borderRadius: "8px",
                    display: "grid",
                    placeItems: "center",
                    backgroundColor: "#EEF1F4",
                    color: dash.muted,
                }}
            >
                <ImageOutlined />
            </Box>
        );
    }

    return (
        <Box
            component="img"
            src={src}
            alt=""
            onError={() => setFailed(true)}
            sx={{ width: 112, height: 64, objectFit: "cover", borderRadius: "8px", display: "block" }}
        />
    );
};

const WebsiteTable = ({ websites, hasAnyWebsites, dragEnabled, onReorder, onDelete, onAdd, disabled }) => {
    const handleDragEnd = (result) => {
        if (!result.destination || result.destination.index === result.source.index) return;
        onReorder(result.source.index, result.destination.index);
    };

    return (
        <Box sx={{ overflowX: "auto" }}>
            <Box sx={{ minWidth: 860 }}>
                {/* ---------- Header ---------- */}
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: GRID,
                        columnGap: 2,
                        alignItems: "center",
                        px: 1.5,
                        height: 48,
                        borderRadius: "10px",
                        backgroundColor: "#F3F6F8",
                        border: `1px solid ${dash.border}`,
                    }}
                >
                    {["", "#", "Preview", "Website", "Category", "Added", "Actions"].map((h, i) => (
                        <Typography key={i} sx={{ fontSize: 12.5, fontWeight: 600, color: dash.navy }}>
                            {h}
                        </Typography>
                    ))}
                </Box>

                {/* ---------- Rows ---------- */}
                {websites.length === 0 ? (
                    <Box sx={{ py: 8, textAlign: "center" }}>
                        <Typography sx={{ color: dash.navy, fontWeight: 700, fontSize: 14 }}>
                            {hasAnyWebsites ? "No websites match your filters" : "No websites yet"}
                        </Typography>
                        <Typography sx={{ color: dash.muted, fontSize: 12.5, mt: 0.5 }}>
                            {hasAnyWebsites ? "Try a different keyword or category." : "Add your first website to get started."}
                        </Typography>
                        {!hasAnyWebsites && (
                            <Button
                                variant="contained"
                                startIcon={<AddRounded />}
                                onClick={onAdd}
                                sx={{
                                    mt: 2,
                                    textTransform: "none",
                                    fontWeight: 700,
                                    borderRadius: "10px",
                                    boxShadow: "none",
                                    backgroundColor: dash.green,
                                    "&:hover": { backgroundColor: dash.greenDark, boxShadow: "none" },
                                }}
                            >
                                Add Website
                            </Button>
                        )}
                    </Box>
                ) : (
                    <DragDropContext onDragEnd={handleDragEnd}>
                        <Droppable droppableId="websites">
                            {(dropProvided) => (
                                <Box ref={dropProvided.innerRef} {...dropProvided.droppableProps}>
                                    {websites.map((site, index) => {
                                        const tone = CATEGORY_TONES[site.category] || { bg: "#F3EAFB", fg: "#7A3FB0" };
                                        const date = site.createdAt ? new Date(site.createdAt) : null;
                                        const validDate = date && !Number.isNaN(date.getTime());

                                        return (
                                            <Draggable
                                                key={site._id}
                                                draggableId={String(site._id)}
                                                index={index}
                                                isDragDisabled={!dragEnabled || disabled}
                                            >
                                                {(p, snap) => (
                                                    <Box
                                                        ref={p.innerRef}
                                                        {...p.draggableProps}
                                                        sx={{
                                                            display: "grid",
                                                            gridTemplateColumns: GRID,
                                                            columnGap: 2,
                                                            alignItems: "center",
                                                            px: 1.5,
                                                            py: 1.3,
                                                            backgroundColor: snap.isDragging ? "#FFFFFF" : "transparent",
                                                            boxShadow: snap.isDragging ? "0 10px 30px rgba(16,38,64,0.15)" : "none",
                                                            borderRadius: snap.isDragging ? "10px" : 0,
                                                            borderBottom: `1px solid ${dash.border}`,
                                                        }}
                                                    >
                                                        <Tooltip
                                                            title={dragEnabled ? "Drag to reorder" : "Clear filters to reorder"}
                                                            placement="top"
                                                        >
                                                            <Box
                                                                {...p.dragHandleProps}
                                                                sx={{
                                                                    ...cellSx,
                                                                    color: dash.muted,
                                                                    opacity: dragEnabled ? 1 : 0.35,
                                                                    cursor: dragEnabled ? "grab" : "not-allowed",
                                                                }}
                                                            >
                                                                <DragIndicatorRounded sx={{ fontSize: 20 }} />
                                                            </Box>
                                                        </Tooltip>

                                                        <Typography sx={{ color: dash.muted, fontSize: 12.5, fontWeight: 600 }}>
                                                            {index + 1}
                                                        </Typography>

                                                        <Thumb src={site.image} />

                                                        <Box sx={{ minWidth: 0 }}>
                                                            <Typography
                                                                sx={{
                                                                    color: dash.navy,
                                                                    fontSize: 13.5,
                                                                    fontWeight: 700,
                                                                    overflow: "hidden",
                                                                    textOverflow: "ellipsis",
                                                                    whiteSpace: "nowrap",
                                                                }}
                                                            >
                                                                {site.title}
                                                            </Typography>
                                                            <Typography
                                                                component="a"
                                                                href={site.link}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                sx={{
                                                                    display: "block",
                                                                    mt: 0.4,
                                                                    color: dash.green,
                                                                    fontSize: 12,
                                                                    textDecoration: "none",
                                                                    overflow: "hidden",
                                                                    textOverflow: "ellipsis",
                                                                    whiteSpace: "nowrap",
                                                                    "&:hover": { textDecoration: "underline" },
                                                                }}
                                                            >
                                                                {site.link}
                                                            </Typography>
                                                        </Box>

                                                        <Box sx={cellSx}>
                                                            <Box
                                                                sx={{
                                                                    px: 1.4,
                                                                    py: 0.5,
                                                                    borderRadius: "8px",
                                                                    fontSize: 11.5,
                                                                    fontWeight: 600,
                                                                    backgroundColor: tone.bg,
                                                                    color: tone.fg,
                                                                    whiteSpace: "nowrap",
                                                                }}
                                                            >
                                                                {labelFor(site.category)}
                                                            </Box>
                                                        </Box>

                                                        <Box>
                                                            {validDate ? (
                                                                <>
                                                                    <Typography sx={{ color: dash.navy, fontSize: 12.5 }}>
                                                                        {date.toLocaleDateString("en-US", {
                                                                            month: "short",
                                                                            day: "numeric",
                                                                            year: "numeric",
                                                                        })}
                                                                    </Typography>
                                                                    <Typography sx={{ color: dash.muted, fontSize: 11.5, mt: 0.2 }}>
                                                                        {date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
                                                                    </Typography>
                                                                </>
                                                            ) : (
                                                                <Typography sx={{ color: dash.muted, fontSize: 12.5 }}>—</Typography>
                                                            )}
                                                        </Box>

                                                        <Box sx={{ ...cellSx, gap: 1 }}>
                                                            <Tooltip title="Visit website">
                                                                <IconButton
                                                                    size="small"
                                                                    component="a"
                                                                    href={site.link}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    sx={{
                                                                        width: 36,
                                                                        height: 36,
                                                                        borderRadius: "10px",
                                                                        backgroundColor: "#EEF1F4",
                                                                        color: dash.navy,
                                                                    }}
                                                                >
                                                                    <OpenInNewRounded sx={{ fontSize: 18 }} />
                                                                </IconButton>
                                                            </Tooltip>
                                                            <Tooltip title="Delete">
                                                                <IconButton
                                                                    size="small"
                                                                    disabled={disabled}
                                                                    onClick={() => onDelete(site)}
                                                                    sx={{
                                                                        width: 36,
                                                                        height: 36,
                                                                        borderRadius: "10px",
                                                                        backgroundColor: "#FDEEEE",
                                                                        color: dash.red,
                                                                    }}
                                                                >
                                                                    <DeleteOutline sx={{ fontSize: 18 }} />
                                                                </IconButton>
                                                            </Tooltip>
                                                        </Box>
                                                    </Box>
                                                )}
                                            </Draggable>
                                        );
                                    })}
                                    {dropProvided.placeholder}
                                </Box>
                            )}
                        </Droppable>
                    </DragDropContext>
                )}
            </Box>
        </Box>
    );
};

export default WebsiteTable;