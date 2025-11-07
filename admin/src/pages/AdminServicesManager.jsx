import React, { useEffect, useState } from "react";
import { Box, Typography, Divider, Modal, Fade, Backdrop } from "@mui/material";
import {
  fetchServices,
  createService,
  updateService,
  deleteService,
  reorderServices,
  updateServiceVisibility,
} from "../api/services";
import ServiceForm from "../components/ServiceForm";
import ServiceList from "../components/ServiceList";
import FloatingAddButton from "../components/FloatingAddButton";

export default function AdminServicesManager() {
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({ iconImage: "", title: "", description: "" });
  const [editingId, setEditingId] = useState(null);
  const [preview, setPreview] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      const res = await fetchServices();
      setServices(res.data);
    } catch (error) {
      console.error("❌ Error loading services:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      if (formData.iconImage) data.append("iconImage", formData.iconImage);

      if (editingId) {
        await updateService(editingId, data);
      } else {
        await createService(data);
      }

      setFormData({ iconImage: "", title: "", description: "" });
      setEditingId(null);
      setPreview(null);
      loadServices();
      setOpenModal(false);
    } catch (error) {
      console.error("❌ Error saving service:", error);
    }
  };

  const handleEdit = (service) => {
    setFormData({
      iconImage: service.iconImage,
      title: service.title,
      description: service.description,
    });
    setPreview(service.iconImage);
    setEditingId(service._id);
    setOpenModal(true); // ✅ Open modal when editing
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      try {
        await deleteService(id);
        loadServices();
      } catch (error) {
        console.error("❌ Error deleting service:", error);
      }
    }
  };

  const handleVisibilityToggle = async (service) => {
    try {
      await updateServiceVisibility(service._id, !service.visible);
      loadServices();
    } catch (error) {
      console.error("❌ Error updating visibility:", error);
    }
  };

  const handleDragEnd = async (result) => {
    if (!result.destination) return;
    const reordered = Array.from(services);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);
    setServices(reordered);

    try {
      await reorderServices(reordered.map((s) => s._id));
    } catch (error) {
      console.error("❌ Error reordering services:", error);
    }
  };

  return (
    <Box p={4} sx={{ backgroundColor: "#ECF0F1", minHeight: "100vh" }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ color: "#2C3E50", fontWeight: 800, textAlign: "center", mb: 5 }}
      >
        Manage Services
      </Typography>

      {/* 🧾 Service List */}
      <ServiceList
        services={services}
        onDragEnd={handleDragEnd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onToggle={handleVisibilityToggle}
      />

      {/* ➕ Floating Add Button */}
      <FloatingAddButton onClick={() => setOpenModal(true)} />

      {/* 📝 Modal Form */}
      <Modal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setEditingId(null);
          setFormData({ iconImage: "", title: "", description: "" });
          setPreview(null);
        }}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
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
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              borderRadius: 3,
              width: 500,
              maxWidth: "95%",
            }}
          >
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              {editingId ? "Edit Service" : "Add New Service"}
            </Typography>
            <ServiceForm
              formData={formData}
              setFormData={setFormData}
              handleSubmit={handleSubmit}
              preview={preview}
              setPreview={setPreview}
              editingId={editingId}
            />
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
}
