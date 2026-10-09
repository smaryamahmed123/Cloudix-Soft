import React, { useState } from "react";
import { Box, Button, IconButton, Switch, Tooltip, Typography } from "@mui/material";
import { DeleteOutline, DragIndicatorRounded, EditOutlined, AddRounded } from "@mui/icons-material";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { dash } from "../Dashboard/dashboardPalette";

// Shared by header + rows so columns always line up
const GRID = "48px 40px 64px minmax(240px, 1fr) 150px 140px 96px";

const cellSx = { minWidth: 0, display: "flex", alignItems: "center" };

const Icon = ({ src, title }) => {
  const [failed, setFailed] = useState(false);

  return (
    <Box
      sx={{
        width: 52,
        height: 52,
        borderRadius: "12px",
        overflow: "hidden",
        display: "grid",
        placeItems: "center",
        backgroundColor: dash.greenLight,
        border: `1px solid ${dash.border}`,
        color: dash.green,
        fontWeight: 800,
        fontSize: 20,
      }}
    >
      {src && !failed ? (
        <Box
          component="img"
          src={src}
          alt=""
          onError={() => setFailed(true)}
          sx={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      ) : (
        (title || "S").charAt(0).toUpperCase()
      )}
    </Box>
  );
};

const ServiceTable = ({
  services,
  hasAnyServices,
  dragEnabled,
  onReorder,
  onEdit,
  onDelete,
  onToggle,
  onAdd,
}) => {
  const handleDragEnd = (result) => {
    if (!result.destination || result.destination.index === result.source.index) return;
    onReorder(result.source.index, result.destination.index);
  };

  return (
    <Box sx={{ overflowX: "auto" }}>
      <Box sx={{ minWidth: 820 }}>
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
          {["", "#", "Icon", "Service", "Status", "Added", "Actions"].map((h, i) => (
            <Typography key={i} sx={{ fontSize: 12.5, fontWeight: 600, color: dash.navy }}>
              {h}
            </Typography>
          ))}
        </Box>

        {/* ---------- Rows ---------- */}
        {services.length === 0 ? (
          <Box sx={{ py: 8, textAlign: "center" }}>
            <Typography sx={{ color: dash.navy, fontWeight: 700, fontSize: 14 }}>
              {hasAnyServices ? "No services match your filters" : "No services yet"}
            </Typography>
            <Typography sx={{ color: dash.muted, fontSize: 12.5, mt: 0.5 }}>
              {hasAnyServices ? "Try a different keyword or status." : "Add your first service to get started."}
            </Typography>
            {!hasAnyServices && (
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
                Add Service
              </Button>
            )}
          </Box>
        ) : (
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="services">
              {(dropProvided) => (
                <Box ref={dropProvided.innerRef} {...dropProvided.droppableProps}>
                  {services.map((service, index) => {
                    const visible = Boolean(service.visible);
                    const date = service.createdAt ? new Date(service.createdAt) : null;
                    const validDate = date && !Number.isNaN(date.getTime());

                    return (
                      <Draggable
                        key={service._id}
                        draggableId={String(service._id)}
                        index={index}
                        isDragDisabled={!dragEnabled}
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
                              py: 1.4,
                              backgroundColor: snap.isDragging ? "#FFFFFF" : "transparent",
                              boxShadow: snap.isDragging ? "0 10px 30px rgba(16,38,64,0.15)" : "none",
                              borderRadius: snap.isDragging ? "10px" : 0,
                              borderBottom: `1px solid ${dash.border}`,
                              opacity: visible || snap.isDragging ? 1 : 0.8,
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

                            <Icon src={service.iconImage} title={service.title} />

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
                                {service.title}
                              </Typography>
                              <Typography
                                sx={{
                                  color: dash.muted,
                                  fontSize: 12,
                                  mt: 0.4,
                                  lineHeight: 1.5,
                                  display: "-webkit-box",
                                  WebkitLineClamp: 2,
                                  WebkitBoxOrient: "vertical",
                                  overflow: "hidden",
                                }}
                              >
                                {service.description}
                              </Typography>
                            </Box>

                            <Box sx={{ ...cellSx, gap: 0.5 }}>
                              <Switch
                                size="small"
                                checked={visible}
                                onChange={() => onToggle(service)}
                                sx={{
                                  "& .MuiSwitch-switchBase.Mui-checked": { color: dash.green },
                                  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                                    backgroundColor: dash.green,
                                  },
                                }}
                              />
                              <Typography
                                sx={{
                                  fontSize: 12,
                                  fontWeight: 600,
                                  color: visible ? "#3E7A1E" : dash.muted,
                                }}
                              >
                                {visible ? "Visible" : "Hidden"}
                              </Typography>
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
                              <Tooltip title="Edit">
                                <IconButton
                                  size="small"
                                  onClick={() => onEdit(service)}
                                  sx={{
                                    width: 36,
                                    height: 36,
                                    borderRadius: "10px",
                                    backgroundColor: "#EEF1F4",
                                    color: dash.navy,
                                  }}
                                >
                                  <EditOutlined sx={{ fontSize: 18 }} />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Delete">
                                <IconButton
                                  size="small"
                                  onClick={() => onDelete(service)}
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

export default ServiceTable;