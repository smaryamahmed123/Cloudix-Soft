import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  Box,
  Breadcrumbs,
  Button,
  Grid,
  InputBase,
  Link,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import {
  AddRounded,
  CheckCircleOutline,
  FormatQuoteRounded,
  NavigateNextRounded,
  PlayCircleOutline,
  SearchRounded,
  StarRounded,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import SnackbarAlert from "../components/SnackbarAlert";
import LoadingBackdrop from "../components/LoadingBackdrop";
import DashboardTopBar from "../components/Dashboard/DashboardTopBar";
import BlogStatCard from "../components/Blog/BlogStatCard"; // reused stat card
import TestimonialTable from "../components/Testimonial/TestimonialTable";
import TestimonialFormModal from "../components/Testimonial//TestimonialFormModal";
import TestimonialPreviewDialog from "../components/Testimonial/TestimonialPreviewDialog";
import { dash, cardSx } from "../components/Dashboard/dashboardPalette";

const backendURL = import.meta.env.VITE_BACKEND_URL;

const BASE_URL = `${backendURL}/api/testimonials`;

const emptyForm = {
  type: "text",
  clientName: "",
  companyName: "",
  position: "",
  text: "",
  clientImage: null,
  video: null,
  videoUrl: "",
  videoPublicId: "",
  rating: 5,
  isPublished: true,
  isFeatured: false,
};

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

export default function AdminTestimonialsManager() {
  const navigate = useNavigate();

  const [testimonials, setTestimonials] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [previewId, setPreviewId] = useState(null);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("all");
  const [status, setStatus] = useState("all");
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const notify = (message, severity = "success") => setSnackbar({ open: true, message, severity });

  // =====================================================
  // FETCH
  // =====================================================

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const res = await axios.get(BASE_URL);
      setTestimonials([...res.data].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)));
    } catch (error) {
      console.error(error);
      notify("Failed to fetch testimonials ❌", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  // =====================================================
  // DERIVED DATA
  // =====================================================

  const filtersActive = Boolean(search.trim() || type !== "all" || status !== "all");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();

    return testimonials.filter((t) => {
      if (q) {
        const hay = [t.clientName, t.companyName, t.position, t.text].filter(Boolean).join(" ").toLowerCase();
        if (!hay.includes(q)) return false;
      }
      if (type !== "all" && t.type !== type) return false;
      if (status === "published" && !t.isPublished) return false;
      if (status === "hidden" && t.isPublished) return false;
      if (status === "featured" && !t.isFeatured) return false;
      return true;
    });
  }, [testimonials, search, type, status]);

  const stats = useMemo(() => {
    const build = (items) => {
      const series = cumulativeSeries(items);
      return { value: items.length, series, trend: trendOf(series) };
    };

    return {
      total: build(testimonials),
      published: build(testimonials.filter((t) => t.isPublished)),
      featured: build(testimonials.filter((t) => t.isFeatured)),
      video: build(testimonials.filter((t) => t.type === "video")),
    };
  }, [testimonials]);

  const previewTestimonial = testimonials.find((t) => t._id === previewId) || null;

  // =====================================================
  // MODAL
  // =====================================================

  const closeModal = () => {
    if (loading) return;
    setOpenModal(false);
    setForm(emptyForm);
  };

  // =====================================================
  // UPLOAD FILE DIRECTLY TO CLOUDINARY
  // =====================================================

  const uploadToCloudinary = async (file, resourceType) => {
    try {
      const signatureResponse = await axios.get(
        `${backendURL}/api/cloudinary/testimonial-upload-signature`,
        { params: { resourceType } }
      );

      const { timestamp, folder, signature, cloudName, apiKey } = signatureResponse.data;

      const cloudinaryFormData = new FormData();
      cloudinaryFormData.append("file", file);
      cloudinaryFormData.append("api_key", apiKey);
      cloudinaryFormData.append("timestamp", timestamp);
      cloudinaryFormData.append("folder", folder);
      cloudinaryFormData.append("signature", signature);

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`,
        cloudinaryFormData
      );

      return {
        url: response.data.secure_url,
        publicId: response.data.public_id,
      };
    } catch (error) {
      console.error("❌ Cloudinary upload error:", error);

      throw new Error(error.response?.data?.error?.message || "Cloudinary upload failed");
    }
  };

  // =====================================================
  // ADD TESTIMONIAL
  // =====================================================

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!form.clientName.trim()) return notify("Please enter client name ⚠️", "warning");

    if (form.type === "text" && !form.text.trim()) {
      return notify("Please enter client feedback ⚠️", "warning");
    }

    if (form.type === "video" && !form.video) {
      return notify("Please select a testimonial video ⚠️", "warning");
    }

    try {
      setLoading(true);

      let clientImage = "";
      let clientImagePublicId = "";
      let video = "";
      let videoPublicId = "";

      // Text testimonial → client image to Cloudinary
      if (form.type === "text" && form.clientImage) {
        notify("Uploading client image to Cloudinary...", "info");

        const imageResult = await uploadToCloudinary(form.clientImage, "image");
        clientImage = imageResult.url;
        clientImagePublicId = imageResult.publicId;
      }

      // Video testimonial → video to Cloudinary
      if (form.type === "video" && form.video) {
        notify("Uploading testimonial video to Cloudinary...", "info");

        const videoResult = await uploadToCloudinary(form.video, "video");
        video = videoResult.url;
        videoPublicId = videoResult.publicId;
      }

      // Send only JSON to the backend
      const payload = {
        type: form.type,
        clientName: form.clientName,
        companyName: form.companyName,
        position: form.position,
        text: form.type === "text" ? form.text : "",
        clientImage,
        clientImagePublicId,
        video,
        videoPublicId,
        rating: form.type === "text" ? form.rating : 0,
        isPublished: form.isPublished,
        isFeatured: form.isFeatured,
      };

      await axios.post(BASE_URL, payload, { headers: { "Content-Type": "application/json" } });

      setForm({ ...emptyForm });
      setOpenModal(false);
      await fetchTestimonials();
      notify("Testimonial added successfully ✅");
    } catch (error) {
      console.error("Upload testimonial error:", error);
      notify(error.message || error.response?.data?.message || "Failed to add testimonial ❌", "error");
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // DELETE
  // =====================================================

  const handleDelete = async (testimonial) => {
    if (!window.confirm(`Delete the testimonial from "${testimonial.clientName}"? This can't be undone.`)) return;

    try {
      setLoading(true);
      await axios.delete(`${BASE_URL}/${testimonial._id}`);

      if (previewId === testimonial._id) setPreviewId(null);
      await fetchTestimonials();
      notify("Testimonial deleted 🗑️");
    } catch (error) {
      console.error(error);
      notify("Failed to delete testimonial ❌", "error");
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // REORDER (only while the list isn't filtered)
  // =====================================================

  const handleReorder = async (fromIndex, toIndex) => {
    const reordered = [...testimonials];
    const [moved] = reordered.splice(fromIndex, 1);
    reordered.splice(toIndex, 0, moved);
    setTestimonials(reordered);

    try {
      await axios.put(`${BASE_URL}/reorder`, { ids: reordered.map((item) => item._id) });
      notify("Testimonial order updated ✅");
    } catch (error) {
      console.error(error);
      await fetchTestimonials();
      notify("Failed to save order ❌", "error");
    }
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: dash.page }}>
      <DashboardTopBar placeholder="Search testimonials..." />

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
          <Typography sx={{ fontSize: 12.5, color: dash.muted }}>Testimonials</Typography>
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
              Testimonials Management
            </Typography>
            <Typography sx={{ color: dash.muted, fontSize: 14, mt: 0.8 }}>
              Manage client feedback shown on your website. Drag rows to change their order.
            </Typography>
          </Box>

          <Button
            variant="contained"
            startIcon={<AddRounded />}
            onClick={() => setOpenModal(true)}
            disabled={loading}
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
            Add Testimonial
          </Button>
        </Box>

        {/* ---------- Stat cards ---------- */}
        <Grid container spacing={2.2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} lg={3}>
            <BlogStatCard
              id="tm-total"
              title="Total Testimonials"
              value={stats.total.value}
              icon={<FormatQuoteRounded />}
              color={dash.green}
              tint="#EEF4DE"
              trend={stats.total.trend}
              sparkData={stats.total.series}
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <BlogStatCard
              id="tm-published"
              title="Published"
              value={stats.published.value}
              icon={<CheckCircleOutline />}
              color="#7C6FD0"
              tint="#F0EEFB"
              trend={stats.published.trend}
              sparkData={stats.published.series}
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <BlogStatCard
              id="tm-featured"
              title="Featured"
              value={stats.featured.value}
              icon={<StarRounded />}
              color="#E3A81C"
              tint="#FDF6DC"
              trend={stats.featured.trend}
              sparkData={stats.featured.series}
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <BlogStatCard
              id="tm-video"
              title="Video"
              value={stats.video.value}
              icon={<PlayCircleOutline />}
              color="#4A90C2"
              tint="#E9F3FA"
              trend={stats.video.trend}
              sparkData={stats.video.series}
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
                placeholder="Search by client, company or feedback..."
                sx={{ fontSize: 13, color: dash.navy }}
              />
            </Box>

            <TextField
              select
              value={type}
              onChange={(e) => setType(e.target.value)}
              sx={{
                width: 150,
                "& .MuiOutlinedInput-root": {
                  height: 42,
                  borderRadius: "10px",
                  fontSize: 13,
                  color: dash.navy,
                  "& fieldset": { borderColor: dash.border },
                },
              }}
            >
              <MenuItem value="all">All Types</MenuItem>
              <MenuItem value="text">Text</MenuItem>
              <MenuItem value="video">Video</MenuItem>
            </TextField>

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
              <MenuItem value="published">Published</MenuItem>
              <MenuItem value="hidden">Hidden</MenuItem>
              <MenuItem value="featured">Featured</MenuItem>
            </TextField>

            <Button
              variant="outlined"
              onClick={() => {
                setSearch("");
                setType("all");
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
              Showing {filtered.length} of {testimonials.length} testimonials
            </Typography>
          </Box>

          <TestimonialTable
            testimonials={filtered}
            hasAny={testimonials.length > 0}
            dragEnabled={!filtersActive}
            onReorder={handleReorder}
            onView={(t) => setPreviewId(t._id)}
            onDelete={handleDelete}
            onAdd={() => setOpenModal(true)}
            disabled={loading}
          />
        </Paper>
      </Box>

      <TestimonialFormModal
        open={openModal}
        onClose={closeModal}
        form={form}
        setForm={setForm}
        onSubmit={handleUpload}
        loading={loading}
        onError={(message) => notify(message, "warning")}
      />

      <TestimonialPreviewDialog testimonial={previewTestimonial} onClose={() => setPreviewId(null)} />

      <SnackbarAlert
        open={snackbar.open}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        severity={snackbar.severity}
        message={snackbar.message}
      />

      <LoadingBackdrop open={loading} />
    </Box>
  );
}