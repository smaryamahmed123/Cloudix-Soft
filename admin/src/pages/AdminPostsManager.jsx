import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Grid,
  Typography,
  Modal,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

import UploadPostForm from "../components/UploadPostForm";
import PostCard from "../components/PostCard";
import FloatingAddButton from "../components/FloatingAddButton";
import SnackbarAlert from "../components/SnackbarAlert";
import LoadingBackdrop from "../components/LoadingBackdrop";

const backendURL = import.meta.env.VITE_BACKEND_URL;
const BASE_URL = `${backendURL}/api/posts`;

export default function AdminPostsManager() {
  const [posts, setPosts] = useState([]);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [loading, setLoading] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // 📥 Fetch posts
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(BASE_URL);
      setPosts(res.data);
    } catch {
      setSnackbar({
        open: true,
        message: "Failed to fetch posts ❌",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // 📤 Upload post
  const handleUpload = async () => {
    if (!title || !file) {
      setSnackbar({
        open: true,
        message: "Please fill all fields ⚠️",
        severity: "warning",
      });
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("image", file);

    try {
      setLoading(true);
      await axios.post(BASE_URL, formData);
      setFile(null);
      setTitle("");
      fetchPosts();
      setOpenModal(false);
      setSnackbar({
        open: true,
        message: "Post uploaded successfully ✅",
        severity: "success",
      });
    } catch {
      setSnackbar({
        open: true,
        message: "Failed to upload post ❌",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  // 🗑️ Delete post
  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`${BASE_URL}/${id}`);
      fetchPosts();
      setSnackbar({
        open: true,
        message: "Post deleted successfully 🗑️",
        severity: "success",
      });
    } catch {
      setSnackbar({
        open: true,
        message: "Failed to delete post ❌",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  // 🔄 Reorder posts
  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const reordered = Array.from(posts);
    const [movedItem] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, movedItem);

    setPosts(reordered);

    // Optional: save order to backend
    try {
      await axios.put(`${BASE_URL}/reorder`, {
        ids: reordered.map((p) => p._id),
      });
    } catch (err) {
      console.error("Failed to save order", err);
      setSnackbar({
        open: true,
        message: "Failed to save order ❌",
        severity: "error",
      });
    }
  };

  const handleCloseSnackbar = () =>
    setSnackbar((prev) => ({ ...prev, open: false }));

  return (
    <Box
      sx={{
        p: isMobile ? 2 : 4,
        backgroundColor: theme.palette.background.default,
        minHeight: "100vh",
      }}
    >
      <Typography
        variant="h4"
        textAlign="center"
        mb={4}
        sx={{ color: theme.palette.primary.main, fontWeight: 600 }}
      >
        Manage Posts (Admin)
      </Typography>

      {/* Upload Form on desktop */}
      {!isMobile && (
        <Box sx={{ mb: 5 }}>
          <UploadPostForm
            title={title}
            setTitle={setTitle}
            file={file}
            setFile={setFile}
            handleUpload={handleUpload}
            loading={loading}
            isMobile={isMobile}
          />
        </Box>
      )}

      {/* 🧲 Drag & Drop Container */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="postsGrid">
          {(provided) => (
            <Grid
              container
              spacing={3}
              justifyContent="center"
              alignItems="stretch"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {posts.map((post, index) => (
                <Draggable
                  key={post._id}
                  draggableId={post._id}
                  index={index}
                >
                  {(provided) => (
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={4}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        cursor: "grab",
                      }}
                    >
                      <PostCard
                        post={post}
                        onDelete={handleDelete}
                        loading={loading}
                      />
                    </Grid>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Grid>
          )}
        </Droppable>
      </DragDropContext>

      {/* Floating Add Button (Mobile) */}
      {isMobile && (
        <>
          <FloatingAddButton
            onClick={() => setOpenModal(true)}
            disabled={loading}
          />
          <Modal
            open={openModal}
            onClose={() => setOpenModal(false)}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <UploadPostForm
              title={title}
              setTitle={setTitle}
              file={file}
              setFile={setFile}
              handleUpload={handleUpload}
              loading={loading}
              isMobile={isMobile}
            />
          </Modal>
        </>
      )}

      {/* Global Alerts & Loader */}
      <SnackbarAlert
        open={snackbar.open}
        onClose={handleCloseSnackbar}
        severity={snackbar.severity}
        message={snackbar.message}
      />
      <LoadingBackdrop open={loading} />
    </Box>
  );
}
