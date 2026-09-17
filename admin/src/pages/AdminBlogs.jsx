import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  TextField,
  Box,
  Grid,
  Modal,
  Fade,
  Backdrop,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

import SnackbarAlert from "../components/SnackbarAlert";
import LoadingBackdrop from "../components/LoadingBackdrop";
import ImageUploadButton from "../components/ImageUploadButton";
import BlogCard from "../components/BlogCard";
import PrimaryButton from "../components/PrimaryButton";
import FloatingAddButton from "../components/FloatingAddButton";

const ADMIN_BLOG_URL = `${import.meta.env.VITE_ADMIN_BLOG_URL}`;
const ADMIN_REORDER_BLOG_URL = `${import.meta.env.VITE_ADMIN_REORDER_BLOG_URL}`;

export default function AdminBlogs() {
  const theme = useTheme();
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState({ title: "", content: "", category: "", author: "", imageFile: null });
  const [uploading, setUploading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [openModal, setOpenModal] = useState(false);

  // 📥 Fetch blogs
  const fetchBlogs = async () => {
    try {
      const res = await axios.get(ADMIN_BLOG_URL);
      const sorted = [...res.data].sort(
        (a, b) =>
          (a.order ?? 0) - (b.order ?? 0)
      );

      setBlogs(sorted);
    } catch {
      setSnackbar({ open: true, message: "Failed to load blogs ❌", severity: "error" });
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // ➕ Add blog
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.imageFile) {
      setSnackbar({ open: true, message: "Please select an image!", severity: "warning" });
      return;
    }

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("content", form.content);
    formData.append("category", form.category);
    formData.append("author", form.author);
    formData.append("image", form.imageFile);

    try {
      setUploading(true);
      await axios.post(ADMIN_BLOG_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setForm({ title: "", content: "", category: "", author: "", imageFile: null });
      fetchBlogs();
      setOpenModal(false);
      setSnackbar({ open: true, message: "Blog added successfully ✅", severity: "success" });
    } catch {
      setSnackbar({ open: true, message: "Failed to upload blog ❌", severity: "error" });
    } finally {
      setUploading(false);
    }
  };

  // 🗑️ Delete blog
  const deleteBlog = async (id) => {
    try {
      await axios.delete(`${ADMIN_BLOG_URL}/${id}`);
      fetchBlogs();
      setSnackbar({ open: true, message: "Blog deleted 🗑️", severity: "success" });
    } catch {
      setSnackbar({ open: true, message: "Failed to delete blog ❌", severity: "error" });
    }
  };

  // 🔀 Reorder handler
  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const reordered = Array.from(blogs);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);

    setBlogs(reordered);

    try {
      const ids = reordered.map((item) => item._id);
      await axios.put(`${ADMIN_BLOG_URL}/reorder`, { ids });
      setSnackbar({ open: true, message: "Blog order updated ✅", severity: "success" });
    } catch {
      setSnackbar({ open: true, message: "Failed to reorder ❌", severity: "error" });
    }
  };

  const handleCloseSnackbar = () => setSnackbar((prev) => ({ ...prev, open: false }));

  return (
    <Container sx={{ backgroundColor: theme.palette.background.default, minHeight: "100vh", py: 4 }}>
      <Typography
        variant="h4"
        sx={{
          color: theme.palette.primary.main,
          mb: 3,
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        Admin Blogs
      </Typography>

      {/* 📄 Blog List with Drag & Drop */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="blogs">
          {(provided) => (
            <Grid
              container
              spacing={3}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {blogs.map((blog, index) => (
                <Draggable key={blog._id} draggableId={blog._id} index={index}>
                  {(provided) => (
                    <Grid
                      item
                      xs={12}
                      md={6}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <BlogCard blog={blog} onDelete={deleteBlog} />
                    </Grid>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Grid>
          )}
        </Droppable>
      </DragDropContext>

      {/* ➕ Floating Add Button */}
      <FloatingAddButton onClick={() => setOpenModal(true)} disabled={uploading} />

      {/* 📝 Add Blog Modal */}
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 300 }}
      >
        <Fade in={openModal}>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "#fff",
              p: 4,
              borderRadius: 2,
              width: "90%",
              maxWidth: 500,
              boxShadow: 24,
            }}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>
              Add New Blog
            </Typography>

            <TextField
              fullWidth
              label="Title"
              variant="outlined"
              margin="normal"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />

            <ImageUploadButton
              file={form.imageFile}
              setFile={(file) => setForm({ ...form, imageFile: file })}
            />

            <TextField
              fullWidth
              label="Category"
              variant="outlined"
              margin="normal"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              required
            />

            <TextField
              fullWidth
              label="Author"
              variant="outlined"
              margin="normal"
              value={form.author}
              onChange={(e) => setForm({ ...form, author: e.target.value })}
              required
            />

            <TextField
              fullWidth
              label="Content"
              variant="outlined"
              margin="normal"
              multiline
              minRows={4}
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              required
            />

            <PrimaryButton
              type="submit"
              disabled={uploading}
              sx={{ mt: 2, width: "100%" }}
            >
              {uploading ? "Uploading..." : "Add Blog"}
            </PrimaryButton>
          </Box>
        </Fade>
      </Modal>

      {/* 🧭 Snackbar + Loader */}
      <SnackbarAlert
        open={snackbar.open}
        onClose={handleCloseSnackbar}
        severity={snackbar.severity}
        message={snackbar.message}
      />
      <LoadingBackdrop open={uploading} />
    </Container>
  );
}
