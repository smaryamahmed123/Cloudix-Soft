import React, { useState } from "react";
import { Box, Button, IconButton, Tooltip, Typography } from "@mui/material";
import {
    DeleteOutline,
    DragIndicatorRounded,
    ImageOutlined,
    OpenInNewRounded,
    AddRounded,
} from "@mui/icons-material";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { dash } from "../Dashboard/dashboardPalette";

// Shared by header + rows so columns always line up
const GRID = "48px 40px 132px minmax(200px, 1fr) 150px 96px";

const cellSx = { minWidth: 0, display: "flex", alignItems: "center" };

// The API field name for the image isn't known from the page code, so try the common ones
export const getLogoImage = (logo) =>
    logo?.imageUrl || logo?.image || logo?.url || logo?.logo || logo?.src || "";

const Thumb = ({ src }) => {
    const [failed, setFailed] = useState(false);

    return (
        <Box
            sx={{
                width: 112,
                height: 64,
                borderRadius: "10px",
                border: `1px solid ${dash.border}`,
                backgroundColor: "#F6F8F9",
                display: "grid",
                placeItems: "center",
                overflow: "hidden",
                color: dash.muted,
            }}
        >
            {!src || failed ? (
                <ImageOutlined />
            ) : (
                <Box
                    component="img"
                    src={src}
                    alt=""
                    onError={() => setFailed(true)}
                    sx={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", p: 0.8, display: "block" }}
                />
            )}
        </Box>
    );
};

const LogoTable = ({
    logos,
    hasAnyLogos,
    dragEnabled,
    onReorder,
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
            <Box sx={{ minWidth: 760 }}>
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
                    {["", "#", "Logo", "Title", "Added", "Actions"].map((h, i) => (
                        <Typography key={i} sx={{ fontSize: 12.5, fontWeight: 600, color: dash.navy }}>
                            {h}
                        </Typography>
                    ))}
                </Box>

                {/* ---------- Rows ---------- */}
                {logos.length === 0 ? (
                    <Box sx={{ py: 8, textAlign: "center" }}>
                        <Typography sx={{ color: dash.navy, fontWeight: 700, fontSize: 14 }}>
                            {hasAnyLogos ? "No logos match your search" : "No logos yet"}
                        </Typography>
                        <Typography sx={{ color: dash.muted, fontSize: 12.5, mt: 0.5 }}>
                            {hasAnyLogos ? "Try a different keyword." : "Upload your first logo to get started."}
                        </Typography>
                        {!hasAnyLogos && (
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
                                Add New Logo
                            </Button>
                        )}
                    </Box>
                ) : (
                    <DragDropContext onDragEnd={handleDragEnd}>
                        <Droppable droppableId="logos">
                            {(dropProvided) => (
                                <Box ref={dropProvided.innerRef} {...dropProvided.droppableProps}>
                                    {logos.map((logo, index) => {
                                        const date = logo.createdAt ? new Date(logo.createdAt) : null;
                                        const validDate = date && !Number.isNaN(date.getTime());
                                        const image = getLogoImage(logo);

                                        return (
                                            <Draggable
                                                key={logo._id}
                                                draggableId={String(logo._id)}
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
                                                            title={dragEnabled ? "Drag to reorder" : "Clear search to reorder"}
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

                                                        <Thumb src={image} />

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
                                                            {logo.title || "Untitled"}
                                                        </Typography>

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
                                                            <Tooltip title={image ? "Open image" : "No image"}>
                                                                <span>
                                                                    <IconButton
                                                                        size="small"
                                                                        disabled={!image}
                                                                        component="a"
                                                                        href={image || undefined}
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
                                                                </span>
                                                            </Tooltip>

                                                            <Tooltip title="Delete">
                                                                <IconButton
                                                                    size="small"
                                                                    disabled={disabled}
                                                                    onClick={() => onDelete(logo)}
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

export default LogoTable;