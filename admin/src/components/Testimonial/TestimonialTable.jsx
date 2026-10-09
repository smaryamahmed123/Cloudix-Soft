import React from "react";
import { Box, Button, IconButton, Rating, Tooltip, Typography } from "@mui/material";
import {
    AddRounded,
    DeleteOutline,
    DragIndicatorRounded,
    PlayCircleOutline,
    StarRounded,
    VisibilityOutlined,
} from "@mui/icons-material";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { dash } from "../Dashboard/dashboardPalette";

// Shared by header + rows so columns always line up
const GRID = "48px 36px minmax(220px, 1fr) 96px 130px minmax(180px, 1.2fr) 130px 96px";

const cellSx = { minWidth: 0, display: "flex", alignItems: "center" };

const initials = (name = "") =>
    name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((p) => p.charAt(0).toUpperCase())
        .join("") || "?";

const TestimonialTable = ({
    testimonials,
    hasAny,
    dragEnabled,
    onReorder,
    onView,
    onDelete,
    onAdd,
    disabled,
}) => {
    const handleDragEnd = (result) => {
        if (!result.destination || result.destination.index === result.source.index) return;
        onReorder(result.source.index, result.destination.index);
    };

    return (
        <Box sx={{ overflowX: "auto" }}>
            <Box sx={{ minWidth: 1060 }}>
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
                    {["", "#", "Client", "Type", "Rating", "Feedback", "Status", "Actions"].map((h, i) => (
                        <Typography key={i} sx={{ fontSize: 12.5, fontWeight: 600, color: dash.navy }}>
                            {h}
                        </Typography>
                    ))}
                </Box>

                {/* ---------- Rows ---------- */}
                {testimonials.length === 0 ? (
                    <Box sx={{ py: 8, textAlign: "center" }}>
                        <Typography sx={{ color: dash.navy, fontWeight: 700, fontSize: 14 }}>
                            {hasAny ? "No testimonials match your filters" : "No testimonials yet"}
                        </Typography>
                        <Typography sx={{ color: dash.muted, fontSize: 12.5, mt: 0.5 }}>
                            {hasAny ? "Try a different keyword, type or status." : "Add your first client testimonial."}
                        </Typography>
                        {!hasAny && (
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
                                Add Testimonial
                            </Button>
                        )}
                    </Box>
                ) : (
                    <DragDropContext onDragEnd={handleDragEnd}>
                        <Droppable droppableId="testimonials">
                            {(dropProvided) => (
                                <Box ref={dropProvided.innerRef} {...dropProvided.droppableProps}>
                                    {testimonials.map((t, index) => {
                                        const isVideo = t.type === "video";
                                        const sub = [t.position, t.companyName].filter(Boolean).join(" · ");

                                        return (
                                            <Draggable
                                                key={t._id}
                                                draggableId={String(t._id)}
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
                                                            py: 1.5,
                                                            backgroundColor: snap.isDragging ? "#FFFFFF" : "transparent",
                                                            boxShadow: snap.isDragging ? "0 10px 30px rgba(16,38,64,0.15)" : "none",
                                                            borderRadius: snap.isDragging ? "10px" : 0,
                                                            borderBottom: `1px solid ${dash.border}`,
                                                            opacity: t.isPublished || snap.isDragging ? 1 : 0.8,
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

                                                        {/* Client */}
                                                        <Box sx={{ ...cellSx, gap: 1.4 }}>
                                                            <Box
                                                                sx={{
                                                                    width: 44,
                                                                    height: 44,
                                                                    flexShrink: 0,
                                                                    borderRadius: "50%",
                                                                    overflow: "hidden",
                                                                    display: "grid",
                                                                    placeItems: "center",
                                                                    backgroundColor: dash.greenLight,
                                                                    color: dash.green,
                                                                    fontSize: 15,
                                                                    fontWeight: 800,
                                                                }}
                                                            >
                                                                {t.clientImage ? (
                                                                    <Box
                                                                        component="img"
                                                                        src={t.clientImage}
                                                                        alt=""
                                                                        sx={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                                                                    />
                                                                ) : isVideo ? (
                                                                    <PlayCircleOutline />
                                                                ) : (
                                                                    initials(t.clientName)
                                                                )}
                                                            </Box>
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
                                                                    {t.clientName}
                                                                </Typography>
                                                                {sub && (
                                                                    <Typography
                                                                        sx={{
                                                                            color: dash.muted,
                                                                            fontSize: 12,
                                                                            mt: 0.2,
                                                                            overflow: "hidden",
                                                                            textOverflow: "ellipsis",
                                                                            whiteSpace: "nowrap",
                                                                        }}
                                                                    >
                                                                        {sub}
                                                                    </Typography>
                                                                )}
                                                            </Box>
                                                        </Box>

                                                        {/* Type */}
                                                        <Box sx={cellSx}>
                                                            <Box
                                                                sx={{
                                                                    display: "inline-flex",
                                                                    alignItems: "center",
                                                                    gap: 0.6,
                                                                    px: 1.3,
                                                                    py: 0.5,
                                                                    borderRadius: "8px",
                                                                    fontSize: 11.5,
                                                                    fontWeight: 600,
                                                                    backgroundColor: isVideo ? "#F0EEFB" : "#E9F0FB",
                                                                    color: isVideo ? "#6A5BC2" : "#3B6AB5",
                                                                }}
                                                            >
                                                                {isVideo && <PlayCircleOutline sx={{ fontSize: 14 }} />}
                                                                {isVideo ? "Video" : "Text"}
                                                            </Box>
                                                        </Box>

                                                        {/* Rating */}
                                                        <Box sx={cellSx}>
                                                            {!isVideo && t.rating ? (
                                                                <Rating
                                                                    value={Number(t.rating) || 0}
                                                                    readOnly
                                                                    size="small"
                                                                    precision={0.5}
                                                                    sx={{ color: "#E3A81C" }}
                                                                />
                                                            ) : (
                                                                <Typography sx={{ color: dash.muted, fontSize: 12.5 }}>—</Typography>
                                                            )}
                                                        </Box>

                                                        {/* Feedback */}
                                                        <Typography
                                                            sx={{
                                                                color: dash.muted,
                                                                fontSize: 12.5,
                                                                lineHeight: 1.55,
                                                                fontStyle: isVideo ? "italic" : "normal",
                                                                display: "-webkit-box",
                                                                WebkitLineClamp: 2,
                                                                WebkitBoxOrient: "vertical",
                                                                overflow: "hidden",
                                                            }}
                                                        >
                                                            {isVideo ? "Video testimonial — open to watch" : t.text}
                                                        </Typography>

                                                        {/* Status */}
                                                        <Box sx={{ display: "grid", gap: 0.6, justifyItems: "start" }}>
                                                            <Box
                                                                sx={{
                                                                    display: "inline-flex",
                                                                    alignItems: "center",
                                                                    gap: 0.8,
                                                                    px: 1.3,
                                                                    py: 0.4,
                                                                    borderRadius: "8px",
                                                                    fontSize: 11.5,
                                                                    fontWeight: 600,
                                                                    backgroundColor: t.isPublished ? "#EAF5E3" : "#F1F3F5",
                                                                    color: t.isPublished ? "#3E7A1E" : dash.muted,
                                                                }}
                                                            >
                                                                <Box
                                                                    sx={{
                                                                        width: 7,
                                                                        height: 7,
                                                                        borderRadius: "50%",
                                                                        backgroundColor: t.isPublished ? "#4CAF50" : "#A2AFB9",
                                                                    }}
                                                                />
                                                                {t.isPublished ? "Published" : "Hidden"}
                                                            </Box>

                                                            {t.isFeatured && (
                                                                <Box
                                                                    sx={{
                                                                        display: "inline-flex",
                                                                        alignItems: "center",
                                                                        gap: 0.5,
                                                                        px: 1.2,
                                                                        py: 0.3,
                                                                        borderRadius: "8px",
                                                                        fontSize: 11,
                                                                        fontWeight: 600,
                                                                        backgroundColor: "#FDF3D6",
                                                                        color: "#8A6200",
                                                                    }}
                                                                >
                                                                    <StarRounded sx={{ fontSize: 13 }} />
                                                                    Featured
                                                                </Box>
                                                            )}
                                                        </Box>

                                                        {/* Actions */}
                                                        <Box sx={{ ...cellSx, gap: 1 }}>
                                                            <Tooltip title={isVideo ? "Watch" : "View"}>
                                                                <IconButton
                                                                    size="small"
                                                                    onClick={() => onView(t)}
                                                                    sx={{
                                                                        width: 36,
                                                                        height: 36,
                                                                        borderRadius: "10px",
                                                                        backgroundColor: "#EEF1F4",
                                                                        color: dash.navy,
                                                                    }}
                                                                >
                                                                    <VisibilityOutlined sx={{ fontSize: 18 }} />
                                                                </IconButton>
                                                            </Tooltip>
                                                            <Tooltip title="Delete">
                                                                <IconButton
                                                                    size="small"
                                                                    disabled={disabled}
                                                                    onClick={() => onDelete(t)}
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

export default TestimonialTable;