import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Grid, Typography, Modal, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

import UploadLogoForm from "../components/UploadLogoForm";
import PostCard from "../components/PostCard";
import FloatingAddButton from "../components/FloatingAddButton";
import SnackbarAlert from "../components/SnackbarAlert";
import LoadingBackdrop from "../components/LoadingBackdrop";

const backendURL = import.meta.env.VITE_BACKEND_URL;
const BASE_URL = `${backendURL}/api/logos`;
const REORDER_URL = `${backendURL}/api/logos/reorder`; // 👈 Make sure this exists in backend

export default function LogoManager() {
  const [logos, setLogos] = useState([]);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // 📥 Fetch Logos
  const fetchLogos = async () => {
    try {
      setLoading(true);
      const res = await axios.get(BASE_URL);
      // Sort logos by order (if your schema has `order` field)
      const sorted = res.data.sort((a, b) => a.order - b.order);
      setLogos(sorted);
    } catch {
      setSnackbar({ open: true, message: "Failed to fetch logos ❌", severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogos();
  }, []);

  // 📤 Upload Logo
  const handleUpload = async () => {
    if (!title || !file) {
      setSnackbar({ open: true, message: "Please fill all fields", severity: "warning" });
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("image", file);

    try {
      setLoading(true);
      await axios.post(BASE_URL, formData);
      setTitle("");
      setFile(null);
      setOpenModal(false);
      fetchLogos();
      setSnackbar({ open: true, message: "Logo uploaded successfully ✅", severity: "success" });
    } catch {
      setSnackbar({ open: true, message: "Failed to upload logo ❌", severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  // 🗑️ Delete Logo
  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`${BASE_URL}/${id}`);
      fetchLogos();
      setSnackbar({ open: true, message: "Logo deleted 🗑️", severity: "success" });
    } catch {
      setSnackbar({ open: true, message: "Failed to delete logo ❌", severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  // ✨ Reorder Logos
  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const reordered = Array.from(logos);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);

    setLogos(reordered);

    try {
      const ids = reordered.map((item) => item._id);
      await axios.put(REORDER_URL, { ids });
      setSnackbar({ open: true, message: "Logo order updated ✅", severity: "success" });
    } catch {
      setSnackbar({ open: true, message: "Failed to reorder ❌", severity: "error" });
    }
  };

  const handleCloseSnackbar = () => setSnackbar((prev) => ({ ...prev, open: false }));

  return (
    <Box sx={{ p: isMobile ? 2 : 4, bgcolor: theme.palette.background.default, minHeight: "100vh" }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          mb: 4,
          color: theme.palette.primary.main,
          textAlign: "center",
        }}
      >
        Logo Manager (Admin)
      </Typography>

      {/* 🖼 Upload Section - Desktop */}
      {!isMobile && (
        <Box sx={{ mb: 5 }}>
          <UploadLogoForm
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

      {/* 🧭 Drag & Drop Logo Grid */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="logos">
          {(provided) => (
            <Grid
              container
              spacing={3}
              justifyContent="center"
              alignItems="stretch"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {logos.map((logo, index) => (
                <Draggable key={logo._id} draggableId={logo._id} index={index}>
                  {(provided) => (
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={4}
                      lg={3}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      sx={{ display: "flex", justifyContent: "center" }}
                    >
                      <PostCard post={logo} onDelete={handleDelete} loading={loading} />
                    </Grid>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Grid>
          )}
        </Droppable>
      </DragDropContext>

      {/* ➕ Mobile Floating Add */}
      {isMobile && (
        <>
          <FloatingAddButton onClick={() => setOpenModal(true)} disabled={loading} />
          <Modal
            open={openModal}
            onClose={() => setOpenModal(false)}
            sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
          >
            <UploadLogoForm
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
