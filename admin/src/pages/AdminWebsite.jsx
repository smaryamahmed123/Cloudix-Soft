import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Grid,
  Typography,
  Modal,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

import WebsiteCard from "../components/WebsiteCard";
import UploadWebsiteForm from "../components/UploadWebsiteForm";
import FloatingAddButton from "../components/FloatingAddButton";
import SnackbarAlert from "../components/SnackbarAlert";
import LoadingBackdrop from "../components/LoadingBackdrop";

const backendURL = import.meta.env.VITE_BACKEND_URL;
const BASE_URL = `${backendURL}/api/websites`;

export default function AdminWebsitesManager() {
  const [websites, setWebsites] = useState([]);
  const [form, setForm] = useState({
    title: "",
    link: "",
    category: "",
    image: null,
  });

  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // 📥 Fetch websites
  const fetchWebsites = async () => {
    try {
      setLoading(true);
      const res = await axios.get(BASE_URL);
      setWebsites(res.data);
    } catch {
      setSnackbar({
        open: true,
        message: "Failed to fetch websites ❌",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWebsites();
  }, []);

  // 📤 Upload website
  const handleUpload = async () => {
    if (!form.title || !form.link || !form.category || !form.image) {
      setSnackbar({
        open: true,
        message: "Please fill all fields ⚠️",
        severity: "warning",
      });
      return;
    }

    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });

    try {
      setLoading(true);
      await axios.post(BASE_URL, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });

      setForm({ title: "", link: "", category: "", image: null });
      fetchWebsites();
      setOpenModal(false);

      setSnackbar({
        open: true,
        message: "Website added successfully ✅",
        severity: "success",
      });
    } catch {
      setSnackbar({
        open: true,
        message: "Failed to add website ❌",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  // 🗑️ Delete website
  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`${BASE_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
      fetchWebsites();
      setSnackbar({
        open: true,
        message: "Website deleted 🗑️",
        severity: "success",
      });
    } catch {
      setSnackbar({
        open: true,
        message: "Failed to delete website ❌",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: isMobile ? 2 : 4, minHeight: "100vh" }}>
      <Typography variant="h4" textAlign="center" mb={4}>
        Manage Websites (Admin)
      </Typography>

      {/* Desktop Upload Form */}
      {!isMobile && (
        <UploadWebsiteForm
          form={form}
          setForm={setForm}
          handleUpload={handleUpload}
          loading={loading}
        />
      )}

      {/* Websites Grid */}
      <Grid container spacing={3} justifyContent="center">
        {websites.map((site) => (
          <Grid item xs={12} sm={6} md={4} key={site._id}>
            <WebsiteCard site={site} onDelete={handleDelete} />
          </Grid>
        ))}
      </Grid>

      {/* Mobile Modal */}
      {isMobile && (
        <>
          <FloatingAddButton onClick={() => setOpenModal(true)} />
          <Modal open={openModal} onClose={() => setOpenModal(false)}>
            <UploadWebsiteForm
              form={form}
              setForm={setForm}
              handleUpload={handleUpload}
              loading={loading}
              isMobile
            />
          </Modal>
        </>
      )}

      <SnackbarAlert {...snackbar} onClose={() => setSnackbar({ ...snackbar, open: false })} />
      <LoadingBackdrop open={loading} />
    </Box>
  );
}
