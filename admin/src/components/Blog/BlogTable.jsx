import React, { useState } from "react";
import { Box, Checkbox, IconButton, MenuItem, TextField, Tooltip, Typography } from "@mui/material";
import {
    EditOutlined,
    DeleteOutline,
    VisibilityOutlined,
    DragIndicatorRounded,
    ImageOutlined,
    ChevronLeftRounded,
    ChevronRightRounded,
} from "@mui/icons-material";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { dash } from "../Dashboard/dashboardPalette";

// Shared by header + rows so columns always line up
const GRID = "64px 104px minmax(240px, 1fr) 150px 120px 140px 80px 96px";

const CATEGORY_TONES = [
    { bg: "#EEF3DC", fg: "#587318" },
    { bg: "#E9F0FB", fg: "#3B6AB5" },
    { bg: "#F3EAFB", fg: "#7A3FB0" },
    { bg: "#FDF3D6", fg: "#9A6B00" },
    { bg: "#FCE9F4", fg: "#B03A87" },
];

const toneFor = (name = "") =>
    CATEGORY_TONES[[...name].reduce((s, c) => s + c.charCodeAt(0), 0) % CATEGORY_TONES.length];

const cellSx = { minWidth: 0, display: "flex", alignItems: "center" };

const Thumb = ({ src }) => {
    const [failed, setFailed] = useState(false);

    if (!src || failed) {
        return (
            <Box
                sx={{
                    width: 96,
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
            sx={{ width: 96, height: 64, objectFit: "cover", borderRadius: "8px", display: "block" }}
        />
    );
};

const getCover = (blog) => blog.coverImage || blog.image || blog.imageUrl || blog.thumbnail || "";

const PageButton = ({ children, active, disabled, onClick }) => (
    <Box
        component="button"
        type="button"
        onClick={onClick}
        disabled={disabled}
        sx={{
            width: 38,
            height: 38,
            display: "grid",
            placeItems: "center",
            borderRadius: "8px",
            fontSize: 13,
            fontWeight: 600,
            cursor: disabled ? "default" : "pointer",
            opacity: disabled ? 0.4 : 1,
            color: active ? "#FFFFFF" : dash.navy,
            backgroundColor: active ? dash.green : "#FFFFFF",
            border: `1px solid ${active ? dash.green : dash.border}`,
            fontFamily: "inherit",
        }}
    >
        {children}
    </Box>
);

const BlogTable = ({
    blogs,
    total,
    page,
    rowsPerPage,
    onPage,
    onRowsPerPage,
    selected,
    onToggle,
    onToggleAll,
    onEdit,
    onDelete,
    dragEnabled,
    onReorder,
}) => {
    const pageStart = (page - 1) * rowsPerPage;
    const totalPages = Math.max(1, Math.ceil(total / rowsPerPage));

    const allSelected = blogs.length > 0 && blogs.every((b) => selected.includes(b._id));
    const someSelected = !allSelected && blogs.some((b) => selected.includes(b._id));

    const winStart = Math.max(1, Math.min(page - 2, totalPages - 4));
    const winEnd = Math.min(totalPages, winStart + 4);
    const pages = Array.from({ length: winEnd - winStart + 1 }, (_, i) => winStart + i);

    const from = total === 0 ? 0 : pageStart + 1;
    const to = Math.min(pageStart + rowsPerPage, total);

    const handleDragEnd = (result) => {
        if (!result.destination || result.destination.index === result.source.index) return;
        onReorder(pageStart + result.source.index, pageStart + result.destination.index);
    };

    return (
        <Box>
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
                        <Box sx={{ ...cellSx, justifyContent: "flex-end", pr: 0.5 }}>
                            <Checkbox
                                size="small"
                                checked={allSelected}
                                indeterminate={someSelected}
                                onChange={onToggleAll}
                                sx={{ "&.Mui-checked, &.MuiCheckbox-indeterminate": { color: dash.green } }}
                            />
                        </Box>
                        {["Thumbnail", "Title", "Category", "Status", "Published Date", "Views", "Actions"].map((h) => (
                            <Typography key={h} sx={{ fontSize: 12.5, fontWeight: 600, color: dash.navy }}>
                                {h}
                            </Typography>
                        ))}
                    </Box>

                    {/* ---------- Rows ---------- */}
                    {blogs.length === 0 ? (
                        <Box sx={{ py: 8, textAlign: "center" }}>
                            <Typography sx={{ color: dash.navy, fontWeight: 700, fontSize: 14 }}>
                                No blog posts found
                            </Typography>
                            <Typography sx={{ color: dash.muted, fontSize: 12.5, mt: 0.5 }}>
                                Try changing your filters, or add a new blog.
                            </Typography>
                        </Box>
                    ) : (
                        <DragDropContext onDragEnd={handleDragEnd}>
                            <Droppable droppableId="blogs">
                                {(dropProvided) => (
                                    <Box ref={dropProvided.innerRef} {...dropProvided.droppableProps}>
                                        {blogs.map((blog, index) => {
                                            const published = blog.visible !== false;
                                            const date = blog.createdAt ? new Date(blog.createdAt) : null;
                                            const validDate = date && !Number.isNaN(date.getTime());
                                            const tone = toneFor(blog.category);

                                            return (
                                                <Draggable
                                                    key={blog._id}
                                                    draggableId={String(blog._id)}
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
                                                            }}
                                                        >
                                                            {/* handle + checkbox */}
                                                            <Box sx={{ ...cellSx, justifyContent: "flex-end" }}>
                                                                <Tooltip
                                                                    title={dragEnabled ? "Drag to reorder" : "Clear filters to reorder"}
                                                                    placement="top"
                                                                >
                                                                    <Box
                                                                        {...p.dragHandleProps}
                                                                        sx={{
                                                                            display: "flex",
                                                                            color: dash.muted,
                                                                            opacity: dragEnabled ? 1 : 0.35,
                                                                            cursor: dragEnabled ? "grab" : "not-allowed",
                                                                        }}
                                                                    >
                                                                        <DragIndicatorRounded sx={{ fontSize: 18 }} />
                                                                    </Box>
                                                                </Tooltip>
                                                                <Checkbox
                                                                    size="small"
                                                                    checked={selected.includes(blog._id)}
                                                                    onChange={() => onToggle(blog._id)}
                                                                    sx={{ "&.Mui-checked": { color: dash.green } }}
                                                                />
                                                            </Box>

                                                            <Thumb src={getCover(blog)} />

                                                            <Box sx={{ minWidth: 0 }}>
                                                                <Typography
                                                                    sx={{
                                                                        color: dash.navy,
                                                                        fontSize: 13.5,
                                                                        fontWeight: 700,
                                                                        lineHeight: 1.35,
                                                                        display: "-webkit-box",
                                                                        WebkitLineClamp: 2,
                                                                        WebkitBoxOrient: "vertical",
                                                                        overflow: "hidden",
                                                                    }}
                                                                >
                                                                    {blog.title}
                                                                </Typography>
                                                                {blog.excerpt && (
                                                                    <Typography
                                                                        sx={{
                                                                            color: dash.muted,
                                                                            fontSize: 12,
                                                                            mt: 0.4,
                                                                            overflow: "hidden",
                                                                            textOverflow: "ellipsis",
                                                                            whiteSpace: "nowrap",
                                                                        }}
                                                                    >
                                                                        {blog.excerpt}
                                                                    </Typography>
                                                                )}
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
                                                                    {blog.category || "Uncategorised"}
                                                                </Box>
                                                            </Box>

                                                            <Box sx={cellSx}>
                                                                <Box
                                                                    sx={{
                                                                        display: "inline-flex",
                                                                        alignItems: "center",
                                                                        gap: 0.8,
                                                                        px: 1.3,
                                                                        py: 0.5,
                                                                        borderRadius: "8px",
                                                                        fontSize: 11.5,
                                                                        fontWeight: 600,
                                                                        backgroundColor: published ? "#EAF5E3" : "#FDF3D6",
                                                                        color: published ? "#3E7A1E" : "#8A6200",
                                                                    }}
                                                                >
                                                                    <Box
                                                                        sx={{
                                                                            width: 7,
                                                                            height: 7,
                                                                            borderRadius: "50%",
                                                                            backgroundColor: published ? "#4CAF50" : "#E3A81C",
                                                                        }}
                                                                    />
                                                                    {published ? "Published" : "Draft"}
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

                                                            <Box sx={{ ...cellSx, gap: 0.8, color: dash.navy }}>
                                                                <VisibilityOutlined sx={{ fontSize: 17 }} />
                                                                <Typography sx={{ fontSize: 12.5 }}>{Number(blog.views) || 0}</Typography>
                                                            </Box>

                                                            <Box sx={{ ...cellSx, gap: 1 }}>
                                                                <Tooltip title="Edit">
                                                                    <IconButton
                                                                        size="small"
                                                                        onClick={() => onEdit(blog)}
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
                                                                        onClick={() => onDelete(blog)}
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

            {/* ---------- Pagination ---------- */}
            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 2,
                    mt: 2.5,
                }}
            >
                <Typography sx={{ color: dash.muted, fontSize: 12.5 }}>
                    Showing {from} to {to} of {total} posts
                </Typography>

                <Box sx={{ display: "flex", gap: 1 }}>
                    <PageButton disabled={page <= 1} onClick={() => onPage(page - 1)}>
                        <ChevronLeftRounded sx={{ fontSize: 20 }} />
                    </PageButton>
                    {pages.map((n) => (
                        <PageButton key={n} active={n === page} onClick={() => onPage(n)}>
                            {n}
                        </PageButton>
                    ))}
                    <PageButton disabled={page >= totalPages} onClick={() => onPage(page + 1)}>
                        <ChevronRightRounded sx={{ fontSize: 20 }} />
                    </PageButton>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
                    <Typography sx={{ color: dash.muted, fontSize: 12.5 }}>Show</Typography>
                    <TextField
                        select
                        size="small"
                        value={rowsPerPage}
                        onChange={(e) => onRowsPerPage(Number(e.target.value))}
                        sx={{
                            width: 78,
                            "& .MuiOutlinedInput-root": { borderRadius: "8px", fontSize: 13, "& fieldset": { borderColor: dash.border } },
                        }}
                    >
                        {[5, 10, 20, 50].map((n) => (
                            <MenuItem key={n} value={n}>
                                {n}
                            </MenuItem>
                        ))}
                    </TextField>
                    <Typography sx={{ color: dash.muted, fontSize: 12.5 }}>per page</Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default BlogTable;