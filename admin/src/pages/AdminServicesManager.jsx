import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Breadcrumbs,
  Button,
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  InputBase,
  Link,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import {
  AddRounded,
  Close,
  DesignServicesOutlined,
  NavigateNextRounded,
  SearchRounded,
  VisibilityOutlined,
  VisibilityOffOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import {
  fetchServices,
  createService,
  updateService,
  deleteService,
  reorderServices,
  updateServiceVisibility,
} from "../api/services";

import SnackbarAlert from "../components/SnackbarAlert";
import DashboardTopBar from "../components/Dashboard/DashboardTopBar";
import BlogStatCard from "../components/Blog/BlogStatCard"; // reused stat card
import ServiceForm from "../components/Service/ServiceForm";
import ServiceTable from "../components/Service/ServiceTable";
import { dash, cardSx } from "../components/Dashboard/dashboardPalette";

const emptyForm = { iconImage: "", title: "", description: "" };

// ============================================================
// HELPERS (stats)
// ============================================================

const timeOf = (item) => {
  const d = item?.createdAt ? new Date(item.createdAt) : null;
  return d && !Number.isNaN(d.getTime()) ? d.getTime() : null;
};

// Running total at the end of each of the last 12 calendar months
const cumulativeSeries = (items) => {
  const times = items.map(timeOf).filter((t) => t !== null);
  const now = new Date();

  return Array.from({ length: 12 }, (_, i) => {
    const end = new Date(now.getFullYear(), now.getMonth() - (11 - i) + 1, 1).getTime();
    return times.filter((t) => t < end).length;
  });
};

const trendOf = (series) => {
  const last = series[series.length - 1] || 0;
  const prev = series[series.length - 2] || 0;
  if (prev === 0) return { label: last > 0 ? "New" : "0%", dir: "up" };
  const pct = Math.round(((last - prev) / prev) * 100);
  return { label: `${Math.abs(pct)}%`, dir: pct < 0 ? "down" : "up" };
};

// ============================================================
// PAGE
// ============================================================

export default function AdminServicesManager() {
  const navigate = useNavigate();

  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [preview, setPreview] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const notify = (message, severity = "success") => setSnackbar({ open: true, message, severity });

  // ---------------------------------------
  // Load
  // ---------------------------------------

  const loadServices = async () => {
    try {
      setLoading(true);
      const res = await fetchServices();
      setServices(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Error loading services:", error);
      notify("Failed to load services ❌", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  // ---------------------------------------
  // Derived data
  // ---------------------------------------

  const query = search.trim().toLowerCase();
  const filtersActive = Boolean(query || status !== "all");

  const filtered = useMemo(
    () =>
      services.filter((s) => {
        if (query) {
          const hay = `${s.title || ""} ${s.description || ""}`.toLowerCase();
          if (!hay.includes(query)) return false;
        }
        if (status === "visible" && !s.visible) return false;
        if (status === "hidden" && s.visible) return false;
        return true;
      }),
    [services, query, status]
  );

  const stats = useMemo(() => {
    const visible = services.filter((s) => s.visible);
    const hidden = services.filter((s) => !s.visible);

    const build = (items) => {
      const series = cumulativeSeries(items);
      return { value: items.length, series, trend: trendOf(series) };
    };

    return { total: build(services), visible: build(visible), hidden: build(hidden) };
  }, [services]);

  // ---------------------------------------
  // Form helpers
  // ---------------------------------------

  const resetForm = () => {
    setFormData(emptyForm);
    setEditingId(null);
    setPreview(null);
  };

  const openCreate = () => {
    resetForm();
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    if (saving) return;
    setOpenModal(false);
    resetForm();
  };

  // ---------------------------------------
  // Submit
  // ---------------------------------------

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);

      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);

      if (formData.iconImage && formData.iconImage instanceof File) {
        data.append("iconImage", formData.iconImage);
      }

      const wasEditing = Boolean(editingId);

      if (wasEditing) await updateService(editingId, data);
      else await createService(data);

      setOpenModal(false);
      resetForm();
      await loadServices();
      notify(wasEditing ? "Service updated ✅" : "Service added ✅");
    } catch (error) {
      console.error("Error saving service:", error);
      notify(error.response?.data?.message || "Failed to save service ❌", "error");
    } finally {
      setSaving(false);
    }
  };

  // ---------------------------------------
  // Edit
  // ---------------------------------------

  const handleEdit = (service) => {
    setFormData({
      iconImage: service.iconImage || "",
      title: service.title || "",
      description: service.description || "",
    });
    setPreview(service.iconImage || null);
    setEditingId(service._id);
    setOpenModal(true);
  };

  // ---------------------------------------
  // Delete
  // ---------------------------------------

  const handleDelete = async (service) => {
    if (!window.confirm(`Delete "${service.title}"? This can't be undone.`)) return;

    try {
      await deleteService(service._id);
      await loadServices();
      notify("Service deleted 🗑️");
    } catch (error) {
      console.error("Error deleting service:", error);
      notify("Failed to delete service ❌", "error");
    }
  };

  // ---------------------------------------
  // Visibility (optimistic)
  // ---------------------------------------

  const handleVisibilityToggle = async (service) => {
    const next = !service.visible;

    setServices((prev) => prev.map((s) => (s._id === service._id ? { ...s, visible: next } : s)));

    try {
      await updateServiceVisibility(service._id, next);
    } catch (error) {
      console.error("Error updating visibility:", error);
      await loadServices();
      notify("Failed to update visibility ❌", "error");
    }
  };

  // ---------------------------------------
  // Reorder (only while the list isn't filtered)
  // ---------------------------------------

  const handleReorder = async (fromIndex, toIndex) => {
    const reordered = [...services];
    const [moved] = reordered.splice(fromIndex, 1);
    reordered.splice(toIndex, 0, moved);
    setServices(reordered);

    try {
      await reorderServices(reordered.map((s) => s._id));
      notify("Service order updated ✅");
    } catch (error) {
      console.error("Error reordering services:", error);
      await loadServices();
      notify("Failed to reorder services ❌", "error");
    }
  };

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: dash.page }}>
      <DashboardTopBar placeholder="Search services..." />

      <Box sx={{ p: { xs: 2, sm: 2.5, md: 3.5 } }}>
        {/* ---------- Heading ---------- */}
        <Breadcrumbs
          separator={<NavigateNextRounded sx={{ fontSize: 16 }} />}
          sx={{ fontSize: 12.5, mb: 1, color: dash.muted }}
        >
          <Link
            component="button"
            underline="hover"
            onClick={() => navigate("/admin/dashboard")}
            sx={{ fontSize: 12.5, color: dash.muted }}
          >
            Dashboard
          </Link>
          <Typography sx={{ fontSize: 12.5, color: dash.muted }}>Services</Typography>
        </Breadcrumbs>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 2,
            mb: 3,
          }}
        >
          <Box>
            <Typography
              sx={{
                color: dash.navy,
                fontSize: { xs: 28, md: 34 },
                fontWeight: 800,
                letterSpacing: "-0.8px",
                lineHeight: 1.15,
              }}
            >
              Services Management
            </Typography>
            <Typography sx={{ color: dash.muted, fontSize: 14, mt: 0.8 }}>
              Manage the services displayed on your website. Drag rows to change their order.
            </Typography>
          </Box>

          <Button
            variant="contained"
            startIcon={<AddRounded />}
            onClick={openCreate}
            sx={{
              height: 44,
              px: 2.6,
              textTransform: "none",
              fontWeight: 700,
              fontSize: 14,
              borderRadius: "10px",
              boxShadow: "none",
              backgroundColor: dash.green,
              "&:hover": { backgroundColor: dash.greenDark, boxShadow: "none" },
            }}
          >
            Add Service
          </Button>
        </Box>

        {/* ---------- Stat cards ---------- */}
        <Grid container spacing={2.2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} lg={4}>
            <BlogStatCard
              id="svc-total"
              title="Total Services"
              value={stats.total.value}
              icon={<DesignServicesOutlined />}
              color={dash.green}
              tint="#EEF4DE"
              trend={stats.total.trend}
              sparkData={stats.total.series}
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={4}>
            <BlogStatCard
              id="svc-visible"
              title="Visible"
              value={stats.visible.value}
              icon={<VisibilityOutlined />}
              color="#7C6FD0"
              tint="#F0EEFB"
              trend={stats.visible.trend}
              sparkData={stats.visible.series}
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={4}>
            <BlogStatCard
              id="svc-hidden"
              title="Hidden"
              value={stats.hidden.value}
              icon={<VisibilityOffOutlined />}
              color="#E3A81C"
              tint="#FDF6DC"
              trend={stats.hidden.trend}
              sparkData={stats.hidden.series}
            />
          </Grid>
        </Grid>

        {/* ---------- Filters + table ---------- */}
        <Paper elevation={0} sx={{ ...cardSx, p: { xs: 2, md: 2.5 } }}>
          <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 1.5, mb: 2.5 }}>
            <Box
              sx={{
                flex: "1 1 260px",
                maxWidth: 480,
                display: "flex",
                alignItems: "center",
                gap: 1,
                px: 1.5,
                height: 42,
                borderRadius: "10px",
                border: `1px solid ${dash.border}`,
                backgroundColor: "#F8FAFB",
              }}
            >
              <SearchRounded sx={{ color: dash.muted, fontSize: 20 }} />
              <InputBase
                fullWidth
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search services..."
                sx={{ fontSize: 13, color: dash.navy }}
              />
            </Box>

            <TextField
              select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              sx={{
                width: 160,
                "& .MuiOutlinedInput-root": {
                  height: 42,
                  borderRadius: "10px",
                  fontSize: 13,
                  color: dash.navy,
                  "& fieldset": { borderColor: dash.border },
                },
              }}
            >
              <MenuItem value="all">All Status</MenuItem>
              <MenuItem value="visible">Visible</MenuItem>
              <MenuItem value="hidden">Hidden</MenuItem>
            </TextField>

            <Button
              variant="outlined"
              onClick={() => {
                setSearch("");
                setStatus("all");
              }}
              sx={{
                height: 42,
                px: 2.5,
                textTransform: "none",
                fontWeight: 600,
                fontSize: 13,
                borderRadius: "10px",
                color: dash.navy,
                borderColor: dash.border,
                "&:hover": { borderColor: dash.green, backgroundColor: dash.greenLight },
              }}
            >
              Reset
            </Button>

            <Typography sx={{ color: dash.muted, fontSize: 12.5, ml: { md: "auto" } }}>
              Showing {filtered.length} of {services.length} services
            </Typography>
          </Box>

          {loading ? (
            <Box sx={{ py: 8, textAlign: "center" }}>
              <Typography sx={{ color: dash.muted, fontSize: 13, fontWeight: 600 }}>
                Loading services...
              </Typography>
            </Box>
          ) : (
            <ServiceTable
              services={filtered}
              hasAnyServices={services.length > 0}
              dragEnabled={!filtersActive}
              onReorder={handleReorder}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onToggle={handleVisibilityToggle}
              onAdd={openCreate}
            />
          )}
        </Paper>
      </Box>

      {/* ---------- Add / edit dialog ---------- */}
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: { borderRadius: "16px", boxShadow: "0 25px 70px rgba(16,38,64,0.18)" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 3,
            py: 2,
            borderBottom: `1px solid ${dash.border}`,
          }}
        >
          <Box>
            <Typography sx={{ color: dash.navy, fontSize: 18, fontWeight: 800 }}>
              {editingId ? "Edit Service" : "Add New Service"}
            </Typography>
            <Typography sx={{ color: dash.muted, fontSize: 12, mt: 0.3 }}>
              {editingId ? "Update your service information." : "Add a new service to your website."}
            </Typography>
          </Box>

          <IconButton
            onClick={handleCloseModal}
            sx={{ color: dash.muted, backgroundColor: "#F3F6F8", "&:hover": { backgroundColor: "#E8EDF0" } }}
          >
            <Close />
          </IconButton>
        </Box>

        <DialogContent sx={{ p: 3 }}>
          <ServiceForm
            formData={formData}
            setFormData={setFormData}
            handleSubmit={handleSubmit}
            preview={preview}
            setPreview={setPreview}
            editingId={editingId}
            saving={saving}
          />
        </DialogContent>
      </Dialog>

      <SnackbarAlert
        open={snackbar.open}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        severity={snackbar.severity}
        message={snackbar.message}
      />
    </Box>
  );
}