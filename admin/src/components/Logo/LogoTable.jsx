import React from "react";
import {
    Box,
    Checkbox,
    IconButton,
    Stack,
    Tooltip,
    Typography,
} from "@mui/material";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";

import {
    DragDropContext,
    Droppable,
    Draggable,
} from "@hello-pangea/dnd";

const getImage = (logo) =>
    logo?.image ||
    logo?.imageUrl ||
    logo?.url ||
    logo?.logo ||
    "";

export default function LogoTable({
    logos,
    selected,
    onSelect,
    onSelectAll,
    allSelected,
    onEdit,
    onDelete,
    onReorder,
}) {
    const handleDragEnd = (result) => {
        if (!result.destination) return;

        const reordered = [...logos];

        const [moved] = reordered.splice(
            result.source.index,
            1
        );

        reordered.splice(
            result.destination.index,
            0,
            moved
        );

        onReorder(reordered);
    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="logos">
                {(provided) => (
                    <Box
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {/* Header */}
                        <Box
                            sx={{
                                display: "grid",
                                gridTemplateColumns:
                                    "48px 70px minmax(220px, 1fr) 120px 140px 90px",
                                gap: 1.5,
                                alignItems: "center",
                                px: 2,
                                py: 1.5,
                                bgcolor: "rgba(118,153,20,0.04)",
                                borderBottom: "1px solid",
                                borderColor: "dash.border",
                                minWidth: 850,
                            }}
                        >
                            <Checkbox
                                checked={allSelected}
                                onChange={onSelectAll}
                            />

                            <Typography
                                variant="caption"
                                fontWeight={800}
                                color="dash.muted"
                            >
                                LOGO
                            </Typography>

                            <Typography
                                variant="caption"
                                fontWeight={800}
                                color="dash.muted"
                            >
                                TITLE
                            </Typography>

                            <Typography
                                variant="caption"
                                fontWeight={800}
                                color="dash.muted"
                            >
                                STATUS
                            </Typography>

                            <Typography
                                variant="caption"
                                fontWeight={800}
                                color="dash.muted"
                            >
                                ADDED
                            </Typography>

                            <Typography
                                variant="caption"
                                fontWeight={800}
                                color="dash.muted"
                            >
                                ACTIONS
                            </Typography>
                        </Box>

                        {logos.map((logo, index) => {
                            const image = getImage(logo);
                            const isSelected = selected.includes(
                                logo._id
                            );

                            const isVisible = logo.visible !== false;

                            return (
                                <Draggable
                                    key={logo._id}
                                    draggableId={String(logo._id)}
                                    index={index}
                                >
                                    {(dragProvided, snapshot) => (
                                        <Box
                                            ref={dragProvided.innerRef}
                                            {...dragProvided.draggableProps}
                                            sx={{
                                                display: "grid",
                                                gridTemplateColumns:
                                                    "48px 70px minmax(220px, 1fr) 120px 140px 90px",
                                                gap: 1.5,
                                                alignItems: "center",
                                                px: 2,
                                                py: 1.5,
                                                minWidth: 850,
                                                borderBottom: "1px solid",
                                                borderColor: "dash.border",
                                                bgcolor: snapshot.isDragging
                                                    ? "rgba(118,153,20,0.08)"
                                                    : isSelected
                                                        ? "rgba(118,153,20,0.04)"
                                                        : "white",
                                            }}
                                        >
                                            <Stack
                                                direction="row"
                                                alignItems="center"
                                            >
                                                <Checkbox
                                                    checked={isSelected}
                                                    onChange={() =>
                                                        onSelect(logo._id)
                                                    }
                                                />

                                                <Box
                                                    {...dragProvided.dragHandleProps}
                                                    sx={{
                                                        cursor: "grab",
                                                        color: "dash.muted",
                                                        display: "flex",
                                                    }}
                                                >
                                                    <DragIndicatorIcon fontSize="small" />
                                                </Box>
                                            </Stack>

                                            {/* Thumbnail */}
                                            <Box
                                                sx={{
                                                    width: 52,
                                                    height: 52,
                                                    borderRadius: 2,
                                                    border: "1px solid",
                                                    borderColor: "dash.border",
                                                    display: "grid",
                                                    placeItems: "center",
                                                    bgcolor: "#fff",
                                                    overflow: "hidden",
                                                }}
                                            >
                                                {image ? (
                                                    <Box
                                                        component="img"
                                                        src={image}
                                                        alt={logo.title || "Logo"}
                                                        sx={{
                                                            width: "100%",
                                                            height: "100%",
                                                            objectFit: "contain",
                                                            p: 0.7,
                                                        }}
                                                    />
                                                ) : (
                                                    <ImageOutlinedIcon
                                                        sx={{ color: "dash.muted" }}
                                                    />
                                                )}
                                            </Box>

                                            {/* Title */}
                                            <Box>
                                                <Typography
                                                    fontWeight={700}
                                                    color="dash.navy"
                                                    noWrap
                                                >
                                                    {logo.title || "Untitled Logo"}
                                                </Typography>

                                                <Typography
                                                    variant="caption"
                                                    color="dash.muted"
                                                >
                                                    Order #{logo.order ?? index + 1}
                                                </Typography>
                                            </Box>

                                            {/* Status */}
                                            <Box>
                                                <Box
                                                    sx={{
                                                        display: "inline-flex",
                                                        px: 1.2,
                                                        py: 0.5,
                                                        borderRadius: 10,
                                                        bgcolor: isVisible
                                                            ? "rgba(118,153,20,0.12)"
                                                            : "rgba(200,50,50,0.10)",
                                                        color: isVisible
                                                            ? "dash.greenDark"
                                                            : "dash.red",
                                                        fontSize: 12,
                                                        fontWeight: 800,
                                                    }}
                                                >
                                                    {isVisible
                                                        ? "Active"
                                                        : "Hidden"}
                                                </Box>
                                            </Box>

                                            {/* Date */}
                                            <Typography
                                                variant="body2"
                                                color="dash.muted"
                                            >
                                                {logo.createdAt
                                                    ? new Date(
                                                        logo.createdAt
                                                    ).toLocaleDateString()
                                                    : "—"}
                                            </Typography>

                                            {/* Actions */}
                                            <Stack
                                                direction="row"
                                                spacing={0.5}
                                            >
                                                <Tooltip title="Edit">
                                                    <IconButton
                                                        size="small"
                                                        onClick={() =>
                                                            onEdit(logo)
                                                        }
                                                        sx={{
                                                            color: "dash.green",
                                                        }}
                                                    >
                                                        <EditOutlinedIcon fontSize="small" />
                                                    </IconButton>
                                                </Tooltip>

                                                <Tooltip title="Delete">
                                                    <IconButton
                                                        size="small"
                                                        onClick={() =>
                                                            onDelete(logo)
                                                        }
                                                        sx={{
                                                            color: "dash.red",
                                                        }}
                                                    >
                                                        <DeleteOutlineIcon fontSize="small" />
                                                    </IconButton>
                                                </Tooltip>
                                            </Stack>
                                        </Box>
                                    )}
                                </Draggable>
                            );
                        })}

                        {provided.placeholder}

                        {!logos.length && (
                            <Box
                                sx={{
                                    py: 8,
                                    textAlign: "center",
                                }}
                            >
                                <ImageOutlinedIcon
                                    sx={{
                                        fontSize: 42,
                                        color: "dash.muted",
                                        mb: 1,
                                    }}
                                />

                                <Typography
                                    fontWeight={700}
                                    color="dash.navy"
                                >
                                    No logos found
                                </Typography>

                                <Typography
                                    variant="body2"
                                    color="dash.muted"
                                    mt={0.5}
                                >
                                    Add your first logo to get started.
                                </Typography>
                            </Box>
                        )}
                    </Box>
                )}
            </Droppable>
        </DragDropContext>
    );
}